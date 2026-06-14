import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function ApplyPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/founder/projects/new')
  } else {
    redirect('/login?redirect=/founder/projects/new')
  }
}
