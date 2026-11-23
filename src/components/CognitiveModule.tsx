import React, { useState } from "react";
import { CognitiveAgent, CognitiveMessage } from "../types/enterprise";
import {
  Bot, Sparkles, Send, CheckCircle2, Clock, MessageSquare,
  ShieldCheck, RefreshCw, ChevronRight, Zap, DollarSign, Calendar
} from "lucide-react";

const AGENTS: CognitiveAgent[] = [
  {
    id: "sales",
    role: "sales",
    name: "Cognitive Sales",
    title: "Atendimento Comercial & Qualificação",
    description: "Identificação de dores, apresentação de planos sob medida e qualificação MQL de oportunidades.",
    activeConversations: 14,
    resolvedToday: 82,
    accuracyRate: 99.2,
    status: "active",
    authorizedTools: ["CRM.updateStage", "PIX.generateOffer", "Calendar.checkAvailability"]
  },
  {
    id: "finance",
    role: "finance",
    name: "Cognitive Finance",
    title: "Cobranças, Vencimentos & PIX",
    description: "Consulta de transações, reemissão de chaves PIX, conciliação e suporte a faturas em aberto.",
    activeConversations: 8,
    resolvedToday: 64,
    accuracyRate: 99.8,
    status: "active",
    authorizedTools: ["PIX.getStatus", "PIX.reemitCode", "Finance.getStatement"]
  },
  {
    id: "recovery",
    role: "recovery",
    name: "Cognitive Recovery",
    title: "Recuperação Ativa & Remarketing",
    description: "Abordagem contextual para carrinhos e cobranças abandonadas, respeitando horários e consentimento.",
    activeConversations: 19,
    resolvedToday: 51,
    accuracyRate: 98.4,
    status: "busy",
    authorizedTools: ["PIX.checkPending", "WhatsApp.sendOffer", "CRM.addTag"]
  },
  {
    id: "support",
    role: "support",
    name: "Cognitive Support",
    title: "Suporte Técnico & Resolução Rápida",
    description: "Esclarecimento de dúvidas sobre APIs, integrações n8n, endpoints e configurações do sistema.",
    activeConversations: 6,
    resolvedToday: 110,
    accuracyRate: 99.0,
    status: "active",
    authorizedTools: ["System.docsSearch", "Logs.inspectRecent", "Ticket.escalate"]
  },
  {
    id: "scheduling",
    role: "scheduling",
    name: "Cognitive Scheduling",
    title: "Agendamento Executivo & Onboarding",
    description: "Coordenação de horários para demonstrações ao vivo e reuniões de alinhamento técnico.",
    activeConversations: 3,
    resolvedToday: 29,
    accuracyRate: 100,
    status: "idle",
    authorizedTools: ["Calendar.bookSlot", "Email.sendInvite", "CRM.notifyOwner"]
  },
  {
    id: "manager",
    role: "manager",
    name: "Cognitive Manager",
    title: "Inteligência Gerencial & Alertas",
    description: "Consolidação de métricas, diagnóstico de gargalos operacionais e recomendações estratégicas.",
    activeConversations: 1,
    resolvedToday: 18,
    accuracyRate: 99.5,
    status: "idle",
    authorizedTools: ["Metrics.aggregateDaily", "Alerts.broadcast", "Report.exportDRE"]
  }
];

export const CognitiveModule: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<CognitiveAgent>(AGENTS[0]!);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<CognitiveMessage[]>([
    {
      id: "msg-1",
      agentId: "sales",
      role: "assistant",
      content: "Olá! Sou o agente especializado em vendas do WLC System. Estou analisando os leads que entraram na última hora. Como posso auxiliar sua equipe agora?",
      timestamp: "18:30"
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: CognitiveMessage = {
      id: "msg-" + Date.now(),
      agentId: selectedAgent.id,
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString().slice(0, 5)
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Contextual bot response
    setTimeout(() => {
      let reply = "";
      if (selectedAgent.role === "sales") {
        reply = "Entendido. Consultei a base do CRM: temos 4 oportunidades em estágio de qualificação MQL com score acima de 85. Deseja disparar a proposta com geração automática de PIX?";
      } else if (selectedAgent.role === "finance") {
        reply = "Verificação de cobranças concluída. No momento, o webhook do PIX está 100% sincronizado (latência 35ms) e R$ 2.340,00 foram liquidados com sucesso nos últimos 40 minutos.";
      } else if (selectedAgent.role === "recovery") {
        reply = "Campanha de recuperação ativada: 3 cobranças próximas ao vencimento foram identificadas e notificadas pelo canal autorizado. Aguardando retorno dos clientes.";
      } else {
        reply = "Recebi sua diretriz e acionei as ferramentas autorizadas para processar esta solicitação. Contexto gravado no histórico unificado do projeto.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: "msg-" + (Date.now() + 1),
          agentId: selectedAgent.id,
          role: "assistant",
          content: reply,
          timestamp: new Date().toLocaleTimeString().slice(0, 5)
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-100 font-mono">
              WLC COGNITIVE — AGENTES INTELIGENTES HUMANIZADOS
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
              6 AGENTES ATIVOS
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Inteligência artificial contextual com memória operacional, limites seguros e integração ao CRM, PIX e n8n.
          </p>
        </div>
      </div>

      {/* Agents Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {AGENTS.map(agent => (
          <div
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className={"p-4 rounded-xl border transition-all cursor-pointer space-y-2 " + (selectedAgent.id === agent.id ? "bg-zinc-900 border-zinc-100 ring-1 ring-zinc-100 shadow-md" : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700")}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-100">{agent.name}</span>
              <span className={"inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded " + (agent.status === "active" ? "bg-zinc-800 text-zinc-200 border border-zinc-700" : "bg-zinc-950 text-zinc-400 border border-zinc-800")}>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-100" />
                {agent.status}
              </span>
            </div>
            <div className="text-xs text-zinc-300 font-medium">{agent.title}</div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">{agent.description}</p>
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>{agent.activeConversations} em atendimento</span>
              <span className="text-zinc-200 font-bold">{agent.resolvedToday} resolvidos hoje</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Chat Console for Selected Agent */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 flex flex-col h-[520px] shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-zinc-100">
              {selectedAgent.name.charAt(10)}
            </div>
            <div>
              <div className="font-semibold text-xs text-zinc-100 font-mono flex items-center gap-2">
                <span>{selectedAgent.name}</span>
                <span className="text-[10px] font-normal text-zinc-400">({selectedAgent.title})</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-500">
                Ferramentas: {selectedAgent.authorizedTools.join(" · ")}
              </div>
            </div>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
          {messages.map(m => (
            <div
              key={m.id}
              className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={"max-w-[80%] rounded-xl p-3.5 space-y-1 " + (m.role === "user" ? "bg-zinc-100 text-zinc-950 font-medium shadow-sm" : "bg-zinc-900 border border-zinc-800 text-zinc-200")}
              >
                <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between gap-4">
                  <span>{m.role === "user" ? "Você (Operador)" : selectedAgent.name}</span>
                  <span>{m.timestamp}</span>
                </div>
                <div className="leading-relaxed">{m.content}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-400 text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                <span className="text-[10px] font-mono">{selectedAgent.name} processando...</span>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900/60 border-t border-zinc-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={"Instruir ou consultar " + selectedAgent.name + "..."}
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
          />
          <button
            type="submit"
            className="py-2.5 px-4 bg-zinc-100 hover:bg-white text-zinc-950 rounded-lg font-medium text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
};