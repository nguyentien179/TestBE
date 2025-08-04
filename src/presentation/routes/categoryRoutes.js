import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", authenticate, authorizeRoles("ADMIN"), createCategory);
router.put("/:id",authenticate,authorizeRoles("ADMIN"), updateCategory);
router.delete("/:id",authenticate, authorizeRoles("ADMIN"),deleteCategory);

export default router;
