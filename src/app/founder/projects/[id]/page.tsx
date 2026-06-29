import { notFound, redirect } from 'next/navigation'
import DashboardNav from '@/components/layout/DashboardNav'
import { ApprovalBadge, StatusBadge } from '@/components/ui/Badge'
import ReadinessScore from '@/components/projects/ReadinessScore'
import RoadmapDisplay from '@/components/projects/RoadmapDisplay'
import RoleRecommendations from '@/components/projects/RoleRecommendations'
import WeeklyUpdateForm from '@/components/projects/WeeklyUpdateForm'
import { getServerDictionary } from '@/lib/i18n/server'
import { createClient } from '@/lib/supabase/server'
import type { AIAnalysis, Project, ProjectUpdate } from '@/types/database'

type RelatedUser = { full_name: string | null; email?: string | null }
type Relation<T> = T | T[] | null

type ProjectMemberWithUser = {
  id: string
  assigned_role: string
  users: Relation<RelatedUser>
}

type AdminNoteWithUser = {
  id: string
  note: string
  created_at: string
  users: Relation<RelatedUser>
}

type UpdateWithUser = ProjectUpdate & {
  users: Relation<RelatedUser>
}

function getRelatedUser(users: Relation<RelatedUser>) {
  return Array.isArray(users) ? users[0] || null : users
}

function getCurrentWeek(project: Project) {
  if (project.status !== 'building') return 1

  const createdAt = new Date(project.updated_at || project.created_at)
  const daysSinceStart = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
  return Math.min(Math.max(Math.floor(daysSinceStart / 7) + 1, 1), 4)
}

function DetailItem({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value === null || value === undefined || value === '') return null

  return (
    <div>
      <span className="text-xs font-mono text-isd-gray">{label}</span>
      <p className="text-isd-dark mt-0.5">{value}</p>
    </div>
  )
}

