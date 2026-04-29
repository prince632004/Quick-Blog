// ============================================================
// Navbar.jsx - Public Navigation Bar Component
// ============================================================
// Renders the top navigation bar shown on all public-facing pages
// (Home, Blog detail page). It displays the site logo on the left
// and a button on the right that changes based on auth status:
//   - "Login"     -> when the admin is not logged in
//   - "Dashboard" -> when the admin is logged in (token exists)
// Clicking the logo navigates back to the homepage.
// ============================================================

import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext(); // Get navigate function and auth token from context

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 ">
      {/* Site logo - clicking navigates to the homepage */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
      />

      {/* Auth-aware button: shows "Dashboard" if logged in, "Login" otherwise */}
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>
    </div>
  );
};

export default Navbar;
