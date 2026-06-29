import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getServerDictionary } from '@/lib/i18n/server'
import DashboardNav from '@/components/layout/DashboardNav'
import { StatusBadge } from '@/components/ui/Badge'
import Link from 'next/link'

export default async function BuilderProjectsPage() {
  const { dict } = getServerDictionary()
  const t = dict.builderProjects
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'builder') redirect('/dashboard')

  const { data: memberships } = await supabase
    .from('project_members')
    .select('*, projects(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const assignments = memberships || []

  return (
    <div className="min-h-screen bg-isd-light">
      <DashboardNav role={userData.role} fullName={userData.full_name} />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <p className="isd-eyebrow mb-1">{t.subtitle}</p>
          <h1 className="font-slab font-normal text-isd-dark text-3xl">{t.title}</h1>
        </div>

        {assignments.length === 0 ? (
          <div className="isd-card p-16 text-center">
            <p className="text-isd-gray text-lg mb-2">{t.noAssignments}</p>
            <p className="text-isd-gray text-sm">{t.noAssignmentsSub}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {assignments.map((assignment) => {
              const project = assignment.projects as Record<string, unknown> | null
              if (!project) return null
              return (
                <div key={assignment.id} className="isd-card p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="font-slab font-normal text-isd-dark text-base">{project.project_name as string}</h3>
                        <StatusBadge status={project.status as 'submitted'} />
                      </div>
                      <p className="text-isd-gray text-sm mb-2">{project.one_sentence_idea as string}</p>
                      <div className="flex items-center gap-3 text-xs text-isd-gray/70">
                        <span>{t.yourRole} <strong className="text-isd-teal font-mono">{assignment.assigned_role}</strong></span>
                        <span>{project.category as string}</span>
                        <span>{project.stage as string}</span>
                      </div>
                    </div>
                    <Link
                      href={`/founder/projects/${project.id as string}`}
                      className="text-sm font-medium text-isd-teal hover:text-isd-navy ml-4 shrink-0 transition-colors"
                    >
                      {t.view} →
                    </Link>
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
