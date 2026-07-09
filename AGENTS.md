# AGENTS.md

## Mission

Build La Mesa as the ISD Founder 12 cohort portal for Costa Rica.

La Mesa is not primarily a marketplace. It is the application, selection, and coordination layer for a selective ISD founder cohort. Builder matching remains important, but it is a support benefit for accepted founders, not the main product identity.

The MVP should help ISD:
- Collect serious Founder 12 applications.
- Use AI to evaluate founder and venture readiness.
- Select exactly 12 accepted founders for Founder 12.
- Coordinate accepted founders around Founders Coffee in Costa Rica.
- Surface ISD member privileges, AI sessions, and cohort next steps.
- Provide admin-guided builder matching after acceptance.
- Move selected founders toward prototype and demo readiness.

Do not overbuild. Do not create a full marketplace, social network, chat app, LMS, accelerator operating system, or member-management suite in version one.

## Product Definition

La Mesa is an AI-assisted cohort application and founder coordination platform for ISD.

Long-term vision:
- Founder 12 cohort operations
- Costa Rica founder community coordination
- Founders Coffee programming
- ISD member privilege access
- AI founder support sessions
- Admin-guided team formation
- Prototype and demo readiness
- Alumni and reputation signals

MVP focus:
- Founder 12 public landing page
- Founder 12 application intake
- Builder Network profile intake
- AI founder readiness scoring
- AI role mapping
- AI 30-day roadmap generation
- Admin review and selection
- Accepted Founder 12 dashboard
- Founders Coffee coordination surface
- ISD member privilege surface
- AI session surface
- Admin-assisted builder matching
- Simple venture pages

## Build Philosophy

Build the simplest version that proves the cohort.

Prefer clarity over cleverness.

Prefer accepted-founder coordination over generic browsing.

Prefer admin control over full automation.

Prefer gated external community links over native chat until the behavior is proven.

Do not build:
- Real-time native chat
- Full collaboration workspace
- Full calendar scheduling system
- Payments
- Equity tracking
- Contracts
- Investor dashboard
- Public marketplace
- Public project browsing
- Automatic AI team formation
- Mentor portal
- University admin portal
- Native mobile app
- Complex notification system
- Full ISD membership CRM

## Tech Stack

Use:
- Next.js
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Row Level Security
- OpenAI or Anthropic API for AI analysis
- Netlify deployment

## Product Vocabulary

Use these terms consistently:

- Founder 12: the selective ISD founder cohort.
- Founder 12 applicant: a founder who has applied but has not been accepted.
- Accepted founder: one of the 12 founders selected by ISD.
- Venture: the project/startup submitted by a founder.
- Builder Network: approved builders who may support accepted founders.
- Founders Coffee: the Costa Rica founder gathering coordinated through La Mesa.
- ISD member privileges: benefits unlocked for accepted Founder 12 members.
- AI sessions: ISD/La Mesa AI support sessions available to accepted founders.
- Cohort Command Center: admin operating view for the cohort.

Avoid using "marketplace" as product positioning.

## Initial Routes

Current routes can remain, but their meaning should follow the cohort model.

Public:
- `/`
- `/how-it-works`
- `/apply`
- `/join`
- `/login`

Founder:
- `/dashboard` - Founder Portal
- `/founder/projects/new` - Founder 12 application
- `/founder/projects/[id]` - venture/application detail

Builder:
- `/builder/profile`
- `/builder/projects` - assigned Founder 12 ventures only

Admin:
- `/admin` - Cohort Command Center
- `/admin/projects` - founder applications / ventures
- `/admin/projects/[id]`
- `/admin/builders`
- `/admin/matches` - team formation

API:
- `/api/analyze-project`
- `/api/generate-roadmap`
- `/api/suggest-matches`

Future accepted-founder surfaces may include:
- `/founder/member`
- `/founder/coffee`
- `/founder/sessions`
- `/founder/benefits`

Do not add these future routes unless the MVP build task explicitly calls for them.

