// ============================================================
// Layout.jsx - Admin Panel Outer Layout Wrapper
// ============================================================
// Provides the persistent shell (header bar + sidebar) for all
// admin pages. Uses React Router's <Outlet /> to render the
// currently active nested admin route (Dashboard, AddBlog, etc.)
// inside the layout without re-rendering the header and sidebar.
//
// Also handles the admin logout flow:
//   1. Removes the token from localStorage
//   2. Clears the Axios Authorization header
//   3. Resets the token in global context to null
//   4. Redirects to the homepage
// ============================================================

import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../../context/AppContext";
import axios from "axios";

const Layout = () => {
  const { setToken, navigate } = useAppContext();

  // Handle admin logout: clear all auth state and redirect to homepage
  const logout = () => {
    localStorage.removeItem("token");                             // Remove persisted token
    axios.defaults.headers.common["Authorization"] = null;       // Clear auth header
    setToken(null);                                               // Reset global context token
    navigate("/");                                                // Redirect to homepage
  };

  return (
    <>
      {/* Fixed top header bar with logo and logout button */}
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
        {/* Logo - clicking navigates to the homepage */}
        <img
          src={assets.logo}
          alt=""
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />
        {/* Logout button */}
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Main content area: Sidebar on the left, active page on the right */}
      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet /> {/* Renders the matched nested route: Dashboard, AddBlog, etc. */}
      </div>
    </>
  );
};

export default Layout;
