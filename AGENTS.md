# AGENTS.md

## Mission

Build the La Mesa MVP as a clean, practical, production-ready pilot platform for ISD.

Do not overbuild. Do not create a full marketplace, social network, chat app, LMS, or accelerator operating system in version one.

The MVP should help ISD test whether founders, students, and builders can form teams and move toward prototype completion.

## Product Definition

La Mesa is an AI-assisted startup incubation and team-formation platform.

Long-term vision:
- Startup incubation
- University innovation
- Hackathons
- Founder communities
- Technical education programs
- Team formation
- Prototype development

MVP focus:
- Founder project intake
- Builder profile intake
- AI role mapping
- AI readiness scoring
- AI 30-day roadmap generation
- Admin approval
- Admin-assisted matching
- Simple project pages

## Build Philosophy

Build the simplest version that proves the pilot.

Prefer clarity over cleverness.

Prefer working flows over decorative features.

Prefer admin control over full automation.

Do not build:
- Real-time chat
- Full collaboration workspace
- Payments
- Equity tracking
- Contracts
- Investor dashboard
- Public marketplace
- Automatic AI team formation
- Mentor portal
- University admin portal
- Mobile app
- Complex notification system

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

## Initial Routes

Recommended routes:

Public:
- `/`
- `/how-it-works`
- `/apply`
- `/join`
- `/login`

Founder:
- `/dashboard`
- `/founder/projects/new`
- `/founder/projects/[id]`

Builder:
- `/builder/profile`
- `/builder/projects`

Admin:
- `/admin`
- `/admin/projects`
- `/admin/projects/[id]`
- `/admin/builders`
- `/admin/matches`

API:
- `/api/analyze-project`
- `/api/generate-roadmap`
- `/api/suggest-matches`

## Initial User Roles

Use three roles:

1. `founder`
2. `builder`
3. `admin`

Users should be able to create accounts, but access to active platform functionality should depend on approval status.

Approval model:
- Users can sign up.
- Profiles/projects are submitted.
- Admin approves users, projects, and matches.
- MVP uses admin-managed matching.

## Public Landing Page

The MVP should include a public landing page.

Core sections:
1. Hero
2. Problem
3. Solution
4. How It Works
5. Who It Is For
6. Founder CTA
7. Builder CTA
8. ISD pilot context
9. Footer

Primary CTA:
- Apply as Founder

Secondary CTA:
- Join as Builder

Hero copy direction:

> Bring your idea to the table.
> La Mesa helps founders, students, and builders form teams, map the roles they need, and move from idea to prototype.

## Project Intake

The founder application should feel like a startup application, not a casual note form.

Use a guided form first. AI conversation can come later.

Required fields:
- Project name
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

Builder profiles should capture role fit, availability, and interest.

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

## Project Status Pipeline

Use these project statuses:

1. Submitted
2. Under Review
3. Roles Mapped
4. Matching
5. Team Formed
6. Building
7. Prototype Ready
8. Presented / Demo Day
9. Archived

Store status values as lowercase slugs:
- `submitted`
- `under_review`
- `roles_mapped`
- `matching`
- `team_formed`
- `building`
- `prototype_ready`
- `presented_demo_day`
- `archived`

## AI Features

The top three AI features for MVP are:

1. AI role mapping
2. AI project readiness score
3. AI 30-day milestone roadmap

### AI Role Mapping

Given a project submission, AI should return:
- Recommended roles
- Priority level for each role
- Reason each role is needed
- Suggested team size
- Missing information needed from founder

### AI Project Readiness Score

Score should be from 0 to 100.

Measure:
- Problem clarity
- User/customer clarity
- Technical feasibility
- Team readiness
- Timeline realism
- Prototype potential
- Market/impact potential

Return:
- Overall score
- Category scores
- Short explanation
- Biggest strengths
- Biggest risks
- Recommended next steps

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

MVP matching should be AI-assisted but admin-approved.

Level 1:
- AI recommends roles based on project idea.

Level 2:
- AI suggests possible builders based on skills, availability, interests, and role fit.
- Admin reviews and approves assignments.

Do not automatically assign builders to projects without admin approval.

Match criteria:
- Skills
- Availability
- Interests
- Role fit
- Project category alignment
- Builder goals

Admin matching screen should show:
- Project summary
- Needed roles
- Missing roles
- Suggested builders
- Match reasons
- Builder availability
- Builder skills
- Assign to team button

## Project Page

The MVP project page should be simple.

It should include:
- Project name
- Project summary
- Founder
- Status
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

Admin dashboard should include:
- Total projects
- Total builders
- Pending approvals
- Projects by status
- Builders awaiting approval
- Projects needing matches
- Teams formed
- Prototype-ready projects

Admin should be able to:
- Approve/reject builders
- Approve/reject projects
- View AI analysis
- Assign builders to projects
- Remove builders from projects
- Update project status
- Add internal notes

## Security

Use Supabase Row Level Security.

Basic rules:
- Users can view and edit their own profiles.
- Founders can view their own projects.
- Builders can view their own profiles and assigned projects.
- Admins can view and manage all projects, profiles, and matches.
- Do not expose admin data to non-admin users.

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

This MVP is about proving the pilot.

Do not overbuild.

The goal is not to create the perfect platform.

The goal is to help ISD form teams that can complete prototypes.
