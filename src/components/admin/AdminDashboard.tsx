import React from "react";
import { AdminUser } from "../../types/admin";

interface AdminDashboardProps {
  currentUser: AdminUser;
  onNavigateTab: (tab: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onNavigateTab }) => {
  const kpis = [
    { label: "Usuários Ativos", value: "2.418", change: "+14.2%", positive: true, icon: "👥", tab: "users" },
    { label: "Sessões Ativas (HttpOnly)", value: "3.892", change: "+8.1%", positive: true, icon: "🔑", tab: "sessions" },
    { label: "Organizações Tenants", value: "124", change: "+6 novas", positive: true, icon: "🏢", tab: "organizations" },
    { label: "Eventos de Auditoria (24h)", value: "48.120", change: "100% auditado", positive: true, icon: "📜", tab: "audit" },
    { label: "Conformidade MFA", value: "98.4%", change: "Owner & Admins 100%", positive: true, icon: "🔒", tab: "security" },
    { label: "Taxa de Bloqueio Brute-Force", value: "0.02%", change: "18 IPs mitigados", positive: true, icon: "🛡️", tab: "security" },
  ];

  const recentSessions = [
    { user: "Wilson Paim", email: "wlcpaim@gmail.com", role: "Owner", ip: "177.18.24.102", device: "Desktop (macOS / Chrome)", status: "Ativa", time: "Agora" },
    { user: "Carlos Mendes", email: "carlos@enterprise.com", role: "Admin Empresarial", ip: "201.86.15.44", device: "Desktop (Windows / Edge)", status: "Ativa", time: "Há 4m" },
    { user: "Mariana Costa", email: "mariana@wlc.ai", role: "WLC Admin", ip: "189.44.12.90", device: "Mobile (iOS / Safari)", status: "Ativa", time: "Há 12m" },
    { user: "Suporte Operações", email: "ops@wlc.ai", role: "Operador", ip: "177.10.99.31", device: "Desktop (Linux / Firefox)", status: "Ativa", time: "Há 28m" },
  ];

  const securityAlerts = [
    { title: "MFA Ativado com Sucesso", desc: "Owner provisionado com chave de segurança YubiKey/TOTP.", time: "Há 10 min", level: "info" },
    { title: "Tentativa de Força Bruta Mitigada", desc: "IP 45.142.120.8 bloqueado após 5 tentativas inválidas.", time: "Há 42 min", level: "warning" },
    { title: "Sessão Revogada por Inatividade", desc: "Sessão de operador expirada após 30 minutos ocioso.", time: "Há 1h 15m", level: "info" },
  ];

  return (
    <div className="space-y-6">
      {/* Header com Boas-Vindas e Resumo Operacional */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight font-sans">
            WLC Control Center <span className="text-zinc-500 font-mono text-base font-normal">/ Dashboard Executivo</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Monitoramento centralizado de autenticação, sessões em tempo real, tenants multi-empresa e segurança.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigateTab("sessions")}
            className="py-1.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 border border-zinc-700 transition-colors"
          >
            Gerenciar Sessões
          </button>
          <button 
            onClick={() => onNavigateTab("security")}
            className="py-1.5 px-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition-colors"
          >
            Políticas de Segurança
          </button>
        </div>
      </div>

      {/* Grid de KPIs Executivos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            onClick={() => onNavigateTab(kpi.tab)}
            className="p-4 rounded-xl bg-[#0c0d13] border border-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">{kpi.label}</span>
              <span className="text-sm p-1 rounded bg-zinc-900 border border-zinc-800">{kpi.icon}</span>
            </div>
            <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-zinc-100">
              {kpi.value}
            </div>
            <div className="mt-1 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span>●</span>
              <span>{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sessões em Tempo Real & Alertas de Segurança */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabela de Sessões Recentes (2 colunas) */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <div>
              <h2 className="text-sm font-semibold text-zinc-200">Sessões Ativas Recentes</h2>
              <p className="text-xs text-zinc-400">Tokens criptografados e cookies HttpOnly gerenciados pelo backend</p>
            </div>
            <button
              onClick={() => onNavigateTab("sessions")}
              className="text-xs text-zinc-400 hover:text-zinc-200 font-mono hover:underline"
            >
              Ver todas →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800/80 text-zinc-500 font-mono text-[10px] uppercase">
                  <th className="py-2">Usuário</th>
                  <th className="py-2">Cargo</th>
                  <th className="py-2">Dispositivo</th>
                  <th className="py-2">IP de Origem</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 font-sans">
                {recentSessions.map((s, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-2.5">
                      <div className="font-medium text-zinc-200">{s.user}</div>
                      <div className="text-[10px] font-mono text-zinc-500">{s.email}</div>
                    </td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {s.role}
                      </span>
                    </td>
                    <td className="py-2.5 text-zinc-400 text-[11px]">{s.device}</td>
                    <td className="py-2.5 font-mono text-zinc-400 text-[11px]">{s.ip}</td>
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertas e Incidentes de Segurança (1 coluna) */}
        <div className="p-5 rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <div>
              <h2 className="text-sm font-semibold text-zinc-200">Feed de Segurança</h2>
              <p className="text-xs text-zinc-400">Atividades monitoradas</p>
            </div>
            <button
              onClick={() => onNavigateTab("audit")}
              className="text-xs text-zinc-400 hover:text-zinc-200 font-mono hover:underline"
            >
              Auditoria →
            </button>
          </div>

          <div className="space-y-3">
            {securityAlerts.map((alert, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-200">{alert.title}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{alert.time}</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">{alert.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] text-zinc-400 font-mono">
            <div className="text-zinc-300 font-medium mb-1">Arquitetura de Segurança Ativa:</div>
            <div>● Hyperdrive PostgreSQL pool com baixa latência</div>
            <div>● Rotação periódica de CSRF Secret</div>
            <div>● Bloqueio de IP com rate-limit automático</div>
          </div>
        </div>
      </div>
    </div>
  );
};