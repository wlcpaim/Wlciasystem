import React from "react";

export const TrustBadges: React.FC = () => {
  const certifications = [
    { label: "SOC2 Type II", desc: "Auditoria Rigorosa", icon: "🛡️" },
    { label: "ISO/IEC 27001", desc: "Padrão de Segurança", icon: "🔒" },
    { label: "LGPD & GDPR", desc: "Privacidade Garantida", icon: "⚖️" },
    { label: "GitHub Verified", desc: "Integração Oficial", icon: "🐙" },
    { label: "99.99% SLA", desc: "Alta Disponibilidade", icon: "⚡" },
  ];

  return (
    <section className="py-12 border-b border-slate-900 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-500 mb-8">
          Conformidade e segurança validada para operações críticas
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {certifications.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 p-3.5 rounded-xl glass-panel hover:border-slate-700 transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-xs font-bold text-white font-mono">{item.label}</div>
                <div className="text-[10px] text-slate-400">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};