// ============================================================
// CommentTableItem.jsx - Admin Comment Table Row Component
// ============================================================
// Renders a single row in the admin comments management table.
// Each row displays the associated blog title, the commenter's
// name and content, the submission date, and action buttons.
//
// Uses proper RESTful API calls:
//   - PUT    /api/admin/approve-comment/:id -> to approve a pending comment
//   - DELETE /api/admin/delete-comment/:id  -> to permanently delete a comment
//
// After each action, it calls fetchComments() to refresh the
// parent component's data and keep the UI in sync.
// ============================================================

import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

// Props:
//   comment       - The comment document object from MongoDB (with blog data populated)
//   fetchComments - Callback function to refresh the comment list after an action
const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt); // Convert ISO string to a JS Date object

  const { axios } = useAppContext();

  // Handler to approve a pending comment, making it visible on the public blog page
  const approveComment = async () => {
    try {
      // Uses PUT HTTP method with the comment ID as a URL parameter (RESTful)
      const { data } = await axios.put(`/api/admin/approve-comment/${_id}`);
      if (data.success) {
        toast.success(data.message);
        fetchComments(); // Refresh the list to reflect the new approved status
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Handler to permanently delete a comment
  const deleteComment = async () => {
    try {
      // Ask for confirmation before performing a destructive action
      const confirm = window.confirm(
        "Are you sure you want to delete this comment?",
      );
      if (!confirm) return;

      // Uses DELETE HTTP method with the comment ID as a URL parameter (RESTful)
      const { data } = await axios.delete(`/api/admin/delete-comment/${_id}`);
      if (data.success) {
        toast.success(data.message);
        fetchComments(); // Refresh the list to remove the deleted comment
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        {/* Display the associated blog title and comment details */}
        <b className="font-medium text-gray-600">Blog</b> : {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600 ">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>

      {/* Submission date column (hidden on small screens) */}
      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>

      {/* Action buttons column */}
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {/* Show Approve button if not yet approved, or a badge if already approved */}
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt="Approve comment"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          {/* Delete button - always visible */}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete comment"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
