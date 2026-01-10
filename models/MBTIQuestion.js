const mongoose = require("mongoose");

const mbtiQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      value: { type: String, required: true }, // E/I, S/N, T/F, J/P
    },
  ],
});

module.exports = mongoose.model("MBTIQuestion", mbtiQuestionSchema);
