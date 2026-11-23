import React, { useState } from "react";
import { DatabaseConfig } from "../types/system";

interface DatabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DatabaseConfig;
  onUpdateConfig: (newConfig: DatabaseConfig) => void;
}

export const DatabaseConfigModal: React.FC<DatabaseConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [provider, setProvider] = useState(config.provider);
  const [endpoint, setEndpoint] = useState(config.endpoint);
  const [databaseName, setDatabaseName] = useState(config.databaseName);
  const [autoSync, setAutoSync] = useState(config.autoSync);
  const [testingPing, setTestingPing] = useState(false);
  const [syncingNow, setSyncingNow] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = () => {
    setTestingPing(true);
    setFeedback(null);
    setTimeout(() => {
      setTestingPing(false);
      const simulatedLatency = Math.floor(Math.random() * 15) + 18;
      onUpdateConfig({
        ...config,
        latencyMs: simulatedLatency,
        status: "connected",
        lastSync: new Date().toLocaleTimeString("pt-BR"),
      });
      setFeedback(`✔ Conexão verificada com sucesso! Latência atual: ${simulatedLatency}ms.`);
    }, 650);
  };

  const handleSyncNow = () => {
    setSyncingNow(true);
    setFeedback(null);
    setTimeout(() => {
      setSyncingNow(false);
      onUpdateConfig({
        ...config,
        lastSync: new Date().toLocaleTimeString("pt-BR"),
      });
      setFeedback("✔ Tabelas sincronizadas com sucesso com o cluster Lovable Cloud.");
    }, 800);
  };

  const handleSave = () => {
    onUpdateConfig({
      ...config,
      provider,
      endpoint,
      databaseName,
      autoSync,
      status: "connected",
    });
    setFeedback("✔ Configurações salvas e aplicadas em tempo real.");
    setTimeout(onClose, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-xl bg-[#0f1115] border border-[#232730] rounded-2xl p-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#232730]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#14161d] border border-[#2d3240] flex items-center justify-center text-emerald-400 shadow-inner">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm0 5c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3M4 7c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-100 text-sm tracking-tight flex items-center gap-2">
                Configuração de Banco de Dados
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Conectado
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400">Lovable Cloud / PostgreSQL Enterprise</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-[#181b22] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Grid */}
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Provedor de Dados
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as any)}
                className="w-full bg-[#14161d] border border-[#262a36] rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="Lovable Cloud">Lovable Cloud (Nativo & Otimizado)</option>
                <option value="Supabase">Supabase PostgreSQL</option>
                <option value="PostgreSQL">PostgreSQL Dedicado (Self-hosted)</option>
                <option value="Local SQLite">SQLite Local (Modo Offline)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Nome do Banco / Schema
              </label>
              <input
                type="text"
                value={databaseName}
                onChange={(e) => setDatabaseName(e.target.value)}
                className="w-full bg-[#14161d] border border-[#262a36] rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Host / Connection Endpoint
            </label>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full bg-[#14161d] border border-[#262a36] rounded-xl px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Database Health & Tables */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Tabelas Sincronizadas no Schema
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">
                Último sync: {config.lastSync}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {config.tables.map((t) => (
                <div key={t.name} className="p-2.5 rounded-lg bg-[#14161d] border border-[#222631] text-left">
                  <div className="text-[11px] font-mono text-zinc-300 truncate">public.{t.name}</div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-400">
                    <span>{t.rowCount.toLocaleString()} linhas</span>
                    <span className="font-mono">{t.sizeKb} KB</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AutoSync Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#14161d] border border-[#232732]">
            <div>
              <p className="text-xs font-medium text-zinc-200">Sincronização em Tempo Real (Realtime)</p>
              <p className="text-[11px] text-zinc-400">Propaga vendas do PDV e novas assinaturas instantaneamente</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoSync} 
                onChange={(e) => setAutoSync(e.target.checked)} 
                className="sr-only peer" 
              />
              <div className="w-10 h-5 bg-[#252a36] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {feedback && (
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
              {feedback}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#232730]">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testingPing}
              className="py-2 px-3 rounded-xl bg-[#171a22] hover:bg-[#202532] border border-[#292e3d] text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              {testingPing ? (
                <span className="w-3.5 h-3.5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>⚡ Testar Latência ({config.latencyMs}ms)</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleSyncNow}
              disabled={syncingNow}
              className="py-2 px-3 rounded-xl bg-[#171a22] hover:bg-[#202532] border border-[#292e3d] text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              {syncingNow ? (
                <span className="w-3.5 h-3.5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>🔄 Sincronizar Agora</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="ml-auto py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wide transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};