import React, { useState } from "react";
import { SystemUser, DatabaseConfig } from "../types/system";

interface NavbarProps {
  activeModule: "landing" | "saas" | "pdv";
  onSelectModule: (module: "landing" | "saas" | "pdv") => void;
  currentUser: SystemUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  dbConfig: DatabaseConfig;
  onOpenDbConfig: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeModule,
  onSelectModule,
  currentUser,
  onOpenAuth,
  onLogout,
  dbConfig,
  onOpenDbConfig,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090a0d]/85 border-b border-[#222631]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div 
            onClick={() => onSelectModule("landing")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-amber-600 to-amber-400 p-[1px] shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-[#0d0e12] rounded-[7px] flex items-center justify-center font-bold text-amber-400 text-xs font-mono">
                W
              </div>
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-zinc-100 flex items-center gap-1.5 font-mono">
                WLC<span className="text-amber-400">SYSTEM</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1a1d26] border border-[#2b3140] text-zinc-400 font-sans font-medium">
                  1.1.0
                </span>
              </span>
            </div>
          </div>

          {/* Module Switcher Tabs (Center) */}
          <nav className="hidden md:flex items-center rounded-xl bg-[#12141a] p-1 border border-[#232732] shadow-inner">
            <button
              onClick={() => onSelectModule("landing")}
              className={`py-1.5 px-3.5 text-xs font-medium rounded-lg transition-all ${
                activeModule === "landing"
                  ? "bg-[#222634] text-zinc-100 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Visão Institucional
            </button>
            <button
              onClick={() => onSelectModule("saas")}
              className={`py-1.5 px-3.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeModule === "saas"
                  ? "bg-[#222634] text-zinc-100 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span>Gestão SaaS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </button>
            <button
              onClick={() => onSelectModule("pdv")}
              className={`py-1.5 px-3.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                activeModule === "pdv"
                  ? "bg-[#222634] text-zinc-100 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span>PDV Express</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Database Status Pill */}
            <button
              onClick={onOpenDbConfig}
              className="py-1.5 px-2.5 rounded-xl bg-[#12141a] hover:bg-[#1a1e28] border border-[#232732] flex items-center gap-2 text-[11px] text-zinc-300 transition-colors group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-zinc-400">BD:</span>
              <span className="font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                {dbConfig.provider}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">({dbConfig.latencyMs}ms)</span>
            </button>

            {/* Auth / User Pill */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[#232732]">
                <div className="w-8 h-8 rounded-xl bg-[#181b24] border border-[#2b3140] flex items-center justify-center text-xs font-mono font-bold text-amber-400">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left text-xs">
                  <div className="font-medium text-zinc-200 leading-none truncate max-w-[120px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase leading-tight mt-0.5">
                    {currentUser.role}
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  title="Desconectar"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-[#181b24] transition-colors text-xs ml-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs tracking-wide shadow-md shadow-amber-500/10 transition-all"
              >
                Acessar Sistema
              </button>
            )}
          </div>

          {/* Mobile Burger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenDbConfig}
              className="p-2 rounded-xl bg-[#12141a] border border-[#232732] text-emerald-400 text-xs"
            >
              ● {dbConfig.latencyMs}ms
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-[#151720] border border-[#232732]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#232732] space-y-2 animate-fade-in">
            <button
              onClick={() => {
                onSelectModule("landing");
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded-lg text-xs font-medium ${
                activeModule === "landing" ? "bg-[#1c202a] text-zinc-100" : "text-zinc-400"
              }`}
            >
              Visão Institucional
            </button>
            <button
              onClick={() => {
                onSelectModule("saas");
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded-lg text-xs font-medium ${
                activeModule === "saas" ? "bg-[#1c202a] text-zinc-100" : "text-zinc-400"
              }`}
            >
              Gestão SaaS (Analytics)
            </button>
            <button
              onClick={() => {
                onSelectModule("pdv");
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded-lg text-xs font-medium ${
                activeModule === "pdv" ? "bg-[#1c202a] text-zinc-100" : "text-zinc-400"
              }`}
            >
              PDV Express (Frente de Caixa)
            </button>
            <div className="pt-2 border-t border-[#232732]">
              {currentUser ? (
                <div className="flex items-center justify-between px-3 py-2 text-xs">
                  <span className="text-zinc-300 font-medium">{currentUser.name}</span>
                  <button onClick={onLogout} className="text-red-400 text-xs">Sair</button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-xs"
                >
                  Acessar Sistema
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};