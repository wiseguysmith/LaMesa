import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import { StatusBadge, ApprovalBadge } from '@/components/ui/Badge'
import ReadinessScore from '@/components/projects/ReadinessScore'
import RoleRecommendations from '@/components/projects/RoleRecommendations'
import RoadmapDisplay from '@/components/projects/RoadmapDisplay'
import AdminProjectActions from './AdminProjectActions'
import { AIAnalysis } from '@/types/database'

export default async function AdminProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
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
    <div className="min-h-screen bg-isd-light">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <StatusBadge status={project.status} />
            <ApprovalBadge status={project.approval_status} />
            <span className="text-xs text-isd-gray">{project.category} · {project.stage}</span>
            {project.track && (
              <span className="text-xs bg-isd-navy/10 text-isd-navy font-mono px-2 py-0.5 rounded-full border border-isd-navy/20">
                {project.track}
              </span>
            )}
            {project.secondary_track && (
              <span className="text-xs bg-isd-light text-isd-gray font-mono px-2 py-0.5 rounded-full border border-isd-gray-light">
                {project.secondary_track}
              </span>
            )}
            {project.founder_status && (
              <span className="text-xs bg-isd-teal/10 text-isd-teal font-mono px-2 py-0.5 rounded-full border border-isd-teal/20 capitalize">
                {String(project.founder_status).replace(/_/g, ' ')}
              </span>
            )}
            {batchLabel && (
              <span className="text-xs text-isd-gray font-mono">{batchLabel}</span>
            )}
          </div>
          <h1 className="font-slab font-normal text-isd-dark text-3xl">{project.project_name}</h1>
          <p className="text-isd-gray mt-1">{project.one_sentence_idea}</p>
          <p className="text-xs text-isd-gray/70 mt-1 font-mono">
            Submitted by {founder?.full_name || 'Unknown'} ({founder?.email})
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
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
              <div className="isd-card p-6">
                <h2 className="font-slab font-normal text-isd-dark text-lg mb-4">AI Analysis</h2>
                <p className="text-isd-gray leading-relaxed mb-4">{project.ai_summary}</p>
                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-isd-gray-light">
                  {analysis.strengths?.length > 0 && (
                    <div>
                      <p className="text-xs font-mono text-isd-dark-green uppercase tracking-wide mb-2">Strengths</p>
                      <ul className="space-y-1">
                        {analysis.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-isd-gray">• {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysis.risks?.length > 0 && (
                    <div>
                      <p className="text-xs font-mono text-red-600 uppercase tracking-wide mb-2">Risks</p>
                      <ul className="space-y-1">
                        {analysis.risks.map((r, i) => (
                          <li key={i} className="text-xs text-isd-gray">• {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysis.missing_info?.length > 0 && (
                    <div>
                      <p className="text-xs font-mono text-amber-600 uppercase tracking-wide mb-2">Missing Info</p>
                      <ul className="space-y-1">
                        {analysis.missing_info.map((m, i) => (
                          <li key={i} className="text-xs text-isd-gray">• {m}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Team Members */}
            <div className="isd-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-slab font-normal text-isd-dark text-lg">Team Members</h2>
                <a href="/admin/matches" className="text-xs text-isd-teal hover:text-isd-navy font-medium transition-colors">Manage team formation →</a>
              </div>
              {members && members.length > 0 ? (
                <div className="space-y-2">
                  {members.map((m) => (
                    <div key={m.id} className="flex items-center gap-3 p-3 bg-isd-light rounded-lg border border-isd-gray-light">
                      <div className="w-8 h-8 bg-isd-navy text-white rounded-md flex items-center justify-center text-sm font-mono font-bold">
                        {(m.users as { full_name: string } | null)?.full_name?.[0] || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-isd-dark">
                          {(m.users as { full_name: string } | null)?.full_name}
                        </p>
                        <p className="text-xs text-isd-gray">{m.assigned_role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-isd-gray text-sm">No team members assigned yet.</p>
              )}
            </div>

            {/* Roadmap */}
            <div className="isd-card p-6">
              <h2 className="font-slab font-normal text-isd-dark text-lg mb-4">30-Day Roadmap</h2>
              <RoadmapDisplay weeks={roadmap} />
            </div>

            {/* Admin Notes */}
            <div className="isd-card p-6">
              <h2 className="font-slab font-normal text-isd-dark text-lg mb-4">Admin Notes</h2>
              <AdminNotesList notes={adminNotes || []} />
              <AddNoteForm projectId={project.id} />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {project.readiness_score !== null && (
              <div className="isd-card p-6">
                <h2 className="font-slab font-normal text-isd-dark text-base mb-4">Readiness Score</h2>
                <ReadinessScore score={project.readiness_score} categoryScores={analysis?.category_scores} />
              </div>
            )}

            <div className="isd-card p-6">
              <h2 className="font-slab font-normal text-isd-dark text-base mb-4">Recommended Roles</h2>
              <RoleRecommendations recommendations={roles || []} />
            </div>

            <div className="isd-card p-6">
                <h2 className="font-slab font-normal text-isd-dark text-base mb-4">Venture Details</h2>
              <div className="space-y-3 text-sm">
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
                    <span className="text-xs font-mono text-isd-gray">{item.label}</span>
                    <p className="text-isd-dark mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function AdminNotesList({ notes }: { notes: Array<{ id: string; note: string; created_at: string; users: unknown }> }) {
  if (notes.length === 0) return <p className="text-isd-gray text-sm mb-4">No notes yet.</p>
  return (
    <div className="space-y-2 mb-4">
      {notes.map((note) => (
        <div key={note.id} className="p-3 bg-isd-mint/10 border border-isd-mint/30 rounded-lg">
          <p className="text-sm text-isd-dark">{note.note}</p>
          <p className="text-xs text-isd-gray mt-1">
            {(note.users as { full_name: string } | null)?.full_name || 'Admin'} · {new Date(note.created_at).toLocaleDateString()}
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
        className="flex-1 px-3 py-2 text-sm border border-isd-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-isd-teal focus:border-isd-teal bg-white text-isd-dark placeholder-isd-gray"
      />
      <button
        type="submit"
        className="isd-btn-primary text-sm px-4 py-2"
      >
        Add
      </button>
    </form>
  )
}
