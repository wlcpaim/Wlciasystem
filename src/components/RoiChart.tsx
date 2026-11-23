`src/components/RoiChart.tsx` · 188 linhas · unchanged
```tsx
import React, { useState, useMemo } from "react";
import { DEFAULT_ROI_INPUTS, calculateRoi } from "../utils/roiCalculator";
import { RoiInputs } from "../types/saas";

export const RoiChart: React.FC = () => {
  const [inputs, setInputs] = useState<RoiInputs>(DEFAULT_ROI_INPUTS);

  const results = useMemo(() => calculateRoi(inputs), [inputs]);

  const update = <K extends keyof RoiInputs>(key: K, val: number) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="roi-simulador" className="py-24 relative overflow-hidden bg-slate-950/60 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-4">
            <span>SIMULADOR DE RETORNO EM TEMPO REAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Projete o Impacto Financeiro no seu Squad
          </h2>
          <p className="text-base text-slate-400">
            Ajuste os parâmetros da sua equipe técnica para calcular a economia de horas e o retorno de capital anual garantido pela automação WLC System.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl glass-panel space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-4">
              <span>Parâmetros Operacionais</span>
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Tamanho da Equipe (Devs)</span>
                <span className="font-mono font-bold text-white">{inputs.teamSize} devs</span>
              </div>
              <input
                type="range"
                min={2}
                max={50}
                value={inputs.teamSize}
                onChange={(e) => update("teamSize", Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-zinc-100"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Salário Médio Mensal (CLT/PJ)</span>
                <span className="font-mono font-bold text-white">{formatBRL(inputs.avgSalary)}</span>
              </div>
              <input
                type="range"
                min={4000}
                max={30000}
                step={500}
                value={inputs.avgSalary}
                onChange={(e) => update("avgSalary", Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-zinc-100"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Horas em Retrabalho / Boilerplate (Semana)</span>
                <span className="font-mono font-bold text-white">{inputs.hoursWastedPerWeek}h / dev</span>
              </div>
              <input
                type="range"
                min={4}
                max={25}
                value={inputs.hoursWastedPerWeek}
                onChange={(e) => update("hoursWastedPerWeek", Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-zinc-100"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Custo Mensal de Infraestrutura / Cloud</span>
                <span className="font-mono font-bold text-white">{formatBRL(inputs.monthlyInfraCost)}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={40000}
                step={500}
                value={inputs.monthlyInfraCost}
                onChange={(e) => update("monthlyInfraCost", Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-zinc-100"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Eficiência Esperada com WLC</span>
                <span className="font-mono font-bold text-white">{inputs.efficiencyGainPct}%</span>
              </div>
              <input
                type="range"
                min={15}
                max={70}
                step={5}
                value={inputs.efficiencyGainPct}
                onChange={(e) => update("efficiencyGainPct", Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-zinc-100"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-1">
                Economia Líquida Anual Estimada
              </div>
              <div className="text-4xl sm:text-6xl font-black text-white font-mono tracking-tight">
                {formatBRL(results.netAnnualReturn)}
              </div>
              <div className="mt-3 text-sm text-slate-300 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-zinc-300" />
                <span>Retorno sobre investimento (ROI) de <strong className="text-white font-mono text-base">{results.roiPercentage}%</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl glass-card-interactive">
                <div className="text-xs text-slate-400 mb-1">Horas Poupadas / Ano</div>
                <div className="text-2xl font-bold font-mono text-white">{results.hoursSavedAnnual} hrs</div>
                <div className="text-[11px] text-white mt-1">Tempo focado no produto</div>
              </div>

              <div className="p-5 rounded-xl glass-card-interactive">
                <div className="text-xs text-slate-400 mb-1">Payback do Investimento</div>
                <div className="text-2xl font-bold font-mono text-white">{results.paybackMonths} meses</div>
                <div className="text-[11px] text-slate-400 mt-1">Retorno ultra-rápido</div>
              </div>

              <div className="p-5 rounded-xl glass-card-interactive">
                <div className="text-xs text-slate-400 mb-1">Custo Dev Tradicional</div>
                <div className="text-2xl font-bold font-mono text-slate-300">{formatBRL(results.annualDevCost)}</div>
                <div className="text-[11px] text-slate-500 mt-1">Base anual bruta</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Curva de Economia Acumulada (12 Meses)</h4>
                <span className="text-xs font-mono text-white">{formatBRL(results.annualSavings)} total</span>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 items-end h-28 pt-4">
                {results.monthlyProjections.map((p, idx) => {
                  const maxSavings = results.monthlyProjections[results.monthlyProjections.length - 1]?.accumulatedSavings || 1;
                  const heightPct = Math.max(15, Math.round((p.accumulatedSavings / maxSavings) * 100));
                  return (
                    <div key={idx} className="flex flex-col items-center group relative h-full justify-end">
                      <div
                        style={{ height: `${heightPct}%` }}
                        className="w-full rounded-t bg-zinc-600 group-hover:bg-zinc-400 transition-all cursor-pointer"
                      />
                      <span className="text-[9px] text-slate-500 font-mono mt-1">M{idx + 1}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-3">
                <span>Início: Mês 1</span>
                <span>Projeção validada com base em métricas de engenharia</span>
                <span>Mês 12</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
```