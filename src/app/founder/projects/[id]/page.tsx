import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import Card, { CardBody, CardHeader } from '@/components/ui/Card'
import { StatusBadge, ApprovalBadge } from '@/components/ui/Badge'
import ReadinessScore from '@/components/projects/ReadinessScore'
import RoleRecommendations from '@/components/projects/RoleRecommendations'
import RoadmapDisplay from '@/components/projects/RoadmapDisplay'
import { AIAnalysis } from '@/types/database'

export default async function FounderProjectPage({ params }: { params: { id: string } }) {
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
  const [{ data: roles }, { data: roadmapData }, { data: members }, { data: adminNotes }] = await Promise.all([
    supabase.from('project_role_recommendations').select('*').eq('project_id', project.id).order('priority'),
    supabase.from('project_roadmaps').select('*').eq('project_id', project.id).single(),
    supabase.from('project_members').select('*, users(full_name, email)').eq('project_id', project.id),
    supabase.from('admin_notes').select('*, users(full_name)').eq('project_id', project.id).order('created_at', { ascending: false }),
  ])

  const analysis = project.ai_analysis_json as AIAnalysis | null
  const roadmap = roadmapData?.roadmap_json?.weeks || []
  const unfilledRoles = (roles || []).filter((r) => !r.is_filled)

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-5xl mx-auto px-4 py-10">
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
                  <h2 className="font-semibold text-slate-800">AI Summary</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-slate-600">{project.ai_summary}</p>

                  {analysis && (
                    <div className="mt-4 grid md:grid-cols-3 gap-4">
                      {analysis.strengths?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Strengths</p>
                          <ul className="space-y-1">
                            {analysis.strengths.map((s, i) => (
                              <li key={i} className="text-xs text-slate-600">• {s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {analysis.risks?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">Risks</p>
                          <ul className="space-y-1">
                            {analysis.risks.map((r, i) => (
                              <li key={i} className="text-xs text-slate-600">• {r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {analysis.next_steps?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Next Steps</p>
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
                <h2 className="font-semibold text-slate-800">Team Members</h2>
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
                            {(m.users as { full_name: string } | null)?.full_name || 'Unknown'}
                          </p>
                          <p className="text-xs text-slate-400">{m.assigned_role}</p>
                        </div>
                      </div>
                    ))}
                    {unfilledRoles.length > 0 && (
                      <div className="pt-2 border-t border-slate-100">
                        <p className="text-xs text-slate-400 mb-2">Still needed:</p>
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
                    No team members assigned yet. Admin will match builders to your project after review.
                  </p>
                )}
              </CardBody>
            </Card>

            {/* 30-Day Roadmap */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-slate-800">30-Day Roadmap</h2>
              </CardHeader>
              <CardBody>
                <RoadmapDisplay weeks={roadmap} />
              </CardBody>
            </Card>

            {/* Admin Notes */}
            {adminNotes && adminNotes.length > 0 && (
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-slate-800">Admin Notes</h2>
                </CardHeader>
                <CardBody className="space-y-3">
                  {adminNotes.map((note) => (
                    <div key={note.id} className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <p className="text-sm text-slate-700">{note.note}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {(note.users as { full_name: string } | null)?.full_name || 'Admin'} ·{' '}
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
                  <h2 className="font-semibold text-slate-800 text-sm">Readiness Score</h2>
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
                <h2 className="font-semibold text-slate-800 text-sm">Recommended Roles</h2>
              </CardHeader>
              <CardBody>
                <RoleRecommendations recommendations={roles || []} />
              </CardBody>
            </Card>

            {/* Project Info */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-slate-800 text-sm">Project Info</h2>
              </CardHeader>
              <CardBody className="space-y-2 text-sm">
                {[
                  { label: 'Problem', value: project.problem },
                  { label: 'Target Users', value: project.target_users },
                  { label: 'Timeline', value: project.timeline },
                  { label: 'Team Size', value: project.desired_team_size?.toString() },
                  { label: 'Collaboration', value: project.collaboration_expectation },
                  { label: 'Location', value: project.location_preference },
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
