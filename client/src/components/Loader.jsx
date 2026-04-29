// ============================================================
// Loader.jsx - Global Loading Spinner Component
// ============================================================
// A full-screen centered loading spinner displayed while async
// data (such as a blog post) is being fetched from the backend.
// Used in Blog.jsx to show while the blog data is being loaded.
// ============================================================

import React from "react";

const Loader = () => {
  return (
    // Full screen container with centered spinner
    <div className="flex justify-center items-center h-screen ">
      {/* Spinning circle animation using Tailwind CSS */}
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-white border-gray-700"></div>
    </div>
  );
};

export default Loader;
