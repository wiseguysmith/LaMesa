import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import { ApprovalBadge } from '@/components/ui/Badge'
import Link from 'next/link'

export default async function AdminBuildersPage({
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
    .from('builder_profiles')
    .select('*, users(id, full_name, email)')
    .order('created_at', { ascending: false })

  if (searchParams.filter === 'pending') {
    query = query.eq('approval_status', 'pending') as typeof query
  }

  const { data: builders } = await query

  return (
    <div className="min-h-screen bg-isd-light">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="isd-eyebrow mb-1">Admin</p>
            <h1 className="font-slab font-normal text-isd-dark text-3xl">Builders</h1>
            <p className="text-isd-gray mt-1 text-sm">{builders?.length ?? 0} builder profiles</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/builders"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${!searchParams.filter ? 'bg-isd-navy text-white' : 'bg-white text-isd-gray border border-isd-gray-light hover:text-isd-dark'}`}
            >
              All
            </Link>
            <Link
              href="/admin/builders?filter=pending"
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
                  <th className="text-left px-6 py-3 text-xs font-mono text-isd-gray uppercase tracking-wide">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-mono text-isd-gray uppercase tracking-wide">Skills</th>
                  <th className="text-left px-6 py-3 text-xs font-mono text-isd-gray uppercase tracking-wide">Experience</th>
                  <th className="text-left px-6 py-3 text-xs font-mono text-isd-gray uppercase tracking-wide">Availability</th>
                  <th className="text-left px-6 py-3 text-xs font-mono text-isd-gray uppercase tracking-wide">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-isd-gray-light/50">
                {builders?.map((builder) => {
                  const builderUser = builder.users as { id: string; full_name: string; email: string } | null
                  return (
                    <tr key={builder.id} className="hover:bg-isd-light/40 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-isd-dark text-sm">{builderUser?.full_name || 'Unknown'}</p>
                        <p className="text-isd-gray text-xs">{builderUser?.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-isd-gray text-xs truncate max-w-xs">
                          {builder.skills?.slice(0, 4).join(', ') || '—'}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-isd-gray">{builder.experience_level || '—'}</td>
                      <td className="px-6 py-4 text-sm text-isd-gray">
                        {builder.availability_hours_per_week ? `${builder.availability_hours_per_week}h/wk` : '—'}
                      </td>
                      <td className="px-6 py-4"><ApprovalBadge status={builder.approval_status} /></td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/builders/${builderUser?.id}`}
                          className="text-sm text-isd-teal hover:text-isd-navy font-medium transition-colors"
                        >
                          Review →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
                {!builders?.length && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-isd-gray">No builders found.</td>
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
