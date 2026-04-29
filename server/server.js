// ============================================================
// server.js - Express Application Entry Point
// ============================================================
// This is the main entry point for the Quick Blog backend server.
// It sets up Express, connects to MongoDB, registers middleware,
// and mounts all API routes before starting the HTTP server.
// ============================================================

import express from "express";
import "dotenv/config"; // Load environment variables from the .env file first
import cors from "cors";
import connectDb from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// Connect to MongoDB before setting up routes
await connectDb();

// --- Middleware ---
app.use(cors());          // Allow cross-origin requests from the frontend
app.use(express.json()); // Parse incoming JSON request bodies

// --- Routes ---
app.get("/", (req, res) => res.send("API is working")); // Health check endpoint
app.use("/api/admin", adminRouter); // All admin-related routes (login, signup, dashboard)
app.use("/api/blog", blogRouter);   // All blog-related routes (CRUD, comments, AI generation)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on port" + PORT);
});

// Export app for Vercel serverless deployment compatibility
export default app;
