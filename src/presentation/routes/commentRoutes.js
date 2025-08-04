import express from "express";
import {
  createComment,
  getApprovedComments,
  getAllComments,
  moderateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorizePermission } from "../middlewares/authorizePermission.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Manage comments on articles
 */

/**
 * @swagger
 * /comments/article/{articleId}:
 *   get:
 *     summary: Get all approved comments for an article
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article
 *     responses:
 *       200:
 *         description: List of approved comments
 */
router.get("/article/:articleId", getApprovedComments);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - articleId
 *             properties:
 *               content:
 *                 type: string
 *                 example: This is an insightful post!
 *               articleId:
 *                 type: string
 *                 example: 12345
 *     responses:
 *       201:
 *         description: Comment created
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authenticate,
  authorizePermission("comment:create"),
  createComment
);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments (admin/editor only)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all comments
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: Moderate a comment (approve or reject)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               approved:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Comment status updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.patch(
  "/:id",
  authenticate,
  authorizePermission("comment:moderate"),
  moderateComment
);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.delete(
  "/:id",
  authenticate,
  authorizePermission("comment:delete"),
  deleteComment
);

export default router;
