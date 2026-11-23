import React, { useState } from "react";
import { SaasSubscription } from "../types/system";

const INITIAL_SUBSCRIPTIONS: SaasSubscription[] = [
  {
    id: "sub-101",
    customerName: "Nubank FinTech Labs",
    customerEmail: "ops@nubank.com.br",
    plan: "Enterprise",
    mrr: 14800,
    status: "active",
    billingCycle: "yearly",
    nextBillingDate: "15/12/2026",
  },
  {
    id: "sub-102",
    customerName: "Loggi Entregas Rápidas",
    customerEmail: "tech@loggi.com",
    plan: "Enterprise",
    mrr: 9600,
    status: "active",
    billingCycle: "monthly",
    nextBillingDate: "01/12/2026",
  },
  {
    id: "sub-103",
    customerName: "Cora Banco PJ",
    customerEmail: "eng@cora.com.br",
    plan: "Professional",
    mrr: 3800,
    status: "active",
    billingCycle: "monthly",
    nextBillingDate: "28/11/2026",
  },
  {
    id: "sub-104",
    customerName: "QuintoAndar Imóveis",
    customerEmail: "dev@quintoandar.com.br",
    plan: "Enterprise",
    mrr: 16500,
    status: "active",
    billingCycle: "yearly",
    nextBillingDate: "20/12/2026",
  },
  {
    id: "sub-105",
    customerName: "Vtex Commerce Brasil",
    customerEmail: "billing@vtex.com",
    plan: "Professional",
    mrr: 4500,
    status: "trial",
    billingCycle: "monthly",
    nextBillingDate: "05/12/2026",
  },
  {
    id: "sub-106",
    customerName: "Stone Pagamentos",
    customerEmail: "infra@stone.com.br",
    plan: "Enterprise",
    mrr: 18900,
    status: "active",
    billingCycle: "yearly",
    nextBillingDate: "10/01/2027",
  },
];

