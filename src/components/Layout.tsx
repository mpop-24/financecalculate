import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import StockBanner from "./StockBanner";

export function Layout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <StockBanner />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
    </div>
  );
}
