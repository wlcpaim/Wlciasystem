import { SystemUser, DatabaseConfig } from '../types/system';

const STORAGE_SESSION_KEY = 'wlc_auth_session';
const STORAGE_CONFIG_KEY = 'wlc_db_config';

export function getStoredConfig(fallback: DatabaseConfig): DatabaseConfig {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
}

export function saveStoredConfig(config: DatabaseConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save db config', e);
  }
}

export function getStoredSession(): { user: SystemUser; accessToken?: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveStoredSession(user: SystemUser, accessToken?: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify({ user, accessToken }));
  } catch (e) {
    console.error('Failed to save session', e);
  }
}

export function clearStoredSession(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  } catch (e) {
    console.error('Failed to clear session', e);
  }
}

export async function testSupabasePing(endpoint: string, anonKey?: string): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
  const cleanUrl = endpoint.trim().replace(/\/+$/, '');
  const start = performance.now();
  try {
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    if (anonKey) {
      headers['apikey'] = anonKey.trim();
      headers['Authorization'] = 'Bearer ' + anonKey.trim();
    }
    const res = await fetch(cleanUrl + '/auth/v1/health', { headers });
    const latencyMs = Math.round(performance.now() - start);
    if (res.ok) {
      return { ok: true, latencyMs };
    }
    return { ok: true, latencyMs: Math.max(latencyMs, 20) };
  } catch (err: any) {
    return { ok: false, latencyMs: 0, error: err.message || 'Falha ao conectar no endpoint' };
  }
}

export async function supabaseSignUp(
  endpoint: string,
  anonKey: string,
  data: { email: string; password: string; name: string; role: 'admin' | 'manager' | 'cashier' }
): Promise<{ user: SystemUser; accessToken?: string }> {
  const cleanUrl = endpoint.trim().replace(/\/+$/, '');
  const cleanKey = anonKey.trim();

  const res = await fetch(cleanUrl + '/auth/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': cleanKey,
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      data: {
        name: data.name,
        role: data.role,
      },
    }),
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.error_description || body.msg || body.message || 'Erro ao realizar cadastro');
  }

  const sbUser = body.user || body;
  const systemUser: SystemUser = {
    id: sbUser.id || 'usr-' + Math.random().toString(36).substring(2, 9),
    name: data.name,
    email: data.email,
    role: data.role,
    lastLogin: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  };

  const accessToken = body.access_token;
  saveStoredSession(systemUser, accessToken);
  return { user: systemUser, accessToken };
}

export async function supabaseSignIn(
  endpoint: string,
  anonKey: string,
  data: { email: string; password: string }
): Promise<{ user: SystemUser; accessToken: string }> {
  const cleanUrl = endpoint.trim().replace(/\/+$/, '');
  const cleanKey = anonKey.trim();

  const res = await fetch(cleanUrl + '/auth/v1/token?grant_type=password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': cleanKey,
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.error_description || body.msg || body.message || 'Credenciais inválidas no Supabase');
  }

  const sbUser = body.user;
  const userMetadata = sbUser?.user_metadata || {};
  const systemUser: SystemUser = {
    id: sbUser?.id || 'usr-' + Math.random().toString(36).substring(2, 9),
    name: userMetadata.name || (data.email.split('@')[0]) || 'Usuário WLC',
    email: data.email,
    role: userMetadata.role || 'admin',
    lastLogin: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  };

  saveStoredSession(systemUser, body.access_token);
  return { user: systemUser, accessToken: body.access_token };
}