import React, { useState } from "react";
import { SystemUser, DatabaseConfig } from "../types/system";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: SystemUser) => void;
  dbConfig: DatabaseConfig;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  dbConfig,
}) => {
  const [tab, setTab] = useState<"login" | "register" | "recovery">("login");
  const [email, setEmail] = useState("admin@wlcsystem.com.br");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("Wilson Paim");
  const [role, setRole] = useState<"admin" | "manager" | "cashier">("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      const user: SystemUser = {
        id: "usr-" + Math.random().toString(36).substring(2, 9),
        name: tab === "register" ? name : email.includes("admin") ? "Wilson Paim (Owner)" : "Operador PDV",
        email: email,
        role: role,
        lastLogin: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      };
      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  const handleQuickLogin = (demoRole: "admin" | "cashier") => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user: SystemUser = {
        id: demoRole === "admin" ? "usr-admin-01" : "usr-cashier-02",
        name: demoRole === "admin" ? "Wilson Paim (Owner)" : "Carlos Silva (Caixa 01)",
        email: demoRole === "admin" ? "admin@wlcsystem.com.br" : "caixa01@wlcsystem.com.br",
        role: demoRole,
        lastLogin: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      };
      onLoginSuccess(user);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#0f1115] border border-[#232730] rounded-2xl p-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Subtle Glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#232730]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-bold text-black text-sm shadow-md">
              W
            </div>
            <div>
              <h3 className="font-semibold text-zinc-100 text-sm tracking-tight flex items-center gap-2">
                Acesso ao Sistema
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#181a20] border border-[#2d313d] text-zinc-400">
                  v1.1.0
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400">SaaS Hub & PDV Integrado</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-[#181b22] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-xl bg-[#14161d] p-1 mt-4 border border-[#232732]">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
              tab === "login" 
                ? "bg-[#232732] text-zinc-100 shadow-sm" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setTab("register")}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
              tab === "register" 
                ? "bg-[#232732] text-zinc-100 shadow-sm" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Criar Conta
          </button>
          <button
            type="button"
            onClick={() => setTab("recovery")}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
              tab === "recovery" 
                ? "bg-[#232732] text-zinc-100 shadow-sm" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Recuperar
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {tab === "register" && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Carlos Oliveira"
                className="w-full bg-[#14161d] border border-[#262a36] rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              E-mail Corporativo
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@empresa.com"
              className="w-full bg-[#14161d] border border-[#262a36] rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {tab !== "recovery" && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  Senha
                </label>
                {tab === "login" && (
                  <button
                    type="button"
                    onClick={() => setTab("recovery")}
                    className="text-[11px] text-amber-500/80 hover:text-amber-400 transition-colors"
                  >
                    Esqueceu?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha secreta"
                className="w-full bg-[#14161d] border border-[#262a36] rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          )}

          {tab === "register" && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Função no Sistema
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-[#14161d] border border-[#262a36] rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option value="admin">Administrador (Acesso Total + Banco de Dados)</option>
                <option value="manager">Gerente SaaS (Métricas e Assinaturas)</option>
                <option value="cashier">Operador de Caixa (PDV e Vendas)</option>
              </select>
            </div>
          )}

          {error && (
            <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs tracking-wide shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : tab === "login" ? (
              "Entrar com Credenciais"
            ) : tab === "register" ? (
              "Concluir Cadastro & Conectar"
            ) : (
              "Enviar Link de Recuperação"
            )}
          </button>
        </form>

        {/* Quick Demo Access */}
        <div className="mt-5 pt-4 border-t border-[#232730]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 text-center mb-2.5">
            Acesso Rápido de Demonstração
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("admin")}
              className="py-2 px-3 rounded-lg bg-[#151820] border border-[#262b37] hover:border-amber-500/40 text-left transition-colors group"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[11px] font-medium text-zinc-200 group-hover:text-amber-400 transition-colors">
                  Owner / Admin
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 block mt-0.5">SaaS + PDV + BD</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("cashier")}
              className="py-2 px-3 rounded-lg bg-[#151820] border border-[#262b37] hover:border-emerald-500/40 text-left transition-colors group"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                  Operador PDV
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 block mt-0.5">Caixa & Checkout</span>
            </button>
          </div>
        </div>

        {/* Footer Database Sync Indicator */}
        <div className="mt-4 pt-3 border-t border-[#232730] flex items-center justify-between text-[10px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Banco: <strong className="text-zinc-300">{dbConfig.provider}</strong></span>
          </div>
          <span className="font-mono text-zinc-400">{dbConfig.latencyMs}ms · SSL Ativo</span>
        </div>
      </div>
    </div>
  );
};