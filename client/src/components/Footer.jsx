// ============================================================
// Footer.jsx - Site Footer Component
// ============================================================
// Renders the bottom footer section displayed on all pages.
// Contains the site logo, a brief description, and dynamically
// rendered navigation link groups sourced from the 'footer_data'
// array in assets.js. This makes adding new footer sections easy.
// ============================================================

import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px16 lg:px-24 xl:px-32 bg-primary/3">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* Brand section: logo and description */}
        <div>
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-[410px] mt-6 ">
            A tech-focused blog dedicated to simplifying web development,
            programming, and modern technologies. From practical tutorials to
            real-world projects, it helps learners and developers build skills
            and stay updated with the latest trends.
          </p>
        </div>

        {/* Dynamic footer link sections generated from assets.js data */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.titlle}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright notice */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500">
        Copyright 2025 © QuickBlog - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
