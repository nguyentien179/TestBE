import express from "express";
import { getAdminAnalytics } from "../controllers/analyticController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", authenticate, authorizeRoles("ADMIN"), getAdminAnalytics);

export default router;
