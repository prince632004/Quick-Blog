// ============================================================
// Dashboard.jsx - Admin Dashboard Page
// ============================================================
// The main landing page for the admin panel after login.
// Displays three summary stat cards (total blogs, comments, drafts)
// and a table of the 5 most recently created blog posts.
//
// Data is fetched from GET /api/admin/dashboard on mount.
// The fetchDashboard function is also passed to BlogTableItem
// so that the dashboard can refresh after a blog is deleted or
// its publish status is changed.
// ============================================================

import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  // Initialize state with zero values to prevent undefined errors before data loads
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  // Fetch dashboard statistics and recent blogs from the backend
  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch data when the component first mounts
  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* --- Summary Stats Cards --- */}
      <div className="flex flex-wrap gap-4">
        {/* Total Blogs card */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        {/* Total Comments card */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        {/* Draft Blogs card */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* --- Latest Blogs Table --- */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        {/* Scrollable table showing the 5 most recent blog posts */}
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
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
              {/* Render each recent blog as a table row */}
              {dashboardData.recentBlogs.map((blog, index) => {
                return (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard} // Pass refresh function so delete/publish updates the table
                    index={index + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
