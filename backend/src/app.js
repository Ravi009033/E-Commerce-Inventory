import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express()

//enable CORS(Cross-Origin Resource Sharing)
//allows backend API to be accessed by a frontend running on a different port or domain.
app.use(cors())

//middleware to automatically parse incoming JSON request
app.use(express.json())

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes); 

// Error handling
app.use(errorHandler);

export default app;