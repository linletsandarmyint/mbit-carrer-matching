const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String },
    skills: [{ type: String }],
    location: { type: String },
    jobType: { type: String },
    preferredMBTI: [{ type: String }],

    // 🔐 Workflow fields
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPost", jobPostSchema);
