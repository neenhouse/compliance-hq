# ComplianceHQ -- Root CLAUDE.md

Automated compliance platform for software teams. SOC2, HIPAA, GDPR, and ISO27001 framework selector, control library mapped to infrastructure, evidence collection, gap analysis with remediation, policy document generator, continuous monitoring, and vendor risk assessment.

## Documentation Hierarchy

```
CLAUDE.md                  (this file -- root authority, tech stack, commands, team)
  .claude/CLAUDE.md        (agent instructions, conventions, project structure)
  docs/vision.md           (north star vision and design principles)
  docs/prd.md              (product requirements -- 8 features)
```

When documents conflict, resolve by walking up the chain.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite 8, React Router 7 |
| Styling | CSS custom properties (design system) |
| Backend | Cloudflare Workers, D1, KV |
| Deploy | Cloudflare Pages via GitHub Actions |
| Testing | Vitest + React Testing Library |
| Tooling | pnpm (package manager), mise (runtime versions) |

## Dev Commands

```bash
pnpm dev           # Start dev server (port 3000)
pnpm build         # TypeScript check + Vite production build
pnpm test          # Run Vitest
pnpm test:watch    # Vitest in watch mode
pnpm lint          # ESLint
pnpm lint:fix      # ESLint with auto-fix
pnpm format        # Prettier
pnpm analyze       # Bundle visualizer
pnpm deploy        # Build + deploy to Cloudflare Pages
```

## Conventions

- Use **pnpm** as package manager (never npm or yarn)
- Use **mise** for runtime versions (see `.mise.toml`)
- CSS custom properties for theming (defined in `src/index.css`)
- React.lazy + Suspense for route-level code splitting
- Tests live next to source files (`Component.test.tsx`)
- Named exports preferred over default exports

## Agent Team Roles

Six agents defined in `.claude/agents/`:

| Agent | Role | Scope | Writes Code |
|-------|------|-------|-------------|
| `ceo` | Strategic leadership, vision, priorities | Strategy docs | No |
| `team-lead` | Orchestrator -- decomposes, delegates, monitors | Task management | No |
| `frontend-dev` | React, components, pages, CSS | `src/` | Yes |
| `backend-dev` | Cloudflare Workers, D1, KV, APIs | `worker/` | Yes |
| `content-writer` | Copy, messaging, SEO, meta tags | Text content | No |
| `qa` | Testing, accessibility, performance | Tests + read-only | Yes (tests) |

## Single Source of Truth

| Concern | Source File |
|---------|------------|
| Vision and design principles | `docs/vision.md` |
| Product requirements | `docs/prd.md` |
| Runtime versions | `.mise.toml` |
| CSS design tokens (live) | `src/index.css` |

## Project Structure

```
src/
  pages/           Route-level components
  components/
    ui/            Reusable UI components
    sections/      Page sections
  hooks/           Custom React hooks
  lib/             Utilities and types
worker/
  routes/          API endpoints
docs/              Documentation
public/            Static assets
```
