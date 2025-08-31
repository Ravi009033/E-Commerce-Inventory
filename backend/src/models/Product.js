import mongoose from "mongoose";

//define schema structure of Product Management
//Products (id, name, sku, price, stock_quantity, category_id)

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true    // must provide a name
    },
    sku:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    stock_quantity:{
        type: Number,
        required: true,
        default: 0
    },
    category_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category"        // ref to Category model
    }
}, { timestamps: true })  // automatically adds two fields createdAt & updatedAt times


// Create a model based on schema
const Product = mongoose.model("Product", productSchema);

//export the model
export default Product;