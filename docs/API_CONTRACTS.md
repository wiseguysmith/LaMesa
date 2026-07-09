# API Contracts

## Purpose

This document defines the expected API behavior for the La Mesa Founder 12 MVP.

All production API routes should have:
- Clear auth requirements.
- Server-side validation.
- Stable request and response shapes.
- Consistent error responses.
- No hardcoded secrets.
- No client-trusted privileged identity.

## Standard Error Shape

All API errors should return:

```json
{
  "error": "Human-readable error message",
  "code": "OPTIONAL_MACHINE_CODE"
}
```

Recommended status codes:
- 400: invalid request
- 401: unauthenticated
- 403: unauthorized
- 404: not found
- 409: conflict
- 422: validation failed
- 500: server error

## Auth APIs

### POST /api/auth/create-user

Purpose:
- Create a `public.users` row after Supabase Auth signup.

Auth:
- Must require authenticated Supabase user.

Request:

```json
{
  "userId": "uuid",
  "email": "person@example.com",
  "fullName": "Jane Founder",
  "role": "founder"
}
```

Validation:
- `userId` must match authenticated user id.
- `email` must match authenticated user email where available.
- `role` must be `founder` or `builder`.
- Public route must not allow `admin`.

Success:

```json
{
  "success": true
}
```

## AI APIs

### POST /api/analyze-project

Purpose:
- Generate Founder Readiness Report, Founder 12 fit notes, readiness score, role recommendations, strengths, risks, review questions, and next steps.

Auth:
- Founder can analyze own application/venture.
- Admin can analyze any application/venture.

Preferred request:

```json
{
  "project_id": "uuid"
}
```

Avoid trusting a full project payload from the client in production.

Success:

```json
{
  "readiness_score": 78,
  "founder_12_fit": "Strong fit if the founder can commit consistent weekly time and narrow the prototype scope.",
  "category_scores": {
    "problem_clarity": 85,
    "user_clarity": 72,
    "technical_feasibility": 75,
    "founder_commitment": 80,
    "timeline_realism": 70,
    "prototype_potential": 82,
    "market_impact": 68,
    "founder_12_fit": 80
  },
  "ai_summary": "Short Founder 12 readiness assessment.",
  "strengths": ["Clear problem", "Strong founder-market fit"],
  "risks": ["MVP scope needs narrowing"],
  "next_steps": ["Define first user segment"],
  "isd_review_questions": ["Can the founder attend core Founders Coffee touchpoints?"],
  "role_recommendations": [
    {
      "role": "Full-Stack Developer",
      "priority": "high",
      "reason": "Needed to build the initial prototype."
    }
  ],
  "suggested_team_size": 4,
  "missing_info": ["Specific first customer segment"]
}
```

Validation:
- Score fields must be integers from 0 to 100.
- Priority must be `high`, `medium`, or `low`.
- Roles must come from the supported role list or be normalized by admin-approved logic.
- AI output must be treated as untrusted until validated.

Failure behavior:
- Do not delete the application if AI fails.
- Application should remain submitted/under review.
- Show founder a clear message that AI analysis is pending or unavailable.

### POST /api/generate-roadmap

Purpose:
- Generate a 4-week roadmap for Founder 12 prototype readiness.

Auth:
- Founder can generate for own application/venture.
- Admin can generate for any application/venture.

Preferred request:

```json
{
  "project_id": "uuid"
}
```

Success:

```json
{
  "weeks": [
    {
      "week": 1,
      "objective": "Clarify the problem and define MVP scope.",
      "tasks": ["Interview 5 target users"],
      "deliverables": ["MVP scope document"],
      "owner_roles": ["Founder / Project Lead"]
    }
  ]
}
```

Validation:
- Must return exactly 4 weeks.
- Week numbers must be 1 through 4.
- Each week must include objective, tasks, deliverables, and owner roles.

### POST /api/suggest-matches

Purpose:
- Generate AI-assisted builder suggestions for admin review.

Auth:
- Admin only.

Request:

```json
{
  "project_id": "uuid"
}
```

Success:

```json
{
  "suggestions": [
    {
      "builder_id": "uuid",
      "recommended_role": "Frontend Developer",
      "match_score": 84,
      "match_reasons": ["React experience", "Interested in education ventures"],
      "risks": ["Limited backend experience"]
    }
  ]
}
```

Validation:
- `match_score` must be 0 to 100.
- `builder_id` must belong to an approved builder.
- Suggestions should be capped to a small number for admin review.
- Suggestions should prioritize accepted Founder 12 ventures or ventures ISD has marked ready for support.

## Admin APIs

All admin APIs require admin auth.

### POST /api/admin/approve-project

Request:

```json
{
  "project_id": "uuid"
}
```

Expected behavior:
- Mark founder/application as accepted to Founder 12 or approved according to the final status model.
- If this endpoint is reused, UI copy should say "Accepted to Founder 12," not generic project approval.
- Admin must be able to keep the accepted founder count within the 12-seat target.

Success:

```json
{
  "success": true
}
```

### POST /api/admin/reject-project

Request:

```json
{
  "project_id": "uuid",
  "reason": "Optional internal or founder-facing reason"
}
```

Expected behavior:
- Mark as not selected for this Founder 12 cohort.
- Preserve application data.

### POST /api/admin/approve-builder

Request:

```json
{
  "builder_id": "uuid"
}
```

Expected behavior:
- Approve builder into the La Mesa Builder Network.

### POST /api/admin/reject-builder

Request:

```json
{
  "builder_id": "uuid",
  "reason": "Optional internal or builder-facing reason"
}
```

Expected behavior:
- Mark builder as not approved.

### POST /api/admin/assign-builder

Request:

```json
{
  "project_id": "uuid",
  "builder_id": "uuid",
  "assigned_role": "Full-Stack Developer"
}
```

Validation:
- Venture must exist.
- Builder must be approved.
- Admin must be authenticated.
- Assignment role must be non-empty and normalized.
- Assignment should normally target accepted Founder 12 ventures.

Success:

```json
{
  "success": true
}
```

### DELETE /api/admin/remove-builder

Request:

```json
{
  "project_id": "uuid",
  "builder_id": "uuid"
}
```

Expected behavior:
- Remove or mark assignment as removed.
- Preserve auditability where possible.

### POST /api/admin/update-project-status

Request:

```json
{
  "project_id": "uuid",
  "status": "building"
}
```

Validation:
- Status must be in the allowed status list.
- Invalid transitions should be rejected or explicitly allowed by admin override.
- UI should translate statuses into Founder 12 language for founders.

### POST /api/admin/add-note

Request:

```json
{
  "project_id": "uuid",
  "note": "Internal admin note"
}
```

Expected behavior:
- Notes are admin-only.
- Notes must not be exposed to founders or builders unless a separate founder-facing note field is created.

## Future Member APIs

Future accepted-founder modules may need APIs for:
- Founders Coffee event details.
- Founder 12 benefit records.
- AI session details.
- External community link access.

These APIs must:
- Require authenticated founder.
- Verify accepted Founder 12 status.
- Return no data to non-accepted applicants.
- Allow admin management through protected admin routes only.

## Implementation Requirements

- Add shared validation utilities or schemas.
- Prefer project IDs and server-side lookups.
- Keep AI provider details server-side.
- Log server errors without exposing secrets.
- Use consistent response shapes.
- Treat AI output as untrusted until validated.
- Gate accepted-founder privileges by accepted Founder 12 status.
