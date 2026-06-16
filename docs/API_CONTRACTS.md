# API Contracts

## Purpose

This document defines the expected API behavior for La Mesa Batch 01.

All production API routes should have:
- Clear auth requirements
- Server-side validation
- Stable request and response shapes
- Consistent error responses
- No hardcoded secrets
- No client-trusted privileged identity

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
- Generate Founder Readiness Report, readiness score, role recommendations, strengths, risks, and next steps.

Auth:
- Founder can analyze own project.
- Admin can analyze any project.

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
  "category_scores": {
    "seriousness_consistency": 80,
    "problem_clarity": 85,
    "market_ambition": 70,
    "technical_feasibility": 75,
    "coachability": 80,
    "founder_market_fit": 90,
    "ability_to_recruit": 70,
    "community_impact": 65,
    "speed_of_execution": 75,
    "prototype_potential": 80
  },
  "ai_summary": "Short project assessment.",
  "strengths": ["Clear problem", "Strong founder-market fit"],
  "risks": ["MVP scope needs narrowing"],
  "next_steps": ["Define first user segment"],
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

Failure behavior:
- Do not delete the project if AI fails.
- Project should remain submitted/pending consideration.
- Show founder a clear message that AI analysis is pending or unavailable.

### POST /api/generate-roadmap

Purpose:
- Generate a 4-week roadmap for the project.

Auth:
- Founder can generate for own project.
- Admin can generate for any project.

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
      "match_reasons": ["React experience", "Interested in education"],
      "risks": ["Limited backend experience"]
    }
  ]
}
```

Validation:
- `match_score` must be 0 to 100.
- `builder_id` must belong to an approved builder.
- Suggestions should be capped to a small number for admin review.

## Admin APIs

All admin APIs require admin auth.

### POST /api/admin/approve-project

Request:

```json
{
  "project_id": "uuid"
}
```

Success:

```json
{
  "success": true
}
```

Expected behavior:
- Mark project/founder as selected or approved according to the final status model.
- Use Table language in UI: selected for Table 01.

### POST /api/admin/reject-project

Request:

```json
{
  "project_id": "uuid",
  "reason": "Optional internal or founder-facing reason"
}
```

Expected behavior:
- Mark as not selected for this Table.
- Preserve project data.

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
- Project must exist.
- Builder must be approved.
- Admin must be authenticated.
- Assignment role must be non-empty and normalized.

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
- Notes must not be exposed to founders or builders.

## Implementation Requirements

- Add shared validation utilities or schemas.
- Prefer project IDs and server-side lookups.
- Keep AI provider details server-side.
- Log server errors without exposing secrets.
- Use consistent response shapes.
- Treat AI output as untrusted until validated.
