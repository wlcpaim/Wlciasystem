import React, { useState } from "react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#030712]/75 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-40 group-hover:opacity-75 transition duration-300" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
              <span className="font-mono text-base font-extrabold tracking-tighter">WLC</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-white">SaaS Flow</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                Enterprise 1.1.0
              </span>
            </div>
            <span className="text-xs text-slate-400">Deterministic Software Engine</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-emerald-400 transition-colors">Visão Geral</a>
          <a href="#segmentos" className="hover:text-emerald-400 transition-colors">Soluções</a>
          <a href="#roi-simulador" className="hover:text-emerald-400 transition-colors flex items-center space-x-1.5">
            <span>Simulador ROI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </a>
          <a href="#recursos" className="hover:text-emerald-400 transition-colors">Arquitetura</a>
          <a href="#comparativo" className="hover:text-emerald-400 transition-colors">Diferencial</a>
          <a href="#planos" className="hover:text-emerald-400 transition-colors">Planos</a>
          <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Bridge Online</span>
          </div>
          <a
            href="#roi-simulador"
            className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30"
          >
            Calcular Retorno
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Abrir menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-slate-950/95 border-b border-slate-800 space-y-3 text-sm">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-emerald-400">Visão Geral</a>
          <a href="#segmentos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-emerald-400">Soluções</a>
          <a href="#roi-simulador" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-emerald-400">Simulador ROI</a>
          <a href="#recursos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-emerald-400">Arquitetura</a>
          <a href="#comparativo" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-emerald-400">Diferencial</a>
          <a href="#planos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-emerald-400">Planos</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-emerald-400">FAQ</a>
          <a href="#roi-simulador" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold">
            Calcular Retorno
          </a>
        </div>
      )}
    </header>
  );
};