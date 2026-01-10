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
    const { answers } = req.body; // [{ questionId, value }, ...]

    // Simple counting logic
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    answers.forEach((ans) => {
      counts[ans.value] = (counts[ans.value] || 0) + 1;
    });

    // Build MBTI type
    const mbtiType =
      (counts.E >= counts.I ? "E" : "I") +
      (counts.S >= counts.N ? "S" : "N") +
      (counts.T >= counts.F ? "T" : "F") +
      (counts.J >= counts.P ? "J" : "P");

    // Save MBTI type in user profile
    const user = await User.findById(req.user._id);
    user.mbtiType = mbtiType;
    await user.save();

    res.status(200).json({ message: "MBTI calculated", mbtiType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
