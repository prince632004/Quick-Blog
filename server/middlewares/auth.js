// ============================================================
// auth.js - JWT Authentication Middleware
// ============================================================
// This middleware protects private API routes from unauthorized access.
// It reads the Authorization header, extracts the Bearer token,
// and verifies it against the JWT_SECRET environment variable.
// If valid, the request proceeds. If invalid or missing, a 401
// Unauthorized response is returned immediately.
// ============================================================

import jwt from "jsonwebtoken";

// Middleware to verify JWT tokens and protect private routes
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Ensure the Authorization header follows the standard 'Bearer <token>' format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  // Extract the token string after 'Bearer '
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token signature using the JWT_SECRET from .env
    jwt.verify(token, process.env.JWT_SECRET);
    next(); // Token is valid, proceed to the next handler
  } catch (error) {
    // Return 401 Unauthorized if the token is malformed or expired
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default auth;
