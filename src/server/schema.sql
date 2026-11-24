-- ============================================================================
-- WLC ENTERPRISE 2.0 — POSTGRESQL SCHEMA (Cloudflare Hyperdrive Compatible)
-- Fonte única da verdade para Autenticação, Sessões Seguras, RBAC e Auditoria
-- ============================================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. ORGANIZATIONS (Multi-Tenancy)
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    cnpj_cpf VARCHAR(20),
    plan VARCHAR(50) NOT NULL DEFAULT 'enterprise',
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    owner_id UUID,
    storage_quota_mb INTEGER NOT NULL DEFAULT 51200,
    mfa_required BOOLEAN NOT NULL DEFAULT true,
    ip_whitelist_enabled BOOLEAN NOT NULL DEFAULT false,
    allowed_ip_ranges TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_organizations_slug ON public.organizations(slug);

-- 2. USERS
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'client',
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    avatar_url TEXT,
    mfa_enabled BOOLEAN NOT NULL DEFAULT false,
    mfa_secret_encrypted TEXT,
    failed_login_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_users_org_id ON public.users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- 3. USER SESSIONS (Server-side, Hash-stored, HttpOnly Cookie target)
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_token_hash VARCHAR(64) NOT NULL UNIQUE, -- SHA-256 do token gerado
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    ip_address INET NOT NULL,
    user_agent TEXT NOT NULL,
    browser VARCHAR(100),
    os VARCHAR(100),
    device_type VARCHAR(30) DEFAULT 'desktop',
    status VARCHAR(30) NOT NULL DEFAULT 'active', -- 'active', 'expired', 'revoked'
    csrf_secret VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    revocation_reason TEXT
);
CREATE INDEX IF NOT EXISTS idx_sessions_hash ON public.user_sessions(session_token_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON public.user_sessions(status);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON public.user_sessions(expires_at);

-- 4. ROLES & PERMISSIONS (RBAC Granular)
CREATE TABLE IF NOT EXISTS public.roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    hierarchy_level INTEGER NOT NULL, -- 1=Owner, 2=WlcAdmin, 3=EnterpriseAdmin, etc.
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.permissions (
    id VARCHAR(100) PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id VARCHAR(50) REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id VARCHAR(100) REFERENCES public.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 5. AUDIT LOGS (Trilha de auditoria imutável)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    user_email VARCHAR(255),
    category VARCHAR(50) NOT NULL, -- 'auth', 'security', 'rbac', 'session', 'admin'
    action VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    description TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_audit_org_id ON public.audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_category ON public.audit_logs(category);
CREATE INDEX IF NOT EXISTS idx_audit_severity ON public.audit_logs(severity);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON public.audit_logs(created_at DESC);

-- 6. LOGIN & SECURITY EVENTS
CREATE TABLE IF NOT EXISTS public.login_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    ip_address INET NOT NULL,
    user_agent TEXT,
    status VARCHAR(30) NOT NULL, -- 'success', 'failed_password', 'failed_mfa', 'blocked'
    fail_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_login_events_email ON public.login_events(email);
CREATE INDEX IF NOT EXISTS idx_login_events_ip ON public.login_events(ip_address);
CREATE INDEX IF NOT EXISTS idx_login_events_created ON public.login_events(created_at DESC);