const express = require("express");
const {
  getJobs,
  getMatchedJobs,
  createJob,
  getMyJobs,
  approveJob,
    rejectJob,
} = require("../controllers/jobController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// ================= COMPANY ROUTES =================
// Company creates a job
router.post("/", protect, authorize("company"), createJob);

// Company views their own jobs (pending, approved, rejected)
router.get("/my", protect, authorize("company"), getMyJobs);

// ================= JOBSEEKER ROUTES =================
// Jobseeker views all approved jobs
router.get("/", protect, authorize("jobseeker"), getJobs);

// Jobseeker views MBTI matched approved jobs
router.get("/matched", protect, authorize("jobseeker"), getMatchedJobs);

// ================= ADMIN ROUTES =================
// Admin approves a job
router.put("/:id/approve", protect, authorize("admin"), approveJob);

// Admin rejects a job
router.put("/:id/reject", protect, authorize("admin"), rejectJob);

module.exports = router;
