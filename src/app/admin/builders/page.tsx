import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import Card from '@/components/ui/Card'
import { ApprovalBadge } from '@/components/ui/Badge'
import Link from 'next/link'

export default async function AdminBuildersPage({
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
    .from('builder_profiles')
    .select('*, users(id, full_name, email)')
    .order('created_at', { ascending: false })

  if (searchParams.filter === 'pending') {
    query = query.eq('approval_status', 'pending') as typeof query
  }

  const { data: builders } = await query

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Builders</h1>
            <p className="text-slate-500 mt-1">{builders?.length ?? 0} builder profiles</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/builders"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!searchParams.filter ? 'bg-amber-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
            >
              All
            </Link>
            <Link
              href="/admin/builders?filter=pending"
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
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Skills</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Experience</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Availability</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {builders?.map((builder) => {
                  const builderUser = builder.users as { id: string; full_name: string; email: string } | null
                  return (
                    <tr key={builder.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800 text-sm">{builderUser?.full_name || 'Unknown'}</p>
                        <p className="text-slate-400 text-xs">{builderUser?.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-600 text-xs truncate max-w-xs">
                          {builder.skills?.slice(0, 4).join(', ') || '—'}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{builder.experience_level || '—'}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {builder.availability_hours_per_week ? `${builder.availability_hours_per_week}h/wk` : '—'}
                      </td>
                      <td className="px-6 py-4"><ApprovalBadge status={builder.approval_status} /></td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/builders/${builderUser?.id}`}
                          className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                        >
                          Review →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
                {!builders?.length && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">No builders found.</td>
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
