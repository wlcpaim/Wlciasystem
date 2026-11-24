import React, { useState } from "react";

export const AdminSettings: React.FC = () => {
  const [config, setConfig] = useState({
    cloudflareWorkerEndpoint: "https://api.wlcenterprise.workers.dev",
    hyperdriveHost: "hyperdrive.cloudflare.internal:5432",
    databaseName: "wlc_production_hyperdrive",
    r2BucketName: "wlc-enterprise-assets",
    cookieDomain: "wlciasystemdev.lovable.app",
    logRetentionDays: 365,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans tracking-tight">
            Configurações Globais de Infraestrutura
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Parâmetros de conexão Cloudflare Workers, Hono API, Cloudflare Hyperdrive PostgreSQL e R2.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs font-mono text-emerald-400 animate-fade-in">
              ✓ Parâmetros atualizados no servidor!
            </span>
          )}
          <button
            onClick={handleSave}
            className="py-1.5 px-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition-colors"
          >
            Salvar Infraestrutura
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-zinc-200 pb-2 border-b border-zinc-800">
            Backend & API Server (Hono)
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-zinc-400 block mb-1">Endpoint do Cloudflare Worker</label>
              <input
                type="text"
                value={config.cloudflareWorkerEndpoint}
                onChange={(e) => setConfig({ ...config, cloudflareWorkerEndpoint: e.target.value })}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="text-zinc-400 block mb-1">Domínio do Cookie de Sessão (HttpOnly)</label>
              <input
                type="text"
                value={config.cookieDomain}
                onChange={(e) => setConfig({ ...config, cookieDomain: e.target.value })}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-zinc-200 pb-2 border-b border-zinc-800">
            Banco de Dados & Storage (Hyperdrive + R2)
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-zinc-400 block mb-1">Host Cloudflare Hyperdrive PostgreSQL</label>
              <input
                type="text"
                value={config.hyperdriveHost}
                onChange={(e) => setConfig({ ...config, hyperdriveHost: e.target.value })}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="text-zinc-400 block mb-1">Bucket Cloudflare R2 (Assets)</label>
              <input
                type="text"
                value={config.r2BucketName}
                onChange={(e) => setConfig({ ...config, r2BucketName: e.target.value })}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};