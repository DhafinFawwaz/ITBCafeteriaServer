import express from "express";
import { addCart, editCart, deleteCart } from "../controllers/cart.controllers.js";

const router = express.Router();

router.post("/add", addCart);
router.post("/edit", editCart);
router.delete("/delete", deleteCart);

export default router;