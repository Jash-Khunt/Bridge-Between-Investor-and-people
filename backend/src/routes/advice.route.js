import express from "express";
import { protectRoute, checkRole } from "../middlewares/auth.middleware.js";
import {
  getAdviceList,
  getAdviceById,
  postAdvice,
  updateAdvice,
} from "../controllers/advice.controller.js";
const router = express.Router();

router.get("/", getAdviceList);
router.get("/:id", getAdviceById);
router.post("/", protectRoute, checkRole(["advisor"]), postAdvice);
router.put("/:id", protectRoute, checkRole(["advisor"]), updateAdvice);
export default router;
