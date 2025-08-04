// src/interfaces/routes/bookmarkRoutes.js
import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { authorizePermission } from "../middlewares/authorizePermission.js";
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from "../controllers/bookmarkController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: Manage bookmarked articles
 */

router.use(authenticate);

/**
 * @swagger
 * /bookmarks:
 *   get:
 *     summary: Get all bookmarked articles of the authenticated user
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of bookmarks
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", authorizePermission("bookmark:view"), getBookmarks);

/**
 * @swagger
 * /bookmarks/{id}:
 *   post:
 *     summary: Add an article to bookmarks
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to bookmark
 *     responses:
 *       201:
 *         description: Bookmark added
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/:id", authorizePermission("bookmark:create"), addBookmark);

/**
 * @swagger
 * /bookmarks/{id}:
 *   delete:
 *     summary: Remove an article from bookmarks
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to remove from bookmarks
 *     responses:
 *       200:
 *         description: Bookmark removed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Bookmark not found
 */
router.delete("/:id", authorizePermission("bookmark:delete"), removeBookmark);

export default router;
