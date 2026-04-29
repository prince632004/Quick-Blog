// ============================================================
// Comments.jsx - Admin Comment Moderation Page
// ============================================================
// Displays all reader comments for the admin to review and moderate.
// Provides two filter tabs to switch between:
//   - "Not Approved" (default): Pending comments awaiting review
//   - "Approved": Comments that have been approved and are public
//
// Data is fetched from GET /api/admin/comments (protected route).
// The fetchComments function is passed to CommentTableItem so the
// table refreshes automatically after approve or delete actions.
// ============================================================

import React, { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);           // All comments fetched from backend
  const [filter, setFilter] = useState("Not Approved");  // Active filter tab state

  const { axios } = useAppContext();

  // Fetch all comments from the backend (admin sees all, including unapproved)
  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments"); // Protected endpoint
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch comments on initial mount
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>

        {/* Filter tabs to toggle between Approved and Not Approved comments */}
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === "Approved" ? "text-primary" : "text-gray-700"}`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === "Not Approved" ? "text-primary" : "text-gray-700"}`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Scrollable table of filtered comments */}
      <div className="rerelative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Blog Title & Comment</th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Filter by isApproved status matching the active tab, then render each row */}
            {comments
              .filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false; // Default: show unapproved comments
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments} // Pass refresh function for post-action UI updates
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
