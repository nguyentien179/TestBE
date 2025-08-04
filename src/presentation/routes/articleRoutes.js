// src/interfaces/routes/articleRoutes.js
import express from "express";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorizePermission } from "../middleware/authorizePermission.js";

const router = express.Router();

// Public routes
router.get("/", getAllArticles); 
router.get("/:id", getArticleById); 

// Editor/Admin routes
router.post(
  "/",
  authenticate,
  authorizePermission("article:create"),
  createArticle
);

router.put(
  "/:id",
  authenticate,
  authorizePermission("article:edit"),
  updateArticle
);

router.delete(
  "/:id",
  authenticate,
  authorizePermission("article:delete"),
  deleteArticle
);

export default router;
