// ============================================================
// Header.jsx - Homepage Hero & Search Component
// ============================================================
// Renders the hero section at the top of the homepage.
// Contains a search bar that updates the global 'input' state
// in AppContext, which in turn filters the blog list in BlogList.jsx.
// A "Clear search" button appears dynamically when a search is active.
// ============================================================

import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { input, setInput } = useAppContext(); // Access and update the global search query
  const inputRef = useRef(); // Ref to directly access the input DOM element for clearing

  // Handle the search form submission - updates the global search state
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value); // Push the typed value into global context
  };

  // Clear the search query and reset the input field
  const onClear = () => {
    setInput(""); // Reset global search state (removes filter from blog list)
    inputRef.current.value = ""; // Also clear the visible input field value
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        {/* AI feature announcement badge */}
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} className="w-2.5" alt="" />
        </div>

        {/* Main headline */}
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-grey-700">
          Your own <span className="text-primary">blogging</span> <br />
          platform.
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
          This is your space to think out loud, to share what matters, and to
          write without filters, Wheather it's one word or a thousand, your
          story starts right here.
        </p>

        {/* Search form - submitting filters the blog list via global state */}
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            required
            className="w-full pl-4 outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Clear search button - only visible when a search query is active */}
      <div className="text-center">
        {input && (
          <button
            onClick={onClear}
            className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer "
          >
            Clear search
          </button>
        )}
      </div>

      {/* Decorative gradient background image */}
      <img
        src={assets.gradientBackground}
        alt="color"
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

export default Header;
