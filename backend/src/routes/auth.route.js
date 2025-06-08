import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  signup,
  login,
  logout,
  getProfile,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.get("/profile", protectRoute, getProfile);
router.put("/profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;
