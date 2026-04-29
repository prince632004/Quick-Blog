// ============================================================
// BlogTableItem.jsx - Admin Blog Table Row Component
// ============================================================
// Renders a single row in the admin blog management table.
// Each row displays the blog's serial number, title, creation date,
// publish status, and action buttons (Publish/Unpublish, Delete).
//
// Uses proper RESTful API calls:
//   - DELETE /api/blog/:id   -> to permanently delete a blog post
//   - PUT /api/blog/:id/toggle-publish -> to flip the publish status
//
// After each action, it calls fetchBlogs() to refresh the parent
// component's data and keep the UI in sync with the database.
// ============================================================

import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

// Props:
//   blog      - The blog document object from MongoDB
//   fetchBlogs - Callback function to refresh the blog list after an action
//   index     - Row number for display in the table
const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt); // Convert ISO string to a JS Date object

  const { axios } = useAppContext();

  // Handler to permanently delete the blog post and its associated comments
  const deleteBlog = async () => {
    // Ask for confirmation before performing a destructive action
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?",
    );
    if (!confirm) return;
    try {
      // Uses DELETE HTTP method with the blog ID as a URL parameter (RESTful)
      const { data } = await axios.delete(`/api/blog/${blog._id}`);
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs(); // Refresh the list to reflect the deletion
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Handler to toggle the blog's published/draft status
  const togglePublish = async () => {
    try {
      // Uses PUT HTTP method with the blog ID as a URL parameter (RESTful)
      const { data } = await axios.put(`/api/blog/${blog._id}/toggle-publish`);
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs(); // Refresh the list to show the updated status
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      {/* Serial number column */}
      <th className="px-2 py-4">{index}</th>

      {/* Blog title column */}
      <td className="px-2 py-4">{title}</td>

      {/* Date column (hidden on small screens) */}
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>

      {/* Publish status column with color coding (hidden on small screens) */}
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}
        >
          {blog.isPublished ? "Published" : "Unplished"}
        </p>
      </td>

      {/* Actions column: Publish toggle button and Delete icon */}
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer "
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          src={assets.cross_icon}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          alt="Delete blog"
          onClick={deleteBlog}
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
