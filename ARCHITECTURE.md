# WLC Enterprise 2.0 — Arquitetura de Sistemas & WLC Control Center

## 1. Visão Geral da Arquitetura
A WLC Enterprise 2.0 adota uma arquitetura híbrida de alto desempenho:
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS (Interface executiva dark mode refinada com tipografia mono/sans de alta densidade).
- **Backend Edge:** Cloudflare Workers utilizando Hono para roteamento de alta velocidade, processamento de autenticação, rotação de CSRF e rate limiting.
- **Banco de Dados (Fonte da Verdade):** PostgreSQL acessado via **Cloudflare Hyperdrive** para multiplexação de conexões com latência submilisegundo e alta escalabilidade.
- **Armazenamento de Objetos:** Cloudflare R2 para mídias, logs brutos e comprovantes fiscais/PIX.

## 2. WLC Control Center (Área /admin)
O WLC Control Center é totalmente independente da navegação comercial:
- `Dashboard Executivo`: KPIs de usuários, sessões ativas HttpOnly, tenants e incidentes de segurança.
- `Gerenciamento de Usuários`: Provisionamento de perfis RBAC, vinculação a organizações e status de MFA.
- `Cargos & Permissões (RBAC 2.0)`: 6 níveis hierárquicos:
  1. **Owner:** Proprietário principal da WLC.
  2. **Administrador WLC:** Gestão técnica e operacional multi-tenant.
  3. **Administrador Empresarial:** Gestão exclusiva da sua própria organização.
  4. **Gerente Operacional:** Operações comerciais, CRM e finanças.
  5. **Operador:** PDV Express e atendimento cognitivo.
  6. **Cliente:** Acesso estrito aos próprios dados.
- `Central de Sessões Seguras`: Gerenciamento de sessões com hash SHA-256 no banco e cookies `HttpOnly`, `Secure` e `SameSite=Strict`. Suporta revogação individual e revogação massiva.
- `Segurança & MFA`: Políticas de timeout por inatividade (30m), expiração absoluta (24h), rate limit de 5 tentativas inválidas e bloqueio temporário por 15m.
- `Trilha de Auditoria`: Registro contínuo e imutável de eventos de autenticação, mutações de perfis, acessos administrativos e mitigação de brute-force.
- `Empresas & Tenants`: Isolamento multi-empresa forçado por `organization_id` em todas as tabelas.
- `Configurações Globais`: Parâmetros de Workers, Hono, Hyperdrive e R2.

## 3. Segurança de Sessões
- **Nunca** tokens em `localStorage` ou `sessionStorage`.
- Hash criptográfico de tokens no PostgreSQL (`user_sessions.session_token_hash`).
- Rotação de identificador e proteção nativa contra CSRF em todas as mutações.