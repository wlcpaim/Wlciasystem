import React, { useState, useMemo } from "react";
import { CrmLead, LeadStage } from "../types/enterprise";
import {
  Users, Layers, ArrowUpRight, Filter, Search, Plus,
  ChevronRight, Clock, DollarSign, CheckCircle2, AlertCircle,
  MessageSquare, Sparkles, Send
} from "lucide-react";

const INITIAL_LEADS: CrmLead[] = [
  {
    id: "lead-1",
    name: "Guilherme Siqueira",
    company: "Siqueira & Associados Fintech",
    email: "guilherme@siqueirafintech.com",
    phone: "(11) 98765-1122",
    stage: "lead",
    value: 2800,
    score: 88,
    owner: "Cognitive Sales",
    origin: "Google Search Ads (B2B)",
    campaign: "Q4 High-Intent SaaS",
    tags: ["Decisor", "Fintech", "PIX Automation"],
    createdAt: "2026-11-23 10:15",
    updatedAt: "2026-11-23 11:30",
    lastInteraction: "Pesquisa de planos Enterprise concluída",
    pixCount: 0
  },
  {
    id: "lead-2",
    name: "Beatriz Nogueira",
    company: "OmniLog Logística",
    email: "beatriz@omnilog.com.br",
    phone: "(41) 99123-4567",
    stage: "qualified",
    value: 4500,
    score: 95,
    owner: "Cognitive Sales",
    origin: "Indicação Parceiro",
    campaign: "Network VIP",
    tags: ["Logística", "Multi-filial", "n8n Demand"],
    createdAt: "2026-11-23 12:40",
    updatedAt: "2026-11-23 14:10",
    lastInteraction: "Demonstração de integração n8n agendada",
    pixCount: 0
  },
  {
    id: "lead-3",
    name: "Marcio Prado",
    company: "Prado & Filhos Atacadista",
    email: "marcio@pradoatacado.com.br",
    phone: "(31) 98877-6655",
    stage: "opportunity",
    value: 6200,
    score: 92,
    owner: "Atendente Humano (Carlos)",
    origin: "Landing Page",
    campaign: "Comparativo Concorrentes",
    tags: ["PDV + ERP", "Volume Alto"],
    createdAt: "2026-11-23 09:20",
    updatedAt: "2026-11-23 16:00",
    lastInteraction: "Proposta comercial enviada com condições especiais",
    pixCount: 0
  },
  {
    id: "lead-4",
    name: "Juliana Vargas",
    company: "Vargas Medical Tech",
    email: "juliana@vargasmed.com",
    phone: "(21) 97788-9900",
    stage: "pix_generated",
    value: 3200,
    score: 85,
    owner: "Cognitive Recovery",
    origin: "Atendimento Cognitive",
    campaign: "Retargeting Abandon",
    tags: ["PIX Pendente", "Recuperação Ativa"],
    createdAt: "2026-11-23 15:00",
    updatedAt: "2026-11-23 18:10",
    lastInteraction: "QR Code PIX enviado no WhatsApp há 25 minutos",
    pixCount: 1
  },
  {
    id: "lead-5",
    name: "Eduardo Brandão",
    company: "Brandão Distribuidora",
    email: "eduardo@brandao.ind.br",
    phone: "(19) 98443-2211",
    stage: "won",
    value: 8400,
    score: 100,
    owner: "Cognitive Sales",
    origin: "LinkedIn Ads",
    campaign: "Enterprise Executives",
    tags: ["Cliente Ativo", "Onboarding Iniciado"],
    createdAt: "2026-11-23 08:30",
    updatedAt: "2026-11-23 17:21",
    lastInteraction: "PIX confirmado via Webhook Instantâneo",
    pixCount: 1
  }
];

const STAGES_CONFIG: { id: LeadStage; label: string }[] = [
  { id: "lead", label: "1. Novos Leads" },
  { id: "qualified", label: "2. Qualificados (MQL)" },
  { id: "opportunity", label: "3. Oportunidades" },
  { id: "pix_generated", label: "4. PIX Gerado" },
  { id: "won", label: "5. Convertidos" },
];

