const MBTIQuestion = require("../models/MBTIQuestion");

exports.createMBTIQuestion = async (req, res) => {
  console.log("🔥 ADMIN CONTROLLER HIT");
  console.log("REQ BODY:", req.body);

  try {
    const { question, options } = req.body;

    if (!question || !options || !Array.isArray(options)) {
      return res.status(400).json({
        message: "Question and options array required",
      });
    }

    const newQuestion = await MBTIQuestion.create({
      question,
      options,
    });

    console.log("✅ QUESTION CREATED:", newQuestion._id);

    return res.status(201).json({
      message: "MBTI question created successfully",
      data: newQuestion,
    });
  } catch (error) {
    console.error("❌ ADMIN ERROR:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
