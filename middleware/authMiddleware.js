const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  console.log("🔥 AUTH MIDDLEWARE HIT");

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("✅ TOKEN:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ DECODED:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      console.log("✅ USER:", req.user.email, req.user.role);
      next();
      return;
    } catch (error) {
      console.error("❌ TOKEN ERROR:", error.message);
      return res.status(401).json({ message: "Token failed" });
    }
  }

  console.log("❌ NO TOKEN");
  return res.status(401).json({ message: "No token provided" });
};
