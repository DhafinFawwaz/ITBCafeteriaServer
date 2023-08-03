import express from "express";
import { profile, edit, editImage, changePassword } from "../controllers/shop.controllers.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage })
const router = express.Router();


router.get("/", profile);
router.post("/edit", edit);
router.post("/edit/image", upload.single('image'), editImage);
router.post("/changepassword", changePassword);

export default router;