## User Roles

Use three roles:

1. `founder`
2. `builder`
3. `admin`

Approval is not the same as cohort acceptance.

Founder model:
- Founders can sign up.
- Founders submit a Founder 12 application.
- ISD reviews applications.
- ISD selects 12 accepted founders.
- Only accepted founders should see Founder 12 member privileges, Founders Coffee details, AI sessions, and team formation support.

Builder model:
- Builders can sign up.
- Builders submit profiles.
- ISD approves builders for the Builder Network.
- Builders cannot browse all ventures.
- Builders see only assigned accepted-founder ventures.

Admin model:
- Admin controls selection, acceptance, matching, status updates, and notes.
- AI recommends. ISD decides.

## Public Landing Page

The public landing page should position La Mesa as the gateway to Founder 12.

Core sections:
1. Hero
2. Founder 12 offer
3. Why ideas need a cohort
4. How selection works
5. What accepted founders unlock
6. Founders Coffee in Costa Rica
7. Builder Network support
8. ISD pilot context
9. CTA
10. Footer

Primary CTA:
- Apply for Founder 12

Secondary CTA:
- Join the Builder Network

Hero copy direction:

> Build the future together.
> Apply for Founder 12, the ISD cohort for founders in Costa Rica moving from proof of concept to capital readiness.

Support copy direction:

> Accepted founders unlock Founders Coffee access, ISD member privileges, AI sessions, admin-guided team formation, and a structured path toward prototype readiness.

## Founder 12 Application

The founder application should feel like a selective cohort application, not a casual project form.

Use a guided form first. AI conversation can come later.

Required fields:
- Founder name
- Venture name
- One-sentence idea
- Problem being solved
- Target users
- Project category
- Current stage
- Skills needed
- Timeline
- Availability
- Desired team size
- Collaboration expectation
- Location preference
- Founder goals
- Why Founder 12
- Founders Coffee availability/interest
- Additional notes

Supported categories:
- AI
- Blockchain/Web3
- Robotics
- Education
- Fintech
- Health/Wellness
- Real Estate
- Climate/Sustainability
- Creative/Media
- Community Impact
- Other

Supported stages:
- Idea
- Research
- Prototype
- MVP
- Launched

Collaboration expectations:
- Portfolio/experience
- Paid
- Equity
- Volunteer/community
- To be discussed

## Builder Profile

Builder profiles should capture role fit, availability, interest, and ability to support accepted Founder 12 ventures.

Fields:
- Full name
- Email
- Location
- Languages
- Skills
- Experience level
- Preferred roles
- Portfolio/GitHub/LinkedIn
- Interests
- Availability per week
- Collaboration preference
- Project goals
- Short bio
- Approval status

Supported roles:
- Founder / Project Lead
- Full-Stack Developer
- Frontend Developer
- Backend Developer
- AI Engineer
- Blockchain Developer
- UX/UI Designer
- Product Manager
- Marketing/Growth
- Sales/Business Development
- Content Creator
- Operations Coordinator
- Data Analyst
- Researcher
- No-Code Builder

## Founder Status Pipeline

Use founder-facing statuses for the cohort selection process:

1. Application submitted
2. Under ISD review
3. Shortlisted
4. Accepted to Founder 12
5. Not selected for this cohort
6. Team formation
7. Building
8. Demo ready
9. Alumni
10. Archived

Database/project status slugs may remain:
- `submitted`
- `under_review`
- `roles_mapped`
- `matching`
- `team_formed`
- `building`
- `prototype_ready`
- `presented_demo_day`
- `archived`

When writing UI copy, translate these slugs into Founder 12 language.

## Accepted Founder 12 Privileges

Accepted founders should unlock:
- Founders Coffee details and RSVP/status surface.
- ISD member privileges overview.
- AI session information.
- Team formation status.
- 30-day roadmap.
- Admin notes or next steps from ISD.
- Community chat link if ISD uses an external tool.

