# AI Analysis And Matching Logic

## AI Role

AI supports ISD review and founder execution.

AI should:
- Analyze Founder 12 applications.
- Score founder and venture readiness.
- Identify fit for Founder 12.
- Map roles needed for the venture.
- Generate a 30-day roadmap.
- Suggest builder matches to admins after acceptance or when ISD requests support.

AI should not:
- Accept founders automatically.
- Reject founders automatically.
- Approve builders automatically.
- Assign builders automatically.
- Make legal, equity, or compensation decisions.
- Promise Founder 12 acceptance.

AI recommends. ISD decides.

## Founder Readiness Analysis

Input:
- Founder name
- Venture name
- One-sentence idea
- Problem
- Target users
- Category
- Stage
- Skills requested
- Timeline
- Team size
- Founder goals
- Why Founder 12
- Availability/commitment
- Founders Coffee participation signal

Output:
- Overall readiness score
- Category scores
- Founder 12 fit notes
- Summary
- Strengths
- Risks
- Missing information
- Recommended next steps
- ISD review questions
- Role recommendations
- Suggested team size

Example output:

```json
{
  "readiness_score": 76,
  "founder_12_fit": "Strong fit if the founder can commit consistent weekly time and narrow the prototype scope.",
  "category_scores": {
    "problem_clarity": 82,
    "user_clarity": 70,
    "technical_feasibility": 74,
    "founder_commitment": 78,
    "timeline_realism": 68,
    "prototype_potential": 84,
    "market_impact": 72,
    "founder_12_fit": 80
  },
  "ai_summary": "The venture has a clear problem and strong prototype potential, but ISD should confirm the founder's weekly availability and first customer segment.",
  "strengths": ["Clear problem", "Good prototype potential"],
  "risks": ["Broad target user segment", "Needs technical support"],
  "next_steps": ["Narrow first user group", "Define MVP demo scope", "Confirm weekly build schedule"],
  "isd_review_questions": [
    "Can the founder attend Founders Coffee consistently?",
    "What is the smallest prototype that proves the core value?"
  ]
}
```

## AI Role Mapping

Given a Founder 12 application, AI should return:
- Recommended roles.
- Priority level for each role.
- Explanation for each role.
- Suggested team size.
- Missing information.

Example role output:

```json
{
  "role_recommendations": [
    {
      "role": "Full-Stack Developer",
      "priority": "high",
      "reason": "The venture requires a working web prototype with both frontend and backend functionality."
    },
    {
      "role": "UX/UI Designer",
      "priority": "medium",
      "reason": "The founder needs clear user flows before building the prototype."
    }
  ],
  "suggested_team_size": 4,
  "missing_information": [
    "Specific first user segment",
    "Preferred prototype platform"
  ]
}
```

## Readiness Score

Score range: 0-100

Categories:
- Problem clarity
- User/customer clarity
- Technical feasibility
- Founder commitment
- Timeline realism
- Prototype potential
- Market/impact potential
- Founder 12 fit

Suggested weighting:
- Problem clarity: 15%
- User/customer clarity: 15%
- Prototype potential: 15%
- Founder commitment: 15%
- Founder 12 fit: 15%
- Technical feasibility: 10%
- Timeline realism: 10%
- Market/impact potential: 5%

Weights can change later by track, but keep the first version simple.

## 30-Day Roadmap

Output should include four weekly milestones.

Each week:
- Objective
- Tasks
- Deliverables
- Suggested owner roles

Default format:

- Week 1: Clarify problem, define MVP, validate assumptions.
- Week 2: Build prototype foundation.
- Week 3: Test with users, refine product.
- Week 4: Prepare demo, pitch, and next-step plan.

Example:

```json
{
  "weeks": [
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

## Builder Match Suggestions

MVP matching is not automatic.

The system should suggest possible builders to admins only.

Matching should prioritize accepted Founder 12 ventures or ventures ISD explicitly marks as ready for support.

Criteria:
- Skill overlap
- Preferred role fit
- Availability
- Interest/category alignment
- Experience level
- Builder goals
- Founder 12 venture needs
- Reliability signals when available

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
        "Interested in education ventures"
      ],
      "risks": [
        "Limited backend experience"
      ]
    }
  ]
}
```

## Admin Review Questions

AI should generate questions that help ISD decide whether a founder belongs in Founder 12.

Question types:
- Commitment
- Scope
- Founder-market fit
- Founders Coffee participation
- Prototype feasibility
- Team needs
- Coachability

Example:

```json
{
  "isd_review_questions": [
    "What specific weekly time blocks can the founder commit during Founder 12?",
    "Which user group will the founder validate with first?",
    "What does a successful prototype demo look like after 30 days?"
  ]
}
```

## AI Safety Rules

- AI should never approve users.
- AI should never reject users.
- AI should never assign builders automatically.
- AI should never expose private admin notes.
- AI should never make legal, equity, or compensation decisions.
- AI should provide structured recommendations for admin review.
- Admin has final authority.
