import React, { useState } from "react";
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

export const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<"landing" | "saas" | "pdv">("landing");
  
  // Pre-configured session with Owner privileges
  const [currentUser, setCurrentUser] = useState<SystemUser | null>({
    id: "usr-owner-01",
    name: "Wilson Paim (Owner)",
    email: "admin@wlcsystem.com.br",
    role: "admin",
    lastLogin: "13:28",
  });

  // Database Connection State (Lovable Cloud / PostgreSQL)
  const [dbConfig, setDbConfig] = useState<DatabaseConfig>({
    provider: "Lovable Cloud",
    endpoint: "https://xlnjwlwoadfasfklztja.supabase.co",
    databaseName: "wlc_system_production",
    ssl: true,
    status: "connected",
    latencyMs: 24,
    autoSync: true,
    lastSync: "Agora há pouco",
    tables: [
      { name: "users", rowCount: 42, sizeKb: 128 },
      { name: "saas_subscriptions", rowCount: 842, sizeKb: 1024 },
      { name: "pdv_products", rowCount: 18, sizeKb: 64 },
      { name: "pdv_sales", rowCount: 3912, sizeKb: 4096 },
      { name: "system_events", rowCount: 8420, sizeKb: 8192 },
    ],
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDbConfigOpen, setIsDbConfigOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090a0d] text-zinc-100 selection:bg-amber-500/20 selection:text-amber-300 relative overflow-hidden font-sans">
      {/* Claude/Grok Ambient Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-amber-500/[0.04] via-emerald-500/[0.02] to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.02] blur-[140px] pointer-events-none -z-10" />

      {/* Main Navbar */}
      <Navbar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setCurrentUser(null)}
        dbConfig={dbConfig}
        onOpenDbConfig={() => setIsDbConfigOpen(true)}
      />

      {/* Dynamic Content by Active Module */}
      <main className="relative z-10">
        {activeModule === "landing" && (
          <>
            <Hero />
            <TrustBadges />
            <EnterpriseSegment />
            <RoiChart />
            <Features />
            <ComparisonTable />
            <Pricing />
            <Faq />
            <Footer />
          </>
        )}

        {activeModule === "saas" && (
          <SaasDashboard />
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
      />

      <DatabaseConfigModal
        isOpen={isDbConfigOpen}
        onClose={() => setIsDbConfigOpen(false)}
        config={dbConfig}
        onUpdateConfig={(newConf) => setDbConfig(newConf)}
      />
    </div>
  );
};

export default App;