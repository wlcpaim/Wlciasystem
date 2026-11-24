export type AdminRole = 
  | "owner" 
  | "wlc_admin" 
  | "enterprise_admin" 
  | "manager" 
  | "operator" 
  | "client";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  organizationId: string;
  organizationName: string;
  avatarUrl?: string;
  status: "active" | "suspended" | "pending_mfa";
  mfaEnabled: boolean;
  createdAt: string;
  lastLoginAt: string;
  lastLoginIp: string;
}

export interface UserSession {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: AdminRole;
  organizationId: string;
  ipAddress: string;
  userAgent: string;
  browser: string;
  os: string;
  deviceType: "desktop" | "mobile" | "tablet";
  status: "active" | "expired" | "revoked";
  createdAt: string;
  lastActivityAt: string;
  expiresAt: string;
  revokedAt?: string;
  revocationReason?: string;
  isCurrent?: boolean;
}

export type AuditCategory = "auth" | "security" | "rbac" | "session" | "admin" | "system";
export type AuditSeverity = "low" | "medium" | "high" | "critical";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  category: AuditCategory;
  severity: AuditSeverity;
  action: string;
  description: string;
  userId: string;
  userName: string;
  userEmail: string;
  organizationId: string;
  organizationName: string;
  ipAddress: string;
  metadata?: Record<string, any>;
}

export interface OrganizationTenant {
  id: string;
  name: string;
  slug: string;
  cnpjCpf: string;
  plan: "Starter" | "Professional" | "Enterprise" | "Ultimate";
  status: "active" | "trial" | "suspended";
  ownerName: string;
  ownerEmail: string;
  membersCount: number;
  activeSessionsCount: number;
  storageUsedMb: number;
  monthlyPixVolume: number;
  mfaRequired: boolean;
  ipWhitelistEnabled: boolean;
  allowedIps: string[];
  createdAt: string;
}

export interface SecurityPolicyConfig {
  mfaMandatoryForPrivileged: boolean;
  sessionIdleTimeoutMinutes: number;
  sessionAbsoluteTimeoutHours: number;
  maxConcurrentSessionsPerUser: number;
  bruteForceMaxAttempts: number;
  bruteForceLockoutMinutes: number;
  csrfProtectionEnabled: boolean;
  httpOnlyCookiesEnforced: boolean;
  ipWhitelistEnabled: boolean;
  allowedIpRanges: string[];
  passwordPolicy: {
    minLength: number;
    requireSpecialChar: boolean;
    requireNumbers: boolean;
    requireUppercase: boolean;
    expiryDays: number;
  };
}

export interface RolePermissionMatrixItem {
  key: string;
  label: string;
  category: "organization" | "users" | "sessions" | "financial" | "audit" | "system";
  description: string;
  allowedRoles: AdminRole[];
}