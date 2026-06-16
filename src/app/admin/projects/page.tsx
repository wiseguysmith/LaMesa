import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import Card from '@/components/ui/Card'
import { StatusBadge, ApprovalBadge } from '@/components/ui/Badge'
import Link from 'next/link'

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: { filter?: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single()
  if (!userData || userData.role !== 'admin') redirect('/dashboard')

  let query = supabase
    .from('projects')
    .select('*, users(full_name, email)')
    .order('created_at', { ascending: false })

  if (searchParams.filter === 'pending') {
    query = query.eq('approval_status', 'pending') as typeof query
  }

  const { data: projects } = await query

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
            <p className="text-slate-500 mt-1">{projects?.length ?? 0} total projects</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/projects"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!searchParams.filter ? 'bg-amber-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
            >
              All
            </Link>
            <Link
              href="/admin/projects?filter=pending"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${searchParams.filter === 'pending' ? 'bg-amber-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
            >
              Pending
            </Link>
          </div>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Project</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Founder</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Approval</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Score</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {projects?.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-800 text-sm">{project.project_name}</p>
                      <p className="text-slate-400 text-xs truncate max-w-xs">{project.one_sentence_idea}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {(project.users as { full_name: string } | null)?.full_name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{project.category}</td>
                    <td className="px-6 py-4"><StatusBadge status={project.status} /></td>
                    <td className="px-6 py-4"><ApprovalBadge status={project.approval_status} /></td>
                    <td className="px-6 py-4">
                      {project.readiness_score !== null ? (
                        <span className="text-sm font-medium text-amber-600">{project.readiness_score}</span>
                      ) : (
                        <span className="text-slate-300 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/projects/${project.id}`} className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
                {!projects?.length && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">No projects found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
