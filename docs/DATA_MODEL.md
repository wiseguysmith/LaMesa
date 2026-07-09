# Data Model

## Naming Note

The current implementation may still use `projects` in database tables and code.

Product-facing language should treat these records as Founder 12 applications and ventures.

Do not rename database tables casually. Translate language in the UI first, then migrate schema only when there is a clear need.

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

Founder approval is not the same as Founder 12 acceptance. Founder 12 selection should be tracked on the application/venture record or a dedicated cohort membership record.

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

Future Founder 12 fields may include:
- Costa Rica participation status
- Founders Coffee interest
- Preferred contact method
- Founder 12 bio

## builder_profiles

Stores Builder Network profile information.

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

Builders cannot browse all ventures. Approved builders can view assigned Founder 12 ventures only.

## projects

Stores Founder 12 applications and accepted-founder ventures.

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

Recommended conceptual additions:
- founder_status
- cohort_name
- cohort_seat_number
- shortlisted_at
- accepted_at
- not_selected_at
- founders_coffee_status
- ai_session_status
- member_privileges_status

Founder status values:
- application_submitted
- under_isd_review
- shortlisted
- accepted_founder_12
- not_selected
- team_formation
- building
- demo_ready
- alumni
- archived

Existing project status values may remain:
- submitted
- under_review
- roles_mapped
- matching
- team_formed
- building
- prototype_ready
- presented_demo_day
- archived

## founder_12_memberships

Recommended future table for clean accepted-founder access.

Purpose:
- Store the accepted Founder 12 membership state separately from the venture record.

Possible fields:
- id
- user_id
- project_id
- cohort_name
- seat_number
- accepted_at
- status
- founders_coffee_rsvp_status
- community_link_enabled
- ai_sessions_enabled
- benefits_enabled
- created_at
- updated_at

This table is optional for MVP if existing project fields already support the first cohort.

## founder_12_benefits

Recommended future table for ISD member privileges.

Possible fields:
- id
- title
- description
- access_instructions
- status
- sort_order
- created_at
- updated_at

For MVP, benefits can be static configuration or admin-managed simple records.

## founder_12_sessions

Recommended future table for AI sessions or founder support sessions.

Possible fields:
- id
- title
- description
- session_type
- starts_at
- access_url
- prep_prompt
- status
- created_at
- updated_at

Do not turn this into a full LMS in MVP.

## founders_coffee_events

Recommended future table for Founders Coffee coordination.

Possible fields:
- id
- title
- location
- starts_at
- host_name
- theme
- prep_prompt
- access_instructions
- status
- created_at
- updated_at

Do not turn this into a full scheduling system in MVP.

## project_role_recommendations

Stores AI-recommended roles for each venture.

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

Stores builder assignments to accepted Founder 12 ventures.

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

Stores AI-assisted builder match suggestions for admin review.

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

AI should never automatically assign a builder.

## admin_notes

Stores internal admin notes.

Fields:
- id
- project_id
- admin_id
- note
- created_at

Admin notes must remain admin-only unless a separate founder-facing note feature is intentionally created.

## project_updates

Stores simple progress updates.

Fields:
- id
- project_id
- author_id
- update_text
- status_snapshot
- created_at

Future additions may include:
- week_number
- blockers
- next_step
- demo_readiness
