import React from "react";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-lg shadow-lg shadow-emerald-500/20">
            W
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            WLC<span className="text-emerald-400">Flow</span>
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            v1.1.0 Enterprise
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#calculadora-roi" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            Calculadora ROI
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </a>
          <a href="#recursos" className="hover:text-emerald-400 transition-colors">Recursos</a>
          <a href="#precos" className="hover:text-emerald-400 transition-colors">Preços</a>
        </nav>

        <div className="flex items-center space-x-3">
          <a href="#login" className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2">
            Entrar
          </a>
          <a
            href="#calculadora-roi"
            className="inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
          >
            Calcular Retorno
          </a>
        </div>
      </div>
    </header>
  );
};