import React from "react";
import { AdminRole } from "../../types/admin";

export const AdminRoles: React.FC = () => {
  const rolesList: {
    id: AdminRole;
    name: string;
    level: number;
    description: string;
    mfaRequired: boolean;
    permissions: string[];
  }[] = [
    {
      id: "owner",
      name: "Owner (Proprietário Global)",
      level: 1,
      description: "Acesso total irrestrito à infraestrutura, banco PostgreSQL, chaves de API e provisionamento de administradores.",
      mfaRequired: true,
      permissions: [
        "Acesso Irrestrito",
        "Gerenciar Hyperdrive & DB",
        "Provisionar WLC Admins",
        "Configurações Globais",
        "Ver Trilha de Auditoria Total",
        "Revogação Massiva de Sessões",
      ],
    },
    {
      id: "wlc_admin",
      name: "Administrador WLC",
      level: 2,
      description: "Gestão operacional e técnica autorizada de toda a plataforma multi-tenant.",
      mfaRequired: true,
      permissions: [
        "Gerenciar Todas as Empresas",
        "Gerenciar Usuários Globais",
        "Ver Métricas e Sessões",
        "Configurar Políticas de Segurança",
        "Auditoria de Acesso",
      ],
    },
    {
      id: "enterprise_admin",
      name: "Administrador Empresarial",
      level: 3,
      description: "Administração completa da sua própria organização e dos seus membros.",
      mfaRequired: true,
      permissions: [
        "Gerenciar Membros da Empresa",
        "Configurar Domínio & Whitelist",
        "Emitir Cobranças PIX",
        "Ver Sessões da Empresa",
        "Logs de Auditoria da Empresa",
      ],
    },
    {
      id: "manager",
      name: "Gerente Operacional",
      level: 4,
      description: "Supervisão de operações diárias, relatórios financeiros e automações de fluxo.",
      mfaRequired: false,
      permissions: [
        "Acessar Financeiro & PIX",
        "Operar Growth CRM",
        "Gerenciar Automações n8n",
        "Relatórios de Performance",
      ],
    },
    {
      id: "operator",
      name: "Operador de Sistema",
      level: 5,
      description: "Execução pontual de tarefas operacionais, vendas no PDV e atendimento com IA.",
      mfaRequired: false,
      permissions: [
        "Operar PDV Express",
        "Interagir com Bots Cognitivos",
        "Visualizar Leads Atribuídos",
      ],
    },
    {
      id: "client",
      name: "Cliente / Usuário Final",
      level: 6,
      description: "Acesso estritamente isolado à sua própria conta, extratos e assinaturas.",
      mfaRequired: false,
      permissions: [
        "Visualizar Própria Assinatura",
        "Histórico de Pagamentos PIX",
        "Alterar Própria Senha",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans tracking-tight">
            Cargos & Matriz RBAC 2.0
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Hierarquia de 6 níveis com permissões verificadas no servidor (PostgreSQL) para impedir escalonamento de privilégios.
          </p>
        </div>
      </div>

      {/* Matriz de Perfis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rolesList.map((r) => (
          <div
            key={r.id}
            className="p-5 rounded-xl bg-[#0c0d13] border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                  NÍVEL {r.level}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    r.mfaRequired
                      ? "bg-rose-950/60 text-rose-300 border border-rose-800/60"
                      : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                  }`}
                >
                  {r.mfaRequired ? "MFA Obrigatório" : "MFA Opcional"}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-zinc-100">{r.name}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{r.description}</p>
            </div>

            <div className="pt-3 border-t border-zinc-900 space-y-2">
              <div className="text-[11px] font-mono text-zinc-500 uppercase">Capacidades Autorizadas:</div>
              <ul className="space-y-1 text-xs">
                {r.permissions.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-zinc-300">
                    <span className="text-emerald-400 text-xs">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Informações de Proteção de Escalonamento */}
      <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-400 font-sans space-y-2">
        <div className="font-semibold text-zinc-200">Garantias de Segurança RBAC do Servidor:</div>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          1. Todas as rotas administrativas sob <code className="text-zinc-300">/admin/*</code> e <code className="text-zinc-300">/api/admin/*</code> exigem validação de sessão em cada requisição.<br />
          2. Nenhum usuário pode atribuir um cargo de hierarquia igual ou superior à sua própria.<br />
          3. O cargo <strong>Owner</strong> só pode ser provisionado através de chave mestre criptografada ou inicialização de banco protegida.<br />
          4. O isolamento multi-tenant utiliza cláusulas de <code className="text-zinc-300">organization_id</code> forçadas nas queries SQL.
        </p>
      </div>
    </div>
  );
};