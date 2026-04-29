// ============================================================
// Home.jsx - Public Homepage
// ============================================================
// The main public-facing homepage of the Quick Blog application.
// Assembles the full page layout by composing all major sections:
//   1. Navbar      - Top navigation with logo and Login/Dashboard button
//   2. Header      - Hero section with the blog search bar
//   3. BlogList    - Grid of published blog cards with category filter
//   4. NewsLetter  - Email subscription section
//   5. Footer      - Site footer with links and copyright
// ============================================================

import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <BlogList />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
