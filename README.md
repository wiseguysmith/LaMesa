# La Mesa

La Mesa is the ISD Founder 12 cohort portal for Costa Rica.

It is the digital front door and coordination layer for a selective founder cohort: founders apply, ISD reviews, 12 founders are accepted, and accepted founders unlock Founders Coffee access, ISD member privileges, AI sessions, admin-guided team formation, and a structured path toward prototype readiness.

Builder matching is part of the support system, but La Mesa is not primarily a marketplace.

## Current Concept

Public pilot name:
- Founder 12

System name:
- La Mesa Founder 12

Participant-facing identity:
- Founder 12 Member

Core operating model:
- Founders create accounts and submit Founder 12 applications.
- AI generates readiness scoring, role mapping, and a 30-day roadmap.
- ISD reviews applications and selects exactly 12 accepted founders.
- Accepted founders gain access to Founders Coffee coordination, ISD member privileges, AI sessions, and team formation support.
- Builders apply to join the La Mesa Builder Network.
- Builders cannot browse ventures before approval.
- Builders see assigned Founder 12 ventures only.
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

- `docs/FOUNDER_12_COHORT_MODEL.md`
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
- `docs/MVP_SCOPE.md`
- `docs/BUILD_TASKS.md`
- `docs/USER_FLOWS.md`
- `docs/UI_REQUIREMENTS.md`
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

- Founders can view their own applications and ventures.
- Only accepted founders should see Founder 12 member privileges.
- Pending builders cannot view ventures.
- Approved builders can view assigned ventures only.
- Admins can manage all applications, profiles, matches, notes, and cohort data.
- Admin notes must remain admin-only.
- Service role usage must stay server-side and route-authorized.

## AI

Current AI endpoints:

- `/api/analyze-project`
- `/api/generate-roadmap`
- `/api/suggest-matches`

AI should support:

- Founder readiness scoring.
- Founder 12 fit analysis.
- Role mapping.
- 30-day roadmap generation.
- Admin-facing builder match suggestions.

AI should not accept founders, reject founders, approve builders, or assign teams automatically.

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

Do not invite real Founder 12 applicants until:

- Security checklist passes.
- RLS tests pass.
- Founder application flow passes.
- Builder profile flow passes.
- Admin selection flow passes.
- Accepted-founder gating is verified.
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

La Mesa should prove that ISD can attract serious founders, select 12 accepted Founder 12 members, coordinate Founders Coffee and ISD benefits, and help selected founders move toward prototype readiness with the right support.

Do not add native chat, payments, equity tracking, contracts, investor dashboards, public marketplace behavior, public project browsing, or a full social feed before the Founder 12 operating model is proven.
