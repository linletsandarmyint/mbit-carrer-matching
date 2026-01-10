const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: String,
  skills: [String],
  preferredMBTI: [String], // Array of MBTI types
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobPost", jobPostSchema);
