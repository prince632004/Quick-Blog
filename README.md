# Quick Blog 🚀

A modern, fast, and feature-rich blog application built with the MERN stack (MongoDB, Express, React, Node.js).
It features rich text editing, image uploads, seamless animations, and AI-powered capabilities.

## 🌟 Features

- **Full-stack MERN Application:** Built using MongoDB, Express.js, React (Vite), and Node.js.
- **Rich Text Editor:** Integrated with Quill for a seamless writing experience.
- **Image Management:** Image uploads handled via ImageKit and Multer.
- **Modern UI/UX:** Styled using Tailwind CSS v4 and animated with Framer Motion.
- **AI Integration:** Powered by Google GenAI for intelligent features.
- **Authentication:** Secure user authentication using JSON Web Tokens (JWT).
- **Responsive Design:** Fully responsive interface for mobile and desktop.

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM v7
- **Animations:** Framer Motion
- **Editor:** Quill
- **Markdown Parsing:** Marked
- **Notifications:** React Hot Toast
- **HTTP Client:** Axios

### Backend

- **Framework:** Express.js 5
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Image Upload:** ImageKit & Multer
- **AI Provider:** Google GenAI
- **Environment Management:** Dotenv

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or higher recommended)
- MongoDB account (or local instance)
- ImageKit account (for image uploads)
- Google GenAI API key (for AI features)

## 🚀 Installation & Setup

1. **Clone the repository** (if applicable) or download the source code.
2. **Navigate to the project directory:**
   ```bash
   cd "Quick Blog"
   ```

### Backend Setup

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory based on your requirements (see Environment Variables section).
4. Start the development server:
   ```bash
   npm run server
   ```

### Frontend Setup

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory.
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

You need to add `.env` files in both the `client` and `server` folders.

### Server (`server/.env`)

Create a `.env` file in the `server` directory and add the following variables:

```env
PORT=...
MONGODB_URI=...
JWT_SECRET=...
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_URL_ENDPOINT=...
GOOGLE_GENAI_API_KEY=...
```

### Client (`client/.env`)

Create a `.env` file in the `client` directory and add the following variables:

```env
VITE_API_URL=http://localhost:<PORT>
# Add any other required VITE_ variables
```

## 📁 Project Structure

```
Quick Blog/
├── client/          # Frontend React application (Vite)
│   ├── public/      # Public assets
│   ├── src/         # React components, contexts, and pages
│   ├── .env         # Frontend environment variables
│   └── package.json
└── server/          # Backend Node.js/Express application
    ├── configs/     # Configuration files (DB, ImageKit, etc.)
    ├── controllers/ # Route controllers
    ├── middlewares/ # Custom Express middlewares (Auth, Upload)
    ├── models/      # Mongoose database schemas
    ├── routes/      # Express API routes
    ├── .env         # Backend environment variables
    ├── server.js    # Entry point
    └── package.json
```

## 📜 License

This project is licensed under the ISC License.
