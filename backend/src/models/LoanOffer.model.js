import mongoose from "mongoose";

const loanOfferSchema = new mongoose.Schema(
  {
    bankerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    loanType: { type: String, required: true },
    interestRate: { type: String, required: true },
    maxAmount: { type: Number },
    eligibility: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const LoanOffer = mongoose.model("LoanOffer", loanOfferSchema);

export default LoanOffer;
