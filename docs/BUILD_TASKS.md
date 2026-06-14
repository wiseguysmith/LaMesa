# Build Tasks

## Phase 1 — Project Setup

- Initialize Next.js app with TypeScript.
- Install Tailwind CSS.
- Set up basic layout.
- Add route structure.
- Add environment variable handling.
- Add `.env.example`.
- Add `netlify.toml`.

## Phase 2 — Supabase Setup

- Create Supabase client.
- Add database schema from `docs/SUPABASE_SCHEMA.sql`.
- Configure Supabase Auth.
- Create user profile creation flow.
- Add role handling.
- Add approval status handling.
- Add initial RLS policies.

## Phase 3 — Public Website

Build pages:
- `/`
- `/how-it-works`
- `/apply`
- `/join`
- `/login`

Landing page sections:
- Hero
- Problem
- Solution
- How It Works
- Who It Is For
- CTA
- Footer

## Phase 4 — Auth and Onboarding

- Add signup flow.
- Allow user to select Founder or Builder.
- Create user record in `public.users`.
- Redirect founders to project application.
- Redirect builders to profile form.
- Add pending approval state.

## Phase 5 — Founder Application

Build guided project application with fields:
- Project name
- One-sentence idea
- Problem
- Target users
- Category
- Stage
- Skills needed
- Timeline
- Availability expectation
- Desired team size
- Collaboration expectation
- Location preference
- Founder goals
- Additional notes

After submit:
- Save project.
- Call AI analysis endpoint.
- Store readiness score.
- Store AI summary.
- Store role recommendations.
- Store roadmap.
- Show confirmation page.

## Phase 6 — Builder Profile

Build guided builder profile form with fields:
- Full name
- Location
- Languages
- Skills
- Experience level
- Preferred roles
- Portfolio URL
- GitHub URL
- LinkedIn URL
- Interests
- Availability hours per week
- Collaboration preference
- Project goals
- Bio

After submit:
- Save profile.
- Mark approval status as pending.
- Show pending review page.

## Phase 7 — AI Endpoints

Create:
- `/api/analyze-project`
- `/api/generate-roadmap`
- `/api/suggest-matches`

Use one AI provider initially.

Return structured JSON.

Add validation and error handling.

Do not expose API keys to client.

## Phase 8 — Founder Dashboard

Build:
- Project list
- Project status
- Readiness score
- Team status
- Link to project detail page

## Phase 9 — Project Detail Page

Show:
- Project overview
- Founder
- Status
- Category
- Stage
- Readiness score
- AI summary
- Recommended roles
- Assigned team members
- Missing roles
- 30-day roadmap
- Basic project updates

## Phase 10 — Builder Dashboard

Build:
- Profile status
- Profile summary
- Assigned projects
- Project details for assigned projects only

For MVP, builders should not browse all projects.

## Phase 11 — Admin Dashboard

Build:
- Pending projects count
- Pending builders count
- Projects needing matches
- Teams formed
- Prototype-ready projects

Admin pages:
- `/admin/projects`
- `/admin/projects/[id]`
- `/admin/builders`
- `/admin/matches`

Admin actions:
- Approve/reject project
- Approve/reject builder
- Update project status
- Assign builder to project
- Remove builder from project
- Add admin note

## Phase 12 — Matching Workflow

On project admin page:
- Show needed roles
- Show missing roles
- Show eligible builders
- Show AI suggested matches if available
- Admin can assign builder to project
- Assigned builders appear on project page
- Project can move to `team_formed`

## Phase 13 — Netlify Deployment

- Add `netlify.toml`.
- Confirm build command.
- Confirm environment variables.
- Test deployment.
- Document deployment steps.

## Phase 14 — Polish and QA

Test:
- Founder signup
- Founder application
- AI analysis
- Builder signup
- Builder profile
- Admin approval
- Admin matching
- Project detail page
- Role-based access
- Mobile responsiveness
- Empty states
- Error states
