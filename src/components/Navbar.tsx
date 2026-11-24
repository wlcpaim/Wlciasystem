import React, { useState } from "react";
import { SystemUser, DatabaseConfig } from "../types/system";

export type AppModule = 
  | "landing" 
  | "admin" 
  | "finance" 
  | "growth" 
  | "automation" 
  | "cognitive" 
  | "saas" 
  | "pdv";

interface NavbarProps {
  activeModule: AppModule;
  onSelectModule: (module: AppModule) => void;
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

  const navItems: { id: AppModule; label: string; badge?: string }[] = [
    { id: "landing", label: "Visão Geral" },
    { id: "admin", label: "Control Center", badge: "2.0" },
    { id: "finance", label: "Financeiro & PIX", badge: "Live" },
    { id: "growth", label: "Growth CRM" },
    { id: "automation", label: "Automações n8n" },
    { id: "cognitive", label: "Cognitive AI", badge: "6 Bots" },
    { id: "saas", label: "SaaS Multi-Tenant" },
    { id: "pdv", label: "PDV Express" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#08090d]/85 border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand com Tipografia Refinada */}
          <div 
            onClick={() => onSelectModule("landing")}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center font-bold text-zinc-100 text-xs font-mono shadow-sm group-hover:border-zinc-500 transition-colors">
              W
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-zinc-100 font-mono">
                WLC<span className="text-zinc-400 font-normal">ENTERPRISE</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                1.1.0 PRO
              </span>
            </div>
          </div>

          {/* Module Switcher Tabs (Center) */}
          <nav className="hidden lg:flex items-center rounded-xl bg-zinc-900/80 p-1 border border-zinc-800/90 shadow-sm overflow-x-auto">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={"py-1.5 px-3 text-xs font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 " + (
                  activeModule === item.id 
                    ? "bg-zinc-800 text-zinc-100 shadow-sm font-semibold border border-zinc-700/80" 
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                )}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={"text-[9px] font-mono px-1 py-0.2 rounded " + (
                    activeModule === item.id 
                      ? "bg-zinc-950 text-zinc-200" 
                      : "bg-zinc-800/80 text-zinc-400"
                  )}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Control Center Button */}
            <button
              onClick={() => onSelectModule("admin")}
              className={"py-1.5 px-3 rounded-xl border flex items-center gap-2 text-xs font-medium transition-all shadow-sm " + (
                activeModule === "admin"
                  ? "bg-zinc-800 border-zinc-600 text-zinc-100"
                  : "bg-zinc-900 hover:bg-zinc-800/90 border-zinc-800 text-zinc-300"
              )}
              title="Abrir WLC Control Center / Admin 2.0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Control Center</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-950 text-zinc-400 border border-zinc-800">
                2.0
              </span>
            </button>

            {/* Database & Admin Panel Pill */}
            <button
              onClick={onOpenDbConfig}
              className="py-1.5 px-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-800/90 flex items-center gap-2 text-xs text-zinc-300 transition-all group hover:border-zinc-700 shadow-sm"
              title="Conexão PostgreSQL / Hyperdrive"
            >
              <span className={"w-1.5 h-1.5 rounded-full " + (dbConfig.status === "connected" ? "bg-white" : "bg-zinc-600")} />
              <span className="font-mono text-zinc-400 text-[11px]">DB</span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-zinc-950 text-zinc-400 border border-zinc-800">
                {dbConfig.latencyMs}ms
              </span>
            </button>

            {/* Auth / User Pill */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-zinc-800/80">
                <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-xs font-mono font-semibold text-zinc-100 shadow-sm">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left text-xs">
                  <div className="font-semibold text-zinc-100 leading-none truncate max-w-[120px] font-sans">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase leading-tight mt-0.5">
                    {currentUser.role}
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  title="Desconectar da conta"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors text-xs ml-1"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="py-2 px-4 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs tracking-tight shadow-md transition-all active:scale-[0.98]"
              >
                Entrar / Cadastrar
              </button>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onSelectModule("admin")}
              className="py-1.5 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-mono flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Admin 2.0</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-800/80"
              aria-label="Abrir menu"
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

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-zinc-800/80 space-y-1 animate-fade-in">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onSelectModule(item.id); setMobileMenuOpen(false); }}
                className={"w-full text-left py-2 px-3 rounded-xl text-xs font-medium transition-colors flex items-center justify-between " + (
                  activeModule === item.id ? "bg-zinc-800 text-zinc-100 font-semibold" : "text-zinc-400 hover:bg-zinc-900"
                )}
              >
                <span>{item.label}</span>
                {item.badge && <span className="text-[10px] font-mono text-zinc-400">{item.badge}</span>}
              </button>
            ))}
            <div className="pt-2 border-t border-zinc-800/80">
              {currentUser ? (
                <div className="flex items-center justify-between py-2 px-3">
                  <div className="text-xs text-zinc-300">
                    <span className="font-semibold">{currentUser.name}</span>
                    <span className="ml-2 text-zinc-500 font-mono text-[10px]">({currentUser.role})</span>
                  </div>
                  <button
                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                    className="text-xs text-zinc-400 hover:text-white hover:underline"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                  className="w-full py-2 px-3 rounded-xl bg-zinc-100 text-zinc-950 font-semibold text-xs text-center"
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