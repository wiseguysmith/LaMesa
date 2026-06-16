import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import Card, { CardBody, CardHeader } from '@/components/ui/Card'
import { StatusBadge, ApprovalBadge } from '@/components/ui/Badge'
import ReadinessScore from '@/components/projects/ReadinessScore'
import RoleRecommendations from '@/components/projects/RoleRecommendations'
import RoadmapDisplay from '@/components/projects/RoadmapDisplay'
import AdminProjectActions from './AdminProjectActions'
import { AIAnalysis } from '@/types/database'

export default async function AdminProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single()
  if (!userData || userData.role !== 'admin') redirect('/dashboard')

  const { data: project } = await supabase
    .from('projects')
    .select('*, users(full_name, email)')
    .eq('id', params.id)
    .single()

  if (!project) notFound()

  const [{ data: roles }, { data: roadmapData }, { data: members }, { data: adminNotes }, { data: batch }] = await Promise.all([
    supabase.from('project_role_recommendations').select('*').eq('project_id', project.id).order('priority'),
    supabase.from('project_roadmaps').select('*').eq('project_id', project.id).single(),
    supabase.from('project_members').select('*, users(full_name, email)').eq('project_id', project.id),
    supabase.from('admin_notes').select('*, users(full_name)').eq('project_id', project.id).order('created_at', { ascending: false }),
    project.batch_id
      ? supabase.from('batches').select('public_name, participant_identity').eq('id', project.batch_id).single()
      : Promise.resolve({ data: null }),
  ])

  const analysis = project.ai_analysis_json as AIAnalysis | null
  const roadmap = roadmapData?.roadmap_json?.weeks || []
  const founder = project.users as { full_name: string; email: string } | null
  const batchLabel = batch ? `${(batch as { public_name: string; participant_identity: string }).public_name} — ${(batch as { public_name: string; participant_identity: string }).participant_identity}` : null

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <StatusBadge status={project.status} />
            <ApprovalBadge status={project.approval_status} />
            <span className="text-xs text-slate-400">{project.category} · {project.stage}</span>
            {project.track && (
              <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">
                {project.track}
              </span>
            )}
            {project.secondary_track && (
              <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">
                {project.secondary_track}
              </span>
            )}
            {project.founder_status && (
              <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded-full capitalize">
                {String(project.founder_status).replace(/_/g, ' ')}
              </span>
            )}
            {batchLabel && (
              <span className="text-xs text-slate-400 font-medium">{batchLabel}</span>
            )}
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{project.project_name}</h1>
              <p className="text-slate-500 mt-1">{project.one_sentence_idea}</p>
              <p className="text-xs text-slate-400 mt-1">
                Submitted by {founder?.full_name || 'Unknown'} ({founder?.email})
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Admin Actions */}
            <AdminProjectActions
              projectId={project.id}
              currentStatus={project.status}
              currentApproval={project.approval_status}
              currentFounderStatus={project.founder_status}
              track={project.track}
              batchName={batchLabel}
            />

            {/* AI Analysis */}
            {analysis && (
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-slate-800">AI Analysis</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                  <p className="text-slate-600">{project.ai_summary}</p>

                  <div className="grid md:grid-cols-3 gap-4">
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
                    {analysis.missing_info?.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">Missing Info</p>
                        <ul className="space-y-1">
                          {analysis.missing_info.map((m, i) => (
                            <li key={i} className="text-xs text-slate-600">• {m}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Team Members */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-800">Team Members</h2>
                <a href="/admin/matches" className="text-xs text-amber-600 hover:text-amber-700">Manage in Matching →</a>
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
                            {(m.users as { full_name: string } | null)?.full_name}
                          </p>
                          <p className="text-xs text-slate-400">{m.assigned_role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">No team members assigned yet.</p>
                )}
              </CardBody>
            </Card>

            {/* Roadmap */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-slate-800">30-Day Roadmap</h2>
              </CardHeader>
              <CardBody>
                <RoadmapDisplay weeks={roadmap} />
              </CardBody>
            </Card>

            {/* Admin Notes */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-slate-800">Admin Notes</h2>
              </CardHeader>
              <CardBody>
                <AdminNotesList notes={adminNotes || []} />
                <AddNoteForm projectId={project.id} />
              </CardBody>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {project.readiness_score !== null && (
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-slate-800 text-sm">Readiness Score</h2>
                </CardHeader>
                <CardBody>
                  <ReadinessScore score={project.readiness_score} categoryScores={analysis?.category_scores} />
                </CardBody>
              </Card>
            )}

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-slate-800 text-sm">Recommended Roles</h2>
              </CardHeader>
              <CardBody>
                <RoleRecommendations recommendations={roles || []} />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-slate-800 text-sm">Project Details</h2>
              </CardHeader>
              <CardBody className="space-y-3 text-sm">
                {[
                  { label: 'Problem', value: project.problem },
                  { label: 'Target Users', value: project.target_users },
                  { label: 'Timeline', value: project.timeline },
                  { label: 'Team Size', value: project.desired_team_size?.toString() },
                  { label: 'Collaboration', value: project.collaboration_expectation },
                  { label: 'Location', value: project.location_preference },
                  { label: 'Goals', value: project.founder_goals },
                  { label: 'Notes', value: project.additional_notes },
                ].filter((i) => i.value).map((item) => (
                  <div key={item.label}>
                    <span className="text-xs text-slate-400">{item.label}</span>
                    <p className="text-slate-700 text-sm">{item.value}</p>
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

function AdminNotesList({ notes }: { notes: Array<{ id: string; note: string; created_at: string; users: unknown }> }) {
  if (notes.length === 0) return <p className="text-slate-400 text-sm mb-4">No notes yet.</p>
  return (
    <div className="space-y-2 mb-4">
      {notes.map((note) => (
        <div key={note.id} className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
          <p className="text-sm text-slate-700">{note.note}</p>
          <p className="text-xs text-slate-400 mt-1">
            {(note.users as { full_name: string } | null)?.full_name || 'Admin'} ·{' '}
            {new Date(note.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}

function AddNoteForm({ projectId }: { projectId: string }) {
  return (
    <form
      action={async (formData: FormData) => {
        'use server'
        const note = formData.get('note') as string
        if (!note) return

        const { requireAdmin } = await import('@/lib/supabase/adminAuth')
        const { user, serviceClient } = await requireAdmin()
        if (!user || !serviceClient) return

        await serviceClient.from('admin_notes').insert({
          project_id: projectId,
          admin_id: user.id,
          note,
        })

        const { revalidatePath } = await import('next/cache')
        revalidatePath(`/admin/projects/${projectId}`)
      }}
      className="flex gap-2"
    >
      <input
        name="note"
        placeholder="Add an internal note..."
        className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <button
        type="submit"
        className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
      >
        Add
      </button>
    </form>
  )
}
