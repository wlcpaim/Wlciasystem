import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-xs font-mono">
            WLC
          </div>
          <div>
            <span className="font-semibold text-white">WLC SaaS Flow</span>
            <span className="text-xs text-slate-500 ml-2">© {new Date().getFullYear()} Todos os direitos reservados.</span>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs text-slate-400">
          <a href="#hero" className="hover:text-emerald-400 transition-colors">Visão Geral</a>
          <a href="#roi-simulador" className="hover:text-emerald-400 transition-colors">Simulador</a>
          <a href="#recursos" className="hover:text-emerald-400 transition-colors">Recursos</a>
          <a href="#planos" className="hover:text-emerald-400 transition-colors">Planos</a>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>WLC 1.1.0 System Operacional</span>
        </div>
      </div>
    </footer>
  );
};