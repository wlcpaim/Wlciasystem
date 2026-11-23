`src/components/PdvModule.tsx` · 665 linhas · modified
```tsx
`src/components/PdvModule.tsx` · 662 linhas · unchanged
```tsx
import React, { useState } from "react";
import { PdvProduct, CartItem, PdvSale, PaymentMethod, SystemUser } from "../types/system";
import { ReceiptModal } from "./ReceiptModal";

const INITIAL_PRODUCTS: PdvProduct[] = [
  {
    id: "prod-1",
    sku: "SW-SAAS-MO",
    name: "Assinatura WLC SaaS (Mensal)",
    category: "Software",
    price: 289.00,
    stock: 999,
    description: "Acesso total à plataforma com até 5 operadores simultâneos",
    badge: "Mais Vendido",
  },
  {
    id: "prod-2",
    sku: "SW-SAAS-AN",
    name: "Assinatura WLC SaaS (Anual)",
    category: "Software",
    price: 2890.00,
    stock: 999,
    description: "Plano anual com 2 meses grátis e suporte prioritário",
    badge: "20% OFF",
  },
  {
    id: "prod-3",
    sku: "HW-POS-PRO",
    name: "Terminal Inteligente POS Smart",
    category: "Terminal",
    price: 1290.00,
    stock: 14,
    description: "Terminal Android com impressora térmica integrada 58mm",
    badge: "Pronta Entrega",
  },
  {
    id: "prod-4",
    sku: "HW-SCAN-2D",
    name: "Leitor de Código de Barras 2D / QR Code",
    category: "Hardware",
    price: 349.00,
    stock: 28,
    description: "Leitor USB sem fio com alcance de 50 metros",
  },
  {
    id: "prod-5",
    sku: "SV-SETUP-VIP",
    name: "Setup e Implantação Assistida VIP",
    category: "Serviço",
    price: 750.00,
    stock: 99,
    description: "Configuração do banco de dados, migração de catálogo e treinamento",
  },
  {
    id: "prod-6",
    sku: "SV-SLA-247",
    name: "SLA Suporte 24/7 (30 Dias)",
    category: "Serviço",
    price: 490.00,
    stock: 99,
    description: "Garantia de atendimento técnico em menos de 15 minutos",
  },
  {
    id: "prod-7",
    sku: "HW-BOB-30",
    name: "Caixa Bobinas Térmicas 80mm (30 un)",
    category: "Hardware",
    price: 120.00,
    stock: 65,
    description: "Papel térmico de alta durabilidade com proteção UV",
  },
  {
    id: "prod-8",
    sku: "LC-EXTRA-USR",
    name: "Licença Operador Adicional",
    category: "Licença",
    price: 49.00,
    stock: 999,
    description: "Adiciona 1 usuário caixa simultâneo ao cluster",
  },
];

interface PdvModuleProps {
  currentUser: SystemUser | null;
  onRequireLogin: () => void;
}

