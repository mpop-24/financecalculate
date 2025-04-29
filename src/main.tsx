import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // This should be your main App component with the router config
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
