# AI Matching Logic

## AI Role Mapping

Input:
- Project name
- One-sentence idea
- Problem
- Target users
- Category
- Stage
- Skills requested
- Timeline
- Team size
- Founder goals

Output:
- Recommended roles
- Priority level for each role
- Explanation for each role
- Suggested team size
- Missing information

Example role output:

```json
{
  "recommended_roles": [
    {
      "role": "Full-Stack Developer",
      "priority": "High",
      "reason": "The project requires a working web prototype with both frontend and backend functionality."
    },
    {
      "role": "UX/UI Designer",
      "priority": "Medium",
      "reason": "The founder needs clear user flows before building the prototype."
    }
  ],
  "suggested_team_size": 4,
  "missing_information": [
    "Specific target user segment",
    "Preferred prototype platform"
  ]
}
```

## Readiness Score

Score range: 0–100

Categories:
- Problem clarity
- User/customer clarity
- Technical feasibility
- Team readiness
- Timeline realism
- Prototype potential
- Market/impact potential

Suggested weighting:
- Problem clarity: 15%
- User/customer clarity: 15%
- Technical feasibility: 15%
- Team readiness: 15%
- Timeline realism: 10%
- Prototype potential: 20%
- Market/impact potential: 10%

Output:

```json
{
  "overall_score": 72,
  "category_scores": {
    "problem_clarity": 80,
    "user_customer_clarity": 65,
    "technical_feasibility": 75,
    "team_readiness": 60,
    "timeline_realism": 70,
    "prototype_potential": 85,
    "market_impact_potential": 70
  },
  "summary": "The project has strong prototype potential but needs clearer target users and team structure.",
  "strengths": ["Clear problem", "Strong MVP potential"],
  "risks": ["Unclear user segment", "Needs technical lead"],
  "next_steps": ["Define first user group", "Recruit full-stack developer", "Reduce MVP scope"]
}
```

## 30-Day Roadmap

Output should include four weekly milestones.

Each week:
- Objective
- Tasks
- Deliverables
- Suggested owner roles

Example:

```json
{
  "roadmap": [
    {
      "week": 1,
      "objective": "Clarify the problem and define MVP scope.",
      "tasks": [
        "Interview 5 target users",
        "Define core user flow",
        "Create MVP feature list"
      ],
      "deliverables": [
        "User interview notes",
        "MVP scope document",
        "Basic wireframe"
      ],
      "owner_roles": ["Founder / Project Lead", "UX/UI Designer"]
    }
  ]
}
```

## Match Suggestions

MVP matching is not automatic.

The system should suggest possible builders to admins.

Criteria:
- Skill overlap
- Preferred role fit
- Availability
- Interest/category alignment
- Experience level
- Builder goals

Suggested match output:

```json
{
  "suggested_matches": [
    {
      "builder_id": "uuid",
      "recommended_role": "Frontend Developer",
      "match_score": 84,
      "match_reasons": [
        "Has React experience",
        "Available 8 hours per week",
        "Interested in education projects"
      ],
      "risks": [
        "Limited backend experience"
      ]
    }
  ]
}
```

## AI Rules

- AI should never approve users.
- AI should never assign builders automatically.
- AI should never make legal, equity, or compensation decisions.
- AI should provide structured recommendations for admin review.
- Admin has final authority.
