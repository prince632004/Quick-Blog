// ============================================================
// BlogCard.jsx - Individual Blog Preview Card Component
// ============================================================
// Renders a single blog post as a clickable card for the homepage grid.
// Displays the blog's thumbnail image, category badge, title, and
// a short text excerpt (first 80 characters of the description).
// Clicking anywhere on the card navigates to the full blog post page.
// Uses dangerouslySetInnerHTML to render the HTML excerpt safely.
// ============================================================

import React from "react";
import { useNavigate } from "react-router-dom";

// Props:
//   blog - The blog document object from MongoDB containing all blog fields
const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)} // Navigate to blog detail page on click
      className="w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer"
    >
      {/* Blog thumbnail image - aspect-video maintains a 16:9 ratio */}
      <img src={image} alt="" className="aspect-video" />

      {/* Category badge */}
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs">
        {category}
      </span>

      <div className="p-5">
        {/* Blog title */}
        <h5 className="mb-2 font-medium text-gray-900">{title}</h5>

        {/* Short HTML excerpt - first 80 chars of the rich-text description */}
        <p
          className="mb-3 text-xs text-gray-600 "
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
