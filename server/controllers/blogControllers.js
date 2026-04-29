// ============================================================
// blogControllers.js - Blog & Comment API Controllers
// ============================================================
// Contains all controller functions for public and admin blog operations:
// - addBlog: Uploads image to ImageKit CDN and creates a new blog post
// - getAllblogs: Returns all published blogs for the public homepage
// - getBlogById: Returns a single blog post by its ID
// - deleteBlogById: Deletes a blog and all its associated comments (cascade delete)
// - togglePublish: Toggles a blog's published/draft status
// - addComment: Allows readers to submit a comment (held for approval)
// - getBlogComments: Returns all approved comments for a specific blog
// - generateContent: Uses Google Gemini AI to generate blog content from a title
// ============================================================

import fs from "fs";
import imageKit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";

// Create a new blog post with an uploaded thumbnail image
export const addBlog = async (req, res) => {
  try {
    // Parse blog data from the multipart form's JSON string field
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );
    const imageFile = req.file; // Image file provided by Multer middleware

    // Validate all required fields before processing
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Read the file from disk storage (saved by Multer) as a Buffer
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload the image buffer to ImageKit CDN
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs", // Organizes uploads in an ImageKit folder
    });

    // Generate an optimized image URL using ImageKit URL transformations
    const optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // Auto-compress to reduce file size
        { format: "webp" },  // Convert to WebP for modern browsers
        { width: "1280" },   // Resize to a standard display width
      ],
    });

    const image = optimizedImageUrl;
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Fetch all published blogs for display on the public homepage
export const getAllblogs = async (req, res) => {
  try {
    // Only return blogs with isPublished = true (drafts are hidden from public)
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Fetch a single blog post by its MongoDB ObjectId (used on the Blog detail page)
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete a blog post and all its associated comments (cascading delete)
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params; // ID comes from URL: DELETE /api/blog/:id
    await Blog.findByIdAndDelete(id);

    // Also delete all reader comments linked to this blog to prevent orphaned data
    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle a blog's publish status between Published and Draft
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.params; // ID comes from URL: PUT /api/blog/:id/toggle-publish
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished; // Flip the boolean value
    await blog.save();
    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Allow a reader to submit a new comment (goes into a pending/unapproved state)
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    // Comments default to isApproved: false (see Comment model) until admin reviews
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Fetch all approved reader comments for a specific blog post
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params; // ID comes from URL: GET /api/blog/:blogId/comments
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true, // Only return comments that have been approved by admin
    }).sort({ createdAt: -1 }); // Show newest comments first
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Use Google Gemini AI to generate blog content from a topic title
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body; // The blog title/topic submitted by the admin
    // Append instructions so Gemini returns plain text suitable for the blog editor
    const content = await main(
      prompt + "Generate a blog content for this topic in simple text format",
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
