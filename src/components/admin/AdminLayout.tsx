import React, { useState } from "react";
import { AdminRole, AdminUser } from "../../types/admin";

export type AdminTab = 
  | "dashboard" 
  | "users" 
  | "roles" 
  | "sessions" 
  | "security" 
  | "audit" 
  | "organizations" 
  | "settings";

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  currentUser: AdminUser;
  onExitAdmin: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onExitAdmin,
  onLogout,
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems: { id: AdminTab; label: string; icon: string; badge?: string }[] = [
    { id: "dashboard", label: "Dashboard Executivo", icon: "📊" },
    { id: "users", label: "Gerenciar Usuários", icon: "👥", badge: "2.4k" },
    { id: "roles", label: "Cargos & Permissões", icon: "🛡️" },
    { id: "sessions", label: "Central de Sessões", icon: "🔑", badge: "Live" },
    { id: "security", label: "Segurança & MFA", icon: "🔒" },
    { id: "audit", label: "Trilha de Auditoria", icon: "📜" },
    { id: "organizations", label: "Empresas & Tenants", icon: "🏢" },
    { id: "settings", label: "Configurações Globais", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-[#07080b] text-zinc-100 flex flex-col font-sans">
      {/* Top Bar Executiva */}
      <header className="h-14 border-b border-zinc-800/80 bg-[#0c0d12]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors"
            title="Alternar Sidebar"
          >
            <span className="text-sm font-mono">☰</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center font-mono font-bold text-xs text-zinc-100 shadow-sm">
              W
            </div>
            <div>
              <span className="font-bold text-xs font-mono tracking-tight text-zinc-100">
                WLC<span className="text-zinc-400 font-normal">CONTROL</span>
              </span>
              <span className="ml-1.5 text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                ADMIN 2.0
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-zinc-800/80 text-xs text-zinc-400">
            <span className="font-mono text-[11px] text-zinc-500">Tenant:</span>
            <span className="font-medium text-zinc-200">{currentUser.organizationName}</span>
            <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.2 bg-zinc-900 rounded border border-zinc-800">
              PostgreSQL Hyperdrive
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sessão Segura Status Pill */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sessão HttpOnly Segura</span>
          </div>

          {/* Botão Retornar à Navegação Comercial */}
          <button
            onClick={onExitAdmin}
            className="py-1 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <span>←</span>
            <span className="hidden sm:inline">Voltar ao Site</span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-zinc-200">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <div className="font-semibold text-zinc-200 leading-none">{currentUser.name}</div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase mt-0.5">{currentUser.role}</div>
            </div>
            <button
              onClick={onLogout}
              className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors text-xs"
              title="Encerrar Sessão Segura"
            >
              ✕
            </button>
          </div>
        </div>
      </header>

      {/* Main Container com Sidebar e Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Administrativa */}
        <aside
          className={`${
            sidebarCollapsed ? "w-16" : "w-64"
          } border-r border-zinc-800/80 bg-[#090a0f] transition-all duration-200 flex flex-col justify-between shrink-0`}
        >
          <div className="p-3 space-y-1">
            <div className={`px-2 py-1.5 text-[10px] font-mono uppercase text-zinc-500 tracking-wider ${sidebarCollapsed ? "text-center" : ""}`}>
              {sidebarCollapsed ? "ADM" : "Navegação Executiva"}
            </div>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  currentTab === item.id
                    ? "bg-zinc-800/90 text-zinc-100 shadow-sm border border-zinc-700/80 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                } ${sidebarCollapsed ? "justify-center" : "justify-between"}`}
                title={item.label}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-sm">{item.icon}</span>
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Footer Sidebar com Informações de Segurança */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/40 text-[11px] text-zinc-400 space-y-1 font-mono">
              <div className="flex justify-between items-center">
                <span>Cloudflare:</span>
                <span className="text-emerald-400">Workers + Hono</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Database:</span>
                <span className="text-zinc-300">Hyperdrive PG</span>
              </div>
              <div className="flex justify-between items-center">
                <span>MFA Status:</span>
                <span className={currentUser.mfaEnabled ? "text-emerald-400" : "text-amber-400"}>
                  {currentUser.mfaEnabled ? "Ativo" : "Pendente"}
                </span>
              </div>
            </div>
          )}
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#07080b]">
          {children}
        </main>
      </div>
    </div>
  );
};