const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createMBTIQuestion } = require("../controllers/adminController");

const router = express.Router();

// Auth check
router.use(protect);

// Admin role check
router.use((req, res, next) => {
  console.log("🔥 ADMIN ROLE CHECK");

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
});

// Routes
router.post("/questions", createMBTIQuestion);

module.exports = router;
