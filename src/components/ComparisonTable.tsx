import React from "react";

export const ComparisonTable: React.FC = () => {
  const rows = [
    {
      criterion: "Natureza de Execução",
      traditional: "Estatística / Preditiva (propensa a alucinações)",
      wlc: "100% Determinística (execução matemática estrita)",
    },
    {
      criterion: "Isolamento de Credenciais",
      traditional: "Risco de tokens embutidos no prompt do modelo",
      wlc: "Vault seguro com isolamento de chave Master",
    },
    {
      criterion: "Controle de Alterações & Git",
      traditional: "Blocos de código copiados e colados manualmente",
      wlc: "Diffs cirúrgicos e commits atômicos assinados",
    },
    {
      criterion: "Validação Pré-Deploy",
      traditional: "Usuário precisa testar manualmente após o chat",
      wlc: "Diagnóstico estático imediato (AST & dependências)",
    },
    {
      criterion: "Soberania de Dados",
      traditional: "Código enviado para servidores de treinamento",
      wlc: "Isolamento total: zero retenção para treino",
    },
    {
      criterion: "Canal de Terminal em Tempo Real",
      traditional: "Chat isolado da infraestrutura da empresa",
      wlc: "Bridge bi-direcional compartilhado por sessão",
    },
  ];

  return (
    <section id="comparativo" className="py-24 relative overflow-hidden bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-4">
            <span>DIFERENCIAL TÉCNICO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Por que o WLC System supera Modelos Genéricos
          </h2>
          <p className="text-base text-zinc-400">
            Entenda a diferença arquitetural entre pedir código a um chatbot e acionar um motor determinístico de engenharia.
          </p>
        </div>

        <div className="rounded-2xl glass-panel overflow-hidden border border-zinc-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-400 uppercase font-mono text-[11px]">
                  <th className="p-4 sm:p-5">Requisito Corporativo</th>
                  <th className="p-4 sm:p-5 text-zinc-500">LLMs Convencionais</th>
                  <th className="p-4 sm:p-5 text-zinc-100 font-bold bg-zinc-900/40">WLC 1.1.0 System</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {rows.map((r, i) => (
                  <tr key={i} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">{r.criterion}</td>
                    <td className="p-4 sm:p-5 text-zinc-400 flex items-center space-x-2">
                      <span className="text-zinc-500 font-bold">✕</span>
                      <span>{r.traditional}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-200 font-medium bg-zinc-900/40">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold">✓</span>
                        <span>{r.wlc}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};