# Handoff

## Current Product Direction

La Mesa is now defined as the ISD Founder 12 cohort portal for Costa Rica.

It is not primarily a marketplace. Builder matching is a support benefit for accepted founders.

## Product Decisions Locked

- Founder 12 is the core product identity.
- Founder 12 accepts exactly 12 founders.
- Founders can create accounts directly.
- Founders are applicants until ISD accepts them.
- Accepted-founder access must be gated.
- Accepted founders unlock:
  - Founders Coffee details.
  - ISD member privileges.
  - AI session information.
  - External community link if configured.
  - Team formation support.
  - 30-day roadmap and progress updates.
- Builders apply to join the La Mesa Builder Network.
- Builders cannot browse all ventures.
- Builders can only see assigned Founder 12 ventures.
- Builder matching happens after acceptance or when ISD explicitly decides support is appropriate.
- Native chat is out of scope for MVP.
- Full scheduling, LMS, marketplace, investor, legal/equity, and membership CRM features are out of scope.
- AI recommends. ISD decides.

## Read First

Start with:
- `AGENTS.md`
- `CLAUDE.md`
- `docs/CONCEPT_DOCS_INDEX.md`
- `docs/FOUNDER_12_COHORT_MODEL.md`

Core concept docs:
- `docs/OPERATING_CONCEPT.md`
- `docs/PRODUCT_STRATEGY.md`
- `docs/BATCH_01_PLAYBOOK.md`
- `docs/FOUNDER_READINESS_MODEL.md`
- `docs/BUILDER_NETWORK_MODEL.md`
- `docs/TRACKS_AND_TABLES_MODEL.md`
- `docs/ANTI_GOALS_AND_PRODUCT_PRINCIPLES.md`

Implementation docs:
- `docs/BUILD_TASKS.md`
- `docs/PRODUCT_SPEC.md`
- `docs/MVP_SCOPE.md`
- `docs/USER_FLOWS.md`
- `docs/UI_REQUIREMENTS.md`
- `docs/DATA_MODEL.md`
- `docs/AI_MATCHING_LOGIC.md`
- `docs/API_CONTRACTS.md`
- `docs/SECURITY_AND_RLS_SPEC.md`
- `docs/PRODUCTION_READINESS_PLAN.md`
- `docs/QA_TEST_PLAN.md`

## Next Implementation Priorities

1. Reframe public copy around Founder 12.
2. Reframe founder application copy around selective cohort application.
3. Add or normalize Founder 12 statuses:
   - under review
   - shortlisted
   - accepted
   - not selected
4. Add accepted-founder gating.
5. Add accepted-founder dashboard modules:
   - Founders Coffee
   - ISD member privileges
   - AI sessions
   - external community link
   - team formation status
6. Update admin dashboard into Cohort Command Center.
7. Add accepted founder count with 12-seat target.
8. Update builder language to Builder Network support.
9. Ensure builders cannot browse all ventures.
10. Keep builder matching admin-approved.
11. Harden API auth and validation.
12. Run QA against founder applicant, accepted founder, builder, and admin roles.

## Security Notes

Before production launch:
- Review every route that uses `createServiceClient`.
- Avoid public endpoints that trust client-provided user IDs.
- Split broad RLS `for all` policies into action-specific policies where needed.
- Keep admin notes admin-only.
- Gate Founders Coffee, ISD privileges, AI sessions, and community links to accepted founders.
- Treat AI output as untrusted until validated.

## Product Restraint

Do not add native chat, payments, equity tracking, contracts, investor dashboards, public marketplace behavior, full scheduling, full LMS, full membership CRM, or full social feeds before Founder 12 proves the operating model.

Founder 12 should prove that ISD can select 12 serious founders, coordinate their cohort experience, and help accepted founders move toward prototype readiness.
