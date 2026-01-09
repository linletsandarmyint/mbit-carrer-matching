// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware: parse JSON
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
console.log("✅ authRoutes loaded"); // should print

// Use auth routes
app.use("/api/auth", authRoutes);

// Fallback route
app.get("/", (req, res) => res.send("Server is running"));

// Global error handler (optional but helpful)
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.stack || err);
  res.status(500).json({ message: err.message || "Something went wrong" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
