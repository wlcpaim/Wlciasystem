import React, { useState } from "react";

export const EnterpriseSegment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"startup" | "mid" | "enterprise">("mid");

  const segments = {
    startup: {
      tag: "Pequenas Empresas & Startups (2 a 15 devs)",
      headline: "Máxima velocidade de entrega sem sobrecarregar a folha",
      desc: "Automatize tarefas repetitivas, padronize componentes e permita que cada engenheiro entregue o equivalente a 3 profissionais experientes.",
      metrics: [
        { label: "Economia mensal média", val: "R$ 28.000" },
        { label: "Aceleração de sprints", val: "+65%" },
        { label: "Tempo de onboarding", val: "5 minutos" },
      ],
      features: [
        "Setup imediato sem infraestrutura dedicada",
        "Scaffolding determinístico de landing pages e microsserviços",
        "Diagnóstico estático automático antes de cada merge",
        "Suporte direto pelo chat e comunidade",
      ],
      cta: "Iniciar com Plano Starter",
    },
    mid: {
      tag: "Médias Empresas & Scale-ups (15 a 60 devs)",
      headline: "Governança técnica e previsibilidade com redução de gargalos",
      desc: "Elimine o atrito em PRs e code reviews complexos. Sincronize bots determinísticos com o fluxo dos times para manter a qualidade de código homogênea.",
      metrics: [
        { label: "Economia anual projetada", val: "R$ 380.000" },
        { label: "Redução de retrabalho", val: "-48%" },
        { label: "Previsibilidade de entrega", val: "94%" },
      ],
      features: [
        "Sincronização bi-direcional de terminais com canal de eventos",
        "Projeções automáticas de ROI por equipe e funcionalidade",
        "Pipeline de commit assinado e branches protegidas",
        "Integrações por API e webhooks customizados",
      ],
      cta: "Agendar Demonstração Técnica",
    },
    enterprise: {
      tag: "Grandes Corporações (60+ devs / Enterprise)",
      headline: "Auditoria contínua, isolamento de dados e SLA de 99.99%",
      desc: "Projetado para ambientes com controle rígido de acesso, auditoria imutável e soberania de dados. Zero treinamento com dados privados e suporte dedicado 24/7.",
      metrics: [
        { label: "Economia anual estimada", val: "R$ 1.2M+" },
        { label: "SLA contratual", val: "99.99%" },
        { label: "Vazamento de código", val: "0% (Isolado)" },
      ],
      features: [
        "Runner exclusivo para execução em VM isolada na sua nuvem",
        "Logs de auditoria imutáveis com retenção estendida",
        "Gestor de contas técnico (TAM) dedicado",
        "Contrato personalizado com DPA (Data Processing Agreement)",
      ],
      cta: "Falar com Arquiteto Enterprise",
    },
  };

  const current = segments[activeTab];

  return (
    <section id="segmentos" className="py-24 relative overflow-hidden bg-zinc-950/70 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono mb-4">
            <span>ESCALABILIDADE CORPORATIVA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Soluções Feitas sob Medida para o seu Porte
          </h2>
          <p className="text-base text-zinc-400">
            De equipes enxutas a grandes divisões de engenharia, a automação determinística se adapta às regras do seu negócio.
          </p>

          {/* Segment Selector Tabs */}
          <div className="mt-8 inline-flex p-1 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("startup")}
              className={"px-5 py-2.5 rounded-xl transition-all " + (activeTab === "startup" ? "bg-white text-zinc-950 shadow-md font-bold" : "text-zinc-400 hover:text-white")}
            >
              Startups & PMEs
            </button>
            <button
              onClick={() => setActiveTab("mid")}
              className={"px-5 py-2.5 rounded-xl transition-all " + (activeTab === "mid" ? "bg-white text-zinc-950 shadow-md font-bold" : "text-zinc-400 hover:text-white")}
            >
              Médias Empresas
            </button>
            <button
              onClick={() => setActiveTab("enterprise")}
              className={"px-5 py-2.5 rounded-xl transition-all " + (activeTab === "enterprise" ? "bg-white text-zinc-950 shadow-md font-bold" : "text-zinc-400 hover:text-white")}
            >
              Grandes Corporações
            </button>
          </div>
        </div>

        {/* Segment Content Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-zinc-300 bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full">
                <span>{current.tag}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {current.headline}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {current.desc}
              </p>

              <div className="space-y-3 pt-2">
                {current.features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-3 text-sm text-zinc-200">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-100 flex items-center justify-center font-bold text-xs shrink-0 border border-zinc-700">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a
                  href="#roi-simulador"
                  className="inline-flex items-center px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-950 bg-white hover:bg-zinc-200 shadow-lg transition-all"
                >
                  {current.cta}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Impacto Operacional Validado
                </div>
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-300">{m.label}</span>
                    <span className="text-xl font-bold font-mono text-white">{m.val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};