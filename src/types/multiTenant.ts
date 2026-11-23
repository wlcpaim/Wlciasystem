/**
 * WLC Enterprise - Multi-Tenancy & Infraestrutura de Acesso Unificado
 * Define os 3 ambientes de acesso, organizações (tenants), perfis e controle RBAC.
 */

export type AccessEnvironment = "wlc_admin" | "enterprise" | "customer";

export type WlcAdminRole = "super_admin" | "admin" | "support";

export type EnterpriseRole = "owner" | "admin" | "manager" | "finance" | "operator" | "employee";

export type CustomerRole = "client";

export type SystemRole = WlcAdminRole | EnterpriseRole | CustomerRole;

export interface Organization {
  id: string;
  name: string;
  slug: string;
  cnpjCpf?: string;
  planId: "starter" | "professional" | "enterprise";
  status: "active" | "trial" | "suspended";
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  logoUrl?: string;
  settings: {
    domain?: string;
    allowedIpRanges?: string[];
    mfaRequired?: boolean;
    sessionTimeoutMinutes: number;
    billingEmail: string;
  };
  limits: {
    maxUsers: number;
    maxMonthlyPix: number;
    maxAutomations: number;
    dedicatedAiAgents: number;
  };
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  name: string;
  email: string;
  role: EnterpriseRole;
  department: "Diretoria" | "Operações" | "Financeiro" | "Vendas" | "Atendimento" | "TI";
  status: "active" | "invited" | "suspended";
  twoFactorEnabled: boolean;
  invitedAt: string;
  joinedAt?: string;
  lastLoginAt?: string;
}

export interface CustomerAccount {
  id: string;
  organizationId: string;
  userId: string;
  name: string;
  email: string;
  document: string;
  phone: string;
  status: "active" | "blocked";
  contractedServices: {
    serviceId: string;
    name: string;
    activatedAt: string;
    status: "active" | "pending" | "canceled";
  }[];
  billingHistory: {
    id: string;
    amount: number;
    status: "paid" | "pending" | "refunded";
    dueDate: string;
    paidDate?: string;
  }[];
}

export interface RolePermissions {
  canManageOrganization: boolean;
  canManageUsers: boolean;
  canViewFinancials: boolean;
  canEmitPix: boolean;
  canManageAutomations: boolean;
  canInteractCognitive: boolean;
  canOperatePdv: boolean;
  canViewAuditLogs: boolean;
}

export const ENTERPRISE_PERMISSIONS_MATRIX: Record<EnterpriseRole, RolePermissions> = {
  owner: {
    canManageOrganization: true,
    canManageUsers: true,
    canViewFinancials: true,
    canEmitPix: true,
    canManageAutomations: true,
    canInteractCognitive: true,
    canOperatePdv: true,
    canViewAuditLogs: true,
  },
  admin: {
    canManageOrganization: false,
    canManageUsers: true,
    canViewFinancials: true,
    canEmitPix: true,
    canManageAutomations: true,
    canInteractCognitive: true,
    canOperatePdv: true,
    canViewAuditLogs: true,
  },
  manager: {
    canManageOrganization: false,
    canManageUsers: false,
    canViewFinancials: true,
    canEmitPix: true,
    canManageAutomations: true,
    canInteractCognitive: true,
    canOperatePdv: true,
    canViewAuditLogs: false,
  },
  finance: {
    canManageOrganization: false,
    canManageUsers: false,
    canViewFinancials: true,
    canEmitPix: true,
    canManageAutomations: false,
    canInteractCognitive: false,
    canOperatePdv: true,
    canViewAuditLogs: false,
  },
  operator: {
    canManageOrganization: false,
    canManageUsers: false,
    canViewFinancials: false,
    canEmitPix: true,
    canManageAutomations: false,
    canInteractCognitive: true,
    canOperatePdv: true,
    canViewAuditLogs: false,
  },
  employee: {
    canManageOrganization: false,
    canManageUsers: false,
    canViewFinancials: false,
    canEmitPix: false,
    canManageAutomations: false,
    canInteractCognitive: true,
    canOperatePdv: false,
    canViewAuditLogs: false,
  },
};