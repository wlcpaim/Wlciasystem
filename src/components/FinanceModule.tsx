import React, { useState, useMemo } from "react";
import { PixTransaction, PixStatus } from "../types/enterprise";
import {
  DollarSign, QrCode, Copy, Check, Filter, Search,
  TrendingUp, TrendingDown, Clock, CheckCircle2,
  XCircle, AlertCircle, FileText, ArrowUpRight, Plus, RefreshCw
} from "lucide-react";

const INITIAL_TRANSACTIONS: PixTransaction[] = [
  {
    id: "pix-1",
    txid: "E60701190202611231800a1",
    customerName: "Carlos Eduardo Silva",
    customerEmail: "carlos.silva@techcorp.com.br",
    customerPhone: "(11) 98765-4321",
    amount: 1450.00,
    status: "paid",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=00020126580014br.gov.bcb.pix0136e60701190202611231800a152040000530398654071450.005802BR5925WLC%20SYSTEM6009SAO%20PAULO62070503***6304ABCD",
    copyPasteCode: "00020126580014br.gov.bcb.pix0136e60701190202611231800a152040000530398654071450.005802BR5925WLC%20SYSTEM6009SAO%20PAULO62070503***6304ABCD",
    createdAt: "2026-11-23 16:30",
    expiresAt: "2026-11-23 17:00",
    paidAt: "2026-11-23 16:34",
    origin: "CRM Proposta Direta",
    campaign: "Q4 Enterprise Closing",
    product: "WLC Enterprise Anual",
    provider: "WLC Pay / Banco Central Instant"
  },
  {
    id: "pix-2",
    txid: "E60701190202611231822b2",
    customerName: "Mariana Alcantara",
    customerEmail: "mariana@inova.io",
    customerPhone: "(21) 97654-3210",
    amount: 890.00,
    status: "paid",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=00020126580014br.gov.bcb.pix0136e60701190202611231822b25204000053039865406890.005802BR5925WLC%20SYSTEM6009SAO%20PAULO62070503***6304EFGH",
    copyPasteCode: "00020126580014br.gov.bcb.pix0136e60701190202611231822b25204000053039865406890.005802BR5925WLC%20SYSTEM6009SAO%20PAULO62070503***6304EFGH",
    createdAt: "2026-11-23 17:15",
    expiresAt: "2026-11-23 17:45",
    paidAt: "2026-11-23 17:21",
    origin: "Landing Page Checkout",
    campaign: "Campanha Black Enterprise",
    product: "Plano Business Mensal",
    provider: "WLC Pay / Banco Central Instant"
  },
  {
    id: "pix-3",
    txid: "E60701190202611231845c3",
    customerName: "Roberto Mendonça",
    customerEmail: "roberto@logistics.com",
    customerPhone: "(31) 98112-9988",
    amount: 3200.00,
    status: "pending",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=00020126580014br.gov.bcb.pix0136e60701190202611231845c352040000530398654073200.005802BR5925WLC%20SYSTEM6009SAO%20PAULO62070503***6304IJKL",
    copyPasteCode: "00020126580014br.gov.bcb.pix0136e60701190202611231845c352040000530398654073200.005802BR5925WLC%20SYSTEM6009SAO%20PAULO62070503***6304IJKL",
    createdAt: "2026-11-23 18:10",
    expiresAt: "2026-11-23 18:40",
    origin: "Atendimento Cognitive Sales",
    campaign: "Remarketing Lead Inativo",
    product: "WLC Custom Setup + 3 Nodes",
    provider: "WLC Pay / Banco Central Instant"
  },
  {
    id: "pix-4",
    txid: "E60701190202611231610d4",
    customerName: "Fernanda Guimarães",
    customerEmail: "fernanda@guimaraesadv.com.br",
    customerPhone: "(41) 99233-4455",
    amount: 540.00,
    status: "expired",
    qrCodeUrl: "",
    copyPasteCode: "00020126580014br.gov.bcb.pix0136expired",
    createdAt: "2026-11-23 14:00",
    expiresAt: "2026-11-23 14:30",
    origin: "Checkout Abandonado",
    campaign: "Anúncio Meta Ads B2B",
    product: "WLC Lite Anual",
    provider: "WLC Pay"
  }
];

