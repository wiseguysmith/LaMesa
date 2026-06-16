# QA Test Plan

## Purpose

This plan defines manual acceptance tests for La Mesa Batch 01.

QA should verify the product can safely support founder intake, builder network approval, AI-assisted analysis, admin matching, weekly progress, and Demo Day preparation.

## Test Environments

Minimum:
- Local development
- Netlify deploy preview
- Production Supabase project before launch

Recommended test accounts:
- Founder A
- Founder B
- Builder Pending
- Builder Approved
- Admin

## Build Checks

Run before release:

```bash
npm run lint
npm run build
```

If either fails, document the failure and fix before production launch.

## Founder Flow

### Founder Signup

Verify:
- Founder can create account.
- Founder role is created as `founder`.
- Founder cannot access admin pages.
- Founder is routed to submit a project or dashboard.

### Founder Project Submission

Verify:
- Required fields are enforced.
- Founder can submit project.
- Project is associated with correct founder.
- Project enters pending consideration for La Mesa Summer 2026 Table.
- Founder sees confirmation/status language.

### Founder Readiness Report

Verify:
- Founder can see readiness score.
- Founder can see category scores.
- Founder can see strengths, risks, next steps, role map, and roadmap.
- Founder cannot see admin-only notes.
- AI failure does not delete or lose the project.

### Founder Isolation

Verify:
- Founder A cannot view Founder B project.
- Founder A cannot update Founder B project.
- Founder cannot approve own project.
- Founder cannot run match suggestions.

## Builder Flow

### Builder Signup

Verify:
- Builder can create account.
- Builder role is created as `builder`.
- Builder can access own profile form.

### Builder Network Application

Verify:
- Builder can submit profile.
- Builder status is pending review.
- Pending builder cannot view projects.
- Pending builder cannot view match suggestions.

### Builder Approval

Verify:
- Admin can approve builder.
- Approved builder can view own status.
- Approved builder still cannot browse all projects in V1.
- Approved builder can view assigned projects after assignment.

### Builder Isolation

Verify:
- Builder cannot view unassigned projects.
- Builder cannot assign self to a project.
- Builder cannot call admin APIs.
- Builder cannot see admin notes.

## Admin Flow

### Admin Access

Verify:
- Admin can access `/admin`.
- Non-admin users are redirected or blocked.
- Admin dashboard stats load.

### Project Review

Verify:
- Admin can view submitted projects.
- Admin can view AI analysis.
- Admin can approve/select project.
- Admin can reject/not-select project.
- Status labels use Table language where founder-facing.

### Builder Review

Verify:
- Admin can view pending builders.
- Admin can approve builder into Builder Network.
- Admin can reject builder.

### Matching

Verify:
- Admin can run match suggestions.
- Non-admin cannot run match suggestions.
- Suggestions only include approved builders.
- Admin can assign builder to project.
- Assigned builder appears on project page.
- Admin can remove builder.
- Removed builder no longer sees the project.

### Admin Notes

Verify:
- Admin can add internal note.
- Admin can view internal note.
- Founder cannot view internal note.
- Builder cannot view internal note.

## AI Flow

### Analyze Project

Verify:
- Auth is required.
- Founder can analyze own project.
- Founder cannot analyze another founder's project.
- Admin can analyze any project.
- Output validates before storage.
- Invalid AI JSON is handled gracefully.

### Generate Roadmap

Verify:
- Roadmap has exactly four weeks.
- Each week has objective, tasks, deliverables, and owner roles.
- Roadmap is visible to founder and assigned team.

### Suggest Matches

Verify:
- Admin only.
- Uses approved builders only.
- Saves suggestions.
- Re-running suggestions handles old suggestions intentionally.

## RLS And Security Tests

Verify with real accounts:

- Anonymous user cannot query private tables.
- Founder cannot query other founder projects.
- Pending builder cannot query projects.
- Approved builder cannot query unassigned projects.
- Founder cannot query admin notes.
- Builder cannot query admin notes.
- Non-admin cannot insert match suggestions.
- Non-admin cannot insert project members.
- Public signup cannot create admin role.
- Service role is never available client-side.

## Responsive UI

Test:
- Mobile width around 375px.
- Tablet width around 768px.
- Desktop width around 1440px.

Verify:
- Forms are usable.
- Tables do not break layout.
- Buttons fit text.
- Status badges do not overlap.
- Navigation is accessible.
- Loading states are clear.

## Accessibility

Verify:
- Form fields have labels.
- Required fields are announced visually.
- Buttons have clear text.
- Color contrast is acceptable.
- Keyboard navigation works for forms and actions.
- Error messages are visible and specific.

## Batch 01 Operating Tests

Verify:
- Project can be tied to Batch 01 / Table 01.
- Project has primary track.
- Admin can filter or identify projects by track.
- Weekly progress update can be recorded.
- Project can move to prototype-ready.
- Project can move to presented/demo day.
- Alumni/archive state is clear.

## Release Checklist

Before production launch:

- Build passes.
- Lint passes or documented.
- RLS tests pass.
- Admin flow passes.
- Founder flow passes.
- Builder flow passes.
- AI failure states pass.
- Netlify env vars configured.
- Supabase production schema applied.
- First admin user created securely.
- README is accurate.
- Deployment notes are accurate.
