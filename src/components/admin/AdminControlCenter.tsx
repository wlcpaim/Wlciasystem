import React, { useState } from "react";
import { AdminLayout, AdminTab } from "./AdminLayout";
import { AdminDashboard } from "./AdminDashboard";
import { AdminUsers } from "./AdminUsers";
import { AdminRoles } from "./AdminRoles";
import { AdminSessions } from "./AdminSessions";
import { AdminSecurity } from "./AdminSecurity";
import { AdminAudit } from "./AdminAudit";
import { AdminOrganizations } from "./AdminOrganizations";
import { AdminSettings } from "./AdminSettings";
import { AdminUser } from "../../types/admin";
import { SystemUser } from "../../types/system";

interface AdminControlCenterProps {
  currentUser: SystemUser | null;
  onExitAdmin: () => void;
  onLogout: () => void;
}

export const AdminControlCenter: React.FC<AdminControlCenterProps> = ({
  currentUser,
  onExitAdmin,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  // Adaptação segura para o perfil de administração
  const adminUser: AdminUser = {
    id: currentUser?.id || "u-owner-1",
    name: currentUser?.name || "Wilson Paim",
    email: currentUser?.email || "wlcpaim@gmail.com",
    role: "owner",
    organizationId: "org-1",
    organizationName: "WLC Enterprise Global",
    status: "active",
    mfaEnabled: true,
    createdAt: "2026-01-01",
    lastLoginAt: currentUser?.lastLogin || "2026-11-24 00:28",
    lastLoginIp: "177.18.24.102",
  };

  return (
    <AdminLayout
      currentTab={activeTab}
      onSelectTab={setActiveTab}
      currentUser={adminUser}
      onExitAdmin={onExitAdmin}
      onLogout={onLogout}
    >
      {activeTab === "dashboard" && (
        <AdminDashboard currentUser={adminUser} onNavigateTab={setActiveTab} />
      )}
      {activeTab === "users" && <AdminUsers />}
      {activeTab === "roles" && <AdminRoles />}
      {activeTab === "sessions" && <AdminSessions />}
      {activeTab === "security" && <AdminSecurity />}
      {activeTab === "audit" && <AdminAudit />}
      {activeTab === "organizations" && <AdminOrganizations />}
      {activeTab === "settings" && <AdminSettings />}
    </AdminLayout>
  );
};