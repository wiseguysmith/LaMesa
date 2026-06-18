import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getServerDictionary } from '@/lib/i18n/server'
import DashboardNav from '@/components/layout/DashboardNav'
import BuilderProfileForm from '@/components/forms/BuilderProfileForm'

export default async function BuilderProfilePage() {
  const { dict } = getServerDictionary()
  const t = dict.builderForm
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'builder') redirect('/dashboard')

  const { data: existingProfile } = await supabase
    .from('builder_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            {existingProfile ? t.editTitle : t.createTitle}
          </h1>
          <p className="text-slate-500 mt-1">
            {existingProfile ? t.editSubtitle : t.createSubtitle}
          </p>
        </div>
        <BuilderProfileForm userId={user.id} existingProfile={existingProfile} />
      </main>
    </div>
  )
}
