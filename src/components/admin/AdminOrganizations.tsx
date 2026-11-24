import React, { useState } from "react";
import { OrganizationTenant } from "../../types/admin";

export const AdminOrganizations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [orgs] = useState<OrganizationTenant[]>([
    {
      id: "org-1",
      name: "WLC Enterprise Global",
      slug: "wlc-global",
      cnpjCpf: "44.921.840/0001-90",
      plan: "Ultimate",
      status: "active",
      ownerName: "Wilson Paim",
      ownerEmail: "wlcpaim@gmail.com",
      membersCount: 42,
      activeSessionsCount: 88,
      storageUsedMb: 14200,
      monthlyPixVolume: 840000,
      mfaRequired: true,
      ipWhitelistEnabled: false,
      allowedIps: [],
      createdAt: "2026-01-01",
    },
    {
      id: "org-2",
      name: "Acme Corporation Brasil",
      slug: "acme-brasil",
      cnpjCpf: "12.345.678/0001-00",
      plan: "Enterprise",
      status: "active",
      ownerName: "Carlos Mendes",
      ownerEmail: "carlos@acmecorp.com",
      membersCount: 18,
      activeSessionsCount: 24,
      storageUsedMb: 4100,
      monthlyPixVolume: 320000,
      mfaRequired: true,
      ipWhitelistEnabled: true,
      allowedIps: ["201.86.15.0/24"],
      createdAt: "2026-02-10",
    },
    {
      id: "org-3",
      name: "TechLog Soluções em Logística",
      slug: "techlog",
      cnpjCpf: "98.765.432/0001-11",
      plan: "Professional",
      status: "active",
      ownerName: "Roberto Silva",
      ownerEmail: "roberto@techlog.com.br",
      membersCount: 8,
      activeSessionsCount: 11,
      storageUsedMb: 1250,
      monthlyPixVolume: 95000,
      mfaRequired: false,
      ipWhitelistEnabled: false,
      allowedIps: [],
      createdAt: "2026-03-15",
    },
  ]);

  const filtered = orgs.filter((o) =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.cnpjCpf.includes(searchTerm) ||
    o.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans tracking-tight">
            Gestão Multi-Empresa & Tenants
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Isolamento de dados por organization_id no PostgreSQL, cotas de armazenamento R2 e limites por tenant.
          </p>
        </div>
      </div>

      {/* Grid de Tenants */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((org) => (
          <div
            key={org.id}
            className="p-5 rounded-xl bg-[#0c0d13] border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                {org.plan}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Ativo
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-100">{org.name}</h3>
              <div className="text-[11px] font-mono text-zinc-500 mt-0.5">CNPJ: {org.cnpjCpf}</div>
            </div>

            <div className="space-y-2 pt-3 border-t border-zinc-900 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Responsável:</span>
                <span className="text-zinc-200">{org.ownerName}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Membros Ativos:</span>
                <span className="font-mono text-zinc-200">{org.membersCount}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Sessões Ativas:</span>
                <span className="font-mono text-emerald-400">{org.activeSessionsCount}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Armazenamento R2:</span>
                <span className="font-mono text-zinc-300">{(org.storageUsedMb / 1024).toFixed(1)} GB</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};