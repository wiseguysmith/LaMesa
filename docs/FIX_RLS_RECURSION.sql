-- FIX: Infinite recursion in users RLS policies
--
-- The original "users_admin_read" policy was defined ON public.users but its
-- USING clause queried public.users to check the admin role. Postgres evaluates
-- that subquery under RLS too, which re-triggers the same policy => infinite
-- recursion. The error breaks EVERY select on public.users, so login, dashboard,
-- and admin pages all fail and bounce back to /login.
--
-- Fix: use a SECURITY DEFINER function to check the admin role. Because it runs
-- as the function owner, it bypasses RLS on public.users and cannot recurse.
-- Then rewrite all admin policies to use it.

-- 1. Non-recursive admin check.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.users where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon, service_role;

-- 2. Replace the recursive policy on public.users.
drop policy if exists "users_admin_read" on public.users;
create policy "users_admin_read" on public.users
  for select using (public.is_admin());

-- 3. Replace every other admin policy to use the function (avoids re-triggering
--    recursion through public.users and is faster).
drop policy if exists "projects_admin" on public.projects;
create policy "projects_admin" on public.projects for all using (public.is_admin());

drop policy if exists "builder_profiles_admin" on public.builder_profiles;
create policy "builder_profiles_admin" on public.builder_profiles for all using (public.is_admin());

drop policy if exists "role_recs_admin" on public.project_role_recommendations;
create policy "role_recs_admin" on public.project_role_recommendations for all using (public.is_admin());

drop policy if exists "roadmaps_admin" on public.project_roadmaps;
create policy "roadmaps_admin" on public.project_roadmaps for all using (public.is_admin());

drop policy if exists "members_admin" on public.project_members;
create policy "members_admin" on public.project_members for all using (public.is_admin());

drop policy if exists "admin_notes_admin" on public.admin_notes;
create policy "admin_notes_admin" on public.admin_notes for all using (public.is_admin());

drop policy if exists "match_suggestions_admin" on public.match_suggestions;
create policy "match_suggestions_admin" on public.match_suggestions for all using (public.is_admin());

drop policy if exists "updates_admin" on public.project_updates;
create policy "updates_admin" on public.project_updates for all using (public.is_admin());

drop policy if exists "batches_admin" on public.batches;
create policy "batches_admin" on public.batches for all using (public.is_admin());

drop policy if exists "demo_day_admin" on public.demo_day_outcomes;
create policy "demo_day_admin" on public.demo_day_outcomes for all using (public.is_admin());

-- 4. Fix the projects <-> project_members recursion cycle.
--    projects.projects_member_read queried project_members, and
--    project_members.members_founder queried projects, so each policy kept
--    re-triggering the other. SECURITY DEFINER helpers bypass RLS and break it.

create or replace function public.is_project_founder(p_project_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.projects where id = p_project_id and founder_id = auth.uid()
  );
$$;

create or replace function public.is_project_member(p_project_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.project_members where project_id = p_project_id and user_id = auth.uid()
  );
$$;

revoke all on function public.is_project_founder(uuid) from public;
revoke all on function public.is_project_member(uuid) from public;
grant execute on function public.is_project_founder(uuid) to authenticated, anon, service_role;
grant execute on function public.is_project_member(uuid) to authenticated, anon, service_role;

-- Rewrite every cross-table policy to use the helpers.
drop policy if exists "projects_member_read" on public.projects;
create policy "projects_member_read" on public.projects
  for select using (public.is_project_member(id));

drop policy if exists "members_founder" on public.project_members;
create policy "members_founder" on public.project_members
  for select using (public.is_project_founder(project_id));

drop policy if exists "role_recs_founder" on public.project_role_recommendations;
create policy "role_recs_founder" on public.project_role_recommendations
  for select using (public.is_project_founder(project_id));

drop policy if exists "roadmaps_founder" on public.project_roadmaps;
create policy "roadmaps_founder" on public.project_roadmaps
  for select using (public.is_project_founder(project_id));

drop policy if exists "roadmaps_member" on public.project_roadmaps;
create policy "roadmaps_member" on public.project_roadmaps
  for select using (public.is_project_member(project_id));

drop policy if exists "updates_founder" on public.project_updates;
create policy "updates_founder" on public.project_updates
  for all using (public.is_project_founder(project_id));

drop policy if exists "updates_member" on public.project_updates;
create policy "updates_member" on public.project_updates
  for select using (public.is_project_member(project_id));

drop policy if exists "admin_notes_founder_read" on public.admin_notes;
create policy "admin_notes_founder_read" on public.admin_notes
  for select using (public.is_project_founder(project_id));
