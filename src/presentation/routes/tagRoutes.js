import express from "express";
import {
  getAllTags,
  createTag,
  deleteTag,
} from "../controllers/tagController.js";
import { authenticate} from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
const router = express.Router();

router.get("/", authenticate, authorizeRoles("ADMIN"),getAllTags);
router.post("/", authenticate, authorizeRoles("ADMIN"),createTag);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"),deleteTag);

export default router;
