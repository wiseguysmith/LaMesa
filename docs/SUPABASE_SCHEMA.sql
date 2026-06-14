-- La Mesa MVP Supabase Schema
-- Review before production use.
-- Enable pgcrypto for gen_random_uuid if needed.

create extension if not exists "pgcrypto";

create type user_role as enum ('founder', 'builder', 'admin');
create type approval_status as enum ('pending', 'approved', 'rejected');
create type project_status as enum (
  'submitted',
  'under_review',
  'roles_mapped',
  'matching',
  'team_formed',
  'building',
  'prototype_ready',
  'presented_demo_day',
  'archived'
);
create type assignment_status as enum ('suggested', 'invited', 'assigned', 'removed');
create type match_status as enum ('pending', 'approved', 'rejected');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role user_role not null,
  approval_status approval_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.founder_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  location text,
  languages text[],
  bio text,
  linkedin_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table public.builder_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  location text,
  languages text[],
  skills text[],
  experience_level text,
  preferred_roles text[],
  portfolio_url text,
  github_url text,
  linkedin_url text,
  interests text[],
  availability_hours_per_week integer,
  collaboration_preference text,
  project_goals text,
  bio text,
  approval_status approval_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  founder_id uuid not null references public.users(id) on delete cascade,
  project_name text not null,
  one_sentence_idea text not null,
  problem text not null,
  target_users text,
  category text not null,
  stage text not null,
  skills_needed text[],
  timeline text,
  availability_expectation text,
  desired_team_size integer,
  collaboration_expectation text,
  location_preference text,
  founder_goals text,
  additional_notes text,
  status project_status not null default 'submitted',
  approval_status approval_status not null default 'pending',
  readiness_score integer check (readiness_score >= 0 and readiness_score <= 100),
  ai_summary text,
  ai_analysis_json jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_role_recommendations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  role text not null,
  priority text not null,
  reason text,
  is_filled boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.project_roadmaps (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  roadmap_json jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id)
);

create table public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  assigned_role text not null,
  assignment_status assignment_status not null default 'assigned',
  assigned_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id, user_id)
);

create table public.match_suggestions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  builder_id uuid not null references public.users(id) on delete cascade,
  recommended_role text not null,
  match_score integer check (match_score >= 0 and match_score <= 100),
  match_reasons_json jsonb,
  risks_json jsonb,
  status match_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  admin_id uuid not null references public.users(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create table public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  author_id uuid not null references public.users(id) on delete cascade,
  update_text text not null,
  status_snapshot project_status,
  created_at timestamptz not null default now()
);

-- Basic updated_at trigger

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_users_updated_at
before update on public.users
for each row execute function public.set_updated_at();

create trigger set_founder_profiles_updated_at
before update on public.founder_profiles
for each row execute function public.set_updated_at();

create trigger set_builder_profiles_updated_at
before update on public.builder_profiles
for each row execute function public.set_updated_at();

create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

create trigger set_project_roadmaps_updated_at
before update on public.project_roadmaps
for each row execute function public.set_updated_at();

create trigger set_project_members_updated_at
before update on public.project_members
for each row execute function public.set_updated_at();

create trigger set_match_suggestions_updated_at
before update on public.match_suggestions
for each row execute function public.set_updated_at();

-- Row Level Security

alter table public.users enable row level security;
alter table public.founder_profiles enable row level security;
alter table public.builder_profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_role_recommendations enable row level security;
alter table public.project_roadmaps enable row level security;
alter table public.project_members enable row level security;
alter table public.match_suggestions enable row level security;
alter table public.admin_notes enable row level security;
alter table public.project_updates enable row level security;

-- Users: own row + admin read all
create policy "users_own" on public.users for all using (auth.uid() = id);
create policy "users_admin_read" on public.users for select using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Projects: founder owns, admin can all, assigned members can read
create policy "projects_founder" on public.projects for all using (founder_id = auth.uid());
create policy "projects_admin" on public.projects for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);
create policy "projects_member_read" on public.projects for select using (
  exists (select 1 from public.project_members where project_id = projects.id and user_id = auth.uid())
);

-- Builder profiles: own + admin
create policy "builder_profiles_own" on public.builder_profiles for all using (user_id = auth.uid());
create policy "builder_profiles_admin" on public.builder_profiles for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Project role recommendations: founder + admin + members read
create policy "role_recs_founder" on public.project_role_recommendations for select using (
  exists (select 1 from public.projects where id = project_id and founder_id = auth.uid())
);
create policy "role_recs_admin" on public.project_role_recommendations for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Roadmaps
create policy "roadmaps_founder" on public.project_roadmaps for select using (
  exists (select 1 from public.projects where id = project_id and founder_id = auth.uid())
);
create policy "roadmaps_admin" on public.project_roadmaps for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);
create policy "roadmaps_member" on public.project_roadmaps for select using (
  exists (select 1 from public.project_members where project_id = project_roadmaps.project_id and user_id = auth.uid())
);

-- Project members
create policy "members_founder" on public.project_members for select using (
  exists (select 1 from public.projects where id = project_id and founder_id = auth.uid())
);
create policy "members_admin" on public.project_members for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);
create policy "members_self" on public.project_members for select using (user_id = auth.uid());

-- Admin notes: admin only + founder read
create policy "admin_notes_admin" on public.admin_notes for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);
create policy "admin_notes_founder_read" on public.admin_notes for select using (
  exists (select 1 from public.projects where id = project_id and founder_id = auth.uid())
);

-- Match suggestions: admin only
create policy "match_suggestions_admin" on public.match_suggestions for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Project updates
create policy "updates_admin" on public.project_updates for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);
create policy "updates_founder" on public.project_updates for all using (
  exists (select 1 from public.projects where id = project_id and founder_id = auth.uid())
);
create policy "updates_member" on public.project_updates for select using (
  exists (select 1 from public.project_members where project_id = project_updates.project_id and user_id = auth.uid())
);
