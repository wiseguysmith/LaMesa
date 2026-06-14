import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import Card, { CardBody } from '@/components/ui/Card'
import Link from 'next/link'

export default async function AdminPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'admin') redirect('/dashboard')

  // Fetch stats
  const [
    { count: totalProjects },
    { count: totalBuilders },
    { count: pendingProjects },
    { count: pendingBuilders },
    { count: teamFormed },
    { count: prototypeReady },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('builder_profiles').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('approval_status', 'pending'),
    supabase.from('builder_profiles').select('*', { count: 'exact', head: true }).eq('approval_status', 'pending'),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'team_formed'),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'prototype_ready'),
  ])

  const stats = [
    { label: 'Total Projects', value: totalProjects ?? 0, href: '/admin/projects', color: 'bg-blue-50 text-blue-700' },
    { label: 'Total Builders', value: totalBuilders ?? 0, href: '/admin/builders', color: 'bg-purple-50 text-purple-700' },
    { label: 'Pending Approvals', value: (pendingProjects ?? 0) + (pendingBuilders ?? 0), href: '/admin/projects', color: 'bg-amber-50 text-amber-700' },
    { label: 'Teams Formed', value: teamFormed ?? 0, href: '/admin/matches', color: 'bg-green-50 text-green-700' },
    { label: 'Prototype Ready', value: prototypeReady ?? 0, href: '/admin/projects', color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Builders Awaiting Review', value: pendingBuilders ?? 0, href: '/admin/builders', color: 'bg-orange-50 text-orange-700' },
  ]

  // Recent projects
  const { data: recentProjects } = await supabase
    .from('projects')
    .select('*, users(full_name)')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Admin Overview</h1>
          <p className="text-slate-500 mt-1">La Mesa pilot platform management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardBody>
                  <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color.split(' ')[1]}`}>{stat.value}</p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <Link href="/admin/projects?filter=pending" className="block">
            <Card className="hover:shadow-md transition-shadow border-amber-200 bg-amber-50">
              <CardBody>
                <p className="font-semibold text-amber-800">Review Pending Projects</p>
                <p className="text-amber-600 text-sm mt-1">{pendingProjects ?? 0} waiting for approval</p>
              </CardBody>
            </Card>
          </Link>
          <Link href="/admin/builders?filter=pending" className="block">
            <Card className="hover:shadow-md transition-shadow border-purple-200 bg-purple-50">
              <CardBody>
                <p className="font-semibold text-purple-800">Review Builder Profiles</p>
                <p className="text-purple-600 text-sm mt-1">{pendingBuilders ?? 0} profiles to review</p>
              </CardBody>
            </Card>
          </Link>
          <Link href="/admin/matches" className="block">
            <Card className="hover:shadow-md transition-shadow border-green-200 bg-green-50">
              <CardBody>
                <p className="font-semibold text-green-800">Manage Matching</p>
                <p className="text-green-600 text-sm mt-1">Run AI match suggestions</p>
              </CardBody>
            </Card>
          </Link>
        </div>

        {/* Recent Projects */}
        <Card>
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800">Recent Projects</h2>
            <Link href="/admin/projects" className="text-sm text-amber-600 hover:text-amber-700">View all →</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentProjects?.map((project) => (
              <div key={project.id} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <span className="font-medium text-slate-800 text-sm">{project.project_name}</span>
                  <span className="text-slate-400 text-xs ml-2">
                    by {(project.users as { full_name: string } | null)?.full_name || 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{project.category}</span>
                  <Link href={`/admin/projects/${project.id}`} className="text-xs text-amber-600 hover:text-amber-700">
                    Review →
                  </Link>
                </div>
              </div>
            ))}
            {!recentProjects?.length && (
              <div className="px-6 py-8 text-center text-slate-400 text-sm">No projects yet.</div>
            )}
          </div>
        </Card>
      </main>
    </div>
  )
}
