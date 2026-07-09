import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getServerDictionary } from '@/lib/i18n/server'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import DashboardNav from '@/components/layout/DashboardNav'
import Link from 'next/link'
import { StatusBadge, ApprovalBadge } from '@/components/ui/Badge'
import { Project, FounderStatus, BuilderStatus } from '@/types/database'

function getFounderBanner(founderStatus: FounderStatus | null | undefined, d: Dictionary['app']['dashboard']['founderBanner']) {
  switch (founderStatus) {
    case 'submitted':
    case 'pending_consideration':
      return { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', message: d.pending }
    case 'selected':
      return { bg: 'bg-isd-mint/20 border-isd-mint/40', text: 'text-isd-dark-green', message: d.selected }
    case 'not_selected':
      return { bg: 'bg-isd-light border-isd-gray-light', text: 'text-isd-gray', message: d.notSelected }
    case 'matched':
      return { bg: 'bg-isd-teal/10 border-isd-teal/30', text: 'text-isd-navy', message: d.matched }
    case 'building':
      return { bg: 'bg-isd-navy/5 border-isd-navy/20', text: 'text-isd-navy', message: d.building }
    case 'demo_ready':
      return { bg: 'bg-isd-mint/30 border-isd-mint/50', text: 'text-isd-dark-green', message: d.demoReady }
    default:
      return null
  }
}

function getBuilderBanner(builderStatus: BuilderStatus | null | undefined, d: Dictionary['app']['dashboard']['builderBanner']) {
  switch (builderStatus) {
    case 'profile_submitted':
    case 'pending_review':
      return { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', message: d.underReview }
    case 'approved':
    case 'eligible_for_matching':
      return { bg: 'bg-isd-mint/20 border-isd-mint/40', text: 'text-isd-dark-green', message: d.approved }
    case 'not_approved':
      return { bg: 'bg-isd-light border-isd-gray-light', text: 'text-isd-gray', message: d.notApproved }
    case 'assigned':
    case 'active_builder':
      return { bg: 'bg-isd-navy/5 border-isd-navy/20', text: 'text-isd-navy', message: d.assigned }
    default:
      return null
  }
}

const TRACK_COLORS: Record<string, string> = {
  AI: 'bg-isd-navy/10 text-isd-navy',
  Web3: 'bg-isd-teal/10 text-isd-teal',
  Robotics: 'bg-cyan-100 text-cyan-700',
  Climate: 'bg-isd-mint/30 text-isd-dark-green',
  'Community Impact': 'bg-isd-lilac/20 text-purple-700',
  'Student Founder': 'bg-pink-100 text-pink-700',
  'Technical Founder': 'bg-isd-navy/10 text-isd-navy',
  'Nontechnical Founder': 'bg-amber-100 text-amber-700',
}

function TrackBadge({ track }: { track: string | null | undefined }) {
  if (!track) return null
  const color = TRACK_COLORS[track] || 'bg-isd-light text-isd-gray'
  return (
    <span className={`inline-block text-xs font-mono px-2 py-0.5 rounded-full border border-current/10 ${color}`}>
      {track}
    </span>
  )
}

function WeekIndicator({ project, batchStartDate, label }: { project: Project; batchStartDate: string | null; label: string }) {
  if (project.status !== 'building' || !batchStartDate) return null
  const start = new Date(batchStartDate)
  const now = new Date()
  const daysDiff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  const week = Math.min(Math.max(Math.floor(daysDiff / 7) + 1, 1), 4)
  return (
    <span className="text-xs bg-isd-teal/10 text-isd-teal font-mono px-2 py-0.5 rounded-full border border-isd-teal/20">
      {label.replace('{n}', String(week))}
    </span>
  )
}

const ACCEPTED_FOUNDER_STATUSES: FounderStatus[] = ['selected', 'matched', 'building', 'demo_ready', 'alumni']

function hasFounder12Access(status: FounderStatus | null) {
  return status ? ACCEPTED_FOUNDER_STATUSES.includes(status) : false
}

function Founder12AccessPanel() {
  const privileges = [
    {
      title: 'Founders Coffee',
      label: 'Accepted-founder gathering',
      description: 'ISD shares the next coffee details with the Founder 12 cohort.',
    },
    {
      title: 'ISD Member Privileges',
      label: 'Cohort access',
      description: 'Your accepted-founder status unlocks member support, community access, and ISD opportunities.',
    },
    {
      title: 'AI Sessions',
      label: 'Structured founder support',
      description: 'Use sessions for product clarity, prototype roadmaps, pitch prep, and next-step planning.',
    },
    {
      title: 'Builder Support',
      label: 'Admin-guided formation',
      description: 'ISD coordinates builder support around the skills your accepted venture needs.',
    },
  ]

  return (
    <section className="mb-8 rounded-xl border border-isd-mint/40 bg-white overflow-hidden">
      <div className="p-6 border-b border-isd-gray-light bg-isd-mint/10">
        <p className="isd-eyebrow mb-2">Founder 12 Access</p>
        <h2 className="font-slab font-normal text-isd-dark text-xl">Accepted-founder privileges are unlocked.</h2>
        <p className="text-isd-gray text-sm mt-2 max-w-2xl">
          This is your cohort home base for Founders Coffee, ISD member privileges, AI sessions, and admin-guided builder support.
        </p>
      </div>
      <div className="grid md:grid-cols-2">
        {privileges.map((item, index) => (
          <div
            key={item.title}
            className={`p-5 border-t border-isd-gray-light ${index < 2 ? 'md:border-t-0' : ''} ${index % 2 === 1 ? 'md:border-l' : ''}`}
          >
            <p className="text-xs font-mono text-isd-teal uppercase tracking-wide mb-2">{item.label}</p>
            <h3 className="font-slab font-normal text-isd-dark text-base mb-1">{item.title}</h3>
            <p className="text-sm text-isd-gray leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default async function DashboardPage() {
  const { dict } = getServerDictionary()
  const t = dict.app.dashboard
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!userData) redirect('/login')

  if (userData.role === 'admin') redirect('/admin')

  let projects: Project[] = []
  let builderProfile: { approval_status: string; builder_status?: BuilderStatus } | null = null
  let batchStartDate: string | null = null

  if (userData.role === 'founder') {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('founder_id', user.id)
      .order('created_at', { ascending: false })
    projects = data || []

    const { data: batch } = await supabase
      .from('batches')
      .select('starts_at')
      .eq('status', 'active')
      .single()
    batchStartDate = batch?.starts_at || null
  }

  if (userData.role === 'builder') {
    const { data } = await supabase
      .from('builder_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    builderProfile = data

    const { data: memberships } = await supabase
      .from('project_members')
      .select('*, projects(*)')
      .eq('user_id', user.id)
    if (memberships) {
      projects = memberships.map((m) => m.projects as Project).filter(Boolean)
    }
  }

  const founderBannerStatus: FounderStatus | null = (() => {
    if (userData.role !== 'founder' || projects.length === 0) return null
    const order: FounderStatus[] = ['submitted', 'pending_consideration', 'selected', 'not_selected', 'matched', 'building', 'demo_ready', 'alumni', 'archived']
    const statuses = projects.map((p) => (p.founder_status as FounderStatus) || 'submitted')
    return statuses.reduce((best, cur) => {
      return order.indexOf(cur) > order.indexOf(best) ? cur : best
    }, statuses[0])
  })()

  const founderBanner = userData.role === 'founder' && projects.length > 0 ? getFounderBanner(founderBannerStatus, t.founderBanner) : null
  const builderBanner = userData.role === 'builder' ? getBuilderBanner((builderProfile as { builder_status?: BuilderStatus } | null)?.builder_status, t.builderBanner) : null

  return (
    <div className="min-h-screen bg-isd-light">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-8">
          <p className="isd-eyebrow mb-1">{userData.role === 'founder' ? t.founderSubtitle : t.builderSubtitle}</p>
          <h1 className="font-slab font-normal text-isd-dark text-3xl">
            {t.welcome} {userData.full_name || t.there}
          </h1>
        </div>

        {/* Status Banners */}
        {founderBanner && (
          <div className={`mb-6 p-4 rounded-xl border ${founderBanner.bg}`}>
            <p className={`text-sm font-medium ${founderBanner.text}`}>{founderBanner.message}</p>
          </div>
        )}
        {builderBanner && (
          <div className={`mb-6 p-4 rounded-xl border ${builderBanner.bg}`}>
            <p className={`text-sm font-medium ${builderBanner.text}`}>{builderBanner.message}</p>
          </div>
        )}
        {userData.role === 'founder' && hasFounder12Access(founderBannerStatus) && (
          <Founder12AccessPanel />
        )}

        {userData.role === 'founder' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-slab font-normal text-isd-dark text-xl">{t.yourProjects}</h2>
              <Link href="/founder/projects/new" className="isd-btn-primary text-sm px-4 py-2">
                {t.newProjectBtn}
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="isd-card p-16 text-center">
                <p className="text-isd-gray text-lg mb-2">{t.noProjects}</p>
                <p className="text-isd-gray text-sm mb-8">{t.noProjectsSub}</p>
                <Link href="/founder/projects/new" className="isd-btn-primary text-sm px-6 py-3">
                  {t.applyForSeat}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="isd-card p-6 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="font-slab font-normal text-isd-dark text-base">{project.project_name}</h3>
                        <StatusBadge status={project.status} />
                        <ApprovalBadge status={project.approval_status} />
                        <TrackBadge track={project.track} />
                        <WeekIndicator project={project} batchStartDate={batchStartDate} label={t.weekOf} />
                      </div>
                      <p className="text-isd-gray text-sm truncate">{project.one_sentence_idea}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-isd-gray/70">
                        <span>{project.category}</span>
                        <span>{project.stage}</span>
                        {project.readiness_score !== null && (
                          <span className="text-isd-teal font-mono font-medium">
                            {t.readiness}: {project.readiness_score}/100
                          </span>
                        )}
                      </div>
                    </div>
                    <Link href={`/founder/projects/${project.id}`} className="text-sm font-medium text-isd-teal hover:text-isd-navy ml-6 flex-shrink-0 transition-colors">
                      {t.view} →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {userData.role === 'builder' && (
          <>
            {/* Profile card */}
            <div className="isd-card p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-slab font-normal text-isd-dark text-lg mb-2">{t.builderNetwork}</h2>
                  {builderProfile ? (
                    <div className="flex items-center gap-2">
                      <ApprovalBadge status={builderProfile.approval_status as 'pending' | 'approved' | 'rejected'} />
                      <span className="text-sm text-isd-gray">
                        {builderProfile.approval_status === 'pending'
                          ? t.profilePending
                          : builderProfile.approval_status === 'approved'
                          ? t.profileApproved
                          : t.profileRejected}
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm text-isd-gray">{t.noProfile}</p>
                  )}
                </div>
                <Link href="/builder/profile" className="text-sm font-medium text-isd-teal hover:text-isd-navy transition-colors">
                  {builderProfile ? `${t.editProfile} →` : `${t.createProfile} →`}
                </Link>
              </div>
            </div>

            <h2 className="font-slab font-normal text-isd-dark text-xl mb-4">{t.assignedProjects}</h2>
            {projects.length === 0 ? (
              <div className="isd-card p-12 text-center">
                <p className="text-isd-gray">{t.noAssignments}</p>
                <p className="text-isd-gray text-sm mt-1">{t.noAssignmentsSub}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="isd-card p-6">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-slab font-normal text-isd-dark text-base">{project.project_name}</h3>
                      <StatusBadge status={project.status} />
                      <TrackBadge track={project.track} />
                    </div>
                    <p className="text-isd-gray text-sm">{project.one_sentence_idea}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
