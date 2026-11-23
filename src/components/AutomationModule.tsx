import React, { useState } from "react";
import { AutomationWorkflow, WorkflowNode } from "../types/enterprise";
import {
  Workflow, Activity, Play, Pause, RefreshCw, CheckCircle2,
  Clock, AlertCircle, ChevronRight, Layers, ExternalLink, Zap
} from "lucide-react";

const INITIAL_NODES: WorkflowNode[] = [
  { id: "node-1", label: "Webhook Gatilho (Novo Lead)", type: "trigger", service: "n8n", status: "ok", x: 40, y: 120, description: "POST /webhook/v1/lead-ingest autenticado com HMAC" },
  { id: "node-2", label: "Cognitive AI (Qualificação Lead)", type: "condition", service: "ai", status: "ok", x: 260, y: 120, description: "Enriquecimento, scoring MQL e decisão de rota comercial" },
  { id: "node-3", label: "WLC PIX (Geração de Cobrança)", type: "action", service: "pix", status: "ok", x: 490, y: 60, description: "Emissão de PIX dinâmico com expiração de 30 minutos" },
  { id: "node-4", label: "Disparo WhatsApp & Email", type: "integration", service: "email", status: "ok", x: 720, y: 60, description: "Envio de QR Code + chave copia e cola humanizada" },
  { id: "node-5", label: "Auditoria & Sincronização CRM", type: "action", service: "crm", status: "ok", x: 720, y: 180, description: "Atualização da etapa no Kanban e agendamento de follow-up" },
];

const INITIAL_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: "wf-1",
    name: "Automação Completa: Lead → Cognitive → PIX Instantâneo",
    trigger: "Webhook: POST /webhook/lead-captured",
    status: "active",
    executionsCount: 3840,
    successRate: 99.4,
    avgDurationMs: 420,
    lastExecution: "Há 2 minutos",
    nodes: INITIAL_NODES,
  },
  {
    id: "wf-2",
    name: "Recuperação Ativa de PIX Abandonado (Remarketing)",
    trigger: "Cron: a cada 10 minutos (checar pendências > 15m)",
    status: "active",
    executionsCount: 1420,
    successRate: 98.8,
    avgDurationMs: 310,
    lastExecution: "Há 8 minutos",
    nodes: [],
  },
  {
    id: "wf-3",
    name: "Sincronização Bidirecional de Vendas PDV & SaaS",
    trigger: "Evento Realtime: pdv_sales_completed",
    status: "active",
    executionsCount: 890,
    successRate: 100,
    avgDurationMs: 180,
    lastExecution: "Há 14 minutos",
    nodes: [],
  }
];

export const AutomationModule: React.FC = () => {
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(INITIAL_WORKFLOWS);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(INITIAL_NODES[0] || null);
  const [n8nStatus, setN8nStatus] = useState<"connected" | "connecting">("connected");

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev =>
      prev.map(w => (w.id === id ? { ...w, status: w.status === "active" ? "inactive" : "active" } : w))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-100 font-mono">
              WLC N8N INTELLIGENCE & FLOW MAP
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
              ORQUESTRADOR
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Motor de fluxos visuais, webhooks autenticados e automações sincronizadas com sua instância n8n.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-zinc-100" />
            <span>n8n Core: Ativo (Latência: 48ms)</span>
          </div>
        </div>
      </div>

      {/* Visual Flow Map */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-zinc-300" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold">
              WLC FLOW MAP — MAPEAMENTO DINÂMICO DO WORKFLOW PRINCIPAL
            </h2>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">Clique nos nós para inspecionar</span>
        </div>

        {/* Canvas Area */}
        <div className="relative border border-zinc-900 bg-zinc-900/30 rounded-xl p-6 min-h-[260px] overflow-x-auto">
          <div className="flex items-center justify-between min-w-[780px] relative">
            {INITIAL_NODES.map((node, i) => (
              <div key={node.id} className="flex items-center">
                {/* Node Box */}
                <div
                  onClick={() => setSelectedNode(node)}
                  className={"p-3 rounded-xl border transition-all cursor-pointer w-44 shadow-sm " + (selectedNode?.id === node.id ? "bg-zinc-800 border-zinc-100 ring-1 ring-zinc-100" : "bg-zinc-950 border-zinc-800 hover:border-zinc-700")}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-400 mb-1">
                    <span>{node.type}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                  </div>
                  <div className="font-semibold text-xs text-zinc-100 leading-snug">
                    {node.label}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 mt-2 flex items-center justify-between">
                    <span>{node.service}</span>
                    <span className="text-zinc-300 font-bold">OK</span>
                  </div>
                </div>

                {/* Arrow connector */}
                {i < INITIAL_NODES.length - 1 && (
                  <div className="px-2 flex items-center text-zinc-600">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Node Inspector */}
        {selectedNode && (
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-zinc-300">
              <span className="font-bold text-zinc-100">INSPEÇÃO DO NÓ: {selectedNode.label}</span>
              <span className="text-[11px] text-zinc-400">Serviço: {selectedNode.service.toUpperCase()}</span>
            </div>
            <p className="text-zinc-400 font-sans text-xs">{selectedNode.description}</p>
          </div>
        )}
      </div>

      {/* Workflows Management Table */}
      <div className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400">
          Workflows Ativos na Instância n8n
        </h3>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/90 text-zinc-400 font-mono text-[11px] uppercase border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Nome do Fluxo</th>
                <th className="py-3 px-4">Gatilho</th>
                <th className="py-3 px-4">Execuções</th>
                <th className="py-3 px-4">Sucesso</th>
                <th className="py-3 px-4">Duração Média</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono text-zinc-300">
              {workflows.map(wf => (
                <tr key={wf.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-zinc-100">
                    {wf.name}
                  </td>
                  <td className="py-3 px-4 text-zinc-400 text-[11px]">
                    {wf.trigger}
                  </td>
                  <td className="py-3 px-4 text-zinc-200">
                    {wf.executionsCount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-zinc-100 font-bold">
                    {wf.successRate}%
                  </td>
                  <td className="py-3 px-4 text-zinc-400">
                    {wf.avgDurationMs}ms
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleWorkflow(wf.id)}
                      className={"py-1 px-3 rounded text-xs transition-colors " + (wf.status === "active" ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-100" : "bg-zinc-900 text-zinc-500")}
                    >
                      {wf.status === "active" ? "Pausar" : "Ativar"}
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