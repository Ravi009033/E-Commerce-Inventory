import express from "express";
import { createOrder, getOrder, updateOrderStatus, getUserOrders, fulfillOrder }
  from "../controllers/orderController.js";

// creates a modular route handler. 
const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrder);
router.put("/:id/status", updateOrderStatus);
router.get("/user/:id", getUserOrders);
router.post("/:id/fulfill", fulfillOrder);


export default router;
