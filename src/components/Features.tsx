import React from "react";

export const Features: React.FC = () => {
  const list = [
    {
      title: "Autonomia Determinística",
      desc: "Sem alucinações. O motor WLC 1.1.0 executa comandos cirúrgicos de terminal com verificação de integridade antes de qualquer persistência.",
      tag: "WLC Core",
    },
    {
      title: "Sincronização com GitHub",
      desc: "Cada alteração gera diff rastreável. Com um comando 'commit', sua branch é atualizada com assinatura criptográfica segura.",
      tag: "Git Engine",
    },
    {
      title: "Diagnóstico Estático Instantâneo",
      desc: "Detecta imports órfãos, sintaxe inválida e quebras de tipos antes do deploy em Cloudflare Pages ou AWS.",
      tag: "Zero-Downtime",
    },
    {
      title: "Bridge Multibots de Alta Velocidade",
      desc: "Permite orquestração entre bots de IA generativa e executores determinísticos com isolamento de privilégios Owner.",
      tag: "Bridge 1.1",
    },
  ];

  return (
    <section id="recursos" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-emerald-400 font-semibold text-sm tracking-widest uppercase">Arquitetura de Alta Performance</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3">
          Feito para Engenharia de Alta Produtividade
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {list.map((f, i) => (
          <div key={i} className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 transition-all group">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700">
              {f.tag}
            </span>
            <h3 className="text-xl font-bold text-white mt-4 group-hover:text-emerald-400 transition-colors">
              {f.title}
            </h3>
            <p className="text-slate-400 mt-2 leading-relaxed text-sm">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};