# ComplianceHQ -- Agent Instructions

## Project Overview

ComplianceHQ is an automated compliance platform for software teams supporting SOC2, HIPAA, GDPR, and ISO27001.

## Conventions

- Use **pnpm** as package manager (never npm or yarn)
- Use **mise** for runtime versions (see `.mise.toml`)
- CSS custom properties for theming (defined in `src/index.css`)
- React.lazy + Suspense for route-level code splitting
- Tests live next to source files (`Component.test.tsx`)
- Named exports preferred over default exports
- Prefer composition over inheritance
- Keep components under 200 lines; extract hooks for logic

## Project Structure

```
src/
  pages/           Route-level components (LandingPage, DashboardPage, etc.)
  components/
    ui/            Reusable UI (Button, Card, Modal, DataTable)
    sections/      Page sections (Hero, FeatureGrid, PricingTable)
  hooks/           Custom React hooks
  lib/             Utilities, types, constants
worker/
  routes/          API endpoints
docs/              Documentation (vision, PRD)
public/            Static assets
```

## Key Domain Concepts

- **Framework**: A compliance standard (SOC2, HIPAA, GDPR, ISO27001)
- **Control**: A specific requirement within a framework
- **Evidence**: An artifact proving a control is met
- **Gap**: A control without sufficient evidence or infrastructure mapping
- **Remediation**: Steps to close a gap
- **Policy**: A document describing organizational practices for a control domain
- **Vendor**: A third-party service assessed for compliance risk
