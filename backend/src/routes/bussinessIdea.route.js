import express from "express";
import { protectRoute, checkRole } from "../middlewares/auth.middleware.js";
import {
  getAllIdeas,
  getIdeaById,
  createIdea,
  updateIdea,
  deleteIdea,
} from "../controllers/businessIdea.controller.js";
const router = express.Router();

router.get("/", getAllIdeas);
router.get("/:id", getIdeaById);
router.post("/", protectRoute, checkRole(["entrepreneur"]), createIdea);
router.put("/:id", protectRoute, checkRole(["entrepreneur"]), updateIdea);
router.delete("/:id", protectRoute, checkRole(["entrepreneur"]), deleteIdea);

export default router;