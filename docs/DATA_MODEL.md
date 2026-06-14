# Data Model

## users

Stores core user identity and role information.

Fields:
- id
- email
- full_name
- role
- approval_status
- created_at
- updated_at

Roles:
- founder
- builder
- admin

Approval statuses:
- pending
- approved
- rejected

## founder_profiles

Stores founder-specific profile information.

Fields:
- id
- user_id
- location
- languages
- bio
- linkedin_url
- created_at
- updated_at

## builder_profiles

Stores builder profile information.

Fields:
- id
- user_id
- location
- languages
- skills
- experience_level
- preferred_roles
- portfolio_url
- github_url
- linkedin_url
- interests
- availability_hours_per_week
- collaboration_preference
- project_goals
- bio
- approval_status
- created_at
- updated_at

## projects

Stores project applications.

Fields:
- id
- founder_id
- project_name
- one_sentence_idea
- problem
- target_users
- category
- stage
- skills_needed
- timeline
- availability_expectation
- desired_team_size
- collaboration_expectation
- location_preference
- founder_goals
- additional_notes
- status
- approval_status
- readiness_score
- ai_summary
- ai_analysis_json
- created_at
- updated_at

## project_role_recommendations

Stores AI-recommended roles for each project.

Fields:
- id
- project_id
- role
- priority
- reason
- is_filled
- created_at

## project_roadmaps

Stores AI-generated 30-day roadmaps.

Fields:
- id
- project_id
- roadmap_json
- created_at
- updated_at

## project_members

Stores builder assignments to projects.

Fields:
- id
- project_id
- user_id
- assigned_role
- assignment_status
- assigned_by
- created_at
- updated_at

Assignment statuses:
- suggested
- invited
- assigned
- removed

## match_suggestions

Stores AI-assisted match suggestions.

Fields:
- id
- project_id
- builder_id
- recommended_role
- match_score
- match_reasons_json
- risks_json
- status
- created_at
- updated_at

Suggestion statuses:
- pending
- approved
- rejected

## admin_notes

Stores internal admin notes.

Fields:
- id
- project_id
- admin_id
- note
- created_at

## project_updates

Stores simple progress updates.

Fields:
- id
- project_id
- author_id
- update_text
- status_snapshot
- created_at
