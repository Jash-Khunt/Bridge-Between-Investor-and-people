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
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/ideas", businessIdeaRoutes);
app.use("/api/proposals", investorProposalRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/loans", loanOfferRoutes);
app.use("/api/queries", queryRoutes);
app.use("/api/advice", adviceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  connectDB();
});
