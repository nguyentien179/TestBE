import express from "express";
import {
  createComment,
  getApprovedComments,
  getAllComments,
  moderateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { authenticate } from "../middlewares/auth.js";
import {authorizePermissions} from "../middlewares/authorizePermissions.js";

const router = express.Router();

// Public: View approved comments for article
router.get("/article/:articleId", getApprovedComments);

// Authenticated: Create a comment
router.post("/", authenticate, authorizePermissions("comment:create"),createComment);

// Admin/Editor: View all comments, moderate, delete
router.get("/", authenticate, getAllComments);
router.patch("/:id", authenticate, authorizePermissions("comment:moderate"), moderateComment);
router.delete("/:id", authenticate, authorizePermissions("comment:delete"), deleteComment);

export default router;
