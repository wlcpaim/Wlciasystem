import React from "react";

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-16 pb-20 md:pt-28 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-8 backdrop-blur-md shadow-sm shadow-emerald-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold uppercase tracking-wider">WLC 1.1.0 System • Motor Determinístico Conectado</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6">
          Engenharia Autônoma. <br />
          <span className="text-gradient-emerald">Multiplique o ROI da sua equipe</span> em até{" "}
          <span className="text-emerald-400 underline decoration-emerald-500/50 decoration-wavy underline-offset-8">4.8x</span>.
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Elimine até 80% das tarefas manuais de refatoração, diagnóstico e commit com um motor de terminal puro conectado direto ao seu repositório. Zero alucinação, 100% determinístico.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#roi-simulador"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
          >
            Simular Economia do Squad
          </a>
          <a
            href="#recursos"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <span>Ver Arquitetura Técnica</span>
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 border-t border-slate-800/80">
          <div className="p-4 rounded-xl glass-card-interactive text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">4.8x</div>
            <div className="text-xs text-slate-400 mt-1">Multiplicador Médio de ROI</div>
          </div>
          <div className="p-4 rounded-xl glass-card-interactive text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">35%</div>
            <div className="text-xs text-slate-400 mt-1">Ganho Imediato de Eficiência</div>
          </div>
          <div className="p-4 rounded-xl glass-card-interactive text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">0</div>
            <div className="text-xs text-slate-400 mt-1">Alucinações (Determinístico)</div>
          </div>
          <div className="p-4 rounded-xl glass-card-interactive text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">99.99%</div>
            <div className="text-xs text-slate-400 mt-1">Confiabilidade de Commit</div>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto rounded-2xl glass-panel border border-slate-800 overflow-hidden shadow-2xl shadow-emerald-500/10 text-left font-mono text-xs">
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-slate-400 text-xs font-sans">wlc-terminal · bridge: active</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              OWNER PRIVILEGE
            </div>
          </div>
          <div className="p-5 space-y-2 text-slate-300">
            <div className="text-slate-500">// Handshake bi-direcional em tempo real</div>
            <div>
              <span className="text-emerald-400">wlc:~$</span> <span className="text-white">connect</span>
            </div>
            <div className="text-emerald-300 pl-4 py-1 border-l border-emerald-500/30 text-[11px]">
              ✔ CANAL PRONTO · Projeto: Wlciasystem · GitHub: wlcpaim/Wlciasystem@main
            </div>
            <div>
              <span className="text-emerald-400">wlc:~$</span> <span className="text-white">diagnose</span>
            </div>
            <div className="text-cyan-300 pl-4 py-1 border-l border-cyan-500/30 text-[11px]">
              ✔ Diagnóstico limpo: 13 arquivos verificados, 0 erros estáticos, integridade 100%
            </div>
            <div>
              <span className="text-emerald-400">wlc:~$</span> <span className="text-white">commit "feat: release v1.1.0"</span>
            </div>
            <div className="text-emerald-400 pl-4 py-1 border-l border-emerald-500/30 text-[11px]">
              ✔ Commit persistido no GitHub · Pipeline pronto para produção
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};