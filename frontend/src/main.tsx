import React from "react";
import ReactDOM from "react-dom/client";
import { App, routes } from "./App";
import "./styles.css";

// Vite development only. Production pages are rendered to HTML at build time.
const filename = window.location.pathname.split("/").filter(Boolean).pop() ?? "index";
const pathname = filename === "index.html" || filename === "index" ? "/" : `/${filename.replace(/\.html$/, "")}`;
const route = routes[pathname];
document.title = route?.title ?? "Page not found | Titan Gym";
document.querySelector('meta[name="description"]')?.setAttribute("content", route?.description ?? "Titan Gym in Alamo Ranch, San Antonio.");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App pathname={pathname} /></React.StrictMode>,
);
