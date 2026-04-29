// ============================================================
// Comment.js - Comment Mongoose Model
// ============================================================
// Defines the schema for reader comments on blog posts.
// Each comment references the blog it belongs to (via ObjectId),
// stores the commenter's name and message content, and has an
// approval status. Only approved comments are shown publicly.
// Unapproved comments are held for admin review.
// ============================================================

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",        // Reference to the Blog model for population
      required: true,
    },
    name: { type: String, required: true },    // Display name of the commenter
    content: { type: String, required: true }, // The comment text
    isApproved: { type: Boolean, default: false }, // Admin must approve before it goes public
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
