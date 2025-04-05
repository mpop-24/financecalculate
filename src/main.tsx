import React from "react";
import ReactDOM from "react-dom/client";
import RetirementCalculator from "./components/retirecalc.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RetirementCalculator />
  </React.StrictMode>,
);
