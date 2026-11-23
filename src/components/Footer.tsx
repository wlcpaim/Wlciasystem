import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-400">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-zinc-950 text-xs font-mono">
            WLC
          </div>
          <div>
            <span className="font-semibold text-white">WLC SaaS Flow</span>
            <span className="text-xs text-zinc-500 ml-2">© {new Date().getFullYear()} Todos os direitos reservados.</span>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs text-zinc-400">
          <a href="#hero" className="hover:text-white transition-colors">Visão Geral</a>
          <a href="#roi-simulador" className="hover:text-white transition-colors">Simulador</a>
          <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
          <a href="#planos" className="hover:text-white transition-colors">Planos</a>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-zinc-300 animate-pulse" />
          <span>WLC 1.1.0 System Operacional</span>
        </div>
      </div>
    </footer>
  );
};