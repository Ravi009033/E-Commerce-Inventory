import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //connect to altas cluster
    //connection requires a MongoDB URI (Uniform Resource Identifier)
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
  } catch (err) {
    console.error(`Error: ${err.message}`);
    //exit connection with failure
    process.exit(1); 
  }
};

export default connectDB;