export const CrmGrowthModule: React.FC = () => {
  const [leads, setLeads] = useState<CrmLead[]>(INITIAL_LEADS);
  const [viewMode, setViewMode] = useState<"funnel" | "kanban" | "table">("funnel");
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // New Lead Form
  const [newName, setNewName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newValue, setNewValue] = useState("2500");

  const funnelMetrics = useMemo(() => {
    const visitors = 14200;
    const totalLeads = 2480;
    const qualified = 960;
    const opportunities = 420;
    const pixGenerated = 280;
    const converted = 195;
    const totalRevenue = converted * 3200;

    return {
      visitors,
      totalLeads,
      qualified,
      opportunities,
      pixGenerated,
      converted,
      cac: 145.20,
      ltv: 4890.00,
      roi: "8.4x",
      ticketMedio: 3200,
      totalRevenue,
    };
  }, []);

  const handleMoveStage = (leadId: string, newStage: LeadStage) => {
    setLeads(prev =>
      prev.map(l => (l.id === leadId ? { ...l, stage: newStage, updatedAt: new Date().toISOString().replace("T", " ").slice(0, 16) } : l))
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, stage: newStage } : null);
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const val = parseFloat(newValue) || 1500;
    const newL: CrmLead = {
      id: "lead-" + Date.now(),
      name: newName,
      company: newCompany || "Empresa Individual",
      email: newEmail || "contato@empresa.com",
      phone: "(11) 99000-0000",
      stage: "lead",
      value: val,
      score: 75,
      owner: "Cognitive Sales",
      origin: "Inserção Manual CRM",
      campaign: "Manual Entrada",
      tags: ["Novo Lead"],
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      updatedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      lastInteraction: "Criado na plataforma WLC Growth",
      pixCount: 0
    };
    setLeads([newL, ...leads]);
    setIsAddLeadOpen(false);
    setNewName("");
    setNewCompany("");
    setNewEmail("");
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-100 font-mono">
              WLC GROWTH & CONVERSION INTELLIGENCE
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
              CRM 360°
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Funil de conversão de ponta a ponta: do primeiro clique à liquidação de cobrança e expansão do cliente.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="py-2 px-3.5 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded-lg flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Lead</span>
          </button>
        </div>
      </div>

      {/* Top Unit Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs">
          <div className="text-zinc-500 font-mono uppercase text-[10px]">Custo Aquisição (CAC)</div>
          <div className="text-lg font-bold font-mono text-zinc-200 mt-1">R$ {funnelMetrics.cac.toFixed(2)}</div>
        </div>
        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs">
          <div className="text-zinc-500 font-mono uppercase text-[10px]">Life Time Value (LTV)</div>
          <div className="text-lg font-bold font-mono text-zinc-200 mt-1">R$ {funnelMetrics.ltv.toFixed(2)}</div>
        </div>
        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs">
          <div className="text-zinc-500 font-mono uppercase text-[10px]">Retorno ROI</div>
          <div className="text-lg font-bold font-mono text-zinc-100 mt-1">{funnelMetrics.roi}</div>
        </div>
        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs">
          <div className="text-zinc-500 font-mono uppercase text-[10px]">PIX Gerados</div>
          <div className="text-lg font-bold font-mono text-zinc-200 mt-1">{funnelMetrics.pixGenerated}</div>
        </div>
        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs">
          <div className="text-zinc-500 font-mono uppercase text-[10px]">Clientes Ganhos</div>
          <div className="text-lg font-bold font-mono text-zinc-100 mt-1">{funnelMetrics.converted}</div>
        </div>
        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs">
          <div className="text-zinc-500 font-mono uppercase text-[10px]">Receita Funil</div>
          <div className="text-lg font-bold font-mono text-zinc-100 mt-1">R$ 624k</div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2 border-b border-zinc-800">
        <button
          onClick={() => setViewMode("funnel")}
          className={"py-2.5 px-4 text-xs font-medium border-b-2 transition-colors " + (viewMode === "funnel" ? "border-zinc-100 text-zinc-100" : "border-transparent text-zinc-400 hover:text-zinc-200")}
        >
          Visão Macro do Funil
        </button>
        <button
          onClick={() => setViewMode("kanban")}
          className={"py-2.5 px-4 text-xs font-medium border-b-2 transition-colors " + (viewMode === "kanban" ? "border-zinc-100 text-zinc-100" : "border-transparent text-zinc-400 hover:text-zinc-200")}
        >
          Kanban Comercial & Negociações
        </button>
      </div>

      {/* View: Funnel */}
      {viewMode === "funnel" && (
        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                FUNIL COMPLETO DE CONVERSÃO EMPRESARIAL
              </h3>
              <span className="text-[11px] text-zinc-400 font-mono">Deduplicação e Atribuição UTM ativas</span>
            </div>

            {/* Visual Funnel Bars */}
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span>1. Visitantes & Tráfego</span>
                  <span>{funnelMetrics.visitors.toLocaleString()} visitantes (100%)</span>
                </div>
                <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-500 w-full" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span>2. Leads Captados</span>
                  <span>{funnelMetrics.totalLeads.toLocaleString()} leads (17.4%)</span>
                </div>
                <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-400 w-[60%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span>3. Qualificados pelo Cognitive AI</span>
                  <span>{funnelMetrics.qualified.toLocaleString()} MQLs (38.7% do lead)</span>
                </div>
                <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-300 w-[40%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span>4. Oportunidades Comerciais</span>
                  <span>{funnelMetrics.opportunities.toLocaleString()} negociações ativas</span>
                </div>
                <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-200 w-[25%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span>5. Cobranças PIX Geradas</span>
                  <span>{funnelMetrics.pixGenerated} emitidas</span>
                </div>
                <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-100 w-[18%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-zinc-100 font-bold">
                  <span>6. Vendas Confirmadas & Liquidadas</span>
                  <span>{funnelMetrics.converted} clientes ganhos (69.6% de conversão do PIX)</span>
                </div>
                <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[14%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View: Kanban */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-4">
          {STAGES_CONFIG.map(col => {
            const stageLeads = leads.filter(l => l.stage === col.id);
            const stageValue = stageLeads.reduce((acc, l) => acc + l.value, 0);

            return (
              <div key={col.id} className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-3 space-y-3 min-w-[220px]">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                  <span className="font-mono text-xs font-medium text-zinc-200">{col.label}</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 rounded text-zinc-400">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400">
                  R$ {stageValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>

                <div className="space-y-2">
                  {stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="p-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 rounded-lg cursor-pointer transition-colors space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-xs text-zinc-100 truncate">{lead.name}</div>
                        <span className="text-[10px] font-mono text-zinc-400">★ {lead.score}</span>
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate">{lead.company}</div>
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-200 pt-1 border-t border-zinc-900">
                        <span>R$ {lead.value.toLocaleString()}</span>
                        <span className="text-[10px] font-normal text-zinc-500">{lead.owner.split(" ")[0]}</span>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="py-6 text-center text-zinc-600 text-xs">Vazio</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lead 360 Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-5 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-zinc-100">{selectedLead.name}</h3>
                <div className="text-xs text-zinc-400 font-mono">{selectedLead.company} · {selectedLead.email}</div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-zinc-500 hover:text-zinc-200 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">VALOR POTENCIAL</span>
                <span className="font-bold text-zinc-100 text-sm">R$ {selectedLead.value.toLocaleString()}</span>
              </div>
              <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 block text-[10px]">QUALIFICAÇÃO (SCORE)</span>
                <span className="font-bold text-zinc-100 text-sm">★ {selectedLead.score}/100</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-zinc-400 font-mono text-[11px] uppercase">Avançar Etapa Comercial:</div>
              <div className="grid grid-cols-2 gap-1.5">
                {STAGES_CONFIG.map(s => (
                  <button
                    key={s.id}
                    onClick={() => handleMoveStage(selectedLead.id, s.id)}
                    className={"py-1.5 px-2.5 rounded text-left text-xs transition-colors " + (selectedLead.stage === s.id ? "bg-zinc-100 text-zinc-950 font-bold" : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800")}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 text-xs border-t border-zinc-800 pt-3">
              <span className="font-mono text-zinc-400 text-[11px]">Última Interação Cognitiva:</span>
              <div className="p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                {selectedLead.lastInteraction}
              </div>
            </div>

            <div className="flex justify-end border-t border-zinc-800 pt-3">
              <button
                onClick={() => setSelectedLead(null)}
                className="py-1.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateLead}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-semibold text-sm text-zinc-100 font-mono">
                CADASTRAR NOVO LEAD NO CRM
              </h3>
              <button
                type="button"
                onClick={() => setIsAddLeadOpen(false)}
                className="text-zinc-500 hover:text-zinc-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Amanda Albuquerque"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Empresa / Negócio</label>
                <input
                  type="text"
                  placeholder="Albuquerque Tech"
                  value={newCompany}
                  onChange={e => setNewCompany(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="amanda@albuquerque.com"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Valor Estimado da Oportunidade (R$)</label>
                <input
                  type="number"
                  step="100"
                  value={newValue}
                  onChange={e => setNewValue(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 font-mono text-zinc-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddLeadOpen(false)}
                className="py-2 px-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded-lg shadow-sm"
              >
                Salvar Lead
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};