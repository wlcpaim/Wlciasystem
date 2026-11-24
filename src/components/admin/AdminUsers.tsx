import React, { useState } from "react";
import { AdminUser, AdminRole } from "../../types/admin";

export const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: "u-1",
      name: "Wilson Paim",
      email: "wlcpaim@gmail.com",
      role: "owner",
      organizationId: "org-1",
      organizationName: "WLC Enterprise Global",
      status: "active",
      mfaEnabled: true,
      createdAt: "2026-01-10",
      lastLoginAt: "2026-11-24 00:28",
      lastLoginIp: "177.18.24.102",
    },
    {
      id: "u-2",
      name: "Mariana Costa",
      email: "mariana.costa@wlc.ai",
      role: "wlc_admin",
      organizationId: "org-1",
      organizationName: "WLC Enterprise Global",
      status: "active",
      mfaEnabled: true,
      createdAt: "2026-02-15",
      lastLoginAt: "2026-11-23 23:40",
      lastLoginIp: "189.44.12.90",
    },
    {
      id: "u-3",
      name: "Carlos Mendes",
      email: "carlos@acmecorp.com",
      role: "enterprise_admin",
      organizationId: "org-2",
      organizationName: "Acme Corporation",
      status: "active",
      mfaEnabled: true,
      createdAt: "2026-03-01",
      lastLoginAt: "2026-11-23 22:15",
      lastLoginIp: "201.86.15.44",
    },
    {
      id: "u-4",
      name: "Juliana Santos",
      email: "juliana@acmecorp.com",
      role: "manager",
      organizationId: "org-2",
      organizationName: "Acme Corporation",
      status: "active",
      mfaEnabled: false,
      createdAt: "2026-04-12",
      lastLoginAt: "2026-11-23 18:30",
      lastLoginIp: "201.86.15.89",
    },
    {
      id: "u-5",
      name: "Roberto Silva",
      email: "roberto@techlog.com.br",
      role: "operator",
      organizationId: "org-3",
      organizationName: "TechLog Soluções",
      status: "suspended",
      mfaEnabled: false,
      createdAt: "2026-05-20",
      lastLoginAt: "2026-11-20 14:10",
      lastLoginIp: "177.10.99.31",
    },
    {
      id: "u-6",
      name: "Fernanda Lima",
      email: "fernanda.lima@cliente.com",
      role: "client",
      organizationId: "org-4",
      organizationName: "Alpha Comércio",
      status: "active",
      mfaEnabled: false,
      createdAt: "2026-06-18",
      lastLoginAt: "2026-11-22 09:45",
      lastLoginIp: "187.60.210.14",
    },
  ]);

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId && u.role !== "owner") {
          return {
            ...u,
            status: u.status === "active" ? "suspended" : "active",
          };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.organizationName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: AdminRole) => {
    switch (role) {
      case "owner":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-800">OWNER</span>;
      case "wlc_admin":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-800">WLC ADMIN</span>;
      case "enterprise_admin":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950/80 text-blue-300 border border-blue-800">ADMIN EMPRESARIAL</span>;
      case "manager":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800">GERENTE</span>;
      case "operator":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">OPERADOR</span>;
      case "client":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800">CLIENTE</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans tracking-tight">
            Gerenciamento de Usuários
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Controle centralizado de identidades, perfis RBAC, vinculação a empresas e status de MFA.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="py-1.5 px-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <span>+</span>
          <span>Adicionar Usuário</span>
        </button>
      </div>

      {/* Barra de Filtros e Pesquisa */}
      <div className="p-4 rounded-xl bg-[#0c0d13] border border-zinc-800/80 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="w-full md:w-96">
          <input
            type="text"
            placeholder="Buscar por nome, email ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-sans"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 focus:outline-none font-sans"
          >
            <option value="all">Todos os Cargos</option>
            <option value="owner">Owner</option>
            <option value="wlc_admin">WLC Admin</option>
            <option value="enterprise_admin">Admin Empresarial</option>
            <option value="manager">Gerente</option>
            <option value="operator">Operador</option>
            <option value="client">Cliente</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 focus:outline-none font-sans"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativo</option>
            <option value="suspended">Suspenso</option>
          </select>
        </div>
      </div>

      {/* Tabela de Usuários */}
      <div className="rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-zinc-950/60 text-zinc-400 font-mono text-[10px] uppercase">
                <th className="py-3 px-4">Usuário</th>
                <th className="py-3 px-4">Cargo RBAC</th>
                <th className="py-3 px-4">Organização</th>
                <th className="py-3 px-4">MFA</th>
                <th className="py-3 px-4">Último Login</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 font-sans">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-zinc-100">{u.name}</div>
                    <div className="text-[11px] font-mono text-zinc-500">{u.email}</div>
                  </td>
                  <td className="py-3 px-4">{getRoleBadge(u.role)}</td>
                  <td className="py-3 px-4 text-zinc-300 text-xs">{u.organizationName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded ${
                        u.mfaEnabled
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/60"
                          : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                      }`}
                    >
                      {u.mfaEnabled ? "✓ Ativo" : "○ Não"}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                    <div>{u.lastLoginAt}</div>
                    <div className="text-[10px] text-zinc-500">{u.lastLoginIp}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        u.status === "active"
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/60"
                          : "bg-rose-950/60 text-rose-400 border border-rose-800/60"
                      }`}
                    >
                      {u.status === "active" ? "Ativo" : "Suspenso"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {u.role !== "owner" ? (
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={`text-[11px] font-mono px-2 py-1 rounded transition-colors ${
                          u.status === "active"
                            ? "text-rose-400 hover:bg-rose-950/40 border border-rose-900/60"
                            : "text-emerald-400 hover:bg-emerald-950/40 border border-emerald-900/60"
                        }`}
                      >
                        {u.status === "active" ? "Suspender" : "Ativar"}
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-600">Protegido</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Adicionar Usuário */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0e1017] border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-100">Criar Novo Usuário</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-500 hover:text-zinc-200"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Ex: Ana Clara"
                  className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Email Corporativo</label>
                <input
                  type="email"
                  placeholder="ana@empresa.com"
                  className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Cargo RBAC</label>
                <select className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none">
                  <option value="enterprise_admin">Admin Empresarial</option>
                  <option value="manager">Gerente</option>
                  <option value="operator">Operador</option>
                  <option value="client">Cliente</option>
                </select>
                <p className="text-[10px] text-zinc-500 mt-1">
                  Nota: Owner e WLC Admin só podem ser provisionados pelo servidor.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setShowAddModal(false)}
                className="py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="py-1.5 px-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs"
              >
                Salvar Usuário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};