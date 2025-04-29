import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout"; // Adjust the import path
import RetirementCalculator from "./components/retirecalc";
import HowMuchDoINeed from "./components/needcalc";
import LoanCalculator from "./components/loancalc";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RetirementCalculator />} />
          <Route path="need" element={<HowMuchDoINeed />} />
          <Route path="loan" element={<LoanCalculator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
