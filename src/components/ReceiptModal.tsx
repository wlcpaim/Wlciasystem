import React from "react";
import { PdvSale } from "../types/system";

interface ReceiptModalProps {
  sale: PdvSale | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ sale, onClose }) => {
  if (!sale) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative text-zinc-100 font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Cupom */}
        <div className="text-center pb-4 border-b border-dashed border-zinc-800">
          <div className="w-9 h-9 mx-auto rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 flex items-center justify-center font-bold text-sm mb-2">
            ✓
          </div>
          <h4 className="font-bold text-sm text-zinc-100 tracking-wider">WLC SYSTEM 1.1.0</h4>
          <p className="text-[10px] text-zinc-400 mt-0.5">COMPROVANTE FISCAL NÃO-FISCAL DIGITAL</p>
          <p className="text-[10px] text-zinc-400">CNPJ: 45.892.112/0001-90</p>
          <div className="mt-2 text-[10px] text-zinc-400">
            <span>Doc: {sale.code}</span> · <span>{sale.date}</span>
          </div>
          <div className="text-[10px] text-zinc-400">
            Operador: <strong className="text-zinc-300">{sale.cashierName}</strong>
          </div>
        </div>

        {/* Itens */}
        <div className="py-4 border-b border-dashed border-zinc-800 space-y-2 max-h-56 overflow-y-auto">
          <div className="grid grid-cols-12 text-[10px] text-zinc-400 font-semibold uppercase">
            <span className="col-span-6">Item</span>
            <span className="col-span-2 text-center">Qtd</span>
            <span className="col-span-4 text-right">Total</span>
          </div>
          {sale.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 text-[11px] text-zinc-300">
              <span className="col-span-6 truncate">{item.product.name}</span>
              <span className="col-span-2 text-center text-zinc-400">{item.quantity}x</span>
              <span className="col-span-4 text-right text-zinc-100 font-medium">
                R$ {(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Totais */}
        <div className="py-3 border-b border-dashed border-zinc-800 space-y-1.5 text-xs">
          <div className="flex justify-between text-zinc-400">
            <span>Subtotal</span>
            <span>R$ {sale.subtotal.toFixed(2)}</span>
          </div>
          {sale.discount > 0 && (
            <div className="flex justify-between text-zinc-300">
              <span>Desconto</span>
              <span>- R$ {sale.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-sm text-zinc-100 pt-1">
            <span>VALOR TOTAL</span>
            <span className="text-white">R$ {sale.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[11px] text-zinc-400 pt-1">
            <span>Forma Pagamento</span>
            <span className="uppercase text-zinc-200 font-semibold">{sale.paymentMethod}</span>
          </div>
          {sale.cashReceived && (
            <>
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>Valor Recebido</span>
                <span>R$ {sale.cashReceived.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-zinc-200 font-bold">
                <span>Troco Devolvido</span>
                <span>R$ {(sale.changeGiven || 0).toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {/* QR Code Simulado NFC-e */}
        <div className="text-center pt-4">
          <div className="inline-block p-2 rounded-xl bg-white text-black font-mono text-[8px] tracking-tighter">
            <div className="w-24 h-24 mx-auto bg-zinc-900 rounded p-1 flex flex-col items-center justify-center text-white text-[7px] text-center leading-tight">
              <span>■■■■■■■■</span>
              <span>QR CODE NFC-e</span>
              <span className="text-[6px] text-zinc-400 truncate w-20">{sale.id}</span>
              <span>■■■■■■■■</span>
            </div>
          </div>
          <p className="text-[9px] text-zinc-400 mt-2">
            Consulte pela chave de acesso via Supabase
          </p>
        </div>

        {/* Botões */}
        <div className="mt-5 flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
          >
            🖨 Imprimir
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold transition-colors"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};