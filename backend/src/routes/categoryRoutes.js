import express from "express";
import { getCategories, createCategory } from "../controllers/categoryController.js";

// creates a modular route handler.
const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);

export default router;
