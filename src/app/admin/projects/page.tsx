import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import { StatusBadge, ApprovalBadge } from '@/components/ui/Badge'
import Link from 'next/link'

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: { filter?: string }
}) {
  const supabase = createClient()
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
    <div className="min-h-screen bg-isd-light">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="isd-eyebrow mb-1">Admin</p>
            <h1 className="font-slab font-normal text-isd-dark text-3xl">Founder 12 Applications</h1>
            <p className="text-isd-gray mt-1 text-sm">{projects?.length ?? 0} total applications</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/projects"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${!searchParams.filter ? 'bg-isd-navy text-white' : 'bg-white text-isd-gray border border-isd-gray-light hover:text-isd-dark'}`}
            >
              All
            </Link>
            <Link
              href="/admin/projects?filter=pending"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${searchParams.filter === 'pending' ? 'bg-isd-navy text-white' : 'bg-white text-isd-gray border border-isd-gray-light hover:text-isd-dark'}`}
            >
              Pending
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-isd-gray-light overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-isd-gray-light bg-isd-light/50">
                  <th className="text-left px-6 py-3 text-xs font-mono text-isd-gray uppercase tracking-wide">Venture</th>
                  <th className="text-left px-6 py-3 text-xs font-mono text-isd-gray uppercase tracking-wide">Founder</th>
                  <th className="text-left px-6 py-3 text-xs font-mono text-isd-gray uppercase tracking-wide">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-mono text-isd-gray uppercase tracking-wide">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-mono text-isd-gray uppercase tracking-wide">Approval</th>
                  <th className="text-left px-6 py-3 text-xs font-mono text-isd-gray uppercase tracking-wide">Score</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-isd-gray-light/50">
                {projects?.map((project) => (
                  <tr key={project.id} className="hover:bg-isd-light/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-isd-dark text-sm">{project.project_name}</p>
                      <p className="text-isd-gray text-xs truncate max-w-xs">{project.one_sentence_idea}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-isd-gray">
                      {(project.users as { full_name: string } | null)?.full_name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-sm text-isd-gray">{project.category}</td>
                    <td className="px-6 py-4"><StatusBadge status={project.status} /></td>
                    <td className="px-6 py-4"><ApprovalBadge status={project.approval_status} /></td>
                    <td className="px-6 py-4">
                      {project.readiness_score !== null ? (
                        <span className="text-sm font-mono font-medium text-isd-teal">{project.readiness_score}</span>
                      ) : (
                        <span className="text-isd-gray-light text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/projects/${project.id}`} className="text-sm text-isd-teal hover:text-isd-navy font-medium transition-colors">
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
                {!projects?.length && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-isd-gray">No applications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
