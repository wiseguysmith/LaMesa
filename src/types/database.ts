export type UserRole = 'founder' | 'builder' | 'admin'
export type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export type FounderStatus =
  | 'submitted'
  | 'pending_consideration'
  | 'selected'
  | 'not_selected'
  | 'matched'
  | 'building'
  | 'demo_ready'
  | 'alumni'
  | 'archived'

export type BuilderStatus =
  | 'profile_submitted'
  | 'pending_review'
  | 'approved'
  | 'not_approved'
  | 'eligible_for_matching'
  | 'assigned'
  | 'active_builder'
  | 'alumni_builder'

export type Track =
  | 'AI'
  | 'Web3'
  | 'Robotics'
  | 'Climate'
  | 'Community Impact'
  | 'Student Founder'
  | 'Technical Founder'
  | 'Nontechnical Founder'

export type DemoDayOutcome =
  | 'prototype_ready'
  | 'needs_validation'
  | 'needs_team_support'
  | 'continue_after_table'
  | 'archived'

export interface Batch {
  id: string
  system_name: string
  public_name: string
  participant_identity: string
  status: string
  starts_at: string | null
  ends_at: string | null
  created_at: string
}

export interface DemoDayOutcomeRecord {
  id: string
  project_id: string
  batch_id: string | null
  outcome: DemoDayOutcome
  presentation_notes: string | null
  admin_notes: string | null
  created_at: string
}

export type ProjectStatus =
  | 'submitted'
  | 'under_review'
  | 'roles_mapped'
  | 'matching'
  | 'team_formed'
  | 'building'
  | 'prototype_ready'
  | 'presented_demo_day'
  | 'archived'
export type AssignmentStatus = 'suggested' | 'invited' | 'assigned' | 'removed'
export type MatchStatus = 'pending' | 'approved' | 'rejected'

export interface User {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  approval_status: ApprovalStatus
  created_at: string
  updated_at: string
}

export interface FounderProfile {
  id: string
  user_id: string
  location: string | null
  languages: string[] | null
  bio: string | null
  linkedin_url: string | null
  created_at: string
  updated_at: string
}

export interface BuilderProfile {
  id: string
  user_id: string
  location: string | null
  languages: string[] | null
  skills: string[] | null
  experience_level: string | null
  preferred_roles: string[] | null
  portfolio_url: string | null
  github_url: string | null
  linkedin_url: string | null
  interests: string[] | null
  availability_hours_per_week: number | null
  collaboration_preference: string | null
  project_goals: string | null
  bio: string | null
  approval_status: ApprovalStatus
  preferred_tracks: Track[] | null
  reliability_score: number | null
  builder_status: BuilderStatus
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  founder_id: string
  project_name: string
  one_sentence_idea: string
  problem: string
  target_users: string | null
  category: string
  stage: string
  skills_needed: string[] | null
  timeline: string | null
  availability_expectation: string | null
  desired_team_size: number | null
  collaboration_expectation: string | null
  location_preference: string | null
  founder_goals: string | null
  additional_notes: string | null
  status: ProjectStatus
  approval_status: ApprovalStatus
  readiness_score: number | null
  ai_summary: string | null
  ai_analysis_json: AIAnalysis | null
  batch_id: string | null
  track: Track | null
  secondary_track: Track | null
  founder_status: FounderStatus
  demo_day_outcome: DemoDayOutcome | null
  created_at: string
  updated_at: string
}

export interface AIAnalysis {
  readiness_score: number
  category_scores: {
    problem_clarity: number
    user_clarity: number
    technical_feasibility: number
    team_readiness: number
    timeline_realism: number
    prototype_potential: number
    market_impact: number
  }
  ai_summary: string
  strengths: string[]
  risks: string[]
  next_steps: string[]
  role_recommendations: RoleRecommendation[]
  suggested_team_size: number
  missing_info: string[]
}

export interface RoleRecommendation {
  role: string
  priority: 'high' | 'medium' | 'low'
  reason: string
}

export interface ProjectRoleRecommendation {
  id: string
  project_id: string
  role: string
  priority: string
  reason: string | null
  is_filled: boolean
  created_at: string
}

export interface RoadmapWeek {
  week: number
  objective: string
  tasks: string[]
  deliverables: string[]
  owner_roles: string[]
}

export interface ProjectRoadmap {
  id: string
  project_id: string
  roadmap_json: { weeks: RoadmapWeek[] }
  created_at: string
  updated_at: string
}

export interface ProjectMember {
  id: string
  project_id: string
  user_id: string
  assigned_role: string
  assignment_status: AssignmentStatus
  assigned_by: string | null
  created_at: string
  updated_at: string
  users?: User
}

export interface MatchSuggestion {
  id: string
  project_id: string
  builder_id: string
  recommended_role: string
  match_score: number | null
  match_reasons_json: { reasons: string[] } | null
  risks_json: { risks: string[] } | null
  status: MatchStatus
  created_at: string
  updated_at: string
  builder_profiles?: BuilderProfile
  users?: User
}

export interface AdminNote {
  id: string
  project_id: string
  admin_id: string
  note: string
  created_at: string
  users?: User
}

export interface ProjectUpdate {
  id: string
  project_id: string
  author_id: string
  update_text: string
  status_snapshot: ProjectStatus | null
  week_number: number | null
  blockers: string | null
  created_at: string
  users?: User
}
