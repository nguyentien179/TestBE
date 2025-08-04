import express from "express";

import articleRoutes from "./articleRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import tagRoutes from "./tagRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import authRoutes from "./authRoutes.js";
import commentRoutes from "./commentRoutes.js";
import bookmarkRoutes from "./bookmarkRoutes.js";
import userRoutes from "./userRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";

const router = express.Router();

// Mount all routes under a common prefix
router.use("/articles", articleRoutes);
router.use("/categories", categoryRoutes);
router.use("/tags", tagRoutes);
router.use("/uploads", uploadRoutes);
router.use("/auth", authRoutes);
router.use("/comments", commentRoutes);
router.use("/bookmarks", bookmarkRoutes);
router.use('/users', userRoutes);
router.use("/analytics", analyticsRoutes);
export default router;
