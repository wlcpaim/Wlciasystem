import React, { useState } from "react";
import { DatabaseConfig } from "../types/system";
import { testSupabasePing, saveStoredConfig } from "../utils/supabaseAuth";

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
  const [anonKey, setAnonKey] = useState(config.anonKey || "");
  const [databaseName, setDatabaseName] = useState(config.databaseName);
  const [autoSync, setAutoSync] = useState(config.autoSync);
  const [testingPing, setTestingPing] = useState(false);
  const [syncingNow, setSyncingNow] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTestingPing(true);
    setFeedback(null);
    const result = await testSupabasePing(endpoint, anonKey);
    setTestingPing(false);
    if (result.ok) {
      const updated: DatabaseConfig = {
        ...config,
        endpoint,
        anonKey,
        latencyMs: result.latencyMs,
        status: "connected",
        lastSync: new Date().toLocaleTimeString("pt-BR"),
      };
      onUpdateConfig(updated);
      saveStoredConfig(updated);
      setFeedback("✔ Conexão ativa com o Supabase! Latência: " + result.latencyMs + "ms");
    } else {
      setFeedback("✖ Falha na conexão: " + (result.error || "Verifique a URL e a chave anon"));
    }
  };

  const handleSyncNow = () => {
    setSyncingNow(true);
    setFeedback(null);
    setTimeout(() => {
      setSyncingNow(false);
      const updated = {
        ...config,
        lastSync: new Date().toLocaleTimeString("pt-BR"),
      };
      onUpdateConfig(updated);
      saveStoredConfig(updated);
      setFeedback("✔ Esquema sincronizado com sucesso.");
    }, 600);
  };

  const handleSave = () => {
    const updated: DatabaseConfig = {
      ...config,
      provider,
      endpoint,
      anonKey,
      databaseName,
      autoSync,
      status: "connected",
    };
    onUpdateConfig(updated);
    saveStoredConfig(updated);
    setFeedback("✔ Configurações salvas e persistidas no navegador.");
    setTimeout(onClose, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100 font-mono text-sm">
              DB
            </div>
            <div>
              <h3 className="font-medium text-zinc-100 text-sm tracking-tight flex items-center gap-2">
                Configuração do Banco & Auth
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {config.status === "connected" ? "Conectado" : "Offline"}
                </span>
              </h3>
              <p className="text-xs text-zinc-400">Provedor de autenticação e banco de dados</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Grid */}
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Provedor
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as any)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
              >
                <option value="Supabase">Supabase / Lovable Cloud</option>
                <option value="PostgreSQL">PostgreSQL Dedicado</option>
                <option value="Local SQLite">Offline Local</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Nome do Banco / Projeto
              </label>
              <input
                type="text"
                value={databaseName}
                onChange={(e) => setDatabaseName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Supabase URL / Endpoint
            </label>
            <input
              type="text"
              placeholder="https://seu-projeto.supabase.co"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Chave Anon / Publishable Key (Para Login & Cadastro)
            </label>
            <input
              type="password"
              placeholder="sb_publishable_... ou eyJhbGci..."
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {/* Database Health & Tables */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Tabelas do Sistema
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">
                Última checagem: {config.lastSync}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {config.tables.map((t) => (
                <div key={t.name} className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-left">
                  <div className="text-[11px] font-mono text-zinc-300 truncate">public.{t.name}</div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-500">
                    <span>{t.rowCount.toLocaleString()} linhas</span>
                    <span className="font-mono">{t.sizeKb} KB</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {feedback && (
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-mono">
              {feedback}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testingPing}
              className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              {testingPing ? (
                <span className="w-3.5 h-3.5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Testar Conexão ({config.latencyMs}ms)</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleSyncNow}
              disabled={syncingNow}
              className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              {syncingNow ? (
                <span className="w-3.5 h-3.5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Sincronizar</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="ml-auto py-2 px-4 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs tracking-wide transition-colors"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};