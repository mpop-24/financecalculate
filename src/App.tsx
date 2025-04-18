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
  );
}

export default App;