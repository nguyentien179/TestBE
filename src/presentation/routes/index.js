import express from "express";

import articleRoutes from "./articleRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import tagRoutes from "./tagRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

const router = express.Router();

// Mount all routes under a common prefix
router.use("/articles", articleRoutes);
router.use("/categories", categoryRoutes);
router.use("/tags", tagRoutes);
router.use("/uploads", uploadRoutes);
// router.use('/users', userRoutes);

export default router;
