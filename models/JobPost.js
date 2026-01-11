const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String },
    skills: [{ type: String }],
    location: { type: String }, // optional
    jobType: { type: String }, // Full-time, Part-time, Remote
    preferredMBTI: [{ type: String }], // ["INTJ", "INFJ", etc.]
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPost", jobPostSchema);
