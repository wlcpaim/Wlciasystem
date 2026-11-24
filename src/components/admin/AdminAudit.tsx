import React, { useState } from "react";
import { AuditLogEntry, AuditCategory, AuditSeverity } from "../../types/admin";

export const AdminAudit: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const [logs] = useState<AuditLogEntry[]>([
    {
      id: "aud-101",
      timestamp: "2026-11-24 00:32:45",
      category: "auth",
      severity: "low",
      action: "SESSION_AUTHENTICATED",
      description: "Login bem-sucedido com emissão de cookie HttpOnly e validação de token",
      userId: "u-1",
      userName: "Wilson Paim",
      userEmail: "wlcpaim@gmail.com",
      organizationId: "org-1",
      organizationName: "WLC Enterprise Global",
      ipAddress: "177.18.24.102",
      metadata: { browser: "Chrome", os: "macOS", mfaVerified: true },
    },
    {
      id: "aud-102",
      timestamp: "2026-11-24 00:25:10",
      category: "security",
      severity: "high",
      action: "BRUTE_FORCE_PREVENTED",
      description: "IP bloqueado por 15 minutos após 5 tentativas de senha incorreta para operador",
      userId: "u-none",
      userName: "Sistema Automático",
      userEmail: "security@wlc.ai",
      organizationId: "org-1",
      organizationName: "WLC Enterprise Global",
      ipAddress: "45.142.120.8",
      metadata: { attempts: 5, targetEmail: "financeiro@empresa.com" },
    },
    {
      id: "aud-103",
      timestamp: "2026-11-23 23:40:15",
      category: "rbac",
      severity: "medium",
      action: "ROLE_ASSIGNED",
      description: "Atribuição de cargo 'manager' para usuário juliana@acmecorp.com por administrador",
      userId: "u-3",
      userName: "Carlos Mendes",
      userEmail: "carlos@acmecorp.com",
      organizationId: "org-2",
      organizationName: "Acme Corporation",
      ipAddress: "201.86.15.44",
      metadata: { targetUser: "Juliana Santos", assignedRole: "manager" },
    },
    {
      id: "aud-104",
      timestamp: "2026-11-23 21:15:00",
      category: "session",
      severity: "medium",
      action: "SESSION_REVOKED",
      description: "Revogação manual da sessão sess-5510 por inatividade operacional",
      userId: "u-1",
      userName: "Wilson Paim",
      userEmail: "wlcpaim@gmail.com",
      organizationId: "org-1",
      organizationName: "WLC Enterprise Global",
      ipAddress: "177.18.24.102",
      metadata: { revokedSessionId: "sess-5510", reason: "manual_admin" },
    },
    {
      id: "aud-105",
      timestamp: "2026-11-23 18:20:00",
      category: "admin",
      severity: "low",
      action: "POLICY_UPDATED",
      description: "Tempo de expiração de sessão atualizado para 30 minutos em todo o tenant",
      userId: "u-1",
      userName: "Wilson Paim",
      userEmail: "wlcpaim@gmail.com",
      organizationId: "org-1",
      organizationName: "WLC Enterprise Global",
      ipAddress: "177.18.24.102",
      metadata: { key: "sessionIdleTimeoutMinutes", value: 30 },
    },
  ]);

  const filtered = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter;
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const getSeverityBadge = (s: AuditSeverity) => {
    switch (s) {
      case "critical":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-800">CRÍTICO</span>;
      case "high":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-800">ALTO</span>;
      case "medium":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800">MÉDIO</span>;
      case "low":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">BAIXO</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans tracking-tight">
            Trilha de Auditoria & Conformidade
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Registro imutável de eventos de autenticação, mutações de RBAC, ciclo de sessões e acessos administrativos.
          </p>
        </div>
        <button
          onClick={() => alert("Exportação de auditoria criptografada gerada (JSON/CSV).")}
          className="py-1.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 border border-zinc-700 transition-colors"
        >
          Exportar Relatório
        </button>
      </div>

      {/* Barra de Filtros */}
      <div className="p-4 rounded-xl bg-[#0c0d13] border border-zinc-800/80 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Filtrar por ação, descrição, email ou IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 focus:outline-none"
          >
            <option value="all">Todas as Categorias</option>
            <option value="auth">Autenticação</option>
            <option value="security">Segurança</option>
            <option value="rbac">RBAC / Permissões</option>
            <option value="session">Sessões</option>
            <option value="admin">Administração</option>
          </select>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 focus:outline-none"
          >
            <option value="all">Todas as Gravidades</option>
            <option value="critical">Crítico</option>
            <option value="high">Alto</option>
            <option value="medium">Médio</option>
            <option value="low">Baixo</option>
          </select>
        </div>
      </div>

      {/* Tabela de Auditoria */}
      <div className="rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-zinc-950/60 text-zinc-400 font-mono text-[10px] uppercase">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Gravidade</th>
                <th className="py-3 px-4">Ação / Categoria</th>
                <th className="py-3 px-4">Descrição do Evento</th>
                <th className="py-3 px-4">Usuário</th>
                <th className="py-3 px-4">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 font-sans">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-zinc-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4">{getSeverityBadge(log.severity)}</td>
                  <td className="py-3 px-4">
                    <div className="font-mono font-semibold text-zinc-200 text-xs">{log.action}</div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">{log.category}</div>
                  </td>
                  <td className="py-3 px-4 text-zinc-300 text-xs max-w-sm">
                    <div>{log.description}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-zinc-200">{log.userName}</div>
                    <div className="text-[11px] font-mono text-zinc-500">{log.userEmail}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-zinc-400 whitespace-nowrap">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};