import express from "express";
import { addCart, editCart, editCartStatus, editPaymentStatus, deleteCart, getAllCart, payCart } from "../controllers/cart.controllers.js";

const router = express.Router();

router.get("/", getAllCart);
// router.post("/add", addCart);
router.post("/edit", editCart);
router.post("/pay", payCart);
router.post("/edit/cartstatus", editCartStatus);
router.post("/edit/paymentstatus", editPaymentStatus);
router.delete("/delete", deleteCart);
router.post("/payall", payCart);

export default router;