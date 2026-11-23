import React, { useState, useMemo } from "react";
import { DEFAULT_ROI_INPUTS, calculateRoi } from "../utils/roiCalculator";
import { RoiInputs } from "../types/saas";

export const RoiChart: React.FC = () => {
  const [inputs, setInputs] = useState<RoiInputs>(DEFAULT_ROI_INPUTS);

  const results = useMemo(() => calculateRoi(inputs), [inputs]);

  const maxVal = Math.max(...results.monthlyProjections.map((p) => Math.max(p.withoutPlatform, p.withPlatform)), 1);

  return (
    <section id="calculadora-roi" className="py-20 bg-slate-900/60 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-400 font-semibold text-sm tracking-widest uppercase">
            Simulador Financeiro
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3">
            Calcule o Retorno Real do seu Investimento
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Ajuste os parâmetros da sua equipe para ver o retorno líquido e gráfico de economia mês a mês.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Parâmetros da Operação</span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                WLC Model 1.1
              </span>
            </h3>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Desenvolvedores</span>
                <span className="font-bold text-white font-mono">{inputs.teamSize} devs</span>
              </div>
              <input
                type="range"
                min="2"
                max="60"
                value={inputs.teamSize}
                onChange={(e) => setInputs({ ...inputs, teamSize: Number(e.target.value) })}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Salário Médio</span>
                <span className="font-bold text-white font-mono">R$ {inputs.avgSalary.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="35000"
                step="1000"
                value={inputs.avgSalary}
                onChange={(e) => setInputs({ ...inputs, avgSalary: Number(e.target.value) })}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Horas de retrabalho / semana</span>
                <span className="font-bold text-white font-mono">{inputs.hoursWastedPerWeek}h / dev</span>
              </div>
              <input
                type="range"
                min="4"
                max="25"
                value={inputs.hoursWastedPerWeek}
                onChange={(e) => setInputs({ ...inputs, hoursWastedPerWeek: Number(e.target.value) })}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Ganho de Eficiência</span>
                <span className="font-bold text-emerald-400 font-mono">+{inputs.efficiencyGainPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={inputs.efficiencyGainPct}
                onChange={(e) => setInputs({ ...inputs, efficiencyGainPct: Number(e.target.value) })}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400">Payback Estimado:</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">{results.paybackMonths} meses</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400">Economia Anual</div>
                <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">
                  R$ {results.annualSavings.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400">ROI Projetado</div>
                <div className="text-2xl font-extrabold text-cyan-400 mt-1 font-mono">
                  +{results.roiPercentage}%
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-xs text-slate-400">Horas Poupadas/Ano</div>
                <div className="text-2xl font-extrabold text-white mt-1 font-mono">
                  {results.hoursSavedAnnual.toLocaleString()} h
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-mono">
                <span>Comparativo de Custos (12 Meses)</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-700"></span> Sem Plataforma</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500"></span> Com WLC Flow</span>
                </div>
              </div>

              <div className="h-64 flex items-end gap-2 sm:gap-3 pt-6 px-2 bg-slate-900/50 rounded-xl border border-slate-800/80">
                {results.monthlyProjections.map((p, i) => {
                  const pctWithout = Math.round((p.withoutPlatform / maxVal) * 100);
                  const pctWith = Math.round((p.withPlatform / maxVal) * 100);

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                      <div className="w-full flex items-end justify-center gap-1 h-48">
                        <div
                          style={{ height: pctWithout + "%" }}
                          className="w-1/2 bg-slate-700 rounded-t-sm transition-all duration-300 group-hover:bg-slate-600"
                        ></div>
                        <div
                          style={{ height: pctWith + "%" }}
                          className="w-1/2 bg-emerald-500 rounded-t-sm transition-all duration-300 shadow-sm shadow-emerald-500/20 group-hover:bg-emerald-400"
                        ></div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono mt-1">M{i + 1}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-2 font-mono">
                <span>Retorno Líquido no 1º Ano:</span>
                <span className="text-emerald-400 font-bold">R$ {results.netAnnualReturn.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#precos"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-center block transition-all shadow-lg shadow-emerald-500/25"
              >
                Garantir Retorno com WLC Flow
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};