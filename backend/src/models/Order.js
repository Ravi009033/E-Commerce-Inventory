import mongoose from "mongoose";

//define schema structure of Order Management
//Orders (id, user_id, total, status, created_at)

const orderSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true   // must required user_id
    },
    total:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ["Pending", "Fulfilled", "Cancelled"], // only allowed values
        default: "Pending"
    },
    created_at:{
        type: Date,
        default: Date.now    // by default take current date
    }
}, { timestamps: true })     // auto-handling of created/updated times

//create and export model
export default mongoose.model("Order", orderSchema);