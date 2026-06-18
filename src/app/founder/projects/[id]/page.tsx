import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getServerDictionary } from '@/lib/i18n/server'
import DashboardNav from '@/components/layout/DashboardNav'
import Card, { CardBody, CardHeader } from '@/components/ui/Card'
import { StatusBadge, ApprovalBadge } from '@/components/ui/Badge'
import ReadinessScore from '@/components/projects/ReadinessScore'
import RoleRecommendations from '@/components/projects/RoleRecommendations'
import RoadmapDisplay from '@/components/projects/RoadmapDisplay'
import WeeklyUpdateForm from '@/components/projects/WeeklyUpdateForm'
import { AIAnalysis, ProjectUpdate, RoadmapWeek } from '@/types/database'

const TRACK_COLORS: Record<string, string> = {
  AI: 'bg-violet-100 text-violet-700 border-violet-200',
  Web3: 'bg-blue-100 text-blue-700 border-blue-200',
  Robotics: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  Climate: 'bg-green-100 text-green-700 border-green-200',
  'Community Impact': 'bg-orange-100 text-orange-700 border-orange-200',
  'Student Founder': 'bg-pink-100 text-pink-700 border-pink-200',
  'Technical Founder': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Nontechnical Founder': 'bg-amber-100 text-amber-700 border-amber-200',
}

function getCurrentWeek(batchStartAt: string | null): number {
  if (!batchStartAt) return 1
  const start = new Date(batchStartAt)
  const now = new Date()
  const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return Math.min(Math.max(Math.floor(days / 7) + 1, 1), 4)
}