export const FinanceModule: React.FC = () => {
  const [transactions, setTransactions] = useState<PixTransaction[]>(INITIAL_TRANSACTIONS);
  const [filterStatus, setFilterStatus] = useState<PixStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "pix" | "dre">("overview");
  const [selectedTx, setSelectedTx] = useState<PixTransaction | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  // New PIX Form modal
  const [isNewPixOpen, setIsNewPixOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newProduct, setNewProduct] = useState("WLC Enterprise Plan");

  // Metrics
  const metrics = useMemo(() => {
    const paid = transactions.filter(t => t.status === "paid");
    const pending = transactions.filter(t => t.status === "pending");
    const expired = transactions.filter(t => t.status === "expired");
    const totalGenerated = transactions.reduce((acc, t) => acc + t.amount, 0);
    const totalPaid = paid.reduce((acc, t) => acc + t.amount, 0);
    const totalPending = pending.reduce((acc, t) => acc + t.amount, 0);
    const conversionRate = transactions.length > 0 ? (paid.length / transactions.length) * 100 : 0;
    const ticketMedio = paid.length > 0 ? totalPaid / paid.length : 0;

    return {
      totalGenerated,
      totalPaid,
      totalPending,
      conversionRate,
      ticketMedio,
      paidCount: paid.length,
      pendingCount: pending.length,
      expiredCount: expired.length,
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchStatus = filterStatus === "all" || t.status === filterStatus;
      const matchSearch =
        t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.txid.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [transactions, filterStatus, searchTerm]);

  const handleCreatePix = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newAmount);
    if (!newCustomer || isNaN(val) || val <= 0) return;

    const id = "pix-" + Date.now();
    const txid = "E60701190" + Date.now().toString().slice(-14);
    const payload = "00020126580014br.gov.bcb.pix0136" + txid + "520400005303986540" + val.toFixed(2) + "5802BR5925WLC%20SYSTEM6009SAO%20PAULO62070503***6304" + Math.random().toString(36).substring(2, 6).toUpperCase();
    const qr = "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=" + encodeURIComponent(payload);

    const now = new Date();
    const exp = new Date(now.getTime() + 30 * 60 * 1000);

    const newTx: PixTransaction = {
      id,
      txid,
      customerName: newCustomer,
      customerEmail: newEmail || "contato@cliente.com.br",
      amount: val,
      status: "pending",
      qrCodeUrl: qr,
      copyPasteCode: payload,
      createdAt: now.toISOString().replace("T", " ").slice(0, 16),
      expiresAt: exp.toISOString().replace("T", " ").slice(0, 16),
      origin: "WLC Finance Central",
      campaign: "Cobrança Manual",
      product: newProduct,
      provider: "WLC Pay / Instant Gateway"
    };

    setTransactions([newTx, ...transactions]);
    setSelectedTx(newTx);
    setIsNewPixOpen(false);
    setNewCustomer("");
    setNewEmail("");
    setNewAmount("");
  };

  const handleSimulatePayment = (txId: string) => {
    setTransactions(prev =>
      prev.map(t => {
        if (t.id === txId) {
          return {
            ...t,
            status: "paid",
            paidAt: new Date().toISOString().replace("T", " ").slice(0, 16)
          };
        }
        return t;
      })
    );
    if (selectedTx?.id === txId) {
      setSelectedTx(prev => prev ? { ...prev, status: "paid" } : null);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-100 font-mono">
              WLC FINANCE & PIX INTELLIGENCE
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
              ENTERPRISE v2.1
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Gestão de faturamento em tempo real, liquidação instantânea PIX e conciliação bancária segura.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsNewPixOpen(true)}
            className="py-2 px-3.5 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded-lg flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Gerar Cobrança PIX</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-[11px]">Receita Confirmada</span>
            <DollarSign className="w-4 h-4 text-zinc-300" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-zinc-100">
            R$ {metrics.totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-400">
            <span className="text-zinc-200 font-medium font-mono">+{metrics.paidCount} transações</span>
            <span>liquidadas</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-[11px]">PIX Pendentes</span>
            <Clock className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-zinc-300">
            R$ {metrics.totalPending.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-400">
            <span className="text-zinc-300 font-mono font-medium">{metrics.pendingCount} cobrança(s)</span>
            <span>aguardando webhook</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-[11px]">Conversão PIX</span>
            <TrendingUp className="w-4 h-4 text-zinc-300" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-zinc-100">
            {metrics.conversionRate.toFixed(1)}%
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-400">
            <span>Benchmark B2B:</span>
            <span className="text-zinc-200 font-mono font-medium">58.4%</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-mono uppercase tracking-wider text-[11px]">Ticket Médio PIX</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-300" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-zinc-100">
            R$ {metrics.ticketMedio.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            Tempo médio até pagamento: <span className="text-zinc-200 font-mono">4m 12s</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800">
        <button
          onClick={() => setActiveTab("overview")}
          className={"py-2.5 px-4 text-xs font-medium border-b-2 transition-colors " + (activeTab === "overview" ? "border-zinc-100 text-zinc-100" : "border-transparent text-zinc-400 hover:text-zinc-200")}
        >
          Transações & PIX em Tempo Real
        </button>
        <button
          onClick={() => setActiveTab("dre")}
          className={"py-2.5 px-4 text-xs font-medium border-b-2 transition-colors " + (activeTab === "dre" ? "border-zinc-100 text-zinc-100" : "border-transparent text-zinc-400 hover:text-zinc-200")}
        >
          DRE Gerencial & Conciliação
        </button>
      </div>

      {/* Tab: Overview / PIX Transactions */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/80">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Pesquisar por cliente, email ou EndToEndId..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => setFilterStatus("all")}
                className={"px-2.5 py-1 text-xs rounded-lg transition-colors " + (filterStatus === "all" ? "bg-zinc-800 text-zinc-100 font-medium" : "text-zinc-400 hover:text-zinc-200")}
              >
                Todos ({transactions.length})
              </button>
              <button
                onClick={() => setFilterStatus("paid")}
                className={"px-2.5 py-1 text-xs rounded-lg transition-colors " + (filterStatus === "paid" ? "bg-zinc-800 text-zinc-100 font-medium" : "text-zinc-400 hover:text-zinc-200")}
              >
                Pagos ({metrics.paidCount})
              </button>
              <button
                onClick={() => setFilterStatus("pending")}
                className={"px-2.5 py-1 text-xs rounded-lg transition-colors " + (filterStatus === "pending" ? "bg-zinc-800 text-zinc-100 font-medium" : "text-zinc-400 hover:text-zinc-200")}
              >
                Pendentes ({metrics.pendingCount})
              </button>
              <button
                onClick={() => setFilterStatus("expired")}
                className={"px-2.5 py-1 text-xs rounded-lg transition-colors " + (filterStatus === "expired" ? "bg-zinc-800 text-zinc-100 font-medium" : "text-zinc-400 hover:text-zinc-200")}
              >
                Expirados ({metrics.expiredCount})
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/80 text-zinc-400 font-mono text-[11px] uppercase border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">Cliente / Produto</th>
                    <th className="py-3 px-4">Valor</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Origem / Campanha</th>
                    <th className="py-3 px-4">Data Criação</th>
                    <th className="py-3 px-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-mono text-zinc-300">
                  {filteredTransactions.map(t => (
                    <tr key={t.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-4 font-sans">
                        <div className="font-medium text-zinc-100">{t.customerName}</div>
                        <div className="text-[11px] text-zinc-400 font-mono">{t.product} · {t.customerEmail}</div>
                      </td>
                      <td className="py-3 px-4 font-bold text-zinc-100">
                        R$ {t.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4">
                        {t.status === "paid" && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] bg-zinc-800 text-zinc-200 border border-zinc-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-100" />
                            Pago
                          </span>
                        )}
                        {t.status === "pending" && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] bg-zinc-900 text-zinc-300 border border-zinc-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Aguardando
                          </span>
                        )}
                        {t.status === "expired" && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] bg-zinc-900 text-zinc-500 border border-zinc-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                            Expirado
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-sans text-xs text-zinc-400">
                        <div>{t.origin}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{t.campaign}</div>
                      </td>
                      <td className="py-3 px-4 text-[11px] text-zinc-400">
                        {t.createdAt}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedTx(t)}
                          className="py-1 px-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs transition-colors"
                        >
                          Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-500 font-sans text-xs">
                        Nenhuma cobrança encontrada para os filtros selecionados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: DRE Gerencial */}
      {activeTab === "dre" && (
        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="font-mono text-sm font-semibold text-zinc-100">
              DEMONSTRATIVO DE RESULTADO DO EXERCÍCIO (DRE GERENCIAL)
            </h3>
            <span className="text-xs text-zinc-400 font-mono">Competência: Nov/2026</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between py-1.5 text-zinc-200 font-semibold border-b border-zinc-800/80">
              <span>(+) RECEITA BRUTA OPERACIONAL (PIX + RECORRENTE)</span>
              <span>R$ {(metrics.totalPaid * 1.15).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-1 text-zinc-400">
              <span>(-) Deduções e Taxas de Liquidação (0.79%)</span>
              <span>- R$ {(metrics.totalPaid * 0.0079).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-1.5 text-zinc-100 font-semibold border-b border-zinc-800/80">
              <span>(=) RECEITA OPERACIONAL LÍQUIDA</span>
              <span>R$ {(metrics.totalPaid * 1.1421).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between py-1 text-zinc-400">
              <span>(-) Custos de Servidores, APIs e LLMs (workerd / Cloudflare)</span>
              <span>- R$ 340,00</span>
            </div>
            <div className="flex justify-between py-1 text-zinc-400">
              <span>(-) Investimento em Campanhas & CAC (Meta / Google Ads)</span>
              <span>- R$ 850,00</span>
            </div>
            <div className="flex justify-between py-2 text-zinc-100 font-bold border-t border-b border-zinc-700 text-sm">
              <span>(=) RESULTADO OPERACIONAL LÍQUIDO (EBITDA)</span>
              <span>R$ {(metrics.totalPaid * 1.1421 - 1190).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      )}

      {/* PIX Detail & QR Code Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-5 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-zinc-200" />
                <h3 className="font-semibold text-sm text-zinc-100 font-mono">
                  Cobrança PIX #{selectedTx.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-zinc-500 hover:text-zinc-200 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className="text-xs text-zinc-400">Valor a liquidar</div>
              <div className="text-3xl font-extrabold font-mono text-zinc-100">
                R$ {selectedTx.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                {selectedTx.customerName} · {selectedTx.product}
              </div>
            </div>

            {selectedTx.qrCodeUrl ? (
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner mx-auto max-w-[220px]">
                <img
                  src={selectedTx.qrCodeUrl}
                  alt="QR Code PIX"
                  className="w-48 h-48 object-contain"
                />
              </div>
            ) : (
              <div className="p-6 bg-zinc-900 rounded-xl text-center text-xs text-zinc-500">
                QR Code expirado ou indisponível
              </div>
            )}

            {/* Copy Paste Code */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>PIX Copia e Cola</span>
                <span className="text-zinc-500">Expira em: {selectedTx.expiresAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={selectedTx.copyPasteCode}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 font-mono text-[10px] text-zinc-300 focus:outline-none"
                />
                <button
                  onClick={() => handleCopy(selectedTx.copyPasteCode)}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors flex items-center justify-center"
                  title="Copiar código"
                >
                  {isCopied ? <Check className="w-4 h-4 text-zinc-100" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
              {selectedTx.status === "pending" ? (
                <button
                  onClick={() => handleSimulatePayment(selectedTx.id)}
                  className="w-full py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded-lg transition-colors shadow-sm"
                >
                  Confirmar Recebimento (Webhook)
                </button>
              ) : (
                <div className="w-full py-2 bg-zinc-900 text-zinc-400 border border-zinc-800 text-xs rounded-lg text-center font-mono">
                  ✔ Pagamento confirmado ({selectedTx.paidAt})
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New PIX Generator Modal */}
      {isNewPixOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreatePix}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-semibold text-sm text-zinc-100 font-mono">
                NOVA COBRANÇA PIX INSTANTÂNEA
              </h3>
              <button
                type="button"
                onClick={() => setIsNewPixOpen(false)}
                className="text-zinc-500 hover:text-zinc-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Nome do Cliente / Empresa</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Lucas Ferreira & Associados"
                  value={newCustomer}
                  onChange={e => setNewCustomer(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Email para Envio do Comprovante</label>
                <input
                  type="email"
                  placeholder="lucas@empresa.com.br"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Valor da Cobrança (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  required
                  placeholder="Ex: 1450.00"
                  value={newAmount}
                  onChange={e => setNewAmount(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 font-mono text-zinc-100 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Produto / Serviço</label>
                <select
                  value={newProduct}
                  onChange={e => setNewProduct(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-100 focus:outline-none focus:border-zinc-700 font-sans"
                >
                  <option value="WLC Enterprise Anual">WLC Enterprise Anual</option>
                  <option value="WLC Business Pro">WLC Business Pro</option>
                  <option value="Custom Setup + n8n Flow">Custom Setup + n8n Flow</option>
                  <option value="Assinatura Recorrente Mensal">Assinatura Recorrente Mensal</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsNewPixOpen(false)}
                className="py-2 px-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs rounded-lg shadow-sm"
              >
                Gerar QR Code & Chave
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};