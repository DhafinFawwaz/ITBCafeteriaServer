import express from "express";
import { findProduct, detailsProduct, addProduct, editProduct, deleteProduct, editImage, suggestedProductByLocation } from "../controllers/product.controllers.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage })
const router = express.Router();

router.get("/", detailsProduct);
router.get("/suggestion", suggestedProductByLocation);
router.get("/find", findProduct);
router.post("/add", upload.single('image'), addProduct);
router.post("/edit", editProduct);
router.post("/edit/image", upload.single('image'), editImage);
router.delete("/delete", deleteProduct);

export default router;