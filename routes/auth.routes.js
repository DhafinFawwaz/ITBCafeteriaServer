import express from "express";
import { registerUser, loginUser, registerShop, loginShop } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/shop/register", registerShop);
router.post("/shop/login", loginShop);

export default router;