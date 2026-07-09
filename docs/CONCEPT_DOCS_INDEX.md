# Concept Docs Index

This index explains the concept document set for La Mesa.

Read these before changing product scope, database design, user flows, UI, or production implementation plans.

## Recommended Reading Order

1. `FOUNDER_12_COHORT_MODEL.md`
   Defines the current product center: Founder 12, accepted-founder access, Founders Coffee, ISD member privileges, AI sessions, and builder support.

2. `OPERATING_CONCEPT.md`
   Defines what La Mesa is, how Founder 12 works, and how founders, builders, and admins interact.

3. `PRODUCT_STRATEGY.md`
   Defines the strategic thesis, category, differentiation, product wedge, risks, and success metrics.

4. `BATCH_01_PLAYBOOK.md`
   Defines the operating plan for the first Founder 12 cohort.

5. `FOUNDER_READINESS_MODEL.md`
   Defines the founder-facing readiness report, scoring criteria, scoring bands, and admin use.

6. `BUILDER_NETWORK_MODEL.md`
   Defines the La Mesa Builder Network, approval model, matching criteria, and reliability signals.

7. `TRACKS_AND_TABLES_MODEL.md`
   Defines track concepts and how they support cohort identity and matching without becoming the core product identity.

8. `ANTI_GOALS_AND_PRODUCT_PRINCIPLES.md`
   Defines what La Mesa must not become and the principles that should guide product decisions.

## Locked Concept Decisions

- La Mesa is the ISD Founder 12 cohort portal for Costa Rica.
- La Mesa is not primarily a marketplace.
- Founder 12 is the product center.
- Founder 12 accepts exactly 12 founders.
- Founders can create accounts directly, but they are applicants until ISD accepts them.
- Accepted-founder access must be gated.
- Accepted founders unlock Founders Coffee details, ISD member privileges, AI sessions, community link if configured, and team formation support.
- Builders apply to join the La Mesa Builder Network.
- Builders cannot see all ventures.
- Builders can only see assigned Founder 12 ventures.
- Builder matching happens after acceptance or when ISD explicitly decides support is appropriate.
- Native chat is out of scope for MVP; use a gated external community link if needed.
- AI recommends. ISD decides.
- Admin is the final authority for founder acceptance, builder approval, and team assignments.

## Product Language

Use:
- Founder 12.
- Founder 12 applicant.
- Accepted founder.
- Venture.
- Builder Network.
- Founders Coffee.
- ISD member privileges.
- AI sessions.
- Cohort Command Center.

Avoid:
- Public marketplace.
- Browse all projects.
- Swipe marketplace.
- Gig board.
- Freelancer bidding.
- Generic accelerator CRM.

## Implementation Translation

The database and some existing code may still use the word `projects`.

That is acceptable internally for now.

Participant-facing UI should translate:
- "Project" -> "Venture" where appropriate.
- "Project application" -> "Founder 12 application."
- "Dashboard" -> "Founder Portal" or "Cohort Command Center" depending on role.
- "Matching" -> "Team Formation."

## Next Document Set

When implementation begins, translate this concept into:

1. Updated UI copy.
2. Accepted-founder access rules.
3. Founder 12 admin selection actions.
4. Founders Coffee module.
5. ISD member privileges module.
6. AI sessions module.
7. Team formation updates.
8. QA and RLS checks.
