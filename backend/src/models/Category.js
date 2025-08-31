import mongoose from "mongoose";

//define schema structure of Categories (id, name, description)

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String
    }
}, {timestamps: true}) // automatically adds two fields createdAt & updatedAt times

//create and export the model 
export default mongoose.model("Category", categorySchema);