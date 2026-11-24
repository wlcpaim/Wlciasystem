import React, { useState } from "react";
import { UserSession } from "../../types/admin";

export const AdminSessions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("active");

  const [sessions, setSessions] = useState<UserSession[]>([
    {
      id: "sess-9912",
      userId: "u-1",
      userName: "Wilson Paim",
      userEmail: "wlcpaim@gmail.com",
      role: "owner",
      organizationId: "org-1",
      ipAddress: "177.18.24.102",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      browser: "Chrome 122.0",
      os: "macOS Sonoma",
      deviceType: "desktop",
      status: "active",
      createdAt: "2026-11-24 00:10:00",
      lastActivityAt: "2026-11-24 00:32:45",
      expiresAt: "2026-11-25 00:10:00",
      isCurrent: true,
    },
    {
      id: "sess-8834",
      userId: "u-2",
      userName: "Mariana Costa",
      userEmail: "mariana.costa@wlc.ai",
      role: "wlc_admin",
      organizationId: "org-1",
      ipAddress: "189.44.12.90",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)",
      browser: "Mobile Safari 17.4",
      os: "iOS 17.4",
      deviceType: "mobile",
      status: "active",
      createdAt: "2026-11-23 23:30:12",
      lastActivityAt: "2026-11-23 23:55:00",
      expiresAt: "2026-11-24 23:30:12",
    },
    {
      id: "sess-7721",
      userId: "u-3",
      userName: "Carlos Mendes",
      userEmail: "carlos@acmecorp.com",
      role: "enterprise_admin",
      organizationId: "org-2",
      ipAddress: "201.86.15.44",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edg/122.0.0.0",
      browser: "Edge 122.0",
      os: "Windows 11 Pro",
      deviceType: "desktop",
      status: "active",
      createdAt: "2026-11-23 21:00:00",
      lastActivityAt: "2026-11-23 23:42:10",
      expiresAt: "2026-11-24 21:00:00",
    },
    {
      id: "sess-5510",
      userId: "u-5",
      userName: "Roberto Silva",
      userEmail: "roberto@techlog.com.br",
      role: "operator",
      organizationId: "org-3",
      ipAddress: "177.10.99.31",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
      browser: "Firefox 123.0",
      os: "Ubuntu Linux",
      deviceType: "desktop",
      status: "revoked",
      createdAt: "2026-11-23 18:00:00",
      lastActivityAt: "2026-11-23 18:30:00",
      expiresAt: "2026-11-24 18:00:00",
      revokedAt: "2026-11-23 19:15:00",
      revocationReason: "Revogação administrativa de rotina por inatividade",
    },
  ]);

  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            status: "revoked",
            revokedAt: new Date().toISOString(),
            revocationReason: "Revogação imediata solicitada pelo administrador",
          };
        }
        return s;
      })
    );
  };

  const handleRevokeAllUserSessions = (userId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.userId === userId && !s.isCurrent) {
          return {
            ...s,
            status: "revoked",
            revokedAt: new Date().toISOString(),
            revocationReason: "Revogação em massa de todas as sessões do usuário",
          };
        }
        return s;
      })
    );
  };

  const filtered = sessions.filter((s) => {
    const matchesSearch =
      s.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.ipAddress.includes(searchTerm) ||
      s.browser.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans tracking-tight">
            Central de Sessões Seguras
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Rastreamento de tokens de sessão criptografados (SHA-256) com cookies HttpOnly, detecção de dispositivos e revogação imediata.
          </p>
        </div>
      </div>

      {/* Métricas de Sessão */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm">
          <div className="text-xs text-zinc-400">Sessões Ativas Globais</div>
          <div className="text-2xl font-bold font-mono text-zinc-100 mt-1">
            {sessions.filter((s) => s.status === "active").length}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1">● Conexões seguras TLS 1.3</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm">
          <div className="text-xs text-zinc-400">Proteção de Sessão</div>
          <div className="text-2xl font-bold font-mono text-zinc-100 mt-1">HttpOnly</div>
          <div className="text-[11px] font-mono text-zinc-400 mt-1">Sem armazenamento em localStorage</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm">
          <div className="text-xs text-zinc-400">Timeout de Inatividade</div>
          <div className="text-2xl font-bold font-mono text-zinc-100 mt-1">30 min</div>
          <div className="text-[11px] font-mono text-zinc-400 mt-1">Expiração absoluta em 24 horas</div>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="p-4 rounded-xl bg-[#0c0d13] border border-zinc-800/80 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Buscar por usuário, email, IP ou navegador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 focus:outline-none"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Sessões Ativas</option>
            <option value="revoked">Sessões Revogadas</option>
          </select>
        </div>
      </div>

      {/* Tabela de Sessões */}
      <div className="rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-zinc-950/60 text-zinc-400 font-mono text-[10px] uppercase">
                <th className="py-3 px-4">Sessão / Usuário</th>
                <th className="py-3 px-4">Dispositivo & SO</th>
                <th className="py-3 px-4">Navegador</th>
                <th className="py-3 px-4">IP</th>
                <th className="py-3 px-4">Última Atividade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 font-sans">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-zinc-100">{s.userName}</span>
                      {s.isCurrent && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Atual
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500">{s.userEmail}</div>
                    <div className="text-[10px] font-mono text-zinc-600">ID: {s.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-zinc-200">{s.os}</div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">{s.deviceType}</div>
                  </td>
                  <td className="py-3 px-4 text-zinc-300 text-xs font-mono">{s.browser}</td>
                  <td className="py-3 px-4 font-mono text-zinc-300 text-xs">{s.ipAddress}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                    <div>{s.lastActivityAt}</div>
                    <div className="text-[10px] text-zinc-500">Expira: {s.expiresAt}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        s.status === "active"
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/60"
                          : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          s.status === "active" ? "bg-emerald-400" : "bg-zinc-500"
                        }`}
                      />
                      {s.status === "active" ? "Ativa" : "Revogada"}
                    </span>
                    {s.revocationReason && (
                      <div className="text-[10px] text-zinc-500 max-w-xs truncate mt-0.5">
                        {s.revocationReason}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5">
                    {s.status === "active" && !s.isCurrent && (
                      <>
                        <button
                          onClick={() => handleRevokeSession(s.id)}
                          className="text-[11px] font-mono px-2 py-1 rounded bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border border-rose-800/60 transition-colors"
                          title="Encerrar esta sessão imediatamente"
                        >
                          Revogar
                        </button>
                        <button
                          onClick={() => handleRevokeAllUserSessions(s.userId)}
                          className="text-[11px] font-mono px-2 py-1 rounded bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                          title="Revogar todos os dispositivos deste usuário"
                        >
                          Revogar Todos
                        </button>
                      </>
                    )}
                    {s.isCurrent && (
                      <span className="text-[10px] font-mono text-zinc-500">Sessão em uso</span>
                    )}
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