For MVP, community chat should be a gated external link, not native chat.

## AI Features

The top AI features for MVP are:

1. Founder readiness scoring
2. AI role mapping
3. AI 30-day milestone roadmap
4. Admin-facing builder match suggestions

### Founder Readiness Score

Score should be from 0 to 100.

Measure:
- Problem clarity
- User/customer clarity
- Technical feasibility
- Founder commitment
- Timeline realism
- Prototype potential
- Market/impact potential
- Fit for Founder 12

Return:
- Overall score
- Category scores
- Short explanation
- Biggest strengths
- Biggest risks
- Recommended next steps
- Questions ISD should ask during review

### AI Role Mapping

Given a Founder 12 application, AI should return:
- Recommended roles
- Priority level for each role
- Reason each role is needed
- Suggested team size
- Missing information needed from founder

### AI 30-Day Milestone Roadmap

Roadmap should follow a 4-week format:

- Week 1: Clarify problem, define MVP, validate assumptions
- Week 2: Build prototype foundation
- Week 3: Test with users, refine product
- Week 4: Prepare demo, pitch, and next-step plan

Each week should include:
- Objective
- Key tasks
- Deliverables
- Suggested owner roles

## Matching Logic

Builder matching should happen after Founder 12 acceptance or when ISD explicitly decides a venture is ready for support.

MVP matching is AI-assisted but admin-approved.

Level 1:
- AI recommends roles based on the Founder 12 application.

Level 2:
- AI suggests possible builders based on skills, availability, interests, role fit, track alignment, and builder goals.
- Admin reviews and approves assignments.

Do not automatically assign builders to ventures without admin approval.

Admin matching screen should show:
- Venture summary
- Founder status
- Needed roles
- Missing roles
- Suggested builders
- Match reasons
- Builder availability
- Builder skills
- Assign to team button

## Venture Page

The MVP venture page should be simple.

It should include:
- Venture name
- Venture summary
- Founder
- Founder 12 status
- Category
- Current stage
- Readiness score
- Recommended roles
- Assigned team members
- Missing roles
- 30-day roadmap
- Admin notes
- Basic progress updates

Do not build a full collaboration suite.

## Admin Dashboard

Admin dashboard should become the Cohort Command Center.

It should include:
- Total Founder 12 applications
- Accepted founders count, with a target of 12
- Pending applications
- Shortlisted applicants
- Not selected applicants
- Total builders
- Builders awaiting approval
- Accepted ventures needing matches
- Teams formed
- Demo-ready ventures

Admin should be able to:
- Review founder applications
- Shortlist founders
- Accept/reject founders
- Review builder profiles
- Approve/reject builders
- View AI analysis
- Assign builders to accepted ventures
- Remove builders from ventures
- Update venture status
- Add internal notes

## Security

Use Supabase Row Level Security.

Basic rules:
- Users can view and edit their own profiles.
- Founders can view their own applications and accepted-founder content only if selected.
- Builders can view their own profiles and assigned ventures.
- Admins can view and manage all applications, profiles, matches, notes, and cohort data.
- Do not expose admin data to non-admin users.
- Do not expose accepted-founder privileges to applicants who were not accepted.

## Code Quality Expectations

Use:
- TypeScript
- Clear component structure
- Server-side validation
- Reusable form components
- Clean database types
- Environment variables for API keys
- No hardcoded secrets
- Responsive design
- Accessible form labels

## Environment Variables

Create `.env.example` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

Only use one AI provider initially, but leave structure flexible.

## Deployment

Prepare for Netlify deployment.

Include:
- `netlify.toml`
- proper build command
- environment variable documentation
- deployment notes

## Final Reminder

This MVP is about proving the Founder 12 pilot.

Do not overbuild.

The goal is not to create the perfect platform.

The goal is to help ISD select 12 serious founders, coordinate their Founder 12 experience, support them through Founders Coffee and AI sessions, and form the builder-supported teams most likely to reach prototype readiness.
