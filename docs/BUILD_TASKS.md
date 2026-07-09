# Build Tasks

## Phase 1 - Product Language Pivot

- Update public copy from generic team formation to Founder 12.
- Use "venture" and "Founder 12 application" in participant-facing surfaces.
- Use "Cohort Command Center" for admin-facing surfaces.
- Keep implementation stable where database names still use `projects`.
- Do not introduce marketplace language.

## Phase 2 - Public Website Reframe

Build or update pages:
- `/`
- `/how-it-works`
- `/apply`
- `/join`
- `/login`

Landing page sections:
- Hero for Founder 12.
- Founder 12 offer.
- Why ideas need a cohort.
- How selection works.
- What accepted founders unlock.
- Founders Coffee in Costa Rica.
- Builder Network support.
- ISD pilot context.
- CTA.
- Footer.

Primary CTA:
- Apply for Founder 12.

Secondary CTA:
- Join the Builder Network.

## Phase 3 - Founder 12 Application

Update guided project application to feel like a selective cohort application.

Fields:
- Founder name.
- Venture name.
- One-sentence idea.
- Problem.
- Target users.
- Category.
- Stage.
- Skills needed.
- Timeline.
- Availability expectation.
- Desired team size.
- Collaboration expectation.
- Location preference.
- Founder goals.
- Why Founder 12.
- Founders Coffee availability/interest.
- Additional notes.

After submit:
- Save application/venture.
- Call AI analysis endpoint.
- Store readiness score.
- Store AI summary.
- Store role recommendations.
- Store roadmap.
- Show under-review state.

## Phase 4 - AI Analysis Updates

Update `/api/analyze-project` to return Founder 12-focused analysis:
- Readiness score.
- Founder 12 fit notes.
- Category scores.
- Strengths.
- Risks.
- Recommended next steps.
- Questions ISD should ask during review.
- Role recommendations.
- Suggested team size.
- Missing information.

Update `/api/generate-roadmap` to keep the 4-week roadmap but reference Founder 12 prototype readiness.

Update `/api/suggest-matches` so match suggestions are positioned as accepted-founder support, not marketplace matching.

## Phase 5 - Founder Portal

Build founder dashboard states:
- No application yet.
- Application submitted.
- Under ISD review.
- Shortlisted.
- Accepted to Founder 12.
- Not selected for this cohort.
- Team formation.
- Building.
- Demo ready.

Show:
- Application status.
- Readiness score.
- Venture summary.
- Next step from ISD.
- Clear note that Founders Coffee, ISD benefits, and AI sessions unlock only after acceptance.

## Phase 6 - Accepted Founder 12 Member Area

For accepted founders only, show:
- Founder 12 acceptance badge.
- Founders Coffee module.
- ISD member privileges module.
- AI sessions module.
- Community chat external link, if configured.
- Team formation module.
- 30-day roadmap.
- Basic progress updates.

MVP modules can be static/admin-configured at first.

Do not build native chat, full scheduling, or full membership management.

## Phase 7 - Builder Network

Update builder profile language:
- "Join the Builder Network."
- "Support selected Founder 12 ventures."
- "Approved builders are matched by ISD."

Builder dashboard should show:
- Profile status.
- Profile summary.
- Assigned Founder 12 ventures.
- Project details for assigned ventures only.

For MVP, builders should not browse all ventures.

## Phase 8 - Admin Cohort Command Center

Update admin dashboard to show:
- Total Founder 12 applications.
- Accepted founders count with 12-seat capacity.
- Pending applications.
- Shortlisted applicants.
- Not selected applicants.
- Pending builders.
- Approved builders.
- Accepted ventures needing builder support.
- Teams formed.
- Demo-ready ventures.

Admin actions:
- Shortlist founder.
- Accept founder.
- Mark not selected.
- Approve/reject builder.
- Update venture status.
- Assign builder to accepted venture.
- Remove builder from venture.
- Add admin note.

## Phase 9 - Team Formation Workflow

On admin team formation page:
- Show accepted ventures first.
- Show needed roles.
- Show missing roles.
- Show eligible builders.
- Show AI suggested matches if available.
- Admin can assign builder to venture.
- Assigned builders appear on venture page.
- Venture can move to `team_formed` or Founder 12 "Team Formation" state.

Do not automatically assign builders.

## Phase 10 - Venture Detail Page

Show:
- Venture overview.
- Founder.
- Founder 12 status.
- Venture status.
- Category.
- Stage.
- Readiness score.
- AI summary.
- Founder 12 fit notes.
- Recommended roles.
- Assigned team members.
- Missing roles.
- 30-day roadmap.
- Founders Coffee / cohort next step if accepted.
- Admin notes.
- Basic progress updates.

## Phase 11 - Security And Gating

Verify:
- Applicants cannot access accepted-founder modules unless accepted.
- Builders cannot browse ventures.
- Builders can only see assigned ventures.
- Admin-only notes remain admin-only.
- Service role usage remains server-side.
- RLS policies support the cohort access model.

## Phase 12 - Netlify Deployment

- Confirm `netlify.toml`.
- Confirm build command.
- Confirm environment variables.
- Test deployment.
- Document deployment steps.
- Confirm custom domain and Supabase redirect URLs.

## Phase 13 - Polish And QA

Test:
- Founder signup.
- Founder 12 application.
- AI readiness analysis.
- Under-review state.
- Admin shortlist/accept/not-selected state.
- Accepted-founder gating.
- Founders Coffee module.
- ISD privileges module.
- AI sessions module.
- Builder signup.
- Builder profile.
- Admin builder approval.
- Admin team formation.
- Venture detail page.
- Role-based access.
- Mobile responsiveness.
- Empty states.
- Error states.
