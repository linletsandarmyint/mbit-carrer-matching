const JobPost = require("../models/JobPost");
const User = require("../models/User");

// ================= HELPER: MBTI MATCH SCORE =================
// Calculates best match score (0–4) between user MBTI and job MBTIs
const calculateMBTIMatchScore = (userMBTI, jobMBTIs = []) => {
  let bestScore = 0;

  jobMBTIs.forEach((jobMBTI) => {
    let score = 0;

    for (let i = 0; i < 4; i++) {
      if (userMBTI[i] === jobMBTI[i]) {
        score++;
      }
    }

    if (score > bestScore) bestScore = score;
  });

  return bestScore;
};

// ================= GET ALL JOBS =================
exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET MATCHED JOBS =================
exports.getMatchedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // 1️⃣ Validate user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Ensure MBTI exists
    if (!user.mbtiType) {
      return res.status(400).json({ message: "Complete MBTI test first" });
    }

    // 3️⃣ Fetch jobs
    const jobs = await JobPost.find();

    // 4️⃣ Calculate match score and label
    const matchedJobs = jobs
      .map((job) => {
        const score = calculateMBTIMatchScore(user.mbtiType, job.preferredMBTI);

        let matchLabel = "Weak Match";
        if (score === 4) matchLabel = "Strong Match";
        else if (score === 3) matchLabel = "Good Match";
        else if (score === 2) matchLabel = "Medium Match";

        return {
          id: job._id,
          title: job.title,
          company: job.company,
          description: job.description,
          skills: job.skills,
          location: job.location,
          jobType: job.jobType,
          preferredMBTI: job.preferredMBTI,
          matchScore: score,
          match: matchLabel,
        };
      })
      // 5️⃣ Sort best matches first
      .sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json(matchedJobs);
  } catch (error) {
    console.error("❌ GET MATCHED JOBS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
// ================= CREATE JOB (COMPANY) =================
exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Only companies can post jobs" });
    }

    const {
      title,
      company,
      description,
      skills,
      location,
      jobType,
      preferredMBTI,
    } = req.body;

    if (!title || !company) {
      return res
        .status(400)
        .json({ message: "Title and company are required" });
    }

    const job = await JobPost.create({
      title,
      company,
      description,
      skills,
      location,
      jobType,
      preferredMBTI,
      createdBy: req.user._id,
      status: "pending",
    });

    res.status(201).json({
      message: "Job created successfully. Waiting for admin approval.",
      job,
    });
  } catch (error) {
    console.error("❌ CREATE JOB ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
