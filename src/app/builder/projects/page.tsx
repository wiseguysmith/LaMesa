import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import Card, { CardBody } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import Link from 'next/link'

export default async function BuilderProjectsPage() {
  const supabase = await createClient()
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
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">My Projects</h1>
          <p className="text-slate-500 mt-1">Projects you have been assigned to.</p>
        </div>

        {assignments.length === 0 ? (
          <Card>
            <CardBody className="text-center py-16">
              <p className="text-slate-400 text-lg mb-2">No project assignments yet</p>
              <p className="text-slate-400 text-sm">
                Make sure your builder profile is complete and approved. Admin will assign you to projects.
              </p>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {assignments.map((assignment) => {
              const project = assignment.projects as Record<string, unknown> | null
              if (!project) return null
              return (
                <Card key={assignment.id}>
                  <CardBody>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-slate-800">{project.project_name as string}</h3>
                          <StatusBadge status={project.status as 'submitted'} />
                        </div>
                        <p className="text-slate-500 text-sm mb-2">{project.one_sentence_idea as string}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span>Your role: <strong className="text-amber-600">{assignment.assigned_role}</strong></span>
                          <span>{project.category as string}</span>
                          <span>{project.stage as string}</span>
                        </div>
                      </div>
                      <Link
                        href={`/founder/projects/${project.id as string}`}
                        className="text-sm font-medium text-amber-600 hover:text-amber-700 ml-4 shrink-0"
                      >
                        View →
                      </Link>
                    </div>
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
