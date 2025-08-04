import express from "express";
import upload from "../../infrastructure/middleware/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/image", upload.single("image"), uploadImage);
// You can later add: router.post('/video', upload.single('video'), ...)

export default router;
