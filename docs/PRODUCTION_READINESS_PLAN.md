# Production Readiness Plan

## Purpose

This plan defines what must be true before La Mesa can run La Mesa Batch 01 / La Mesa Summer 2026 Table as a production pilot.

Production-ready does not mean feature-complete forever. It means the pilot can safely support founder intake, builder review, AI-assisted analysis, admin matching, 30-day progress tracking, and Demo Day outcomes without exposing private data or creating operational confusion.

## Launch Definition

La Mesa is ready for Batch 01 when ISD can:

1. Accept founder accounts and project submissions.
2. Show founders a Founder Readiness Report.
3. Mark founders/projects as pending consideration, selected, or not selected.
4. Accept builder applications into the La Mesa Builder Network.
5. Prevent unapproved builders from viewing projects.
6. Review and approve builders.
7. Use AI-assisted role mapping, readiness scoring, roadmaps, and match suggestions.
8. Assign builders to selected projects manually.
9. Track weekly progress through the 30-day Table.
10. Prepare project outcomes for Demo Day.
11. Deploy and operate the app on Netlify with Supabase safely configured.

## Readiness Levels

### Level 0: Scaffold

Routes, forms, schema, and basic UI exist.

Current app is near this level.

### Level 1: Functional Pilot

Core flows work end to end with known users and manual admin intervention.

Required before private pilot testing.

### Level 2: Production Pilot

Security, RLS, validation, error handling, deployment, QA, and operational docs are ready for real Batch 01 participants.

Required before inviting founders and builders.

### Level 3: Repeatable Program

Multiple batches, richer track identities, reputation, analytics, and improved automation.

Not required for Batch 01.

## Current Major Gaps

### Security And Authorization

- All service-role API usage must be reviewed.
- AI and matching endpoints must require appropriate auth.
- Admin routes must consistently enforce admin access.
- RLS policies must match the final access model.
- Founders should not see admin-only notes.
- Builders must not see projects before approval.

### Validation

- API routes need server-side validation.
- Client forms need stronger validation and clearer errors.
- AI JSON responses need schema validation before storage.
- IDs and role/status values need strict allowlists.

### Founder Lifecycle

The app should support the new founder lifecycle:

- Account created
- Project submitted
- Pending consideration
- Selected
- Not selected
- Matched
- Building
- Demo ready
- Alumni
- Archived

### Builder Lifecycle

The app should support:

- Account created
- Profile submitted
- Pending review
- Approved
- Not approved
- Eligible for matching
- Assigned
- Active builder
- Alumni builder

### Batch And Track Model

Projects and participants should be tied to:

- Batch
- Table
- Track

For Batch 01:

- System name: La Mesa Batch 01
- Public name: La Mesa Summer 2026 Table
- Participant identity: Table 01

### AI Reliability

AI calls need:

- Auth checks
- Rate limiting or usage guardrails
- Structured output validation
- Graceful fallback if provider fails
- Admin visibility into failures
- Prompt/version documentation

### Operational Readiness

Needed:

- Real README
- Deployment runbook
- Supabase setup steps
- Admin creation procedure
- QA checklist
- Demo data or seed plan
- Error monitoring plan

## Required Before Private Pilot Testing

### Product

- Founder application reflects YC-style seriousness.
- Founder status says "pending consideration for La Mesa Summer 2026 Table."
- Founder Readiness Report is visible after submission.
- Builder Network application is clear and selective.
- Builder pending state is clear.
- Admin can approve/reject founders/projects.
- Admin can approve/reject builders.
- Admin can assign/remove builders.

### Data

- Schema supports batches/tables/tracks.
- Schema supports founder readiness categories.
- Schema supports builder reliability signals, even if minimal.
- Schema supports weekly updates.
- Schema supports Demo Day outcomes.

### Security

- RLS policies tested by role.
- Admin-only routes protected.
- Service role never exposed to client.
- Public routes do not trust client-supplied privileged identity.

### AI

- AI endpoints protected.
- AI response schemas validated.
- AI failures do not break project submission.
- AI results are auditable enough for admin review.

### QA

- Manual QA passes for founder, builder, admin, AI, matching, RLS, and mobile flows.
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
- Batch 01 operating playbook reviewed by ISD.

## Implementation Phases

### Phase 1: Security Baseline

Fix auth, RLS, service-role use, admin route protection, and builder project visibility.

### Phase 2: Data Model Alignment

Add batches, tracks, founder readiness fields, lifecycle statuses, reliability signals, and Demo Day outcome support.

### Phase 3: API Hardening

Add validation, schema parsing, AI fallback behavior, and consistent response contracts.

### Phase 4: Product Flow Alignment

Update founder, builder, admin, and matching flows to reflect Batch 01 / Table 01.

### Phase 5: QA And Deployment

Run acceptance tests, fix responsive and error states, finalize README and deployment docs.

## Launch Gate

Do not invite real Batch 01 participants until:

- Security checklist passes.
- QA checklist passes.
- Admin can complete the full operating flow.
- Founder and builder status language is correct.
- AI failure states are handled.
- Production environment is configured.

## Product Restraint

Do not add chat, payments, legal/equity tracking, investor dashboards, open project browsing, or full social feeds before Batch 01 proves the formation model.
