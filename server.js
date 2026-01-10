// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// ✅ MUST be before routes
app.use(express.json());

// ===== ROUTES =====
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mbtiRoutes = require("./routes/mbtiRoutes");
const jobRoutes = require("./routes/jobRoutes");

console.log("✅ Routes loaded");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mbti", mbtiRoutes);
app.use("/api/jobs", jobRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ❗ GLOBAL ERROR HANDLER (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error("💥 GLOBAL ERROR HANDLER");
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
