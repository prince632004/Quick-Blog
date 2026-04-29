// ============================================================
// main.jsx - React Application Entry Point
// ============================================================
// This is the root of the React application. It wraps the
// entire app in BrowserRouter (for client-side routing) and
// AppProvider (for global state management via React Context).
// The app mounts to the <div id="root"> element in index.html.
// ============================================================

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../context/AppContext.jsx";

// Wrap App with BrowserRouter for routing and AppProvider for global state
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>,
);
