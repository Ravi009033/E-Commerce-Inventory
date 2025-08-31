import express from "express"
import {
  getProducts, createProduct, updateProduct,
  getLowStockProducts, updateStock
} from "../controllers/productController.js";

// creates a modular route handler.
const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.get("/low-stock", getLowStockProducts);
router.put("/:id/stock", updateStock);

export default router;

