import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

// Only admin can view or manage users
router.get("/", authenticate, authorizeRoles("ADMIN"), getAllUsers);
router.get("/:id", authenticate, authorizeRoles("ADMIN"), getUserById);
router.put("/:id", authenticate, authorizeRoles("ADMIN", "REGISTERED"), updateUser);
router.delete("/:id", authenticate, authorizeRoles("ADMIN"), deleteUser);

export default router;
