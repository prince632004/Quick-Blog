// ============================================================
// User.js - Admin User Mongoose Model
// ============================================================
// Defines the schema for admin user accounts stored in MongoDB.
// Passwords are NEVER stored in plain text - they are hashed
// using bcrypt before being saved (handled in adminControllers.js).
// The email field is marked unique to prevent duplicate accounts.
// This model replaced the insecure hardcoded .env credentials.
// ============================================================

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, // Unique email used as login identifier
    password: { type: String, required: true },            // Bcrypt-hashed password (never plain text)
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

export default User;
