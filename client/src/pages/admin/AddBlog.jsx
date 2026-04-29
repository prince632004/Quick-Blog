// ============================================================
// AddBlog.jsx - Admin Add New Blog Post Page
// ============================================================
// Provides the full interface for creating and publishing a new blog post.
// Features:
//   - Thumbnail image upload with live preview
//   - Blog title and subtitle inputs
//   - Rich-text editor powered by Quill.js (Snow theme)
//   - "Generate with AI" button: calls POST /api/blog/generate with the
//     title as a prompt and inserts Gemini AI-generated content into the editor
//   - Category selector and Publish Now checkbox
//   - Form submission uploads image + blog data to POST /api/blog/add
//
// The Quill editor is initialized once on mount using useRef to avoid
// re-initialization on every re-render.
// ============================================================

import React, { useEffect, useState, useRef } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked"; // Converts Gemini's Markdown output to HTML for Quill

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);  // Controls submit button loading state
  const [loading, setLoading] = useState(false);    // Controls AI generation loading overlay

  const editorRef = useRef(null); // Ref to the DOM element where Quill will mount
  const quillRef = useRef(null);  // Ref to store the Quill instance itself

  // Form field state
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  // Request AI-generated blog content based on the current title
  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title");

    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title, // Send the blog title as the prompt to Gemini
      });
      if (data.success) {
        // Gemini returns Markdown - parse it to HTML and inject into Quill editor
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Always stop loading spinner, even on error
    }
  };

  // Handle blog form submission with image upload
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      // Collect all blog data including rich-text HTML from Quill editor
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML, // Get HTML content from Quill
        category,
        isPublished,
      };

      // Use FormData to send both JSON blog data and the image file together
      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog)); // Serialize blog data as a JSON string
      formData.append("image", image);               // Attach the image file

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        // Reset form fields after successful submission
        setImage(false);
        setTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("startup");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false); // Always re-enable the submit button
    }
  };

  // Initialize the Quill rich-text editor once when the component mounts
  useEffect(() => {
    // Guard: only initialize if not already created and the DOM ref is available
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        {/* Thumbnail Upload Section */}
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          {/* Show upload placeholder or live image preview */}
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          {/* Hidden file input triggered by clicking the image */}
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        {/* Blog Title Input */}
        <p className="mt-4">Blog title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* Blog Subtitle Input */}
        <p className="mt-4">Sub title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        {/* Rich Text Editor Section */}
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          {/* Quill editor mounts here via the editorRef */}
          <div ref={editorRef}></div>

          {/* Loading overlay while AI is generating content */}
          {loading && (
            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
              <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
            </div>
          )}

          {/* AI Content Generation Button */}
          <button
            disabled={loading}
            type="button" // Prevents this button from submitting the form
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        {/* Category Dropdown */}
        <p className="mt-4">Blog category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded "
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        {/* Publish Now Toggle */}
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        {/* Submit Button - shows "Adding..." while request is in progress */}
        <button
          disabled={isAdding}
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
          type="submit"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
