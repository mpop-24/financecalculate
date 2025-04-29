<<<<<<< HEAD
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
=======
// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { RetirementCalculator } from "./components/retirecalc";
import { NeedCalculator } from "./components/needcalc";
import { LoanCalculator } from "./components/loancalc";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <div className="max-w-md mx-auto">
              <Routes>
                <Route path="/" element={<RetirementCalculator />} />
                <Route path="/need" element={<NeedCalculator />} />
                <Route path="/loan" element={<LoanCalculator />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
>>>>>>> 0ef7d4409405913ba1364091d7344c4c961bc397
  );
}

export default App;