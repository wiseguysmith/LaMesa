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

-- SECURITY DEFINER helpers. These bypass RLS, so policies can check
-- admin/ownership/membership WITHOUT querying the same (or a mutually
-- referencing) table under RLS, which would cause infinite recursion.
create or replace function public.is_admin()
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.users where id = auth.uid() and role = 'admin');
$$;

create or replace function public.is_project_founder(p_project_id uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.projects where id = p_project_id and founder_id = auth.uid());
$$;

create or replace function public.is_project_member(p_project_id uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.project_members where project_id = p_project_id and user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
revoke all on function public.is_project_founder(uuid) from public;
revoke all on function public.is_project_member(uuid) from public;
grant execute on function public.is_admin() to authenticated, anon, service_role;
grant execute on function public.is_project_founder(uuid) to authenticated, anon, service_role;
grant execute on function public.is_project_member(uuid) to authenticated, anon, service_role;

-- Users: own row + admin read all
create policy "users_own" on public.users for all using (auth.uid() = id);
create policy "users_admin_read" on public.users for select using (public.is_admin());

-- Projects: founder owns, admin can all, assigned members can read
create policy "projects_founder" on public.projects for all using (founder_id = auth.uid());
create policy "projects_admin" on public.projects for all using (public.is_admin());
create policy "projects_member_read" on public.projects for select using (public.is_project_member(id));

-- Builder profiles: own + admin
create policy "builder_profiles_own" on public.builder_profiles for all using (user_id = auth.uid());
create policy "builder_profiles_admin" on public.builder_profiles for all using (public.is_admin());

-- Project role recommendations: founder + admin + members read
create policy "role_recs_founder" on public.project_role_recommendations for select using (public.is_project_founder(project_id));
create policy "role_recs_admin" on public.project_role_recommendations for all using (public.is_admin());

-- Roadmaps
create policy "roadmaps_founder" on public.project_roadmaps for select using (public.is_project_founder(project_id));
create policy "roadmaps_admin" on public.project_roadmaps for all using (public.is_admin());
create policy "roadmaps_member" on public.project_roadmaps for select using (public.is_project_member(project_id));

-- Project members
create policy "members_founder" on public.project_members for select using (public.is_project_founder(project_id));
create policy "members_admin" on public.project_members for all using (public.is_admin());
create policy "members_self" on public.project_members for select using (user_id = auth.uid());

-- Admin notes: admin only + founder read
create policy "admin_notes_admin" on public.admin_notes for all using (public.is_admin());
create policy "admin_notes_founder_read" on public.admin_notes for select using (public.is_project_founder(project_id));

-- Match suggestions: admin only
create policy "match_suggestions_admin" on public.match_suggestions for all using (public.is_admin());

-- Project updates
create policy "updates_admin" on public.project_updates for all using (public.is_admin());
create policy "updates_founder" on public.project_updates for all using (public.is_project_founder(project_id));
create policy "updates_member" on public.project_updates for select using (public.is_project_member(project_id));

-- Founder 12 Schema Extensions

create table public.batches (
  id uuid primary key default gen_random_uuid(),
  system_name text not null,         -- 'La Mesa Founder 12'
  public_name text not null,         -- 'Founder 12'
  participant_identity text not null, -- 'Founder 12 Member'
  status text not null default 'active', -- active, closed, archived
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

-- Add batch_id and track to projects
alter table public.projects
  add column if not exists batch_id uuid references public.batches(id),
  add column if not exists track text,
  add column if not exists secondary_track text,
  add column if not exists founder_status text not null default 'submitted',
  add column if not exists demo_day_outcome text;

-- Add track and batch to builder profiles
alter table public.builder_profiles
  add column if not exists preferred_tracks text[],
  add column if not exists reliability_score integer default 0,
  add column if not exists builder_status text not null default 'profile_submitted';

-- Weekly updates already exist as project_updates table
-- Add week number to project_updates
alter table public.project_updates
  add column if not exists week_number integer,
  add column if not exists blockers text;

-- Demo Day outcomes table
create table public.demo_day_outcomes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  batch_id uuid references public.batches(id),
  outcome text not null, -- 'prototype_ready', 'needs_validation', 'needs_team_support', 'continue_after_table', 'archived'
  presentation_notes text,
  admin_notes text,
  created_at timestamptz not null default now()
);

-- Insert Founder 12
insert into public.batches (system_name, public_name, participant_identity, status, starts_at, ends_at)
values ('La Mesa Founder 12', 'Founder 12', 'Founder 12 Member', 'active', now(), now() + interval '30 days')
on conflict do nothing;

-- RLS for new tables
alter table public.batches enable row level security;
alter table public.demo_day_outcomes enable row level security;

create policy "batches_read_all" on public.batches for select using (true);
create policy "batches_admin" on public.batches for all using (public.is_admin());

create policy "demo_day_admin" on public.demo_day_outcomes for all using (public.is_admin());