export default async function FounderProjectPage({ params }: { params: { id: string } }) {
  const { dict } = getServerDictionary()
  const t = dict.projectDetail
  const WEEK_OBJECTIVES = t.weekObjectives
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!userData) redirect('/login')

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .eq('founder_id', user.id)
    .single()

  if (!project) notFound()

  // Fetch related data
  const [{ data: roles }, { data: roadmapData }, { data: members }, { data: adminNotes }, { data: updates }, { data: batch }] = await Promise.all([
    supabase.from('project_role_recommendations').select('*').eq('project_id', project.id).order('priority'),
    supabase.from('project_roadmaps').select('*').eq('project_id', project.id).single(),
    supabase.from('project_members').select('*, users(full_name, email)').eq('project_id', project.id),
    supabase.from('admin_notes').select('*, users(full_name)').eq('project_id', project.id).order('created_at', { ascending: false }),
    supabase.from('project_updates').select('*').eq('project_id', project.id).order('created_at', { ascending: false }),
    project.batch_id
      ? supabase.from('batches').select('*').eq('id', project.batch_id).single()
      : Promise.resolve({ data: null }),
  ])

  const analysis = project.ai_analysis_json as AIAnalysis | null
  const roadmap = (roadmapData?.roadmap_json?.weeks || []) as RoadmapWeek[]
  const unfilledRoles = (roles || []).filter((r) => !r.is_filled)
  const currentWeek = getCurrentWeek(batch?.starts_at || null)
  const trackColor = project.track ? (TRACK_COLORS[project.track] || 'bg-slate-100 text-slate-600 border-slate-200') : null

  const updatesByWeek = (updates || []).reduce<Record<number, ProjectUpdate[]>>((acc, u) => {
    const w = (u as ProjectUpdate).week_number || 0
    acc[w] = acc[w] || []
    acc[w].push(u as ProjectUpdate)
    return acc
  }, {})

  const founderStatusLabel = (t.founderStatus as Record<string, string>)[project.founder_status as string] || project.founder_status

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Table & Track badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-semibold bg-amber-900 text-white px-3 py-1 rounded-full">
            {t.tableBadge}
          </span>
          {project.track && trackColor && (
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${trackColor}`}>
              {project.track}
            </span>
          )}
          {project.secondary_track && (
            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {project.secondary_track}
            </span>
          )}
          <span className="text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
            {founderStatusLabel}
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <StatusBadge status={project.status} />
                <ApprovalBadge status={project.approval_status} />
                <span className="text-xs text-slate-400">{project.category} · {project.stage}</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">{project.project_name}</h1>
              <p className="text-slate-500 mt-1 text-lg">{project.one_sentence_idea}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Summary */}
            {project.ai_summary && (
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-slate-800">{t.aiSummary}</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-slate-600">{project.ai_summary}</p>

                  {analysis && (
                    <div className="mt-4 grid md:grid-cols-3 gap-4">
                      {analysis.strengths?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">{t.strengths}</p>
                          <ul className="space-y-1">
                            {analysis.strengths.map((s, i) => (
                              <li key={i} className="text-xs text-slate-600">• {s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {analysis.risks?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">{t.risks}</p>
                          <ul className="space-y-1">
                            {analysis.risks.map((r, i) => (
                              <li key={i} className="text-xs text-slate-600">• {r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {analysis.next_steps?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">{t.nextSteps}</p>
                          <ul className="space-y-1">
                            {analysis.next_steps.map((s, i) => (
                              <li key={i} className="text-xs text-slate-600">• {s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardBody>
              </Card>
            )}

            {/* Team Members */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-slate-800">{t.teamMembers}</h2>
              </CardHeader>
              <CardBody>
                {members && members.length > 0 ? (
                  <div className="space-y-2">
                    {members.map((m) => (
                      <div key={m.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold">
                          {(m.users as { full_name: string } | null)?.full_name?.[0] || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {(m.users as { full_name: string } | null)?.full_name || t.unknown}
                          </p>
                          <p className="text-xs text-slate-400">{m.assigned_role}</p>
                        </div>
                      </div>
                    ))}
                    {unfilledRoles.length > 0 && (
                      <div className="pt-2 border-t border-slate-100">
                        <p className="text-xs text-slate-400 mb-2">{t.stillNeeded}</p>
                        {unfilledRoles.map((r) => (
                          <span key={r.id} className="inline-block text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full mr-1 mb-1">
                            {r.role}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">
                    {t.noMembers}
                  </p>
                )}
              </CardBody>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-slate-800">{t.buildCycle}</h2>
              </CardHeader>
              <CardBody>
                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  {WEEK_OBJECTIVES.map((objective, i) => {
                    const weekNum = i + 1
                    const isCurrent = project.status === 'building' && weekNum === currentWeek
                    const weekUpdates = updatesByWeek[weekNum] || []
                    return (
                      <div
                        key={weekNum}
                        className={`p-4 rounded-xl border ${isCurrent ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-white'}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isCurrent ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {t.week} {weekNum}
                          </span>
                          {isCurrent && (
                            <span className="text-xs text-amber-700 font-semibold">{t.current}</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-700 font-medium">{objective}</p>
                        {weekUpdates.length > 0 && (
                          <p className="text-xs text-green-600 mt-1">✓ {weekUpdates.length} {t.updatesPosted}</p>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Recent updates */}
                {updates && updates.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{t.recentUpdates}</p>
                    {(updates as ProjectUpdate[]).slice(0, 3).map((u) => (
                      <div key={u.id} className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-700">{u.update_text}</p>
                        {u.blockers && (
                          <p className="text-xs text-red-600 mt-1">{t.blocker} {u.blockers}</p>
                        )}
                        <p className="text-xs text-slate-400 mt-1">
                          {u.week_number ? `${t.week} ${u.week_number} · ` : ''}{new Date(u.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Weekly Update Form — only when building */}
            {project.status === 'building' && (
              <WeeklyUpdateForm
                projectId={project.id}
                currentWeek={currentWeek}
              />
            )}

            {/* 30-Day Roadmap */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-slate-800">{t.roadmapTitle}</h2>
              </CardHeader>
              <CardBody>
                <RoadmapDisplay weeks={roadmap} />
              </CardBody>
            </Card>

            {/* Admin Notes */}
            {adminNotes && adminNotes.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-slate-800">{t.notesFromISD}</h2>
                </CardHeader>
                <CardBody className="space-y-3">
                  {adminNotes.map((note) => (
                    <div key={note.id} className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <p className="text-sm text-slate-700">{note.note}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(note.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </CardBody>
              </Card>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Readiness Score */}
            {project.readiness_score !== null && (
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-slate-800 text-sm">{t.readinessScore}</h2>
                </CardHeader>
                <CardBody>
                  <ReadinessScore
                    score={project.readiness_score}
                    categoryScores={analysis?.category_scores}
                  />
                </CardBody>
              </Card>
            )}

            {/* Role Recommendations */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-slate-800 text-sm">{t.recommendedRoles}</h2>
              </CardHeader>
              <CardBody>
                <RoleRecommendations recommendations={roles || []} />
              </CardBody>
            </Card>

            {/* Project Info */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-slate-800 text-sm">{t.projectInfo}</h2>
              </CardHeader>
              <CardBody className="space-y-2 text-sm">
                {[
                  { label: t.info.problem, value: project.problem },
                  { label: t.info.targetUsers, value: project.target_users },
                  { label: t.info.timeline, value: project.timeline },
                  { label: t.info.teamSize, value: project.desired_team_size?.toString() },
                  { label: t.info.collaboration, value: project.collaboration_expectation },
                  { label: t.info.location, value: project.location_preference },
                ].filter((item) => item.value).map((item) => (
                  <div key={item.label}>
                    <span className="text-slate-400 text-xs">{item.label}</span>
                    <p className="text-slate-700">{item.value}</p>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
