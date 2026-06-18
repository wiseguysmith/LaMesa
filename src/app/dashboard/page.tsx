import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getServerDictionary } from '@/lib/i18n/server'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import DashboardNav from '@/components/layout/DashboardNav'
import Link from 'next/link'
import Card, { CardBody } from '@/components/ui/Card'
import { StatusBadge, ApprovalBadge } from '@/components/ui/Badge'
import { Project, FounderStatus, BuilderStatus } from '@/types/database'

function getFounderBanner(founderStatus: FounderStatus | null | undefined, d: Dictionary['app']['dashboard']['founderBanner']) {
  switch (founderStatus) {
    case 'submitted':
    case 'pending_consideration':
      return { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', message: d.pending }
    case 'selected':
      return { bg: 'bg-green-50 border-green-200', text: 'text-green-800', message: d.selected }
    case 'not_selected':
      return { bg: 'bg-slate-50 border-slate-200', text: 'text-slate-700', message: d.notSelected }
    case 'matched':
      return { bg: 'bg-teal-50 border-teal-200', text: 'text-teal-800', message: d.matched }
    case 'building':
      return { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', message: d.building }
    case 'demo_ready':
      return { bg: 'bg-yellow-50 border-yellow-300', text: 'text-yellow-800', message: d.demoReady }
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
      return { bg: 'bg-green-50 border-green-200', text: 'text-green-800', message: d.approved }
    case 'not_approved':
      return { bg: 'bg-slate-50 border-slate-200', text: 'text-slate-700', message: d.notApproved }
    case 'assigned':
    case 'active_builder':
      return { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', message: d.assigned }
    default:
      return null
  }
}

const TRACK_COLORS: Record<string, string> = {
  AI: 'bg-violet-100 text-violet-700',
  Web3: 'bg-blue-100 text-blue-700',
  Robotics: 'bg-cyan-100 text-cyan-700',
  Climate: 'bg-green-100 text-green-700',
  'Community Impact': 'bg-orange-100 text-orange-700',
  'Student Founder': 'bg-pink-100 text-pink-700',
  'Technical Founder': 'bg-indigo-100 text-indigo-700',
  'Nontechnical Founder': 'bg-amber-100 text-amber-700',
}

function TrackBadge({ track }: { track: string | null | undefined }) {
  if (!track) return null
  const color = TRACK_COLORS[track] || 'bg-slate-100 text-slate-600'
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
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
    <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
      {label.replace('{n}', String(week))}
    </span>
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

    // Fetch active batch start date
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

    // Get assigned projects
    const { data: memberships } = await supabase
      .from('project_members')
      .select('*, projects(*)')
      .eq('user_id', user.id)
    if (memberships) {
      projects = memberships.map((m) => m.projects as Project).filter(Boolean)
    }
  }

  // Determine banner for founder — use the most advanced founder_status across projects
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
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            {t.welcome} {userData.full_name || t.there}
          </h1>
          <p className="text-slate-500 mt-1">
            {userData.role === 'founder' ? t.founderSubtitle : t.builderSubtitle}
          </p>
        </div>

        {/* Status Banner */}
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

        {userData.role === 'founder' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">{t.yourProjects}</h2>
              <Link
                href="/founder/projects/new"
                className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {t.newProjectBtn}
              </Link>
            </div>

            {projects.length === 0 ? (
              <Card>
                <CardBody className="text-center py-16">
                  <p className="text-slate-400 text-lg mb-2">{t.noProjects}</p>
                  <p className="text-slate-400 text-sm mb-6">{t.noProjectsSub}</p>
                  <Link
                    href="/founder/projects/new"
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    {t.applyForSeat}
                  </Link>
                </CardBody>
              </Card>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardBody className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="font-semibold text-slate-800">{project.project_name}</h3>
                          <StatusBadge status={project.status} />
                          <ApprovalBadge status={project.approval_status} />
                          <TrackBadge track={project.track} />
                          <WeekIndicator project={project} batchStartDate={batchStartDate} label={t.weekOf} />
                        </div>
                        <p className="text-slate-500 text-sm">{project.one_sentence_idea}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                          <span>{project.category}</span>
                          <span>{project.stage}</span>
                          {project.readiness_score !== null && (
                            <span className="text-amber-600 font-medium">
                              {t.readiness}: {project.readiness_score}/100
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        href={`/founder/projects/${project.id}`}
                        className="text-sm font-medium text-amber-600 hover:text-amber-700 ml-4"
                      >
                        {t.view} →
                      </Link>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {userData.role === 'builder' && (
          <>
            {/* Profile Status */}
            <Card className="mb-8">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-800 mb-1">{t.builderNetwork}</h2>
                    {builderProfile ? (
                      <div className="flex items-center gap-2">
                        <ApprovalBadge status={builderProfile.approval_status as 'pending' | 'approved' | 'rejected'} />
                        <span className="text-sm text-slate-500">
                          {builderProfile.approval_status === 'pending'
                            ? t.profilePending
                            : builderProfile.approval_status === 'approved'
                            ? t.profileApproved
                            : t.profileRejected}
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">{t.noProfile}</p>
                    )}
                  </div>
                  <Link
                    href="/builder/profile"
                    className="text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    {builderProfile ? `${t.editProfile} →` : `${t.createProfile} →`}
                  </Link>
                </div>
              </CardBody>
            </Card>

            <h2 className="text-lg font-semibold text-slate-800 mb-4">{t.assignedProjects}</h2>
            {projects.length === 0 ? (
              <Card>
                <CardBody className="text-center py-12">
                  <p className="text-slate-400">{t.noAssignments}</p>
                  <p className="text-slate-400 text-sm mt-1">
                    {t.noAssignmentsSub}
                  </p>
                </CardBody>
              </Card>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardBody>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="font-semibold text-slate-800">{project.project_name}</h3>
                        <StatusBadge status={project.status} />
                        <TrackBadge track={project.track} />
                      </div>
                      <p className="text-slate-500 text-sm">{project.one_sentence_idea}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
