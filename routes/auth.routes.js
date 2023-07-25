import express from "express";
import { register, getAllUsers } from "../controllers/auth.controllers.js";

const router = express.Router();

router.get("/register", register);

router.get("/users", getAllUsers);

export default router;