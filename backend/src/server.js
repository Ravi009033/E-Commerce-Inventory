import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

//config the .env 
dotenv.config();

//connect with database
connectDB();

//check for app run on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
