import express from "express";
import { protectRoute, checkRole } from "../middlewares/auth.middleware.js";
import {
  getQueries,
  getQueryById,
  postQuery,
  postSolution,
} from "../controllers/query.controller.js";
const router = express.Router();

router.get("/", getQueries);
router.get("/:id", getQueryById);
router.post("/", protectRoute, checkRole(["entrepreneur"]), postQuery);
router.post(
  "/:id/solution",
  protectRoute,
  checkRole(["advisor"]),
  postSolution
);

export default router;
