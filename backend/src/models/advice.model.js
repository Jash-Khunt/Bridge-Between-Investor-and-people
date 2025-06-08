import mongoose from "mongoose";

const adviceSchema = new mongoose.Schema(
  {
    advisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

const Advice = mongoose.model("Advice", adviceSchema);

export default Advice;
