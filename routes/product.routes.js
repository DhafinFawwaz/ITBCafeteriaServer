import express from "express";
import { addProduct, editProduct, deleteProduct } from "../controllers/product.controllers.js";

const router = express.Router();

router.get("/add", addProduct);
router.get("/edit", editProduct);
router.get("/delete", deleteProduct);

export default router;