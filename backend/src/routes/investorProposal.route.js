import express from "express";
import { protectRoute, checkRole } from "../middlewares/auth.middleware.js";
import {
  getProposals,
  getProposalById,
  createProposal,
  updateProposal,
  deleteProposal,
} from "../controllers/investorProposal.controller.js";
const router = express.Router();

router.get("/", getProposals);
router.get("/:id", getProposalById);
router.post("/", protectRoute, checkRole(["investor"]), createProposal);
router.put("/:id", protectRoute, checkRole(["investor"]), updateProposal);
router.delete("/:id", protectRoute, checkRole(["investor"]), deleteProposal);

export default router;
