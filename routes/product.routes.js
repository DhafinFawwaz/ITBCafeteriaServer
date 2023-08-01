import express from "express";
import { findProduct, detailsProduct, addProduct, editProduct, deleteProduct, editImage } from "../controllers/product.controllers.js";
import multer from 'multer';

const upload = multer({ dest: './uploads/' })
const router = express.Router();

router.get("/", detailsProduct);
router.get("/find", findProduct);
router.post("/add", upload.single('image'), addProduct);
router.post("/edit", editProduct);
router.post("/edit/image", upload.single('image'), editImage);
router.delete("/delete", deleteProduct);

export default router;