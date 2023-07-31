import express from "express";
import { findProduct, detailsProduct, addProduct, editProduct, deleteProduct } from "../controllers/product.controllers.js";

const router = express.Router();

router.get("/", detailsProduct);
router.get("/find", findProduct);
router.post("/add", addProduct);
router.post("/edit", editProduct);
router.delete("/delete", deleteProduct);

export default router;