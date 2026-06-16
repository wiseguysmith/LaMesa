# Handoff

## Current Branch

Documentation branch:
- `codex/production-docs`

Pushed commit:
- `f881f64` - `Document La Mesa production concept`

GitHub PR URL:
- https://github.com/wiseguysmith/LaMesa/pull/new/codex/production-docs

## Important Local State

The documentation changes were committed and pushed.

Uncommitted local changes were intentionally left untouched:
- `src/app/login/page.tsx`
- `src/app/page.tsx`
- `AGENTS.md`

The generated `.next` folder was deleted locally to free disk space after Git reported the C: drive was full. It can be regenerated with:

```bash
npm run build
```

## Product Decisions Locked

- La Mesa is a selective AI-assisted startup fellowship.
- Public pilot name: La Mesa Summer 2026 Table.
- System name: La Mesa Batch 01.
- Participant-facing identity: Table 01.
- Public/brand term: Table.
- Internal/startup term: Batch.
- Founders can create accounts directly.
- Founders become pending consideration only after submitting project information.
- Founder-facing status should say: pending consideration for La Mesa Summer 2026 Table.
- Builders apply to join the La Mesa Builder Network.
- Builders cannot see projects before approval.
- Founder scoring should be visible through the Founder Readiness Report.
- Builder reliability should become visible over time.
- Tracks should have their own identity and cohort experience.
- AI recommends. ISD decides.

## New Documentation

Start with:
- `docs/CONCEPT_DOCS_INDEX.md`

Concept docs:
- `docs/OPERATING_CONCEPT.md`
- `docs/PRODUCT_STRATEGY.md`
- `docs/BATCH_01_PLAYBOOK.md`
- `docs/FOUNDER_READINESS_MODEL.md`
- `docs/BUILDER_NETWORK_MODEL.md`
- `docs/TRACKS_AND_TABLES_MODEL.md`
- `docs/ANTI_GOALS_AND_PRODUCT_PRINCIPLES.md`

Production docs:
- `docs/PRODUCTION_READINESS_PLAN.md`
- `docs/SECURITY_AND_RLS_SPEC.md`
- `docs/API_CONTRACTS.md`
- `docs/QA_TEST_PLAN.md`

Updated:
- `README.md`

## Next Implementation Priorities

1. Protect `/api/suggest-matches` with admin auth.
2. Harden `/api/analyze-project` and `/api/generate-roadmap` with auth, project ownership checks, and output validation.
3. Fix `/api/auth/create-user` so it verifies the authenticated Supabase user and does not trust client-supplied privileged identity.
4. Update RLS so admin notes are admin-only.
5. Confirm pending builders cannot see projects before approval.
6. Add Batch/Table/Track fields to the data model.
7. Update founder-facing status language to "pending consideration for La Mesa Summer 2026 Table."
8. Add or normalize Founder Readiness Report fields.
9. Add builder reliability signal structure.
10. Run the QA plan against real founder, builder, and admin accounts.

## Security Notes

Before production launch:
- Review every route that uses `createServiceClient`.
- Avoid public endpoints that trust client-provided user IDs.
- Split broad RLS `for all` policies into action-specific policies where needed.
- Keep admin notes admin-only.
- Treat AI output as untrusted until validated.

## Product Restraint

Do not add chat, payments, equity tracking, contracts, investor dashboards, public marketplace behavior, or full social feeds before Batch 01 proves the formation model.

Batch 01 should prove that ISD can form serious founder-builder teams and help them reach prototype readiness in 30 days.
