# La Mesa

La Mesa is a selective AI-assisted startup fellowship platform for ISD.

It helps vetted founders and approved builders form teams, map roles, follow 30-day execution roadmaps, and move from idea to prototype.

## Current Concept

Public pilot name:
- La Mesa Summer 2026 Table

System name:
- La Mesa Batch 01

Participant-facing identity:
- Table 01

Core operating model:
- Founders can create accounts and submit project applications.
- Founder projects become pending consideration for La Mesa Summer 2026 Table.
- Builders apply to join the La Mesa Builder Network.
- Builders cannot view projects before approval.
- ISD admins review founders, approve builders, run AI-assisted matching, and assign teams manually.
- AI recommends. ISD decides.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Row Level Security
- Anthropic API for initial AI analysis
- Netlify deployment

## Local Setup

Install dependencies:

```bash
npm install
```

Create local environment variables:

```bash
cp .env.example .env.local
```

Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

Only one AI provider is required for the MVP. The current implementation uses Anthropic.

Run the dev server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Documentation

Start here:

- `docs/CONCEPT_DOCS_INDEX.md`

Core concept docs:

- `docs/OPERATING_CONCEPT.md`
- `docs/PRODUCT_STRATEGY.md`
- `docs/BATCH_01_PLAYBOOK.md`
- `docs/FOUNDER_READINESS_MODEL.md`
- `docs/BUILDER_NETWORK_MODEL.md`
- `docs/TRACKS_AND_TABLES_MODEL.md`
- `docs/ANTI_GOALS_AND_PRODUCT_PRINCIPLES.md`

Production implementation docs:

- `docs/PRODUCTION_READINESS_PLAN.md`
- `docs/SECURITY_AND_RLS_SPEC.md`
- `docs/API_CONTRACTS.md`
- `docs/QA_TEST_PLAN.md`
- `docs/NETLIFY_DEPLOYMENT.md`

Existing product docs:

- `docs/PRODUCT_SPEC.md`
- `docs/USER_FLOWS.md`
- `docs/DATA_MODEL.md`
- `docs/AI_MATCHING_LOGIC.md`
- `docs/SUPABASE_SCHEMA.sql`

## Supabase

The current schema draft is in:

```bash
docs/SUPABASE_SCHEMA.sql
```

Before production launch, review and update RLS policies against:

```bash
docs/SECURITY_AND_RLS_SPEC.md
```

Important security rules:

- Founders can view their own projects.
- Pending builders cannot view projects.
- Approved builders can view assigned projects only.
- Admins can manage all projects, profiles, matches, and notes.
- Admin notes must remain admin-only.
- Service role usage must stay server-side and route-authorized.

## AI

Current AI endpoints:

- `/api/analyze-project`
- `/api/generate-roadmap`
- `/api/suggest-matches`

Before production launch, these must be hardened against:

- Missing auth
- Invalid project ownership
- Unvalidated AI JSON
- Provider failure
- Excessive usage

See:

```bash
docs/API_CONTRACTS.md
docs/PRODUCTION_READINESS_PLAN.md
```

## Netlify

The project includes:

```bash
netlify.toml
```

Build command:

```bash
npm run build
```

Publish directory:

```bash
.next
```

Required environment variables must be configured in Netlify.

See:

```bash
docs/NETLIFY_DEPLOYMENT.md
```

## Production Readiness

Do not invite real Batch 01 participants until:

- Security checklist passes.
- RLS tests pass.
- Founder flow passes.
- Builder flow passes.
- Admin flow passes.
- AI failure states are handled.
- Netlify and Supabase production environments are configured.
- The first admin user is created securely.

See:

```bash
docs/PRODUCTION_READINESS_PLAN.md
docs/QA_TEST_PLAN.md
```

## Product Restraint

Do not overbuild the first pilot.

La Mesa Batch 01 should prove that ISD can form serious founder-builder teams and help them reach prototype readiness in 30 days.

Do not add chat, payments, equity tracking, contracts, investor dashboards, public marketplace behavior, or a full social feed before the formation model is proven.
