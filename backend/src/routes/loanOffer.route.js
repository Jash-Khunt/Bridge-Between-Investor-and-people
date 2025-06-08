import express from "express";
import { protectRoute, checkRole } from "../middlewares/auth.middleware.js";
import {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
} from "../controllers/loanOffer.controller.js";
const router = express.Router();

router.get("/", getOffers);
router.get("/:id", getOfferById);
router.post("/", protectRoute, checkRole(["banker"]), createOffer);
router.put("/:id", protectRoute, checkRole(["banker"]), updateOffer);
router.delete("/:id", protectRoute, checkRole(["banker"]), deleteOffer);

export default router;
