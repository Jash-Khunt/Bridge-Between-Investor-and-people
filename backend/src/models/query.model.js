import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    entrepreneurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: { type: String, required: true },
    advisorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    answer: { type: String },
    status: {
      type: String,
      enum: ["unanswered", "answered"],
      default: "unanswered",
    },
  },
  { timestamps: true }
);

const Query = mongoose.model("Query", querySchema);

export default Query;
