import express from "express";
import { profile, edit, changePassword, editImage } from "../controllers/profile.controllers.js";
import multer from 'multer';

const upload = multer({ dest: './uploads/' })
const router = express.Router();

router.get("/", profile);
router.post("/edit", edit);
router.post("/edit/image", upload.single('image'), editImage);
router.post("/changepassword", changePassword);

export default router;