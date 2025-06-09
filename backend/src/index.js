import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import businessIdeaRoutes from "./routes/bussinessIdea.route.js";
import investorProposalRoutes from "./routes/investorProposal.route.js";
import connectionRoutes from "./routes/connection.route.js";
import loanOfferRoutes from "./routes/loanOffer.route.js";
import queryRoutes from "./routes/query.route.js";
import adviceRoutes from "./routes/advice.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/ideas", businessIdeaRoutes);
app.use("/api/proposals", investorProposalRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/loans", loanOfferRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/advice", adviceRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  connectDB();
});
