# Security And RLS Spec

## Purpose

This spec defines the access model for the La Mesa Founder 12 MVP.

The goal is simple: participants can only access what they need, while ISD admins can operate Founder 12 safely.

## Roles

Initial roles:

- founder
- builder
- admin

## Access Philosophy

- Founders can create accounts and submit Founder 12 applications.
- Founder 12 acceptance depends on ISD review.
- Only accepted founders can access Founder 12 member privileges.
- Builders can apply to the Builder Network.
- Builders cannot view ventures before assignment.
- Admins manage all applications, profiles, matches, notes, and cohort status.
- AI recommendations are decision support only.
- Service role access must stay server-only and must be wrapped by route-level authorization.

## Role Capabilities

### Public Visitor

Can:
- View public marketing pages.
- Create an account.
- Start founder or builder onboarding.

Cannot:
- View applications/ventures.
- View builder profiles.
- View accepted-founder modules.
- View admin data.
- Run matching.

### Founder Applicant

Can:
- View and edit own user profile.
- Submit own Founder 12 application.
- View own application/venture.
- View own Founder Readiness Report.
- View own roadmap and application status.

Cannot:
- View other founders' applications.
- View accepted-founder modules unless selected.
- View Founders Coffee details unless accepted.
- View ISD member privileges unless accepted.
- View AI session access unless accepted.
- View unassigned builders.
- View admin-only notes.
- Approve applications.
- Assign builders.
- Run match suggestions.

### Accepted Founder

Can:
- Do everything a founder applicant can do.
- View accepted-founder dashboard modules.
- View Founders Coffee details.
- View ISD member privileges.
- View AI session details.
- View external community link if configured.
- View assigned team members.
- Submit venture progress updates.

Cannot:
- View other founders' private applications.
- View admin-only notes.
- Assign builders.
- Run match suggestions.

### Builder Pending Review

Can:
- View and edit own builder profile.
- View own approval status.

Cannot:
- View ventures.
- View founder profiles.
- View match suggestions.
- View other builders.
- View accepted-founder modules.

### Builder Approved

Can:
- View and edit own builder profile.
- View assigned Founder 12 ventures.
- View venture details for assigned ventures.
- View own assignments.
- View relevant team information for assigned ventures.

Cannot:
- Browse all ventures in MVP.
- View ventures before assignment.
- View accepted-founder privileges unless separately accepted as a founder.
- View admin notes.
- Assign self to ventures.
- Run match suggestions.

### Admin

Can:
- View and manage all users.
- View and manage all Founder 12 applications/ventures.
- View and manage all builder profiles.
- View AI analysis.
- Shortlist, accept, or mark founders not selected.
- Approve or reject builders.
- Run match suggestions.
- Assign and remove builders.
- Update statuses.
- Add internal notes.
- View and manage Founder 12 operations.

## Table Access Matrix

### users

Founder/builder:
- Select own row.
- Update limited own profile fields where safe.

Admin:
- Select all.
- Update role and approval status only through admin-controlled routes.

### founder_profiles

Founder:
- Select, insert, update own profile.

Admin:
- Select and manage all.

Builder:
- No access unless explicitly assigned and future product requires limited founder display.

### builder_profiles

Builder:
- Select, insert, update own profile.

Admin:
- Select and manage all.

Founder:
- No broad access in MVP.
- May see assigned builder display fields through controlled venture/member queries, not raw profile access.

### projects

Founder:
- Select and insert own applications/ventures.
- Update only safe own fields when allowed.

Accepted founder:
- Select own accepted venture and accepted-founder fields intended for founders.

Builder pending:
- No access.

Builder approved:
- Select assigned ventures only.

Admin:
- Select and manage all.

### project_role_recommendations

Founder:
- Select for own ventures.

Builder:
- Select for assigned ventures only.

Admin:
- Manage all.

### project_roadmaps

Founder:
- Select for own ventures.

Builder:
- Select for assigned ventures only.

Admin:
- Manage all.

### project_members

Founder:
- Select members assigned to own ventures.

Builder:
- Select own assignments.

Admin:
- Manage all.

### match_suggestions

Admin:
- Manage all.

Founder:
- No direct access in MVP.

Builder:
- No direct access in MVP.

### admin_notes

Admin:
- Manage all.

Founder:
- No access.

Builder:
- No access.

### project_updates

Founder:
- Select and insert updates for own ventures.

Builder:
- Select assigned venture updates.
- Insert updates for assigned ventures if product enables team updates.

Admin:
- Manage all.

### Future Founder 12 Member Tables

Future tables for Founders Coffee, AI sessions, benefits, or external community links must:
- Return data only to accepted founders and admins.
- Return no data to non-accepted applicants.
- Never expose private links publicly.

## API Authorization Requirements

### Public/Auth APIs

`/api/auth/create-user`

Must:
- Verify the authenticated Supabase user matches the user being created.
- Avoid trusting client-supplied privileged identity.
- Only allow founder or builder role during public signup.
- Never allow public admin creation.

### AI APIs

`/api/analyze-project`

Must:
- Require an authenticated founder or admin.
- Only analyze an application/venture owned by the founder or accessible by admin.
- Prefer project_id lookup over trusting full project payload from client.
- Validate input and AI output.

`/api/generate-roadmap`

Must:
- Require an authenticated founder or admin.
- Only generate for an owned or admin-accessible application/venture.
- Validate output before storage.

`/api/suggest-matches`

Must:
- Require admin.
- Use service role only after admin authorization.
- Validate project_id.
- Save suggestions only for ventures admin can manage.

### Admin APIs

All `/api/admin/*` routes must:
- Call `requireAdmin`.
- Validate request body.
- Validate status transitions.
- Return consistent JSON errors.
- Avoid updating unrelated fields.

## Service Role Rules

The Supabase service role may only be used:
- In server-only code.
- After route-level authorization.
- For admin actions, controlled auth creation flows, or trusted backend operations.

The service role must never be:
- Exposed to the browser.
- Used in client components.
- Used in public endpoints without verifying the authenticated user.

## RLS Policy Requirements

RLS policies should be explicit by table and action.

Avoid broad `for all` policies unless the behavior is fully intended for select, insert, update, and delete.

Separate policies by action:
- select
- insert
- update
- delete

Use helper functions where useful:
- `is_admin()`
- `is_accepted_founder(user_id)`
- `is_approved_builder()`
- `is_project_founder(project_id)`
- `is_project_member(project_id)`

## Security Test Cases

Before launch, verify:

- Anonymous user cannot query private tables.
- Founder cannot view another founder's application/venture.
- Founder cannot view admin notes.
- Non-accepted founder cannot view Founders Coffee details.
- Non-accepted founder cannot view ISD member privileges.
- Non-accepted founder cannot view AI session access.
- Founder cannot accept own application.
- Pending builder cannot view ventures.
- Approved builder cannot view unassigned ventures.
- Builder cannot assign self to venture.
- Non-admin cannot run match suggestions.
- Non-admin cannot call admin APIs.
- Service-role routes reject unauthenticated requests.
- Public signup cannot create admin users.

## Known Current Risks To Fix

- Match suggestion endpoint must be admin-protected.
- AI endpoints need auth and application ownership checks.
- Public create-user route must verify authenticated identity.
- Admin notes should be admin-only.
- Accepted-founder modules need explicit gating before launch.
- RLS policies should be split and reviewed before production.
