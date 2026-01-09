// server/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  try {
    // 1️⃣ Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // 2️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Attach user to request object, exclude password
      req.user = await User.findById(decoded.id).select("-password");

      // 4️⃣ Continue to next middleware / route handler
      return next();
    }

    // 5️⃣ If no token in header
    return res.status(401).json({ message: "Not authorized, no token" });
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };
