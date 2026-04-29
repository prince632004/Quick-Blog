// ============================================================
// BlogList.jsx - Public Blog Grid with Category Filter
// ============================================================
// Renders the grid of published blog cards on the homepage.
// Supports two types of filtering that work together:
//   1. Search filter: Matches the global 'input' query against
//      blog titles and categories (set by the Header search bar)
//   2. Category filter: Filters by selected category tab using
//      animated Motion.dev underline indicator for the active tab.
//
// Blogs are fetched once globally in AppContext and passed down
// here via context, avoiding redundant API calls.
// ============================================================

import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"; // Used for the animated active category underline
import BlogCard from "./BlogCard";
import { useAppContext } from "../../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All"); // Currently selected category tab
  const { blogs, input } = useAppContext(); // Get all blogs and search query from global state

  // Filter blogs by the search query from the Header component
  // Returns all blogs if no search is active
  const filterBlogs = () => {
    if (input === "") {
      return blogs;
    }
    // Case-insensitive matching on both title and category fields
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase()),
    );
  };

  return (
    <div>
      {/* Category filter tabs with animated active indicator */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${menu === item && "text-white px-4 pt-0.5"}`}
            >
              {item}
              {/* Animated pill background slides to the active category */}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{
                    type: "spring",
                    stiffness: "500",
                    damping: "30",
                  }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full "
                >
                </motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog cards grid - applies both search and category filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40 ">
        {filterBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu)) // Category filter
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
