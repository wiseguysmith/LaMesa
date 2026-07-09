# QA Test Plan

## Purpose

This plan defines manual acceptance tests for the La Mesa Founder 12 MVP.

QA should verify the product can safely support founder intake, ISD review, accepted-founder gating, builder network approval, AI-assisted analysis, admin matching, progress tracking, and demo readiness.

## Test Environments

Minimum:
- Local development.
- Netlify deploy preview.
- Production Supabase project before launch.

Recommended test accounts:
- Founder Applicant A.
- Founder Applicant B.
- Accepted Founder.
- Builder Pending.
- Builder Approved.
- Admin.

## Build Checks

Run before release:

```bash
npm run lint
npm run build
```

If either fails, document the failure and fix before production launch.

## Founder Applicant Flow

### Founder Signup

Verify:
- Founder can create account.
- Founder role is created as `founder`.
- Founder cannot access admin pages.
- Founder is routed to submit a Founder 12 application or dashboard.

### Founder 12 Application Submission

Verify:
- Required fields are enforced.
- Founder can submit application.
- Application/venture is associated with correct founder.
- Application enters under-review state.
- Founder sees Founder 12 status language.

### Founder Readiness Report

Verify:
- Founder can see readiness score.
- Founder can see category scores.
- Founder can see Founder 12 fit notes.
- Founder can see strengths, risks, next steps, role map, and roadmap.
- Founder cannot see admin-only notes.
- AI failure does not delete or lose the application.

### Non-Accepted Founder Access

Verify:
- Non-accepted founder cannot view Founders Coffee details.
- Non-accepted founder cannot view ISD member privileges.
- Non-accepted founder cannot view AI session access.
- Non-accepted founder cannot view external community link.
- Non-accepted founder sees clear "under review," "shortlisted," or "not selected" state.

### Founder Isolation

Verify:
- Founder A cannot view Founder B application/venture.
- Founder A cannot update Founder B application/venture.
- Founder cannot accept own application.
- Founder cannot run match suggestions.

## Accepted Founder Flow

### Acceptance State

Verify:
- Admin can mark founder accepted to Founder 12.
- Accepted founder sees accepted state.
- Accepted founder count is visible to admin against 12-seat capacity.

### Accepted-Founder Modules

Verify accepted founder can see:
- Founders Coffee module.
- ISD member privileges module.
- AI sessions module.
- External community link if configured.
- Team formation status.
- 30-day roadmap.

Verify non-accepted founder cannot see those modules.

### Accepted Venture Progress

Verify:
- Accepted founder can view assigned builders.
- Accepted founder can view missing roles.
- Accepted founder can submit progress update if enabled.
- Accepted founder can see demo/prototype readiness status.

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
- Pending builder cannot view ventures.
- Pending builder cannot view match suggestions.

### Builder Approval

Verify:
- Admin can approve builder.
- Approved builder can view own status.
- Approved builder still cannot browse all ventures in MVP.
- Approved builder can view assigned ventures after assignment.

### Builder Isolation

Verify:
- Builder cannot view unassigned ventures.
- Builder cannot assign self to a venture.
- Builder cannot call admin APIs.
- Builder cannot see admin notes.

## Admin Flow

### Admin Access

Verify:
- Admin can access `/admin`.
- Non-admin users are redirected or blocked.
- Cohort Command Center stats load.

### Founder 12 Review

Verify:
- Admin can view submitted applications.
- Admin can view AI analysis.
- Admin can shortlist founder.
- Admin can accept founder to Founder 12.
- Admin can mark founder not selected.
- Status labels use Founder 12 language where founder-facing.
- Accepted founder count can be tracked against 12 seats.

### Builder Review

Verify:
- Admin can view pending builders.
- Admin can approve builder into Builder Network.
- Admin can reject builder.

### Team Formation

Verify:
- Admin can run match suggestions.
- Non-admin cannot run match suggestions.
- Suggestions only include approved builders.
- Admin can assign builder to accepted venture.
- Assigned builder appears on venture page.
- Admin can remove builder.
- Removed builder no longer sees the venture.

### Admin Notes

Verify:
- Admin can add internal note.
- Admin can view internal note.
- Founder cannot view internal note.
- Builder cannot view internal note.

## AI Flow

### Analyze Application

Verify:
- Auth is required.
- Founder can analyze own application.
- Founder cannot analyze another founder's application.
- Admin can analyze any application.
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
- Founder cannot query other founder applications.
- Non-accepted founder cannot query accepted-founder data.
- Pending builder cannot query ventures.
- Approved builder cannot query unassigned ventures.
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
- Accepted-founder modules work on mobile.

## Accessibility

Verify:
- Form fields have labels.
- Required fields are announced visually.
- Buttons have clear text.
- Color contrast is acceptable.
- Keyboard navigation works for forms and actions.
- Error messages are visible and specific.

## Founder 12 Operating Tests

Verify:
- Application can be tied to Founder 12.
- Application has primary track/category.
- Admin can filter or identify applications by track/category.
- Admin can track accepted founder count against 12.
- Founders Coffee module is visible only to accepted founders.
- ISD privileges module is visible only to accepted founders.
- AI sessions module is visible only to accepted founders.
- Weekly progress update can be recorded.
- Venture can move to prototype-ready.
- Venture can move to presented/demo day.
- Alumni/archive state is clear.

## Release Checklist

Before production launch:

- Build passes.
- Lint passes or documented.
- RLS tests pass.
- Admin flow passes.
- Founder applicant flow passes.
- Accepted founder flow passes.
- Builder flow passes.
- AI failure states pass.
- Netlify env vars configured.
- Supabase production schema applied.
- First admin user created securely.
- README is accurate.
- Deployment notes are accurate.
