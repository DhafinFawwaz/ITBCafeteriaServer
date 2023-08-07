import express from "express";
import { addOrder, editOrder, deleteOrder, reduceOrder, addOrderById } from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/add", addOrder);
router.post("/addById", addOrderById);
router.post("/reduce", reduceOrder);
router.post("/edit", editOrder);
router.delete("/delete", deleteOrder);

export default router;