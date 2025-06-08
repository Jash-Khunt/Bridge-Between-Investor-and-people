import express from "express";
import { protectRoute, checkRole } from "../middlewares/auth.middleware.js";
import {
  requestConnection,
  acceptConnection,
  rejectConnection,
  getConnections,
} from "../controllers/connection.controller.js";
const router = express.Router();

router.use(protectRoute);

router.use(checkRole(["investor", "entrepreneur"]));

router.post("/request", requestConnection);
router.post("/accept/:id", acceptConnection);
router.post("/reject/:id", rejectConnection);
router.get("/", getConnections);

export default router;
