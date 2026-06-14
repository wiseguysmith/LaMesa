import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import Link from 'next/link'
import Card, { CardBody } from '@/components/ui/Card'
import { StatusBadge, ApprovalBadge } from '@/components/ui/Badge'
import { Project } from '@/types/database'

export default async function DashboardPage() {
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
  let builderProfile = null

  if (userData.role === 'founder') {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('founder_id', user.id)
      .order('created_at', { ascending: false })
    projects = data || []
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

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {userData.full_name || 'there'}
          </h1>
          <p className="text-slate-500 mt-1">
            {userData.role === 'founder'
              ? 'Manage your projects and track your team formation progress.'
              : 'View your profile status and assigned projects.'}
          </p>
        </div>

        {userData.role === 'founder' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Your Projects</h2>
              <Link
                href="/founder/projects/new"
                className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                + New Project
              </Link>
            </div>

            {projects.length === 0 ? (
              <Card>
                <CardBody className="text-center py-16">
                  <p className="text-slate-400 text-lg mb-2">No projects yet</p>
                  <p className="text-slate-400 text-sm mb-6">Submit your first project to get started.</p>
                  <Link
                    href="/founder/projects/new"
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Submit a Project
                  </Link>
                </CardBody>
              </Card>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardBody className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-slate-800">{project.project_name}</h3>
                          <StatusBadge status={project.status} />
                          <ApprovalBadge status={project.approval_status} />
                        </div>
                        <p className="text-slate-500 text-sm">{project.one_sentence_idea}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                          <span>{project.category}</span>
                          <span>{project.stage}</span>
                          {project.readiness_score !== null && (
                            <span className="text-amber-600 font-medium">
                              Readiness: {project.readiness_score}/100
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        href={`/founder/projects/${project.id}`}
                        className="text-sm font-medium text-amber-600 hover:text-amber-700 ml-4"
                      >
                        View →
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
                    <h2 className="font-semibold text-slate-800 mb-1">Builder Profile</h2>
                    {builderProfile ? (
                      <div className="flex items-center gap-2">
                        <ApprovalBadge status={builderProfile.approval_status} />
                        <span className="text-sm text-slate-500">
                          {builderProfile.approval_status === 'pending'
                            ? 'Your profile is under review by an admin.'
                            : builderProfile.approval_status === 'approved'
                            ? 'Your profile is active and you can be matched to projects.'
                            : 'Your profile was not approved. Contact ISD for more info.'}
                        </span>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">You haven&apos;t created a profile yet.</p>
                    )}
                  </div>
                  <Link
                    href="/builder/profile"
                    className="text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    {builderProfile ? 'Edit Profile →' : 'Create Profile →'}
                  </Link>
                </div>
              </CardBody>
            </Card>

            <h2 className="text-lg font-semibold text-slate-800 mb-4">Assigned Projects</h2>
            {projects.length === 0 ? (
              <Card>
                <CardBody className="text-center py-12">
                  <p className="text-slate-400">No project assignments yet.</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Make sure your profile is complete and approved to be considered for matches.
                  </p>
                </CardBody>
              </Card>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardBody>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-slate-800">{project.project_name}</h3>
                        <StatusBadge status={project.status} />
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
