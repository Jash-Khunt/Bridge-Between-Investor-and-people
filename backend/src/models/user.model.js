import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["entrepreneur", "investor", "banker", "advisor"],
      required: true,
    },
    phone: { type: String },
    location: {
      city: String,
      state: String,
      country: { type: String, default: "India" },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;