-- Batch 01 Schema Extensions
-- Run this in Supabase SQL editor after the base schema is applied.

create table public.batches (
  id uuid primary key default gen_random_uuid(),
  system_name text not null,         -- 'La Mesa Batch 01'
  public_name text not null,         -- 'La Mesa Summer 2026 Table'
  participant_identity text not null, -- 'Table 01'
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

-- Insert Batch 01
insert into public.batches (system_name, public_name, participant_identity, status, starts_at, ends_at)
values ('La Mesa Batch 01', 'La Mesa Summer 2026 Table', 'Table 01', 'active', now(), now() + interval '30 days')
on conflict do nothing;

-- RLS for new tables
alter table public.batches enable row level security;
alter table public.demo_day_outcomes enable row level security;

create policy "batches_read_all" on public.batches for select using (true);
create policy "batches_admin" on public.batches for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

create policy "demo_day_admin" on public.demo_day_outcomes for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);
