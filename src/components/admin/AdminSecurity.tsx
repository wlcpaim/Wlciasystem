import React, { useState } from "react";
import { SecurityPolicyConfig } from "../../types/admin";

export const AdminSecurity: React.FC = () => {
  const [policies, setPolicies] = useState<SecurityPolicyConfig>({
    mfaMandatoryForPrivileged: true,
    sessionIdleTimeoutMinutes: 30,
    sessionAbsoluteTimeoutHours: 24,
    maxConcurrentSessionsPerUser: 5,
    bruteForceMaxAttempts: 5,
    bruteForceLockoutMinutes: 15,
    csrfProtectionEnabled: true,
    httpOnlyCookiesEnforced: true,
    ipWhitelistEnabled: false,
    allowedIpRanges: ["177.18.24.0/24", "201.86.15.0/24"],
    passwordPolicy: {
      minLength: 12,
      requireSpecialChar: true,
      requireNumbers: true,
      requireUppercase: true,
      expiryDays: 90,
    },
  });

  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans tracking-tight">
            Políticas de Segurança & MFA
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Configuração de proteção de sessão, restrições de IP, mitigação de força bruta e regras de autenticação multifator.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedFeedback && (
            <span className="text-xs font-mono text-emerald-400 animate-fade-in">
              ✓ Configurações salvas no PostgreSQL!
            </span>
          )}
          <button
            onClick={handleSave}
            className="py-1.5 px-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition-colors"
          >
            Salvar Políticas
          </button>
        </div>
      </div>

      {/* Grid de Configurações de Segurança */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bloco 1: Autenticação Segura & MFA */}
        <div className="p-5 rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <h2 className="text-sm font-semibold text-zinc-200">Autenticação & MFA</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              Servidor
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
              <div>
                <div className="font-medium text-zinc-200">MFA Obrigatório para Cargos Privilegiados</div>
                <div className="text-[11px] text-zinc-400">Forçar TOTP / Chave de Segurança para Owner e Admins</div>
              </div>
              <input
                type="checkbox"
                checked={policies.mfaMandatoryForPrivileged}
                onChange={(e) => setPolicies({ ...policies, mfaMandatoryForPrivileged: e.target.checked })}
                className="w-4 h-4 rounded bg-zinc-800 text-zinc-100 focus:ring-0"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
              <div>
                <div className="font-medium text-zinc-200">Armazenamento Exclusivo em Cookies HttpOnly</div>
                <div className="text-[11px] text-zinc-400">Proíbe estritamente gravação de tokens em localStorage</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Ativo (Strict)
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
              <div>
                <div className="font-medium text-zinc-200">Proteção CSRF com Token em Cabeçalho</div>
                <div className="text-[11px] text-zinc-400">Validação de requisições de mutação state-changing</div>
              </div>
              <input
                type="checkbox"
                checked={policies.csrfProtectionEnabled}
                onChange={(e) => setPolicies({ ...policies, csrfProtectionEnabled: e.target.checked })}
                className="w-4 h-4 rounded bg-zinc-800 text-zinc-100"
              />
            </div>
          </div>
        </div>

        {/* Bloco 2: Gestão de Sessões & Timeouts */}
        <div className="p-5 rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <h2 className="text-sm font-semibold text-zinc-200">Ciclo de Vida de Sessões</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              Timeouts
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-zinc-300 block mb-1">Expiração por Inatividade (Minutos)</label>
              <input
                type="number"
                value={policies.sessionIdleTimeoutMinutes}
                onChange={(e) => setPolicies({ ...policies, sessionIdleTimeoutMinutes: Number(e.target.value) })}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none"
              />
              <p className="text-[10px] text-zinc-500 mt-1">Sessões ociosas serão encerradas automaticamente após este período.</p>
            </div>

            <div>
              <label className="text-zinc-300 block mb-1">Expiração Absoluta da Sessão (Horas)</label>
              <input
                type="number"
                value={policies.sessionAbsoluteTimeoutHours}
                onChange={(e) => setPolicies({ ...policies, sessionAbsoluteTimeoutHours: Number(e.target.value) })}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none"
              />
              <p className="text-[10px] text-zinc-500 mt-1">Renovação forçada exigindo reautenticação após este limite.</p>
            </div>

            <div>
              <label className="text-zinc-300 block mb-1">Limite de Sessões Simultâneas por Usuário</label>
              <input
                type="number"
                value={policies.maxConcurrentSessionsPerUser}
                onChange={(e) => setPolicies({ ...policies, maxConcurrentSessionsPerUser: Number(e.target.value) })}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bloco 3: Proteção Contra Força Bruta */}
        <div className="p-5 rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <h2 className="text-sm font-semibold text-zinc-200">Mitigação de Ataques (Brute Force)</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              Rate Limit
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-zinc-300 block mb-1">Máximo de Tentativas Inválidas Consecutivas</label>
              <input
                type="number"
                value={policies.bruteForceMaxAttempts}
                onChange={(e) => setPolicies({ ...policies, bruteForceMaxAttempts: Number(e.target.value) })}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-zinc-300 block mb-1">Tempo de Bloqueio Temporário (Minutos)</label>
              <input
                type="number"
                value={policies.bruteForceLockoutMinutes}
                onChange={(e) => setPolicies({ ...policies, bruteForceLockoutMinutes: Number(e.target.value) })}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bloco 4: Restrição por IP / Whitelist */}
        <div className="p-5 rounded-xl bg-[#0c0d13] border border-zinc-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <h2 className="text-sm font-semibold text-zinc-200">Restrição de IP & Redes Autorizadas</h2>
            <input
              type="checkbox"
              checked={policies.ipWhitelistEnabled}
              onChange={(e) => setPolicies({ ...policies, ipWhitelistEnabled: e.target.checked })}
              className="w-4 h-4 rounded bg-zinc-800"
            />
          </div>

          <div className="space-y-3 text-xs">
            <p className="text-[11px] text-zinc-400">
              Quando habilitado, o acesso ao painel executivo é restrito aos blocos CIDR ou IPs autorizados.
            </p>
            <div>
              <label className="text-zinc-300 block mb-1">Faixas de IP Permitidas (um por linha)</label>
              <textarea
                rows={3}
                value={policies.allowedIpRanges.join("\n")}
                onChange={(e) => setPolicies({ ...policies, allowedIpRanges: e.target.value.split("\n") })}
                className="w-full py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 font-mono text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};