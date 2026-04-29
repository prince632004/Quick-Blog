// ============================================================
// db.js - Database Configuration
// ============================================================
// This file establishes the connection to the MongoDB database
// using Mongoose. The connection URI is read from the .env file
// to keep credentials safe and out of the source code.
// The database name is appended as "/quickblog" to the URI.
// ============================================================

import mongoose from "mongoose";

// Async function to connect to MongoDB
const connectDb = async () => {
  try {
    // Listen for a successful connection event and log a confirmation message
    mongoose.connection.on("connected", () => console.log("Database connected"));

    // Connect to MongoDB using the URI stored in the environment variable
    await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`);
  } catch (error) {
    // Log any connection errors to the console
    console.log(error.message);
  }
};

export default connectDb;
