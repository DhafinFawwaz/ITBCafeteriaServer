import express from "express";
import { addOrder, editOrder, deleteOrder } from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/add", addOrder);
router.post("/edit", editOrder);
router.delete("/delete", deleteOrder);

export default router;