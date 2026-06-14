import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function JoinPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/builder/profile')
  } else {
    redirect('/login?redirect=/builder/profile')
  }
}
