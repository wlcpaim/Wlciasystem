import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30">
        <div className="w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[140px]"></div>
        <div className="w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] -translate-y-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/60 text-xs font-semibold text-slate-300 mb-8 shadow-inner">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          Novo Motor Determinístico WLC 1.1.0 Ativo
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Escale sua Engenharia de Software com{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Retorno Financeiro Mensurável
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Substitua silos manuais por pipelines autônomos. Elimine até 12h de retrabalho por desenvolvedor toda semana e comprove o ROI exato na ponta do lápis.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#calculadora-roi"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2"
          >
            Simular ROI da sua Equipe →
          </a>
          <a
            href="#recursos"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-base transition-all flex items-center justify-center"
          >
            Ver Demonstração Técnica
          </a>
        </div>

        <div className="mt-14 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold text-white">4.8x</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Média de ROI Anual</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-400">-42%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Tempo de Entrega</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">99.99%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Disponibilidade SLA</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-cyan-400">1.8m</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Payback Médio</div>
          </div>
        </div>
      </div>
    </section>
  );
};