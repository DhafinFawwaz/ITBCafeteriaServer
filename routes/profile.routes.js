import express from "express";
import { profile, edit, changePassword } from "../controllers/profile.controllers.js";

const router = express.Router();

router.get("/", profile);
router.post("/edit", edit);
router.post("/changepassword", changePassword);

export default router;