export const PdvModule: React.FC<PdvModuleProps> = ({ currentUser, onRequireLogin }) => {
  const [products] = useState<PdvProduct[]>(INITIAL_PRODUCTS);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"pos" | "history">("pos");
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("pix");
  const [cashGiven, setCashGiven] = useState<number>(0);
  const [installments, setInstallments] = useState<number>(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Sales History & Receipt
  const [sales, setSales] = useState<PdvSale[]>([]);
  const [receiptSale, setReceiptSale] = useState<PdvSale | null>(null);

  // Cart operations
  const addToCart = (product: PdvProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
  };

  // Calculations
  const subtotal = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);
  const changeDue = Math.max(0, cashGiven - total);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchCat = categoryFilter === "all" || p.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenCheckout = () => {
    if (!currentUser) {
      onRequireLogin();
      return;
    }
    if (cart.length === 0) return;
    setCashGiven(Math.ceil(total));
    setIsCheckoutOpen(true);
  };

  const handleFinishSale = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const newSale: PdvSale = {
        id: "sale-" + Math.random().toString(36).substring(2, 9),
        code: "NFC-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString("pt-BR") + " " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        cashierName: currentUser?.name || "Operador Caixa 01",
        items: [...cart],
        subtotal,
        discount: discountAmount,
        total,
        paymentMethod: selectedMethod,
        paymentStatus: "completed",
        cashReceived: selectedMethod === "cash" ? cashGiven : undefined,
        changeGiven: selectedMethod === "cash" ? changeDue : undefined,
      };

      setSales((prev) => [newSale, ...prev]);
      setIsCheckoutOpen(false);
      clearCart();
      setReceiptSale(newSale);
    }, 700);
  };

  const totalSoldToday = sales.reduce((acc, curr) => acc + curr.total, 0) + 4890;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      {/* PDV Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0f1115] border border-[#232732] shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-none">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-zinc-100 tracking-tight">
                PDV Express Terminal
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
                Caixa Aberto
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Operador: <strong className="text-zinc-200">{currentUser?.name || "Caixa Padrão"}</strong> · Terminal 01
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
              Vendas do Turno
            </span>
            <span className="text-sm font-bold font-mono text-white">
              R$ {totalSoldToday.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex rounded-xl bg-[#14161d] p-1 border border-[#232732]">
            <button
              onClick={() => setActiveTab("pos")}
              className={`py-1.5 px-3 text-xs font-medium rounded-lg transition-all ${
                activeTab === "pos" ? "bg-[#232732] text-zinc-100 shadow" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Frente de Caixa
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-1.5 px-3 text-xs font-medium rounded-lg transition-all ${
                activeTab === "history" ? "bg-[#232732] text-zinc-100 shadow" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Histórico ({sales.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === "pos" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Product Catalog (Col 7 or 8) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {/* Search and Category Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Buscar produto por nome ou código SKU..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#0f1115] border border-[#232732] rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
                />
                {search && (
                  <button 
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {["all", "software", "terminal", "hardware", "serviço"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`py-2 px-3 text-[11px] font-medium rounded-xl whitespace-nowrap transition-all ${
                      categoryFilter === cat
                        ? "bg-zinc-800 border border-zinc-700 text-white"
                        : "bg-[#0f1115] border border-[#232732] text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {cat === "all" ? "Todos" : cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="p-4 rounded-xl bg-[#0f1115] border border-[#232732] hover:border-zinc-600 cursor-pointer transition-all hover:scale-[1.01] group relative flex flex-col justify-between"
                >
                  {product.badge && (
                    <span className="absolute top-3 right-3 text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium">
                      {product.badge}
                    </span>
                  )}
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">
                      {product.sku} · {product.category}
                    </span>
                    <h4 className="font-semibold text-xs text-zinc-100 mt-1 group-hover:text-white transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1c1f28]">
                    <div className="text-sm font-bold font-mono text-zinc-100">
                      R$ {product.price.toFixed(2)}
                    </div>
                    <span className="py-1 px-2 rounded-lg bg-[#181b24] group-hover:bg-white group-hover:text-zinc-950 text-zinc-300 text-[11px] font-medium transition-colors">
                      + Adicionar
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Cart / Ticket (Col 5 or 4) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="p-5 rounded-2xl bg-[#0f1115] border border-[#232732] shadow-xl flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#232732]">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-zinc-100 text-sm">Comanda / Venda</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#181a22] text-zinc-300">
                      {cart.reduce((a, b) => a + b.quantity, 0)} itens
                    </span>
                  </div>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                {/* Cart Items List */}
                <div className="mt-3 space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <div className="py-16 text-center text-zinc-500 text-xs">
                      <div className="text-2xl mb-2">🛒</div>
                      Carrinho vazio.<br />Clique nos produtos ao lado para iniciar a venda.
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-3 rounded-xl bg-[#14161e] border border-[#202430] flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-xs text-zinc-200 truncate">
                            {item.product.name}
                          </h5>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            R$ {item.product.price.toFixed(2)} un.
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="w-6 h-6 rounded-lg bg-[#202432] hover:bg-[#2b3042] text-zinc-300 flex items-center justify-center text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-mono text-xs font-bold text-zinc-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="w-6 h-6 rounded-lg bg-[#202432] hover:bg-[#2b3042] text-zinc-300 flex items-center justify-center text-xs font-bold"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-zinc-500 hover:text-zinc-300 ml-1 text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Cart Footer & Totals */}
              <div className="mt-4 pt-4 border-t border-[#232732] space-y-3">
                {/* Discount Quick Buttons */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 text-[11px]">Desconto:</span>
                  <div className="flex gap-1.5">
                    {[0, 5, 10, 15].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setDiscountPercent(pct)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          discountPercent === pct
                            ? "bg-white text-zinc-950 font-bold"
                            : "bg-[#181b24] text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {pct === 0 ? "Sem Desc." : `${pct}%`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtotal & Total */}
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-zinc-300">
                      <span>Desconto ({discountPercent}%):</span>
                      <span>- R$ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-zinc-100 pt-1 border-t border-[#1c1f28]">
                    <span>TOTAL:</span>
                    <span className="text-white">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  disabled={cart.length === 0}
                  onClick={handleOpenCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-none transition-all flex items-center justify-center gap-2"
                >
                  Cobrar Venda (Enter)
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* History Tab */
        <div className="p-6 rounded-2xl bg-[#0f1115] border border-[#232732] shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#232732]">
            <div>
              <h3 className="font-semibold text-zinc-100 text-sm">Histórico de Vendas Concluídas</h3>
              <p className="text-[11px] text-zinc-400">Cupons emitidos no turno atual pelo terminal</p>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {sales.length} vendas registradas
            </span>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#232732] text-zinc-400 text-[10px] uppercase">
                  <th className="pb-3">Cupom NFC-e</th>
                  <th className="pb-3">Data/Hora</th>
                  <th className="pb-3">Operador</th>
                  <th className="pb-3">Itens</th>
                  <th className="pb-3">Forma Pagto</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3 text-right">Comprovante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b1e27]">
                {sales.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-zinc-500">
                      Nenhuma venda registrada ainda no turno.
                    </td>
                  </tr>
                ) : (
                  sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-[#13151c] transition-colors">
                      <td className="py-3 font-semibold text-zinc-200">{sale.code}</td>
                      <td className="py-3 text-zinc-400">{sale.date}</td>
                      <td className="py-3 text-zinc-300">{sale.cashierName}</td>
                      <td className="py-3 text-zinc-400">{sale.items.length} produto(s)</td>
                      <td className="py-3 uppercase text-zinc-300">{sale.paymentMethod}</td>
                      <td className="py-3 font-bold text-white">R$ {sale.total.toFixed(2)}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setReceiptSale(sale)}
                          className="px-2.5 py-1 rounded bg-[#181a24] hover:bg-[#222634] text-zinc-300 text-[10px] transition-colors"
                        >
                          Visualizar Cupom ↗
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div 
            className="w-full max-w-md bg-[#0f1115] border border-[#232730] rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#232730]">
              <h4 className="font-bold text-zinc-100 text-sm">Finalizar Pagamento</h4>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                ✕
              </button>
            </div>

            {/* Total Highlight */}
            <div className="my-4 p-4 rounded-xl bg-[#14161f] border border-[#222736] text-center">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                Valor Total a Pagar
              </span>
              <div className="text-3xl font-extrabold font-mono text-white mt-1">
                R$ {total.toFixed(2)}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { id: "pix", label: "PIX", icon: "⚡" },
                { id: "credit", label: "Crédito", icon: "💳" },
                { id: "debit", label: "Débito", icon: "🏦" },
                { id: "cash", label: "Dinheiro", icon: "💵" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id as any)}
                  className={`p-2.5 rounded-xl text-center border transition-all ${
                    selectedMethod === m.id
                      ? "bg-zinc-800 border-zinc-500 text-white font-bold"
                      : "bg-[#14161f] border-[#232732] text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className="text-base">{m.icon}</div>
                  <div className="text-[10px] mt-1 font-mono">{m.label}</div>
                </button>
              ))}
            </div>

            {/* Method Details */}
            {selectedMethod === "pix" && (
              <div className="p-4 rounded-xl bg-[#14161f] border border-[#232732] text-center space-y-3">
                <div className="w-24 h-24 mx-auto bg-white rounded-lg p-1.5 flex flex-col items-center justify-center text-black text-[8px] font-mono leading-none">
                  <span>■■■■■■■■■■</span>
                  <span>PIX DINÂMICO</span>
                  <span className="text-[6px] text-zinc-600 mt-1">R$ {total.toFixed(2)}</span>
                  <span>■■■■■■■■■■</span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  Escaneie o QR Code ou copie a chave Pix Copia e Cola
                </p>
                <div className="text-[10px] font-mono bg-[#0c0d12] p-2 rounded text-zinc-400 truncate border border-[#232732]">
                  00020126580014BR.GOV.BCB.PIX0136wlc-pix-pay-gateway-983021
                </div>
              </div>
            )}

            {selectedMethod === "credit" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Parcelamento
                  </label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(Number(e.target.value))}
                    className="w-full bg-[#14161d] border border-[#262a36] rounded-xl px-3 py-2 text-xs text-zinc-100"
                  >
                    {[1, 2, 3, 6, 10, 12].map((i) => (
                      <option key={i} value={i}>
                        {i}x de R$ {(total / i).toFixed(2)} {i === 1 ? "(Sem Juros)" : "(Taxa Reduzida)"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="p-3 rounded-xl bg-[#14161f] border border-[#232732] text-xs text-zinc-400">
                  Insira ou aproxime o cartão na Maquininha POS Integrada.
                </div>
              </div>
            )}

            {selectedMethod === "cash" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Valor Recebido (R$)
                  </label>
                  <input
                    type="number"
                    value={cashGiven || ""}
                    onChange={(e) => setCashGiven(Number(e.target.value))}
                    placeholder="Ex: 100"
                    className="w-full bg-[#14161d] border border-[#262a36] rounded-xl px-3 py-2 text-sm font-mono text-zinc-100 focus:outline-none focus:border-zinc-500"
                  />
                </div>
                <div className="flex gap-2">
                  {[Math.ceil(total), 50, 100, 200].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setCashGiven(val)}
                      className="flex-1 py-1 px-2 rounded-lg bg-[#191d27] text-zinc-300 text-xs font-mono hover:bg-[#252b3a]"
                    >
                      R$ {val}
                    </button>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-[#14161f] border border-[#232732] flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Troco a Devolver:</span>
                  <span className="font-bold font-mono text-white text-sm">
                    R$ {changeDue.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {selectedMethod === "debit" && (
              <div className="p-4 rounded-xl bg-[#14161f] border border-[#232732] text-center text-xs text-zinc-400">
                Aproxime o cartão de débito ou insira na maquininha POS.
              </div>
            )}

            {/* Confirm Checkout Button */}
            <button
              onClick={handleFinishSale}
              disabled={isProcessingPayment || (selectedMethod === "cash" && cashGiven < total)}
              className="w-full mt-4 py-3 rounded-xl bg-white hover:bg-zinc-200 disabled:opacity-40 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              {isProcessingPayment ? (
                <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                "Confirmar e Emitir Cupom"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Digital Receipt Modal */}
      <ReceiptModal sale={receiptSale} onClose={() => setReceiptSale(null)} />
    </div>
  );
};
```
```