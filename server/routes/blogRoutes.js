// ============================================================
// blogRoutes.js - Blog & Comment API Routes
// ============================================================
// Defines all routes under the /api/blog prefix.
// Public routes can be accessed by any visitor without a token.
// Protected routes require a valid Bearer JWT token (auth middleware).
// Uses semantic RESTful HTTP methods:
//   POST   -> Create data (add blog, add comment, generate AI content)
//   GET    -> Read data (all blogs, single blog, comments)
//   DELETE -> Remove data (delete blog)
//   PUT    -> Update data (toggle publish status)
// ============================================================

import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllblogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blogControllers.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";

const blogRouter = express.Router();

// --- Protected Routes (admin only) ---
// upload.single("image") processes the image file from the multipart form
blogRouter.post("/add", upload.single("image"), auth, addBlog);

// --- Public Routes (accessible by all visitors) ---
blogRouter.get("/all", getAllblogs);           // Get all published blogs for the homepage
blogRouter.post("/add-comment", addComment);   // Submit a new reader comment (pending approval)

// IMPORTANT: specific routes like /all and /add-comment must be defined
// BEFORE the dynamic /:blogId route to avoid routing conflicts.
blogRouter.get("/:blogId", getBlogById);                     // Get a single blog post by ID
blogRouter.get("/:blogId/comments", getBlogComments);        // Get approved comments for a blog

// --- Protected Dynamic Routes (admin only) ---
blogRouter.delete("/:id", auth, deleteBlogById);             // Delete a blog post and its comments
blogRouter.put("/:id/toggle-publish", auth, togglePublish);  // Toggle draft/published status

// AI Content Generation (admin only - requires auth)
blogRouter.post("/generate", auth, generateContent);

export default blogRouter;
