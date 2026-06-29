import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import Link from 'next/link'
import { Batch } from '@/types/database'

function getDaysRemaining(endsAt: string | null): number | null {
  if (!endsAt) return null
  const end = new Date(endsAt)
  const now = new Date()
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

function getBatchPhase(batch: Batch | null): string {
  if (!batch) return 'Unknown'
  const daysRemaining = getDaysRemaining(batch.ends_at)
  if (daysRemaining === null) return 'Unknown'
  if (daysRemaining > 25) return 'Intake'
  if (daysRemaining > 20) return 'Review'
  if (daysRemaining > 14) return 'Formation'
  if (daysRemaining > 3) return 'Building'
  return 'Demo Day'
}

export default async function AdminPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'admin') redirect('/dashboard')

  const { data: batch } = await supabase
    .from('batches')
    .select('*')
    .eq('status', 'active')
    .single()

  const [
    { count: totalProjects },
    { count: totalBuilders },
    { count: pendingProjects },
    { count: pendingBuilders },
    { count: teamFormed },
    { count: prototypeReady },
    { count: selectedFounders },
    { count: approvedBuilders },
    { count: activeTeams },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('builder_profiles').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('approval_status', 'pending'),
    supabase.from('builder_profiles').select('*', { count: 'exact', head: true }).eq('approval_status', 'pending'),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'team_formed'),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'prototype_ready'),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('founder_status', 'selected'),
    supabase.from('builder_profiles').select('*', { count: 'exact', head: true }).eq('approval_status', 'approved'),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'building'),
  ])

  const stats = [
    { label: 'Total Projects', value: totalProjects ?? 0, href: '/admin/projects', accent: 'text-isd-navy' },
    { label: 'Total Builders', value: totalBuilders ?? 0, href: '/admin/builders', accent: 'text-isd-teal' },
    { label: 'Pending Approvals', value: (pendingProjects ?? 0) + (pendingBuilders ?? 0), href: '/admin/projects', accent: 'text-amber-600' },
    { label: 'Selected Founders', value: selectedFounders ?? 0, href: '/admin/projects', accent: 'text-isd-dark-green' },
    { label: 'Approved Builders', value: approvedBuilders ?? 0, href: '/admin/builders', accent: 'text-isd-teal' },
    { label: 'Active Teams', value: activeTeams ?? 0, href: '/admin/matches', accent: 'text-isd-navy' },
    { label: 'Teams Formed', value: teamFormed ?? 0, href: '/admin/matches', accent: 'text-isd-dark-green' },
    { label: 'Prototype Ready', value: prototypeReady ?? 0, href: '/admin/projects', accent: 'text-isd-mint-mid' },
  ]

  const { data: recentProjects } = await supabase
    .from('projects')
    .select('*, users(full_name)')
    .order('created_at', { ascending: false })
    .limit(5)

  const daysRemaining = getDaysRemaining(batch?.ends_at || null)
  const phase = getBatchPhase(batch as Batch | null)

  return (
    <div className="min-h-screen bg-isd-light">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Active Batch Banner */}
        {batch && (
          <div className="mb-8 isd-hero-bg p-6 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="isd-eyebrow text-isd-mint/80 mb-1">Active Batch</p>
              <h2 className="font-slab font-normal text-white text-xl">{batch.public_name} — {batch.participant_identity}</h2>
            </div>
            <div className="flex items-center gap-8 text-sm">
              {[
                { label: 'Phase', value: phase },
                { label: 'Days Left', value: daysRemaining !== null ? (daysRemaining > 0 ? String(daysRemaining) : 'Complete') : '—' },
                { label: 'Status', value: batch.status },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-isd-mint/70 text-xs font-mono uppercase tracking-wide">{label}</p>
                  <p className="font-slab font-normal text-white text-base capitalize">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <p className="isd-eyebrow mb-1">Platform Management</p>
          <h1 className="font-slab font-normal text-isd-dark text-3xl">Admin Overview</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href} className="isd-card p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 block">
              <p className="text-xs font-mono text-isd-gray uppercase tracking-wide mb-2">{stat.label}</p>
              <p className={`font-slab font-normal text-3xl ${stat.accent}`}>{stat.value}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/admin/projects?filter=pending" className="isd-card p-5 border-l-4 border-amber-400 hover:shadow-md transition-shadow block">
            <p className="font-slab font-normal text-isd-dark text-base mb-1">Review Pending Projects</p>
            <p className="text-isd-gray text-sm">{pendingProjects ?? 0} waiting for approval</p>
          </Link>
          <Link href="/admin/builders?filter=pending" className="isd-card p-5 border-l-4 border-isd-teal hover:shadow-md transition-shadow block">
            <p className="font-slab font-normal text-isd-dark text-base mb-1">Review Builder Profiles</p>
            <p className="text-isd-gray text-sm">{pendingBuilders ?? 0} profiles to review</p>
          </Link>
          <Link href="/admin/matches" className="isd-card p-5 border-l-4 border-isd-navy hover:shadow-md transition-shadow block">
            <p className="font-slab font-normal text-isd-dark text-base mb-1">Team Formation — Table 01</p>
            <p className="text-isd-gray text-sm">Run AI match suggestions</p>
          </Link>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl border border-isd-gray-light overflow-hidden">
          <div className="px-6 py-4 border-b border-isd-gray-light flex items-center justify-between">
            <h2 className="font-slab font-normal text-isd-dark text-lg">Recent Projects</h2>
            <Link href="/admin/projects" className="text-sm text-isd-teal hover:text-isd-navy font-medium transition-colors">View all →</Link>
          </div>
          <div className="divide-y divide-isd-gray-light/50">
            {recentProjects?.map((project) => (
              <div key={project.id} className="px-6 py-4 flex items-center justify-between hover:bg-isd-light/50 transition-colors">
                <div>
                  <span className="font-medium text-isd-dark text-sm">{project.project_name}</span>
                  <span className="text-isd-gray text-xs ml-2">
                    by {(project.users as { full_name: string } | null)?.full_name || 'Unknown'}
                  </span>
                  {project.track && (
                    <span className="ml-2 text-xs bg-isd-navy/10 text-isd-navy px-2 py-0.5 rounded-full font-mono">
                      {project.track}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-isd-gray">{project.category}</span>
                  <Link href={`/admin/projects/${project.id}`} className="text-xs text-isd-teal hover:text-isd-navy font-medium transition-colors">
                    Review →
                  </Link>
                </div>
              </div>
            ))}
            {!recentProjects?.length && (
              <div className="px-6 py-8 text-center text-isd-gray text-sm">No projects yet.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
