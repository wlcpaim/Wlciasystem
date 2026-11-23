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
      description: "Ideal para times pequenos validando fluxos automatizados.",
      features: ["Até 5 desenvolvedores", "System 1.1.0 Determinístico", "50 deploys mensais", "Diagnóstico de repositório"],
      cta: "Começar Teste Grátis",
    },
    {
      id: "pro",
      name: "Pro Scaling",
      popular: true,
      badge: "Mais Escolhido",
      priceMonthly: 399,
      priceAnnual: 299,
      description: "Para empresas escalando produtos com garantia de ROI.",
      features: ["Até 25 desenvolvedores", "Copilot PRO + System Bridge", "Deploys ilimitados", "Calculadora e auditoria de ROI", "Suporte prioritário 24/7"],
      cta: "Assinar Pro",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      priceMonthly: 999,
      priceAnnual: 799,
      description: "Infraestrutura dedicada e compliance de nível bancário.",
      features: ["Devs ilimitados", "SLA 99.99% garantido", "Isolamento VPC & Chaves Próprias", "Engenheiro de Soluções Dedicado"],
      cta: "Falar com Especialista",
    },
  ];

  return (
    <section id="precos" className="py-24 bg-slate-900/40 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-400 font-semibold text-sm tracking-widest uppercase">Preços Transparentes</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3">
            Planos que se Pagam Sozinhos
          </h2>

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={!annual ? "text-white font-bold text-sm" : "text-slate-400 text-sm"}>Mensal</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-14 h-8 bg-slate-800 rounded-full p-1 relative border border-slate-700 transition-colors"
            >
              <div
                className={"w-6 h-6 rounded-full bg-emerald-400 transition-transform " + (annual ? "translate-x-6" : "translate-x-0")}
              ></div>
            </button>
            <span className={annual ? "text-white font-bold text-sm flex items-center gap-1.5" : "text-slate-400 text-sm flex items-center gap-1.5"}>
              Anual <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">20% OFF</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => {
            const price = annual ? p.priceAnnual : p.priceMonthly;
            return (
              <div
                key={p.id}
                className={"rounded-2xl p-8 flex flex-col justify-between border relative transition-all " +
                  (p.popular
                    ? "bg-slate-900 border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-105 z-10"
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-700")}
              >
                {p.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-md">
                    {p.badge}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white">{p.name}</h3>
                  <p className="text-sm text-slate-400 mt-2">{p.description}</p>
                  <div className="my-6">
                    <span className="text-4xl font-extrabold text-white">R$ {price}</span>
                    <span className="text-slate-400 text-sm"> / mês</span>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-300">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#calculadora-roi"
                  className={"mt-8 w-full py-3 rounded-xl font-bold text-center block transition-all " +
                    (p.popular
                      ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30"
                      : "bg-slate-800 hover:bg-slate-700 text-white")}
                >
                  {p.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};