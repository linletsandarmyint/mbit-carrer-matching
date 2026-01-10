const express = require("express");
const {
  getQuestions,
  submitAnswers,
} = require("../controllers/mbtiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch questions (protected so only logged-in users can answer)
router.get("/questions", protect, getQuestions);

// Submit answers
router.post("/submit", protect, submitAnswers);

module.exports = router;
