import React, { useState, useEffect } from "react";
import { Navbar, AppModule } from "./components/Navbar";
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
import { FinanceModule } from "./components/FinanceModule";
import { CrmGrowthModule } from "./components/CrmGrowthModule";
import { AutomationModule } from "./components/AutomationModule";
import { CognitiveModule } from "./components/CognitiveModule";
import { AuthModal } from "./components/AuthModal";
import { DatabaseConfigModal } from "./components/DatabaseConfigModal";
import { SystemUser, DatabaseConfig } from "./types/system";
import { getStoredConfig, getStoredSession, clearStoredSession, saveStoredConfig, testSupabasePing } from "./utils/supabaseAuth";

const DEFAULT_DB_CONFIG: DatabaseConfig = {
  provider: "Supabase",
  endpoint: typeof window !== "undefined" ? (window as any).__WLC_DB_ENDPOINT__ || "" : "",
  anonKey: typeof window !== "undefined" ? (window as any).__WLC_ANON_KEY__ || "" : "",
  databaseName: "wlc_system_production",
  ssl: true,
  status: "connected",
  latencyMs: 35,
  autoSync: true,
  lastSync: "Agora",
  tables: [
    { name: "users", rowCount: 3420, sizeKb: 142 },
    { name: "system_events", rowCount: 1890, sizeKb: 384 },
    { name: "pix_transactions", rowCount: 1240, sizeKb: 216 },
    { name: "crm_leads", rowCount: 850, sizeKb: 198 },
    { name: "pdv_products", rowCount: 18, sizeKb: 64 },
    { name: "pdv_sales", rowCount: 420, sizeKb: 96 },
    { name: "saas_subscriptions", rowCount: 180, sizeKb: 44 },
  ],
};

export const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AppModule>("landing");
  
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

  // Auto test connection on mount
  useEffect(() => {
    if (dbConfig.endpoint) {
      testSupabasePing(dbConfig.endpoint, dbConfig.anonKey).then((res) => {
        setDbConfig((prev) => ({
          ...prev,
          status: res.ok ? "connected" : "offline",
          latencyMs: res.latencyMs || prev.latencyMs,
          lastSync: res.ok ? "Agora mesmo" : prev.lastSync,
        }));
      });
    }
  }, []);

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

  const handleModuleSelect = (mod: AppModule) => {
    // If selecting protected modules without login, prompt auth
    const isProtected = mod !== "landing";
    if (isProtected && !currentUser) {
      setIsAuthOpen(true);
      return;
    }
    setActiveModule(mod);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white antialiased">
      {/* Navbar with full Enterprise Module switchers */}
      <Navbar
        activeModule={activeModule}
        onSelectModule={handleModuleSelect}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        dbConfig={dbConfig}
        onOpenDbConfig={() => setIsDbConfigOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Module: Landing / Overview */}
        {activeModule === "landing" && (
          <div className="space-y-16">
            <Hero />
            <TrustBadges />
            <EnterpriseSegment />
            <RoiChart />
            <Features />
            <ComparisonTable />
            <Pricing onSelectPlan={() => setIsAuthOpen(true)} />
            <Faq />
          </div>
        )}

        {/* Module: WLC Finance & PIX */}
        {activeModule === "finance" && <FinanceModule />}

        {/* Module: WLC Growth CRM */}
        {activeModule === "growth" && <CrmGrowthModule />}

        {/* Module: WLC n8n Intelligence & Flow Map */}
        {activeModule === "automation" && <AutomationModule />}

        {/* Module: WLC Cognitive AI */}
        {activeModule === "cognitive" && <CognitiveModule />}

        {/* Module: SaaS Management */}
        {activeModule === "saas" && <SaasDashboard />}

        {/* Module: PDV Express */}
        {activeModule === "pdv" && <PdvModule currentUser={currentUser} />}
      </main>

      {/* Global Minimalist Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        dbConfig={dbConfig}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
        }}
      />

      <DatabaseConfigModal
        isOpen={isDbConfigOpen}
        onClose={() => setIsDbConfigOpen(false)}
        config={dbConfig}
        currentConfig={dbConfig}
        onUpdateConfig={handleUpdateConfig}
        onSaveConfig={handleUpdateConfig}
      />
    </div>
  );
};

export default App;