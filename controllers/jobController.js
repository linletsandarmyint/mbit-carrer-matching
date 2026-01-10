const JobPost = require("../models/JobPost");
const User = require("../models/User");

// Fetch jobs matched with user MBTI
exports.getMatchedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const matchedJobs = await JobPost.find({ preferredMBTI: user.mbtiType });
    res.status(200).json({ matchedJobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
