const MBTIQuestion = require("../models/MBTIQuestion");

// ================= CREATE MBTI QUESTION(S) =================
exports.createMBTIQuestion = async (req, res) => {
  try {
    let questions = req.body.questions || req.body;

    // Case 1: single question → convert to array
    if (!Array.isArray(questions)) {
      questions = [questions];
    }

    // Validate each question
    for (const q of questions) {
      if (!q.question || !Array.isArray(q.options)) {
        return res.status(400).json({
          message: "Each question must have question text and options array",
        });
      }
    }

    // Insert as separate documents
    const savedQuestions = await MBTIQuestion.insertMany(questions);

    res.status(201).json({
      message: "MBTI question(s) created successfully",
      count: savedQuestions.length,
      questions: savedQuestions,
    });
  } catch (error) {
    console.error("❌ ADMIN CREATE QUESTION ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
