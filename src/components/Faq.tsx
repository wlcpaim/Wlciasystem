import React, { useState } from "react";

export const Faq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items = [
    {
      q: "O código da minha empresa é utilizado para treinar modelos públicos de IA?",
      a: "Não. A arquitetura WLC 1.1.0 opera com isolamento rigoroso de sessão. O código trafega apenas entre o seu repositório oficial no GitHub e o banco seguro da sua conta, sem alimentar nenhum dataset de treino.",
    },
    {
      q: "Como o System garante que não haverá alucinações de sintaxe?",
      a: "O WLC System não é um gerador probabilístico: ele utiliza um analisador cognitivo determinístico em TypeScript que valida caminhos, analisa a sintaxe estática e requer confirmação do usuário antes de qualquer mutação de arquivo.",
    },
    {
      q: "Como funciona a sincronização bi-direcional do terminal CMD?",
      a: "Todas as mensagens enviadas tanto pela interface web quanto por agentes orquestradores compartilham uma fila em tempo real (system_events). Isso significa que você e o assistente operam no mesmo canal de comando simultaneamente.",
    },
    {
      q: "Posso conectar repositórios privados da minha organização no GitHub?",
      a: "Sim. A autenticação respeita as permissões do seu usuário no GitHub. Apenas repositórios aos quais você tem permissão de escrita podem receber commits assinados.",
    },
    {
      q: "Existe período de prova de conceito (POC) para grandes empresas?",
      a: "Sim. Para planos Enterprise oferecemos uma POC assistida de 14 dias com acompanhamento de um engenheiro de soluções para validar o ganho de ROI direto no seu squad.",
    },
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <span>DÚVIDAS FREQUENTES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Perguntas Frequentes de Segurança & Engenharia
          </h2>
          <p className="text-base text-slate-400">
            Respostas transparentes sobre conformidade, arquitetura e garantias técnicas.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between text-base font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  <span>{item.q}</span>
                  <span className="font-mono text-xl text-emerald-400 ml-4 shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};