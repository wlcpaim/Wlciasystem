import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { RoiChart } from "./components/RoiChart";
import { Features } from "./components/Features";
import { Pricing } from "./components/Pricing";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans relative selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-cyan-500/10 blur-[160px] rounded-full" />
        <div className="absolute top-[75%] -left-40 w-[600px] h-[600px] bg-emerald-500/10 blur-[160px] rounded-full" />
        <div className="absolute inset-0 tech-grid opacity-40" />
      </div>

      <Navbar />

      <main className="flex-1 flex flex-col">
        <Hero />
        <RoiChart />
        <Features />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}