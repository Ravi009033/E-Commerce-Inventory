import express from "express";
import { getUserOrders } from "../controllers/orderController.js";

// creates a modular route handler.
const router = express.Router();

router.get("/:id/orders", getUserOrders);

export default router;
