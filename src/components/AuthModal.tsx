import React, { useState } from "react";
import { SystemUser, DatabaseConfig } from "../types/system";
import { supabaseSignIn, supabaseSignUp } from "../utils/supabaseAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: SystemUser) => void;
  dbConfig: DatabaseConfig;
  onOpenDbConfig?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  dbConfig,
  onOpenDbConfig,
}) => {
  const [tab, setTab] = useState<"login" | "register" | "recovery">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"admin" | "manager" | "cashier">("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const hasConfig = Boolean(dbConfig.endpoint && dbConfig.anonKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve conter no mínimo 6 caracteres.");
      return;
    }

    if (!hasConfig) {
      setError("Configure a URL e a Chave Anon do Supabase nas Configurações de Banco para autenticar contas reais.");
      return;
    }

    setLoading(true);

    try {
      if (tab === "register") {
        if (!name.trim()) {
          setError("Informe seu nome completo para o cadastro.");
          setLoading(false);
          return;
        }

        const res = await supabaseSignUp(dbConfig.endpoint, dbConfig.anonKey!, {
          email,
          password,
          name,
          role,
        });

        setSuccessMessage("Conta criada com sucesso no Supabase!");
        onLoginSuccess(res.user);
        setTimeout(onClose, 800);
      } else if (tab === "login") {
        const res = await supabaseSignIn(dbConfig.endpoint, dbConfig.anonKey!, {
          email,
          password,
        });

        onLoginSuccess(res.user);
        onClose();
      } else if (tab === "recovery") {
        setSuccessMessage("Se o e-mail estiver cadastrado, as instruções foram enviadas.");
      }
    } catch (err: any) {
      setError(err.message || "Falha na autenticação. Verifique os dados digitados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <h3 className="font-medium text-zinc-100 text-sm tracking-tight">
              {tab === "login" && "Acessar Sistema WLC"}
              {tab === "register" && "Criar Nova Conta Real"}
              {tab === "recovery" && "Recuperação de Acesso"}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Autenticação integrada ao Supabase
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
          >
            ✕
          </button>
        </div>

        {!hasConfig && (
          <div className="mt-4 p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs flex flex-col gap-1.5">
            <div className="font-medium text-zinc-200">Supabase não configurado</div>
            <div className="text-[11px] text-zinc-400">
              Insira a URL e a Chave Anon nas configurações do banco para autenticar contas reais.
            </div>
            {onOpenDbConfig && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDbConfig();
                }}
                className="self-start text-[11px] font-semibold underline text-white hover:text-zinc-300"
              >
                Abrir Configurações do Banco →
              </button>
            )}
          </div>
        )}

        <div className="flex gap-1 p-1 mt-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <button
            type="button"
            onClick={() => { setTab("login"); setError(null); }}
            className={"flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors " + (tab === "login" ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-400 hover:text-zinc-200")}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => { setTab("register"); setError(null); }}
            className={"flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors " + (tab === "register" ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-400 hover:text-zinc-200")}
          >
            Cadastrar
          </button>
          <button
            type="button"
            onClick={() => { setTab("recovery"); setError(null); }}
            className={"flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors " + (tab === "recovery" ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-400 hover:text-zinc-200")}
          >
            Recuperar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {tab === "register" && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                placeholder="Seu Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {tab !== "recovery" && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Senha
              </label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
          )}

          {tab === "register" && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Nível de Acesso (Perfil)
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
              >
                <option value="admin">Administrador (Owner)</option>
                <option value="manager">Gerente Operacional</option>
                <option value="cashier">Operador de Caixa (PDV)</option>
              </select>
            </div>
          )}

          {error && (
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <span className="w-3.5 h-3.5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />}
            <span>
              {tab === "login" && "Entrar no Sistema"}
              {tab === "register" && "Criar Conta Real"}
              {tab === "recovery" && "Enviar Link de Redefinição"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};