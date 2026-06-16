import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import Card, { CardBody, CardHeader } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import MatchCard from '@/components/admin/MatchCard'

export default async function AdminMatchesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single()
  if (!userData || userData.role !== 'admin') redirect('/dashboard')

  // Get approved projects that need team members
  const { data: projects } = await supabase
    .from('projects')
    .select(`
      *,
      users(full_name),
      project_role_recommendations(*),
      project_members(*, users(full_name)),
      match_suggestions(*, users(full_name, email), builder_profiles(*))
    `)
    .eq('approval_status', 'approved')
    .not('status', 'in', '("archived","presented_demo_day")')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Team Formation — Table 01</h1>
          <p className="text-slate-500 mt-1">
            Run AI match suggestions and assign builders to selected projects.
          </p>
        </div>

        {!projects?.length ? (
          <Card>
            <CardBody className="text-center py-16">
              <p className="text-slate-400">No approved projects available for matching.</p>
              <p className="text-slate-400 text-sm mt-1">Approve projects first in the Projects section.</p>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-8">
            {projects.map((project) => {
              const roles = project.project_role_recommendations || []
              const members = project.project_members || []
              const suggestions = project.match_suggestions || []
              const unfilledRoles = roles.filter((r: { is_filled: boolean }) => !r.is_filled)

              return (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="font-semibold text-slate-800">{project.project_name}</h2>
                          <StatusBadge status={project.status} />
                        </div>
                        <p className="text-slate-500 text-sm">{project.one_sentence_idea}</p>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>{project.category} · by {(project.users as { full_name: string } | null)?.full_name}</span>
                          {project.track && (
                            <span className="bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">{project.track}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <MatchCard
                      projectId={project.id}
                      projectName={project.project_name}
                      projectTrack={project.track}
                      roles={roles}
                      members={members}
                      suggestions={suggestions}
                      unfilledRoles={unfilledRoles}
                    />
                  </CardBody>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
