import mongoose from "mongoose";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";


// place a new order 
export const createOrder = async (req, res, next) => {

    // session allows to group multiple database operations into a transaction.
    const session = await mongoose.startSession();   // start a session
    session.startTransaction();             // begin transaction

    try{
        const {user_id, items } = req.body;
        let total = 0;

        const orderItems = [];

        // look for all item in cart
        for(const item of items){
            const product = await Product.findById(item.product_id).session(session);
            
            //check product available 
            if(!product)
                throw new Error("Product not found");
            
            // check prdouct stock  
            if(product.stock_quantity < item.quantity){
                throw new Error(`Insufficient stock for ${product.name}`);
            }

            // add the price of the product
            total += product.price * item.quantity;

            //reduce the stock of the product
            product.stock_quantity -= item.quantity;
            await product.save({ session });

            orderItems.push({
                product_id: product._id,
                quantity: item.quantity,
                price_at_time: product.price   
            });
        }

        const [order] = await Order.create([{ user_id, total, status: "Pending"}], {session});

        // Attach order_id to each order item
        const itemsWithOrderId = orderItems.map(i => ({
            ...i,
            order_id: order._id
        }));

        // Insert order items
        await OrderItem.insertMany(itemsWithOrderId, { session });

        // commit transaction
        await session.commitTransaction();
        res.status(201).json({ order, items: orderItems });
        console.log("Order placed successfully");
    }
    catch(err){

        // rollback all changes if something fails
        await session.abortTransaction();
        next(err);
    }
    finally{
        session.endSession();  // close session
    }
}

// get order details
export const getOrder = async (req, res, next) => {
    try{
        const order = await Order.findById(req.params.id);
        const items = await OrderItem.find({
            order_id: req.params.id
        }).populate("product_id");
        res.json({order, items});
        console.log("Fetch order details successfully");
    }
    catch(err){
        next(err);
    }
}

// get order details of particular user
export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ user_id: userId }).sort({ createdAt: -1 } );

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItem.find({ order_id: order._id }).populate("product_id");
        return { ...order.toObject(), items };
      })
    );

    res.json(ordersWithItems);
    console.log("User's order history fetch successfully");
  } 
  catch (err) { 
    next(err); 
    }
};

// Process order fulfillment
export const fulfillOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, { status: "Fulfilled" }, { new: true }
    );
    res.json(order);
    console.log("Order fulfill successfully")
  } 
  catch (err) { 
    next(err); 
  }
};

// update status of placed order
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // If cancelling, restore stock
    if (status === "Cancelled" && order.status !== "Cancelled") {
      const items = await OrderItem.find({ order_id: order._id });
      for (const item of items) {
        const product = await Product.findById(item.product_id);
        if (product) {
          product.stock_quantity += item.quantity;
          await product.save();
        }
      }
    }

    order.status = status;
    await order.save();

    res.json(order);
    console.log("Order status updated");
  } 
  catch (err) {
    next(err);
  }
};
