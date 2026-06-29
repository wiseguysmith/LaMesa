import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getServerDictionary } from '@/lib/i18n/server'
import DashboardNav from '@/components/layout/DashboardNav'
import ProjectForm from '@/components/forms/ProjectForm'

export default async function NewProjectPage() {
  const { dict } = getServerDictionary()
  const t = dict.projectForm
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'founder') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-isd-light">
      <DashboardNav role={userData.role} fullName={userData.full_name} />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <span className="inline-block bg-isd-mint/30 text-isd-dark-green text-xs font-mono px-3 py-1 rounded-full mb-3 border border-isd-mint/40 uppercase tracking-widest">
            {t.analyzingTable}
          </span>
          <h1 className="font-slab font-normal text-isd-dark text-3xl mt-2">{t.pageTitle}</h1>
          <p className="text-isd-gray mt-2">{t.pageSubtitle}</p>
        </div>
        <ProjectForm userId={user.id} />
      </main>
    </div>
  )
}
