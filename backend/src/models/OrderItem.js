import mongoose from "mongoose";

//define schema structure of Order_Items (id, order_id, product_id, quantity, price_at_time)

const orderItemSchema = new mongoose.Schema({
    order_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Order",         // ref to Order model
        required: true 
    },
    product_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product",      // ref to Product model
        required: true 
        },
    quantity: { 
        type: Number, 
        required: true
     },
    price_at_time: { 
        type: Number, 
        required: true 
    }
},{ timestamps: true})     // auto-handling of created/updated times

//create and export model
export default mongoose.model("OrderItem", orderItemSchema);