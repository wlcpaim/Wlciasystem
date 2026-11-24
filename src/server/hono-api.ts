/**
 * WLC Enterprise 2.0 — Hono API Backend on Cloudflare Workers
 * Suporta Cloudflare Hyperdrive para PostgreSQL com baixa latência,
 * cookies HttpOnly seguros para sessões e RBAC centralizado.
 */

export interface Env {
  HYPERDRIVE: {
    connectionString: string;
  };
  R2_BUCKET?: any;
  JWT_SECRET: string;
  ENVIRONMENT: string;
}

export interface SessionContext {
  sessionId: string;
  userId: string;
  userEmail: string;
  role: string;
  organizationId: string;
}

// Utilitários de Hash e Cookie Seguro
export function generateSessionId(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashSessionToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function buildHttpOnlyCookie(token: string, maxAgeSeconds: number = 86400): string {
  return `wlc_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAgeSeconds}`;
}

export function buildClearCookie(): string {
  return `wlc_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

// Definições de Rotas e Contratos de Handlers
export const API_ROUTES = {
  AUTH_LOGIN: "/api/auth/login",
  AUTH_LOGOUT: "/api/auth/logout",
  AUTH_REVOKE_ALL: "/api/auth/revoke-all",
  AUTH_ME: "/api/auth/me",
  ADMIN_USERS: "/api/admin/users",
  ADMIN_ROLES: "/api/admin/roles",
  ADMIN_SESSIONS: "/api/admin/sessions",
  ADMIN_SESSIONS_REVOKE: "/api/admin/sessions/:id/revoke",
  ADMIN_SECURITY: "/api/admin/security",
  ADMIN_AUDIT: "/api/admin/audit",
  ADMIN_ORGS: "/api/admin/organizations",
  ADMIN_SETTINGS: "/api/admin/settings"
};