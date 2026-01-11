const MBTIQuestion = require("../models/MBTIQuestion");
const User = require("../models/User");

// Fetch all MBTI questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await MBTIQuestion.find();
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit MBTI answers and calculate type
exports.submitAnswers = async (req, res) => {
  try {
    let { answers } = req.body; // answers can be array of strings or objects

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid answers" });
    }

    // If objects, map to value
    answers = answers.map((a) => (typeof a === "string" ? a : a.value));

    // Initialize counts
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    // Count letters
    answers.forEach((letter) => {
      if (counts.hasOwnProperty(letter)) {
        counts[letter] += 1;
      } else {
        console.warn("⚠️ Invalid letter found:", letter);
      }
    });

    // Build MBTI type
    const mbtiType =
      (counts.E >= counts.I ? "E" : "I") +
      (counts.S >= counts.N ? "S" : "N") +
      (counts.T >= counts.F ? "T" : "F") +
      (counts.J >= counts.P ? "J" : "P");

    // 🔥 SAVE MBTI TO USER PROFILE
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { mbtiType },
      { new: true }
    );

    res.status(200).json({ message: "MBTI calculated", mbtiType, counts });
  } catch (error) {
    console.error("❌ MBTI SUBMIT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
