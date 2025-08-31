import Product from "../models/Product.js"


//req → incoming request from client
//res → response you send back
//next → passes control to next middleware (especially for errors)
//async → allows await for database calls, API calls, etc.

//fetch all products from MongoDB and return them in an API response
export const getProducts = async (req, res, next) =>{
    try{
        
        //populate() = replaces ObjectId with the actual referenced document. 
        const products = await Product.find().populate("category_id");
        res.json(products);  // send back as JSON
        console.log("All product fetched successfully");
    }
    catch(err){
        // pass error to error-handling middleware
        next(err);
    }
}

//add a new product
export const createProduct = async (req, res, next) => {
    try{
        const product = await Product.create(req.body);
        res.status(201).json(product);
        console.log("new Product added successfully");
    }
    catch(err){
        next(err);
    }
}

//update product details
export const updateProduct = async (req, res, next) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.json(product);
        console.log("Update product successfully");
    }
    catch(err){
        next(err);
    }
}

// Get low stock products (< 10 items left)
export const getLowStockProducts = async (req, res, next) => {
    try{
        const products = await Product.find({stock_quantity: {$lt: 10}});
        res.json(products);
        console.log("low stock alert");
    }
    catch(err){
        next(err);
    }
}


// Update stock quantity
export const updateStock = async (req, res, next) => {
    try{
        const { stock_quantity }= req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { stock_quantity },
            { new: true }
        );
        res.json(product);
        console.log("stock quantity updated successfully");
    }
    catch(err){
        next(err);
    }
}