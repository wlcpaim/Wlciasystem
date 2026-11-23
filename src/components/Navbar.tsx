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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/90 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div 
            onClick={() => onSelectModule("landing")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-semibold text-zinc-100 text-xs font-mono shadow-sm">
              W
            </div>
            <div>
              <span className="font-semibold text-sm tracking-tight text-zinc-100 font-mono">
                WLC<span className="text-zinc-400 font-normal">SYSTEM</span>
              </span>
            </div>
          </div>

          {/* Module Switcher Tabs (Center) */}
          <nav className="hidden md:flex items-center rounded-xl bg-zinc-900/90 p-1 border border-zinc-800 shadow-sm">
            <button
              onClick={() => onSelectModule("landing")}
              className={"py-1.5 px-3.5 text-xs font-medium rounded-lg transition-colors " + (activeModule === "landing" ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-400 hover:text-zinc-200")}
            >
              Visão Geral
            </button>
            <button
              onClick={() => onSelectModule("saas")}
              className={"py-1.5 px-3.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 " + (activeModule === "saas" ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-400 hover:text-zinc-200")}
            >
              <span>Gestão SaaS</span>
            </button>
            <button
              onClick={() => onSelectModule("pdv")}
              className={"py-1.5 px-3.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 " + (activeModule === "pdv" ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-400 hover:text-zinc-200")}
            >
              <span>PDV Express</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Database Status Pill */}
            <button
              onClick={onOpenDbConfig}
              className="py-1.5 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 flex items-center gap-2 text-xs text-zinc-300 transition-colors group"
            >
              <span className={"w-1.5 h-1.5 rounded-full " + (dbConfig.status === "connected" ? "bg-emerald-400" : "bg-zinc-600")} />
              <span className="font-mono text-zinc-400 text-[11px]">DB:</span>
              <span className="font-medium text-zinc-200 text-[11px]">
                {dbConfig.endpoint ? "Supabase Conectado" : "Configurar Banco"}
              </span>
            </button>

            {/* Auth / User Pill */}
            {currentUser ? (
              <div className="flex items-center gap-2.5 pl-2 border-l border-zinc-800">
                <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-mono font-medium text-zinc-100">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left text-xs">
                  <div className="font-medium text-zinc-200 leading-none truncate max-w-[120px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase leading-tight mt-0.5">
                    {currentUser.role}
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  title="Desconectar"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors text-xs ml-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="py-1.5 px-3.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs tracking-tight shadow-sm transition-colors"
              >
                Entrar / Cadastrar
              </button>
            )}
          </div>

          {/* Mobile Burger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenDbConfig}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono"
            >
              DB
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-800"
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
          <div className="md:hidden py-3 border-t border-zinc-800 space-y-1.5 animate-fade-in">
            <button
              onClick={() => { onSelectModule("landing"); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 px-3 rounded-lg text-xs font-medium text-zinc-200 hover:bg-zinc-900"
            >
              Visão Geral
            </button>
            <button
              onClick={() => { onSelectModule("saas"); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 px-3 rounded-lg text-xs font-medium text-zinc-200 hover:bg-zinc-900"
            >
              Gestão SaaS
            </button>
            <button
              onClick={() => { onSelectModule("pdv"); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 px-3 rounded-lg text-xs font-medium text-zinc-200 hover:bg-zinc-900"
            >
              PDV Express
            </button>
            <div className="pt-2 border-t border-zinc-800">
              {currentUser ? (
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="text-xs text-zinc-300">
                    <span className="font-medium">{currentUser.name}</span>
                    <span className="ml-2 text-zinc-500 font-mono text-[10px]">({currentUser.role})</span>
                  </div>
                  <button
                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                  className="w-full py-2 px-3 rounded-lg bg-zinc-100 text-zinc-950 font-medium text-xs text-center"
                >
                  Entrar / Cadastrar
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};