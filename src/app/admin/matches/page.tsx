import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import { StatusBadge } from '@/components/ui/Badge'
import MatchCard from '@/components/admin/MatchCard'

export default async function AdminMatchesPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single()
  if (!userData || userData.role !== 'admin') redirect('/dashboard')

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
    <div className="min-h-screen bg-isd-light">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <p className="isd-eyebrow mb-1">Admin</p>
          <h1 className="font-slab font-normal text-isd-dark text-3xl">Founder 12 Team Formation</h1>
          <p className="text-isd-gray mt-2">Run AI suggestions and assign approved builders to accepted Founder 12 ventures.</p>
        </div>

        {!projects?.length ? (
          <div className="isd-card p-16 text-center">
            <p className="text-isd-gray text-lg">No accepted ventures available for team formation.</p>
            <p className="text-isd-gray text-sm mt-1">Accept founders first in Founder 12 Applications.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {projects.map((project) => {
              const roles = project.project_role_recommendations || []
              const members = project.project_members || []
              const suggestions = project.match_suggestions || []
              const unfilledRoles = roles.filter((r: { is_filled: boolean }) => !r.is_filled)

              return (
                <div key={project.id} className="bg-white rounded-xl border border-isd-gray-light overflow-hidden shadow-sm">
                  <div className="px-6 py-5 border-b border-isd-gray-light bg-isd-light/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h2 className="font-slab font-normal text-isd-dark text-lg">{project.project_name}</h2>
                          <StatusBadge status={project.status} />
                          {project.track && (
                            <span className="bg-isd-navy/10 text-isd-navy text-xs font-mono px-2 py-0.5 rounded-full">{project.track}</span>
                          )}
                        </div>
                        <p className="text-isd-gray text-sm">{project.one_sentence_idea}</p>
                        <p className="text-xs text-isd-gray/70 mt-0.5">
                          {project.category} · by {(project.users as { full_name: string } | null)?.full_name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <MatchCard
                      projectId={project.id}
                      projectName={project.project_name}
                      projectTrack={project.track}
                      roles={roles}
                      members={members}
                      suggestions={suggestions}
                      unfilledRoles={unfilledRoles}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
