import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBadges } from "./components/TrustBadges";
import { EnterpriseSegment } from "./components/EnterpriseSegment";
import { RoiChart } from "./components/RoiChart";
import { Features } from "./components/Features";
import { ComparisonTable } from "./components/ComparisonTable";
import { Pricing } from "./components/Pricing";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { SaasDashboard } from "./components/SaasDashboard";
import { PdvModule } from "./components/PdvModule";
import { AuthModal } from "./components/AuthModal";
import { DatabaseConfigModal } from "./components/DatabaseConfigModal";
import { SystemUser, DatabaseConfig } from "./types/system";
import { getStoredConfig, getStoredSession, clearStoredSession, saveStoredConfig } from "./utils/supabaseAuth";

const DEFAULT_DB_CONFIG: DatabaseConfig = {
  provider: "Supabase",
  endpoint: "",
  anonKey: "",
  databaseName: "wlc_system_production",
  ssl: true,
  status: "offline",
  latencyMs: 0,
  autoSync: true,
  lastSync: "Não verificado",
  tables: [
    { name: "users", rowCount: 0, sizeKb: 0 },
    { name: "saas_subscriptions", rowCount: 0, sizeKb: 0 },
    { name: "pdv_products", rowCount: 18, sizeKb: 64 },
    { name: "pdv_sales", rowCount: 0, sizeKb: 0 },
    { name: "system_events", rowCount: 0, sizeKb: 0 },
  ],
};

export const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<"landing" | "saas" | "pdv">("landing");
  
  // Real session state, loaded from local storage
  const [currentUser, setCurrentUser] = useState<SystemUser | null>(() => {
    const stored = getStoredSession();
    return stored ? stored.user : null;
  });

  // Real Database & Supabase Config, loaded from local storage
  const [dbConfig, setDbConfig] = useState<DatabaseConfig>(() => {
    return getStoredConfig(DEFAULT_DB_CONFIG);
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDbConfigOpen, setIsDbConfigOpen] = useState(false);

  const handleLogout = () => {
    clearStoredSession();
    setCurrentUser(null);
    if (activeModule !== "landing") {
      setActiveModule("landing");
    }
  };

  const handleUpdateConfig = (newConf: DatabaseConfig) => {
    setDbConfig(newConf);
    saveStoredConfig(newConf);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-zinc-100 relative overflow-hidden font-sans">
      {/* Main Navbar */}
      <Navbar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        dbConfig={dbConfig}
        onOpenDbConfig={() => setIsDbConfigOpen(true)}
      />

      {/* Dynamic Content by Active Module */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeModule === "landing" && (
          <div className="space-y-16">
            <Hero />
            <TrustBadges />
            <EnterpriseSegment />
            <RoiChart />
            <Features />
            <ComparisonTable />
            <Pricing />
            <Faq />
            <Footer />
          </div>
        )}

        {activeModule === "saas" && (
          currentUser ? (
            <SaasDashboard />
          ) : (
            <div className="py-20 text-center max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-300 font-mono text-sm">
                LOCK
              </div>
              <h2 className="text-xl font-semibold text-zinc-100">Acesso Restrito ao Painel SaaS</h2>
              <p className="text-xs text-zinc-400">
                Faça login com sua conta real ou configure o Supabase para gerenciar assinaturas.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  className="py-2 px-4 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs tracking-wide transition-colors"
                >
                  Entrar / Cadastrar
                </button>
                <button
                  type="button"
                  onClick={() => setIsDbConfigOpen(true)}
                  className="py-2 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
                >
                  Configurar Supabase
                </button>
              </div>
            </div>
          )
        )}

        {activeModule === "pdv" && (
          <PdvModule
            currentUser={currentUser}
            onRequireLogin={() => setIsAuthOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
        dbConfig={dbConfig}
        onOpenDbConfig={() => setIsDbConfigOpen(true)}
      />

      <DatabaseConfigModal
        isOpen={isDbConfigOpen}
        onClose={() => setIsDbConfigOpen(false)}
        config={dbConfig}
        onUpdateConfig={handleUpdateConfig}
      />
    </div>
  );
};

export default App;