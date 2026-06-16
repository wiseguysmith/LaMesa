import { createClient, createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), user: null, serviceClient: null }
  }

  const serviceClient = createServiceClient()
  const { data: userData } = await serviceClient
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }), user: null, serviceClient: null }
  }

  return { error: null, user, serviceClient }
}
