import React from "react";
import ReactDOM from "react-dom/client";
import NewsPage from "../components/news";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NewsPage />
  </React.StrictMode>,
);
