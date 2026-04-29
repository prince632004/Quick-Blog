// ============================================================
// App.jsx - Root Application Component & Route Definitions
// ============================================================
// This is the main routing hub for the React application.
// It defines all application routes and handles route-level
// authentication by checking if a JWT token exists in context.
//
// Route structure:
//   /               -> Public homepage (blogs, search, newsletter)
//   /blog/:id       -> Public single blog post detail page
//   /admin/signup   -> Admin registration page (always public)
//   /admin          -> Admin panel: shows Login if no token, Layout if authenticated
//     /admin/       (index)  -> Dashboard
//     /admin/addBlog         -> Add new blog post
//     /admin/listBlog        -> View and manage all blogs
//     /admin/comments        -> View and moderate reader comments
// ============================================================

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import Login from "./components/admin/Login";
import Signup from "./components/admin/Signup";
import "quill/dist/quill.snow.css"; // Import Quill's default Snow theme stylesheet
import { Toaster } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const App = () => {
  const { token } = useAppContext(); // Get token from global context for route protection

  return (
    <div>
      {/* Global toast notification container for success/error messages */}
      <Toaster />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

        {/* Signup page is always accessible so new admins can register */}
        <Route path="/admin/signup" element={<Signup />} />

        {/* Admin panel: shows Login form if not authenticated, admin Layout if authenticated */}
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          {/* Nested admin routes rendered inside the Layout's <Outlet /> */}
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
