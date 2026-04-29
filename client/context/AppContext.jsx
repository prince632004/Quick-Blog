// ============================================================
// AppContext.jsx - Global Application State & Context Provider
// ============================================================
// This file creates and provides the global React Context for the app.
// It manages shared state that needs to be accessible from any component:
//   - axios: Pre-configured Axios instance with the backend base URL
//   - token: The admin JWT authentication token
//   - blogs: The list of all published blogs fetched from the API
//   - input: The current blog search query entered in the Header
//
// On app load, it:
//   1. Fetches all public blogs from the backend
//   2. Restores the admin session from localStorage if a token exists
//   3. Sets the Authorization header for all future Axios requests
// ============================================================

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Set the base URL for all Axios requests from the VITE_BASE_URL environment variable
// This allows the same code to work locally (localhost:3000) and in production (Vercel URL)
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);    // JWT token for admin authentication
  const [blogs, setBlogs] = useState([]);      // All published blogs for the public homepage
  const [input, setInput] = useState("");      // Search query string from the Header component

  // Fetch all publicly available (published) blog posts from the backend
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Fetch blogs when the application first loads
    fetchBlogs();

    // Restore admin session from localStorage if a token was previously saved
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      // Set the Authorization header for all subsequent Axios requests
      // using the standard 'Bearer <token>' format
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // All values and functions shared globally across the application
  const value = {
    axios,    // The configured Axios instance
    navigate, // React Router's navigate function
    token,    // Current JWT token (null if not logged in)
    setToken, // Function to update the token (used by Login/Signup)
    blogs,    // Array of all published blog objects
    setBlogs, // Function to update the blogs list
    input,    // Current search query string
    setInput, // Function to update the search query
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to consume the AppContext - use this instead of useContext directly
export const useAppContext = () => {
  return useContext(AppContext);
};