function NotesFromISD({ notes }: { notes: AdminNoteWithUser[] }) {
  if (notes.length === 0) {
    return <p className="text-isd-gray text-sm">No ISD notes yet.</p>
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div key={note.id} className="p-3 bg-isd-mint/10 border border-isd-mint/30 rounded-lg">
          <p className="text-sm text-isd-dark">{note.note}</p>
          <p className="text-xs text-isd-gray mt-1">
            {getRelatedUser(note.users)?.full_name || 'ISD'} - {new Date(note.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}

function UpdatesList({ updates }: { updates: UpdateWithUser[] }) {
  if (updates.length === 0) {
    return <p className="text-isd-gray text-sm">No progress updates yet.</p>
  }

  return (
    <div className="space-y-3">
      {updates.map((update) => (
        <div key={update.id} className="p-4 border border-isd-gray-light rounded-xl bg-white">
          <div className="flex items-center justify-between gap-3 mb-2">
            <p className="text-xs font-mono text-isd-gray">
              Week {update.week_number || '-'} - {getRelatedUser(update.users)?.full_name || 'Team member'}
            </p>
            <p className="text-xs text-isd-gray">{new Date(update.created_at).toLocaleDateString()}</p>
          </div>
          <p className="text-sm text-isd-dark leading-relaxed">{update.update_text}</p>
          {update.blockers && (
            <p className="text-sm text-amber-700 mt-2">
              <span className="font-medium">Blocker:</span> {update.blockers}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default async function FounderProjectDetailPage({ params }: { params: { id: string } }) {
  const { dict } = getServerDictionary()
  const t = dict.projectDetail
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single()
  if (!userData) redirect('/login')
  if (userData.role === 'admin') redirect(`/admin/projects/${params.id}`)

  const { data: project } = await supabase.from('projects').select('*').eq('id', params.id).single()
  if (!project) notFound()

  if (userData.role === 'founder' && project.founder_id !== user.id) notFound()

  if (userData.role === 'builder') {
    const { data: assignment } = await supabase
      .from('project_members')
      .select('id')
      .eq('project_id', project.id)
      .eq('user_id', user.id)
      .maybeSingle()

    if (!assignment) notFound()
  }

  const [{ data: roles }, { data: roadmapData }, { data: members }, { data: adminNotes }, { data: updates }] = await Promise.all([
    supabase.from('project_role_recommendations').select('*').eq('project_id', project.id).order('priority'),
    supabase.from('project_roadmaps').select('*').eq('project_id', project.id).maybeSingle(),
    supabase.from('project_members').select('id, assigned_role, users(full_name, email)').eq('project_id', project.id),
    supabase.from('admin_notes').select('id, note, created_at, users(full_name)').eq('project_id', project.id).order('created_at', { ascending: false }),
    supabase
      .from('project_updates')
      .select('*, users(full_name)')
      .eq('project_id', project.id)
      .order('created_at', { ascending: false })
      .limit(8),
  ])

  const analysis = project.ai_analysis_json as AIAnalysis | null
  const roadmap = roadmapData?.roadmap_json?.weeks || []
  const currentWeek = getCurrentWeek(project as Project)
  const teamMembers = (members || []) as ProjectMemberWithUser[]
  const notes = (adminNotes || []) as AdminNoteWithUser[]
  const projectUpdates = (updates || []) as UpdateWithUser[]

  return (
    <div className="min-h-screen bg-isd-light">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <StatusBadge status={project.status} />
            <ApprovalBadge status={project.approval_status} />
            <span className="text-xs text-isd-gray">
              {project.category} - {project.stage}
            </span>
            {project.track && (
              <span className="text-xs bg-isd-navy/10 text-isd-navy font-mono px-2 py-0.5 rounded-full border border-isd-navy/20">
                {project.track}
              </span>
            )}
          </div>
          <h1 className="font-slab font-normal text-isd-dark text-3xl">{project.project_name}</h1>
          <p className="text-isd-gray mt-1">{project.one_sentence_idea}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {project.ai_summary && (
              <div className="isd-card p-6">
                <h2 className="font-slab font-normal text-isd-dark text-lg mb-3">{t.aiSummary}</h2>
                <p className="text-isd-gray leading-relaxed">{project.ai_summary}</p>
                {analysis && (
                  <div className="grid md:grid-cols-3 gap-4 pt-4 mt-4 border-t border-isd-gray-light">
                    {analysis.strengths?.length > 0 && (
                      <div>
                        <p className="text-xs font-mono text-isd-dark-green uppercase tracking-wide mb-2">{t.strengths}</p>
                        <ul className="space-y-1">
                          {analysis.strengths.map((strength) => (
                            <li key={strength} className="text-xs text-isd-gray">
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {analysis.risks?.length > 0 && (
                      <div>
                        <p className="text-xs font-mono text-red-600 uppercase tracking-wide mb-2">{t.risks}</p>
                        <ul className="space-y-1">
                          {analysis.risks.map((risk) => (
                            <li key={risk} className="text-xs text-isd-gray">
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {analysis.next_steps?.length > 0 && (
                      <div>
                        <p className="text-xs font-mono text-isd-navy uppercase tracking-wide mb-2">{t.nextSteps}</p>
                        <ul className="space-y-1">
                          {analysis.next_steps.map((step) => (
                            <li key={step} className="text-xs text-isd-gray">
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="isd-card p-6">
              <h2 className="font-slab font-normal text-isd-dark text-lg mb-4">{t.teamMembers}</h2>
              {teamMembers.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="p-3 bg-isd-light rounded-lg border border-isd-gray-light">
                      <p className="text-sm font-medium text-isd-dark">{getRelatedUser(member.users)?.full_name || t.unknown}</p>
                      <p className="text-xs text-isd-gray">{member.assigned_role}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-isd-gray text-sm">{t.noMembers}</p>
              )}
            </div>

            <div className="isd-card p-6">
              <h2 className="font-slab font-normal text-isd-dark text-lg mb-4">{t.roadmapTitle}</h2>
              <RoadmapDisplay weeks={roadmap} />
            </div>

            {project.status === 'building' && userData.role === 'founder' && (
              <WeeklyUpdateForm projectId={project.id} currentWeek={currentWeek} />
            )}

            <div className="isd-card p-6">
              <h2 className="font-slab font-normal text-isd-dark text-lg mb-4">{t.recentUpdates}</h2>
              <UpdatesList updates={projectUpdates} />
            </div>
          </div>

          <div className="space-y-6">
            {project.readiness_score !== null && (
              <div className="isd-card p-6">
                <h2 className="font-slab font-normal text-isd-dark text-base mb-4">{t.readinessScore}</h2>
                <ReadinessScore score={project.readiness_score} categoryScores={analysis?.category_scores} />
              </div>
            )}

            <div className="isd-card p-6">
              <h2 className="font-slab font-normal text-isd-dark text-base mb-4">{t.recommendedRoles}</h2>
              <RoleRecommendations recommendations={roles || []} />
            </div>

            <div className="isd-card p-6">
              <h2 className="font-slab font-normal text-isd-dark text-base mb-4">{t.projectInfo}</h2>
              <div className="space-y-3 text-sm">
                <DetailItem label={t.info.problem} value={project.problem} />
                <DetailItem label={t.info.targetUsers} value={project.target_users} />
                <DetailItem label={t.info.timeline} value={project.timeline} />
                <DetailItem label={t.info.teamSize} value={project.desired_team_size} />
                <DetailItem label={t.info.collaboration} value={project.collaboration_expectation} />
                <DetailItem label={t.info.location} value={project.location_preference} />
              </div>
            </div>

            {userData.role === 'founder' && (
              <div className="isd-card p-6">
                <h2 className="font-slab font-normal text-isd-dark text-base mb-4">{t.notesFromISD}</h2>
                <NotesFromISD notes={notes} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
