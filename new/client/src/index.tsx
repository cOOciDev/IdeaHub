import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/main.scss";
import "./i18n";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("❌ Root element not found in index.html");
}
