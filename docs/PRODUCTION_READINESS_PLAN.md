# Production Readiness Plan

## Purpose

This plan defines what must be true before La Mesa can run Founder 12 as a production pilot.

Production-ready does not mean feature-complete forever. It means the pilot can safely support Founder 12 intake, ISD review, founder acceptance, accepted-founder access, builder review, AI-assisted analysis, admin matching, progress tracking, and demo readiness without exposing private data or creating operational confusion.

## Launch Definition

La Mesa is ready for Founder 12 when ISD can:

1. Accept founder accounts and Founder 12 applications.
2. Show founders a Founder Readiness Report.
3. Mark founders as under review, shortlisted, accepted, or not selected.
4. Select exactly 12 accepted founders.
5. Gate Founders Coffee, ISD member privileges, AI sessions, and community link to accepted founders only.
6. Accept builder applications into the La Mesa Builder Network.
7. Prevent unapproved builders from viewing ventures.
8. Review and approve builders.
9. Use AI-assisted role mapping, readiness scoring, roadmaps, and match suggestions.
10. Assign builders to accepted ventures manually.
11. Track progress toward prototype/demo readiness.
12. Deploy and operate the app on Netlify with Supabase safely configured.

## Readiness Levels

### Level 0: Scaffold

Routes, forms, schema, and basic UI exist.

### Level 1: Functional Pilot

Core flows work end to end with known users and manual admin intervention.

Required before private pilot testing.

### Level 2: Production Pilot

Security, RLS, validation, error handling, deployment, QA, and operational docs are ready for real Founder 12 applicants and accepted founders.

Required before inviting founders and builders.

### Level 3: Repeatable Program

Multiple cohorts, richer privileges, session management, reputation, analytics, and improved automation.

Not required for the first Founder 12 pilot.

## Current Major Gaps

### Security And Authorization

- All service-role API usage must be reviewed.
- AI and matching endpoints must require appropriate auth.
- Admin routes must consistently enforce admin access.
- RLS policies must match the final accepted-founder access model.
- Founders should not see admin-only notes.
- Non-accepted founders must not see accepted-founder modules.
- Builders must not see ventures before assignment.

### Validation

- API routes need server-side validation.
- Client forms need stronger validation and clearer errors.
- AI JSON responses need schema validation before storage.
- IDs and role/status values need strict allowlists.

### Founder Lifecycle

The app should support:

- Account created.
- Application submitted.
- Under ISD review.
- Shortlisted.
- Accepted to Founder 12.
- Not selected.
- Team formation.
- Building.
- Demo ready.
- Alumni.
- Archived.

### Accepted-Founder Access

The app should support gated modules for:

- Founders Coffee.
- ISD member privileges.
- AI sessions.
- External community link if configured.
- Team formation status.

### Builder Lifecycle

The app should support:

- Account created.
- Profile submitted.
- Pending review.
- Approved.
- Not approved.
- Eligible for matching.
- Assigned.
- Active builder.
- Alumni builder.

### AI Reliability

AI calls need:

- Auth checks.
- Rate limiting or usage guardrails.
- Structured output validation.
- Graceful fallback if provider fails.
- Admin visibility into failures.
- Prompt/version documentation.

### Operational Readiness

Needed:

- Accurate README.
- Deployment runbook.
- Supabase setup steps.
- Admin creation procedure.
- QA checklist.
- Demo data or seed plan.
- Error monitoring plan.

## Required Before Private Pilot Testing

### Product

- Founder 12 application reflects selective cohort seriousness.
- Founder status says "under ISD review" after submission.
- Founder Readiness Report is visible after submission.
- Builder Network application is clear and selective.
- Builder pending state is clear.
- Admin can shortlist, accept, and mark founders not selected.
- Admin can approve/reject builders.
- Admin can assign/remove builders.
- Accepted-founder modules are hidden from non-accepted applicants.

### Data

- Schema supports Founder 12 status.
- Schema supports accepted-founder gating.
- Schema supports founder readiness categories.
- Schema supports builder reliability signals, even if minimal.
- Schema supports progress updates.
- Schema supports demo-ready outcomes.

### Security

- RLS policies tested by role.
- Admin-only routes protected.
- Service role never exposed to client.
- Public routes do not trust client-supplied privileged identity.
- Accepted-founder data is gated.

### AI

- AI endpoints protected.
- AI response schemas validated.
- AI failures do not break application submission.
- AI results are auditable enough for admin review.

### QA

- Manual QA passes for founder, accepted founder, builder, admin, AI, matching, RLS, and mobile flows.
- Build passes.
- Lint passes or known lint issues are documented.

## Required Before Production Launch

- Netlify production deployment configured.
- Supabase production project configured.
- Environment variables set in Netlify.
- Admin user created securely.
- Production RLS verified.
- Seed/demo data removed or clearly separated.
- Error logging configured.
- Backup/rollback plan documented.
- Founder 12 playbook reviewed by ISD.

## Implementation Phases

### Phase 1: Security Baseline

Fix auth, RLS, service-role use, admin route protection, accepted-founder gating, and builder venture visibility.

### Phase 2: Data Model Alignment

Add Founder 12 status, accepted-founder access flags/records, readiness fields, lifecycle statuses, reliability signals, and demo outcome support.

### Phase 3: API Hardening

Add validation, schema parsing, AI fallback behavior, and consistent response contracts.

### Phase 4: Product Flow Alignment

Update founder, builder, admin, and matching flows to reflect Founder 12.

### Phase 5: Accepted-Founder Modules

Add Founders Coffee, ISD privileges, AI sessions, external community link, and team formation status.

### Phase 6: QA And Deployment

Run acceptance tests, fix responsive and error states, finalize README and deployment docs.

## Launch Gate

Do not invite real Founder 12 participants until:

- Security checklist passes.
- QA checklist passes.
- Admin can complete the full operating flow.
- Founder and builder status language is correct.
- Accepted-founder gating works.
- AI failure states are handled.
- Production environment is configured.

## Product Restraint

Do not add native chat, payments, legal/equity tracking, investor dashboards, open venture browsing, full social feeds, full scheduling, or full membership CRM before Founder 12 proves the operating model.
