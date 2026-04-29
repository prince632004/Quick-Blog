// ============================================================
// Signup.jsx - Admin Registration Component
// ============================================================
// Renders the admin signup form and handles new account creation.
// On successful signup, the backend returns a JWT token, so the
// admin is immediately logged in and redirected to the dashboard.
// This replaces the old insecure system of hardcoded .env credentials.
// ============================================================

import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission to create a new admin account
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/signup", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token); // Store token in global context
        localStorage.setItem("token", data.token); // Persist token across page reloads
        // Set the Authorization header for all subsequent Axios requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        toast.success(data.message);
        navigate("/admin"); // Redirect to admin dashboard on success
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Use the API's error message if available, otherwise fallback to network error
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Signup
            </h1>
            <p className="font-light">Create an account to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 w-full sm:max-w-md text-gray-600">
            {/* Email input field */}
            <div className="flex flex-col">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="your email id"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            {/* Password input field */}
            <div className="flex flex-col">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="your password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
            >
              Sign Up
            </button>

            {/* Link back to Login for admins who already have an account */}
            <p className="mt-4 text-center text-sm">
              Already have an account? <Link to="/admin" className="text-primary hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
