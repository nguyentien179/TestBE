import express from "express";
import {
  getAllTags,
  createTag,
  deleteTag,
} from "../controllers/tagController.js";

const router = express.Router();

router.get("/", getAllTags);
router.post("/", createTag);
router.delete("/:id", deleteTag);

export default router;
