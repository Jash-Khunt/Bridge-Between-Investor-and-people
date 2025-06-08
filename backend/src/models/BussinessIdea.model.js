import mongoose from "mongoose";

const businessIdeaSchema = new mongoose.Schema(
  {
    entrepreneurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    fundingRequired: { type: Number, required: true },
    expectedROI: { type: String },
    pitchDeckUrl: { type: String },
    status: {
      type: String,
      enum: ["pending", "in discussion", "funded", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const BusinessIdea = mongoose.model("BusinessIdea", businessIdeaSchema);

export default BusinessIdea;
