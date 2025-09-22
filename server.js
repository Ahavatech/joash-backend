import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import socialRoutes from "./routes/socialRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://joashadeoye.vercel-like.app",
}));

// Body parser
app.use(express.json());

// Connect to DB
connectDB();

// API routes
app.use("/api/admin", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/socials", socialRoutes);
app.use("/api/contact", contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message || "Server Error" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
