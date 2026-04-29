// ============================================================
// Blog.js - Blog Mongoose Model
// ============================================================
// Defines the schema (structure) for blog documents stored in MongoDB.
// Each blog has a title, subtitle, rich-text HTML description,
// category, an image URL (from ImageKit CDN), and a publish status.
// Timestamps are enabled to automatically track createdAt and updatedAt.
// Indexes on isPublished and createdAt improve query performance
// as the number of blogs grows over time.
// ============================================================

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },       // Main headline of the blog post
    subTitle: { type: String },                    // Optional secondary headline
    description: { type: String, required: true }, // Full rich-text HTML content of the blog
    category: { type: String, required: true },    // Category for filtering (e.g., Technology, Startup)
    image: { type: String, required: true },        // Optimized CDN URL of the thumbnail image
    isPublished: { type: Boolean, required: true }, // Controls visibility on the public blog list
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Index to speed up the public blog list query which filters by isPublished
blogSchema.index({ isPublished: 1 });

// Index to speed up sorting by newest blog first
blogSchema.index({ createdAt: -1 });

const Blog = mongoose.model("blog", blogSchema);

export default Blog;
