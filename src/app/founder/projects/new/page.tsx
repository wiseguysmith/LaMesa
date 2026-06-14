import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardNav from '@/components/layout/DashboardNav'
import ProjectForm from '@/components/forms/ProjectForm'

export default async function NewProjectPage() {
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
    <div className="min-h-screen bg-slate-50">
      <DashboardNav role={userData.role} fullName={userData.full_name} />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Submit Your Project</h1>
          <p className="text-slate-500 mt-1">
            Tell us about your idea. Our AI will analyze it, map the roles you need, and generate a 30-day roadmap.
          </p>
        </div>
        <ProjectForm userId={user.id} />
      </main>
    </div>
  )
}
