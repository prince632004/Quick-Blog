// ============================================================
// gemini.js - Google Gemini AI Configuration
// ============================================================
// This file sets up and exports the Google Gemini AI client.
// It is used by the blog controller to generate blog content
// based on a given title/prompt submitted by the admin.
// The API key is securely read from the environment variable
// GEMINI_API_KEY - never hardcoded in source code.
// ============================================================

import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini AI client using the API key from .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Main function that sends a prompt to Gemini and returns generated text
// @param {string} prompt - The text prompt to send to the AI model
// @returns {string} - The AI-generated text response
async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview", // Using the fast Gemini flash preview model
    contents: prompt,
  });
  return response.text;
}

export default main;
