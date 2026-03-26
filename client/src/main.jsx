import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const router = createBrowserRouter([]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App router={router} />
  </StrictMode>,
);
