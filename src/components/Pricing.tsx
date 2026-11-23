import React, { useState } from "react";
import { PricingPlan } from "../types/saas";

export const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  const plans: PricingPlan[] = [
    {
      id: "starter",
      name: "Starter",
      priceMonthly: 149,
      priceAnnual: 119,
      description: "Ideal para times enxutos que querem acelerar diagnósticos e eliminar retrabalho.",
      features: [
        "Até 3 projetos conectados",
        "Terminal WLC System (CLI determinística)",
        "Diagnóstico estático em tempo real",
        "Integração nativa com GitHub",
        "Suporte da comunidade",
      ],
      cta: "Começar Agora",
    },
    {
      id: "pro",
      name: "Professional",
      popular: true,
      badge: "Mais Recomendado",
      priceMonthly: 399,
      priceAnnual: 319,
      description: "Para squads em escala que exigem máxima velocidade e integração de bots por bridge.",
      features: [
        "Projetos ilimitados",
        "Bridge de comandos entre bots (Realtime)",
        "Calculadora de ROI com projeção avançada",
        "Diffs visuais e commits assinados",
        "Suporte prioritário via chat técnico",
        "Acesso à API de terminal /api/system/command",
      ],
      cta: "Testar 14 Dias Grátis",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      priceMonthly: 999,
      priceAnnual: 799,
      description: "Para grandes organizações com regras rígidas de segurança, auditoria e customização.",
      features: [
        "SLA de 99.99% garantido em contrato",
        "Workflows dedicados do WLC Runner",
        "Auditoria de logs e eventos em banco isolado",
        "Gestor técnico de contas dedicado",
        "Customização de regras determinísticas",
      ],
      cta: "Falar com Consultor",
    },
  ];

  return (
    <section id="planos" className="py-24 relative overflow-hidden bg-zinc-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-4">
            <span>PLANOS TRANSPARENTES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Invista na Produtividade do seu Time
          </h2>
          <p className="text-base text-zinc-400 mb-8">
            Escolha o plano ideal para a dimensão do seu squad de tecnologia. Todos incluem o motor WLC System.
          </p>

          <div className="inline-flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold">
            <button
              onClick={() => setAnnual(false)}
              className={"px-4 py-2 rounded-lg transition-all " + (!annual ? "bg-zinc-800 text-white shadow" : "text-zinc-400 hover:text-white")}
            >
              Faturamento Mensal
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={"px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 " + (annual ? "bg-white text-zinc-950 shadow-md font-bold" : "text-zinc-400 hover:text-white")}
            >
              <span>Faturamento Anual</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-900 font-bold">
                -20% OFF
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => {
            const price = annual ? p.priceAnnual : p.priceMonthly;
            return (
              <div
                key={p.id}
                className={"p-8 rounded-2xl flex flex-col justify-between relative transition-all " + (p.popular ? "bg-zinc-900 border-2 border-zinc-600 shadow-xl -translate-y-2" : "glass-card-interactive")}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-zinc-950 text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    {p.badge}
                  </div>
                )}

                <div>
                  <div className="text-xl font-bold text-white mb-1">{p.name}</div>
                  <p className="text-xs text-zinc-400 mb-6 min-h-[36px]">{p.description}</p>

                  <div className="mb-6 pb-6 border-b border-zinc-800">
                    <span className="text-4xl font-extrabold font-mono text-white">R$ {price}</span>
                    <span className="text-xs text-zinc-400 ml-1.5 font-mono">/ mês</span>
                    {annual && (
                      <div className="text-[11px] text-zinc-300 font-mono mt-1">Cobrado anualmente</div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-zinc-300">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-2.5">
                        <svg className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={"w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all " + (p.popular ? "bg-white text-zinc-950 hover:bg-zinc-200 shadow-md" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700")}
                >
                  {p.cta}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};