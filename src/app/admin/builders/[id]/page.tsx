import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import Card, { CardBody, CardHeader } from '@/components/ui/Card'
import { ApprovalBadge } from '@/components/ui/Badge'
import AdminBuilderActions from './AdminBuilderActions'

export default async function AdminBuilderDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single()
  if (!userData || userData.role !== 'admin') redirect('/dashboard')

  const { data: builderUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!builderUser || builderUser.role !== 'builder') notFound()

  const { data: profile } = await supabase
    .from('builder_profiles')
    .select('*')
    .eq('user_id', params.id)
    .single()

  if (!profile) notFound()

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ApprovalBadge status={profile.approval_status} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{builderUser.full_name || 'Unknown'}</h1>
          <p className="text-slate-500">{builderUser.email}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <AdminBuilderActions builderId={params.id} currentApproval={profile.approval_status} />

            <Card>
              <CardHeader><h2 className="font-semibold text-slate-800">About</h2></CardHeader>
              <CardBody className="space-y-3 text-sm">
                {profile.bio && <p className="text-slate-600">{profile.bio}</p>}
                {[
                  { label: 'Location', value: profile.location },
                  { label: 'Experience', value: profile.experience_level },
                  { label: 'Languages', value: profile.languages?.join(', ') },
                  { label: 'Availability', value: profile.availability_hours_per_week ? `${profile.availability_hours_per_week}h/week` : null },
                  { label: 'Collaboration', value: profile.collaboration_preference },
                ].filter((i) => i.value).map((item) => (
                  <div key={item.label}>
                    <span className="text-xs text-slate-400">{item.label}</span>
                    <p className="text-slate-700">{item.value}</p>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><h2 className="font-semibold text-slate-800">Skills & Roles</h2></CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <p className="text-xs text-slate-400 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.skills?.map((skill: string) => (
                      <span key={skill} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-2">Preferred Roles</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.preferred_roles?.map((role: string) => (
                      <span key={role} className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-xs">{role}</span>
                    ))}
                  </div>
                </div>
                {profile.interests && (
                  <div>
                    <p className="text-xs text-slate-400 mb-2">Interests</p>
                    <div className="flex flex-wrap gap-1">
                      {profile.interests.map((interest: string) => (
                        <span key={interest} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{interest}</span>
                      ))}
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>

            <Card>
              <CardHeader><h2 className="font-semibold text-slate-800">Links</h2></CardHeader>
              <CardBody className="space-y-2">
                {[
                  { label: 'Portfolio', url: profile.portfolio_url },
                  { label: 'GitHub', url: profile.github_url },
                  { label: 'LinkedIn', url: profile.linkedin_url },
                ].filter((l) => l.url).map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-amber-600 hover:text-amber-700"
                    >
                      {link.label}: {link.url}
                    </a>
                  </div>
                ))}
                {!profile.portfolio_url && !profile.github_url && !profile.linkedin_url && (
                  <p className="text-slate-400 text-sm">No links provided.</p>
                )}
              </CardBody>
            </Card>

            {profile.project_goals && (
              <Card>
                <CardHeader><h2 className="font-semibold text-slate-800">Goals</h2></CardHeader>
                <CardBody>
                  <p className="text-slate-600 text-sm">{profile.project_goals}</p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
