import mongoose from "mongoose";

const investorProposalSchema = new mongoose.Schema(
  {
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sectorsOfInterest: [{ type: String }],
    investmentRange: {
      min: Number,
      max: Number,
    },
    expectedROI: { type: String },
    investmentHorizon: { type: String },
    proposalNote: { type: String },
  },
  { timestamps: true }
);

const InvestorProposal = mongoose.model(
  "InvestorProposal",
  investorProposalSchema
);

export default InvestorProposal;
