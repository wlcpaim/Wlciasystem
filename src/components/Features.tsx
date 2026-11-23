import React from "react";

export const Features: React.FC = () => {
  const list = [
    {
      title: "Autonomia Determinística",
      desc: "Sem alucinações. O motor WLC 1.1.0 opera comandos cirúrgicos de terminal com verificação de integridade antes de qualquer persistência.",
      badge: "WLC Core",
    },
    {
      title: "Sincronização Bi-direcional CMD",
      desc: "O terminal de desenvolvimento e a IA compartilham o mesmo canal de eventos em tempo real, permitindo orquestração colaborativa instantânea.",
      badge: "Bridge 2.0",
    },
    {
      title: "Diagnóstico Estático em Tempo Real",
      desc: "O comando diagnose examina sintaxe, dependências e imports cruzados de todos os arquivos do projeto em milissegundos.",
      badge: "AST Analyzer",
    },
    {
      title: "Pipeline de Commit Assinado",
      desc: "Gravação e assinatura direta no GitHub oficial da sua organização com diff unificado e controle por branch configurável.",
      badge: "GitHub Actions",
    },
    {
      title: "Calculadora de ROI Embutida",
      desc: "Simule e apresente aos stakeholders o retorno financeiro exato de cada sprint antes de iniciar a produção de software.",
      badge: "Enterprise Metrics",
    },
    {
      title: "Proteção de Nível Owner",
      desc: "Autenticação por token do usuário e isolamento seguro de credenciais: nenhuma chave de integração jamais vaza na resposta.",
      badge: "Security Standard",
    },
  ];

  return (
    <section id="recursos" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-4">
            <span>ARQUITETURA DE ENGENHARIA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Construído para Engenheiros que Exigem Confiabilidade
          </h2>
          <p className="text-base text-zinc-400">
            Diferente de assistentes convencionais, o WLC 1.1.0 executa comandos determinísticos de terminal que respeitam o ciclo de vida do software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl glass-card-interactive flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/80 text-zinc-200">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">0{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center text-xs font-medium text-zinc-300 space-x-1">
                <span>Ver especificação</span>
                <span className="font-mono">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};