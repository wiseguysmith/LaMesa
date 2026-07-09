# Founder 12 Guardrails

## Purpose

These guardrails keep La Mesa focused on the Founder 12 cohort model.

Use this document before adding features, changing copy, or expanding workflows.

## North Star

La Mesa is the ISD Founder 12 cohort portal for Costa Rica.

It should help ISD select 12 serious founders, coordinate their accepted-founder experience, and support them through Founders Coffee, ISD member privileges, AI sessions, and admin-guided builder matching.

## Must Stay True

- Founder 12 is the core product identity.
- Exactly 12 founders are accepted into the cohort.
- Founders are applicants until ISD accepts them.
- Accepted-founder access is gated.
- Founders Coffee is a real accepted-founder touchpoint.
- ISD member privileges are visible only to accepted founders.
- AI sessions are accepted-founder support, not a public course catalog.
- Builder matching supports accepted ventures; it is not the product headline.
- AI recommends. ISD decides.

## Product Language

Use:
- Founder 12
- Founder 12 applicant
- Accepted founder
- Venture
- Builder Network
- Founders Coffee
- ISD member privileges
- AI sessions
- Cohort Command Center
- Team Formation

Avoid:
- Table 01
- La Mesa Summer 2026 Table
- Batch 01
- public marketplace
- browse all projects
- swipe marketplace
- freelancer bidding
- generic project directory

## Feature Gate

Before adding a feature, it must pass at least one of these tests:

1. Helps ISD identify serious Founder 12 applicants.
2. Helps ISD select the right 12 founders.
3. Helps accepted founders access Founders Coffee, ISD privileges, or AI sessions.
4. Helps ISD coordinate builder support for accepted ventures.
5. Helps accepted founders move toward prototype/demo readiness.

If it does not pass, defer it.

## MVP Deferrals

Do not build these yet:

- Native chat.
- Full community feed.
- Full calendar scheduling.
- Full LMS.
- Full ISD membership CRM.
- Payments.
- Equity tracking.
- Contracts.
- Investor dashboard.
- Public venture browsing.
- Automatic founder acceptance.
- Automatic builder assignment.

## Implementation Guardrail

Run this before committing product/UI changes:

```bash
npm run guardrails
```

The guardrail check scans active app/docs files for banned old framing that would pull the product back toward the previous Table/marketplace model.
