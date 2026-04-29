// ============================================================
// adminControllers.js - Admin Authentication & Management Controllers
// ============================================================
// Contains all controller functions for admin-level operations:
// - adminSignup: Creates a new admin account with a hashed password
// - adminLogin: Authenticates an admin using database + bcrypt comparison
// - getAllBlogsAdmin: Fetches all blogs (including drafts) for the admin panel
// - getAllComments: Fetches all reader comments with their associated blog data
// - getDashboard: Returns aggregated stats and recent blogs for the dashboard
// - deleteCommentById: Removes a comment by its ID from URL params
// - approveCommentById: Marks a comment as approved so it appears publicly
// ============================================================

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

// Controller to handle new Admin registration
export const adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Check if the user already exists in the database to prevent duplicates
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password with bcrypt (salt rounds = 10) before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Generate a JWT so the admin is immediately logged in after signup
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.status(201).json({ success: true, token, message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to handle Admin login with database-backed authentication
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Look up the user in the database by their email
    const user = await User.findOne({ email });
    if (!user) {
      // Return the same generic message for security (don't reveal if email exists)
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

    // Compare the provided plain-text password against the stored bcrypt hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

    // Sign and return a JWT token for use in subsequent authenticated requests
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all blogs (including unpublished drafts) - only accessible by admin
export const getAllBlogsAdmin = async (req, res) => {
  try {
    // Sort by newest first for better UX in the admin blog list
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Fetch all comments with their associated blog data populated
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog") // Replace blog ObjectId with actual blog document
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Fetch summary statistics and the 5 most recent blogs for the admin dashboard
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();            // Total blog count
    const comments = await Comment.countDocuments();      // Total comment count
    const drafts = await Blog.countDocuments({ isPublished: false }); // Unpublished count

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete a specific comment by ID passed as a URL parameter
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params; // ID comes from the URL: DELETE /api/admin/delete-comment/:id
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Approve a specific comment, making it visible on the public blog page
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.params; // ID comes from the URL: PUT /api/admin/approve-comment/:id
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
