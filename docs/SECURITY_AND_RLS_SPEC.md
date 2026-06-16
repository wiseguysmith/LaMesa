# Security And RLS Spec

## Purpose

This spec defines the access model for La Mesa Batch 01.

The goal is simple: participants can only access what they need, while ISD admins can operate the fellowship safely.

## Roles

Initial roles:

- founder
- builder
- admin

## Access Philosophy

- Founders can create accounts and submit projects.
- Founder acceptance depends on project review.
- Builders can apply to the Builder Network.
- Builders cannot view projects before approval.
- Admins manage all projects, profiles, matches, notes, and statuses.
- AI recommendations are decision support only.
- Service role access must stay server-only and must be wrapped by route-level authorization.

## Role Capabilities

### Public Visitor

Can:
- View public marketing pages.
- Create an account.
- Start founder or builder onboarding.

Cannot:
- View projects.
- View builder profiles.
- View admin data.
- Run matching.

### Founder

Can:
- View and edit own user profile.
- Submit own project applications.
- View own projects.
- View own Founder Readiness Report.
- View assigned team members on own selected projects.
- View own roadmap and progress updates.
- Submit project updates for own project.

Cannot:
- View other founders' projects.
- View unassigned builders.
- View admin-only notes.
- Approve projects.
- Assign builders.
- Run match suggestions.

### Builder Pending Review

Can:
- View and edit own builder profile.
- View own approval status.

Cannot:
- View projects.
- View founder profiles.
- View match suggestions.
- View other builders.

### Builder Approved

Can:
- View and edit own builder profile.
- View assigned projects.
- View project details for assigned projects.
- View own assignments.
- View relevant team information for assigned projects.

Cannot:
- Browse all projects in V1.
- View projects before assignment unless a later mutual-interest feature is explicitly added.
- View admin notes.
- Assign self to projects.
- Run match suggestions.

### Admin

Can:
- View and manage all users.
- View and manage all founder/project submissions.
- View and manage all builder profiles.
- View AI analysis.
- Approve or reject founders/projects.
- Approve or reject builders.
- Run match suggestions.
- Assign and remove builders.
- Update project statuses.
- Add internal notes.
- View and manage Batch 01 operations.

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
- No broad access in V1.
- May see assigned builder display fields through controlled project/member queries, not raw profile access.

### projects

Founder:
- Select, insert, update own projects where allowed.

Builder pending:
- No access.

Builder approved:
- Select assigned projects only.

Admin:
- Select and manage all.

### project_role_recommendations

Founder:
- Select for own projects.

Builder:
- Select for assigned projects only.

Admin:
- Manage all.

### project_roadmaps

Founder:
- Select for own projects.

Builder:
- Select for assigned projects only.

Admin:
- Manage all.

### project_members

Founder:
- Select members assigned to own projects.

Builder:
- Select own assignments.

Admin:
- Manage all.

### match_suggestions

Admin:
- Manage all.

Founder:
- No direct access in V1.

Builder:
- No direct access in V1.

### admin_notes

Admin:
- Manage all.

Founder:
- No access.

Builder:
- No access.

### project_updates

Founder:
- Select and insert updates for own projects.

Builder:
- Select assigned project updates.
- Insert updates for assigned projects if product enables team updates.

Admin:
- Manage all.

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
- Only analyze a project owned by the founder or accessible by admin.
- Prefer project_id lookup over trusting full project payload from client.
- Validate input and AI output.

`/api/generate-roadmap`

Must:
- Require an authenticated founder or admin.
- Only generate for an owned or admin-accessible project.
- Validate output before storage.

`/api/suggest-matches`

Must:
- Require admin.
- Use service role only after admin authorization.
- Validate project_id.
- Save suggestions only for projects admin can manage.

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
- `is_approved_builder()`
- `is_project_founder(project_id)`
- `is_project_member(project_id)`

## Security Test Cases

Before launch, verify:

- Anonymous user cannot query private tables.
- Founder cannot view another founder's project.
- Founder cannot view admin notes.
- Founder cannot approve own project.
- Pending builder cannot view projects.
- Approved builder cannot view unassigned projects.
- Builder cannot assign self to project.
- Non-admin cannot run match suggestions.
- Non-admin cannot call admin APIs.
- Service-role routes reject unauthenticated requests.
- Public signup cannot create admin users.

## Known Current Risks To Fix

- Match suggestion endpoint must be admin-protected.
- AI endpoints need auth and project ownership checks.
- Public create-user route must verify authenticated identity.
- Admin notes should be admin-only.
- RLS policies should be split and reviewed before production.
