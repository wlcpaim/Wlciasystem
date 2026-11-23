import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { RoiChart } from "./components/RoiChart";
import { Features } from "./components/Features";
import { Pricing } from "./components/Pricing";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <RoiChart />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}