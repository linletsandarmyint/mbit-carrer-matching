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
    const user = req.user; // ✅ get user from auth middleware

    let { answers } = req.body; // answers can be array of strings or objects

    // ⏰ 1 hour in milliseconds
    const ONE_HOUR = 60 * 60 * 1000;

    // 1️⃣ Prevent retake within 1 hour
    if (user.mbtiLastTestAt) {
      const now = Date.now();
      const lastTest = new Date(user.mbtiLastTestAt).getTime();

      if (now - lastTest < ONE_HOUR) {
        const remainingMinutes = Math.ceil(
          (ONE_HOUR - (now - lastTest)) / 60000
        );

        return res.status(400).json({
          message: `You can retake the MBTI test after ${remainingMinutes} minutes`,
        });
      }
    }

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

    // 🔥 Save MBTI and last test time
    user.mbtiType = mbtiType;
    user.mbtiLastTestAt = new Date();
    await user.save();

    res.status(200).json({ message: "MBTI calculated", mbtiType, counts });
  } catch (error) {
    console.error("❌ MBTI SUBMIT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
