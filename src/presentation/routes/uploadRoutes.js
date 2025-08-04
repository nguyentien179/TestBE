import express from "express";
import upload from "../../infrastructure/middleware/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post("/image", authenticate, upload.single("image"), uploadImage);

export default router;
