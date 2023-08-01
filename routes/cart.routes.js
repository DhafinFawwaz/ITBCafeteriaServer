import express from "express";
import { addCart, editCart, deleteCart, getAllCart } from "../controllers/cart.controllers.js";

const router = express.Router();

router.get("/", getAllCart);
router.post("/add", addCart);
router.post("/edit", editCart);
router.delete("/delete", deleteCart);

export default router;