export const SaasDashboard: React.FC = () => {
  const [subscriptions] = useState<SaasSubscription[]>(INITIAL_SUBSCRIPTIONS);
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = subscriptions.filter((s) => {
    const matchesPlan = filterPlan === "all" || s.plan.toLowerCase() === filterPlan.toLowerCase();
    const matchesSearch = s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPlan && matchesSearch;
  });

  const totalMrr = subscriptions.reduce((acc, curr) => acc + (curr.status === "active" ? curr.mrr : 0), 0);
  const totalArr = totalMrr * 12;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#232732]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              Módulo SaaS Enterprise
            </span>
            <span className="text-[11px] text-zinc-400 font-mono">Realtime Sync On</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight mt-1">
            Gestão de Assinaturas & Métricas Recorrentes
          </h1>
          <p className="text-xs text-zinc-400">
            Painel de controle financeiro com dados integrados ao Lovable Cloud DB
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="py-2 px-3.5 rounded-xl bg-[#14161d] hover:bg-[#1a1e28] border border-[#262a36] text-xs font-medium text-zinc-200 transition-colors">
            📥 Exportar Relatório (CSV)
          </button>
          <button className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs tracking-wide shadow-md transition-all">
            + Nova Assinatura
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MRR */}
        <div className="p-5 rounded-2xl bg-[#0f1115] border border-[#232732] relative overflow-hidden group hover:border-[#2f3545] transition-all">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            MRR (Receita Mensal)
          </div>
          <div className="text-2xl font-bold text-zinc-100 mt-2 font-mono">
            R$ {totalMrr.toLocaleString("pt-BR")},00
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-medium">
            <span>↑ 18.4%</span>
            <span className="text-zinc-400">vs. mês anterior</span>
          </div>
        </div>

        {/* ARR */}
        <div className="p-5 rounded-2xl bg-[#0f1115] border border-[#232732] relative overflow-hidden group hover:border-[#2f3545] transition-all">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            ARR (Receita Anual Projetada)
          </div>
          <div className="text-2xl font-bold text-amber-400 mt-2 font-mono">
            R$ {(totalArr / 1000).toFixed(1)}k
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-medium">
            <span>↑ 24.1%</span>
            <span className="text-zinc-400">crescimento acelerado</span>
          </div>
        </div>

        {/* Clientes Ativos */}
        <div className="p-5 rounded-2xl bg-[#0f1115] border border-[#232732] relative overflow-hidden group hover:border-[#2f3545] transition-all">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Assinaturas Ativas
          </div>
          <div className="text-2xl font-bold text-zinc-100 mt-2 font-mono">
            842 <span className="text-xs font-normal text-zinc-400">empresas</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-medium">
            <span>99.2%</span>
            <span className="text-zinc-400">retenção líquida</span>
          </div>
        </div>

        {/* Churn */}
        <div className="p-5 rounded-2xl bg-[#0f1115] border border-[#232732] relative overflow-hidden group hover:border-[#2f3545] transition-all">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
            Taxa de Churn
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-2 font-mono">
            0.6%
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-zinc-400">
            <span>Benchmark saudável (&lt; 2%)</span>
          </div>
        </div>
      </div>

      {/* Receita por Mês - Gráfico Minimalista */}
      <div className="p-6 rounded-2xl bg-[#0f1115] border border-[#232732]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-zinc-100 text-sm">Evolução de MRR nos Últimos 6 Meses</h3>
            <p className="text-[11px] text-zinc-400">Expansão de contas enterprise com zero churn involuntário</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
            + R$ 24.300 no trimestre
          </span>
        </div>

        <div className="grid grid-cols-6 gap-3 items-end h-36 pt-6 border-b border-[#232732]">
          {[
            { month: "Jun", val: 52, valTxt: "R$ 52k" },
            { month: "Jul", val: 58, valTxt: "R$ 58k" },
            { month: "Ago", val: 64, valTxt: "R$ 64k" },
            { month: "Set", val: 71, valTxt: "R$ 71k" },
            { month: "Out", val: 78, valTxt: "R$ 78k" },
            { month: "Nov", val: 88, valTxt: "R$ 88k" },
          ].map((bar, i) => (
            <div key={bar.month} className="flex flex-col items-center gap-2 group">
              <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
                {bar.valTxt}
              </span>
              <div className="w-full bg-[#181a22] rounded-t-lg overflow-hidden h-24 flex items-end">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    i === 5 ? "bg-gradient-to-t from-amber-600 to-amber-400" : "bg-[#272b38] group-hover:bg-[#343a4c]"
                  }`}
                  style={{ height: `${bar.val}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-zinc-400">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela de Assinaturas */}
      <div className="p-6 rounded-2xl bg-[#0f1115] border border-[#232732]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#232732]">
          <div>
            <h3 className="font-semibold text-zinc-100 text-sm">Contratos e Assinaturas Ativas</h3>
            <p className="text-[11px] text-zinc-400">Listagem de clientes com faturamento recorrente ativo</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#14161d] border border-[#262a36] rounded-xl px-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="bg-[#14161d] border border-[#262a36] rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
            >
              <option value="all">Todos os Planos</option>
              <option value="enterprise">Enterprise</option>
              <option value="professional">Professional</option>
              <option value="starter">Starter</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#232732] text-zinc-400 font-mono text-[10px] uppercase">
                <th className="pb-3 font-medium">Cliente</th>
                <th className="pb-3 font-medium">Plano</th>
                <th className="pb-3 font-medium">MRR</th>
                <th className="pb-3 font-medium">Ciclo</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Próx. Cobrança</th>
                <th className="pb-3 font-medium text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1e27]">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#13151c] transition-colors group">
                  <td className="py-3.5">
                    <div className="font-medium text-zinc-200">{sub.customerName}</div>
                    <div className="text-[11px] text-zinc-400 font-mono">{sub.customerEmail}</div>
                  </td>
                  <td className="py-3.5">
                    <span className="font-mono px-2 py-0.5 rounded-full bg-[#181a22] border border-[#272b38] text-zinc-300">
                      {sub.plan}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono font-semibold text-zinc-100">
                    R$ {sub.mrr.toLocaleString("pt-BR")},00
                  </td>
                  <td className="py-3.5 text-zinc-400 capitalize">
                    {sub.billingCycle === "yearly" ? "Anual (-20%)" : "Mensal"}
                  </td>
                  <td className="py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                      sub.status === "active"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}>
                      <span className="w-1 h-1 rounded-full bg-current" />
                      {sub.status === "active" ? "Ativo" : "Em Trial"}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-zinc-400">{sub.nextBillingDate}</td>
                  <td className="py-3.5 text-right">
                    <button className="text-[11px] text-zinc-400 hover:text-amber-400 font-mono p-1 rounded hover:bg-[#1c202a] transition-colors">
                      Gerenciar ↗
                    </button>
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