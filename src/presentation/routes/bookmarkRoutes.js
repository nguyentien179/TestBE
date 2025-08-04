import express from "express";
import { authenticate } from "../middlewares/auth.js";
import {authorizePermission} from "../middlewares/authorization.js";
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router.use(authenticate); 

router.get("/", authorizePermission("bookmark:view"), getBookmarks);
router.post("/:id", authorizePermission("bookmark:create"), addBookmark);     // :id = articleId
router.delete("/:id",authorizePermission("bookmark:delete"), removeBookmark);

export default router;
