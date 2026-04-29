// ============================================================
// adminRoutes.js - Admin API Routes
// ============================================================
// Defines all routes under the /api/admin prefix.
// Public routes (signup, login) are accessible without a token.
// All other routes are protected by the auth middleware, which
// verifies the Bearer JWT token before allowing access.
// Uses semantic RESTful HTTP methods:
//   POST   -> Create/submit data (signup, login)
//   GET    -> Fetch/read data (dashboard, blogs, comments)
//   DELETE -> Remove data (delete-comment)
//   PUT    -> Update data (approve-comment)
// ============================================================

import express from "express";
import {
  adminLogin,
  adminSignup,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from "../controllers/adminControllers.js";
import auth from "../middlewares/auth.js";

const adminRouter = express.Router();

// --- Public Routes (no authentication required) ---
adminRouter.post("/signup", adminSignup); // Register a new admin account
adminRouter.post("/login", adminLogin);   // Log in and receive a JWT token

// --- Protected Routes (requires valid Bearer token in Authorization header) ---
adminRouter.get("/comments", auth, getAllComments);       // Fetch all reader comments
adminRouter.get("/blogs", auth, getAllBlogsAdmin);         // Fetch all blogs (including drafts)
adminRouter.delete("/delete-comment/:id", auth, deleteCommentById); // Delete a specific comment
adminRouter.put("/approve-comment/:id", auth, approveCommentById);  // Approve a specific comment
adminRouter.get("/dashboard", auth, getDashboard);        // Fetch dashboard statistics

export default adminRouter;
