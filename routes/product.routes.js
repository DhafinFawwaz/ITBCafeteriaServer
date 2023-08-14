import express from "express";
import { findProduct, detailsProduct, addProduct, editProduct, deleteProduct, editImage, suggestedProductByLocation, getOwnedproduct, getCartOrder } from "../controllers/product.controllers.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage })
const router = express.Router();

router.get("/", detailsProduct);
router.get("/suggestion", suggestedProductByLocation);
router.get("/find", findProduct);
router.get("/shop/product", getOwnedproduct);
router.get("/shop/cartorder", getCartOrder);
router.post("/add", upload.single('image'), addProduct);
router.post("/edit", editProduct);
router.post("/edit/image", upload.single('image'), editImage);
router.delete("/delete", deleteProduct);

export default router;