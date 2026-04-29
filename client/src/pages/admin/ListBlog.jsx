// ============================================================
// ListBlog.jsx - Admin Blog Management Page
// ============================================================
// Displays a full table of ALL blog posts (both published and drafts)
// for the admin to manage. Unlike the public homepage which only
// shows published blogs, this view gives the admin full visibility.
//
// Data is fetched from GET /api/admin/blogs (protected route).
// The fetchBlogs function is passed down to each BlogTableItem so
// the table refreshes automatically after a delete or publish toggle.
// ============================================================

import React, { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]); // State to hold all fetched blog posts
  const { axios } = useAppContext();

  // Fetch all blogs (including drafts) for the admin list view
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs"); // Protected endpoint - requires token
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch blogs on initial mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1>All blogs</h1>

      {/* Scrollable table of all blog posts */}
      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th className="px-2 py-4 xl:px-6 " scope="col">#</th>
              <th className="px-2 py-4 " scope="col">Blog Title</th>
              <th className="px-2 py-4 max-sm:hidden " scope="col">Date</th>
              <th className="px-2 py-4 max-sm:hidden" scope="col">Status</th>
              <th className="px-2 py-4 " scope="col"> Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Render each blog as a table row */}
            {blogs.map((blog, index) => {
              return (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs} // Pass refresh function for post-action UI updates
                  index={index + 1}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
