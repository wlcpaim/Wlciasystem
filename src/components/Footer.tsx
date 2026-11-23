import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-sm">
            W
          </div>
          <span className="font-bold text-white">WLC Flow SaaS</span>
          <span>© 2026. Todos os direitos reservados.</span>
        </div>

        <div className="flex space-x-6 text-xs">
          <a href="#termos" className="hover:text-white transition-colors">Termos de Uso</a>
          <a href="#privacidade" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#status" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Todos os sistemas operacionais
          </a>
        </div>
      </div>
    </footer>
  );
};