import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/adminAuth'

export async function POST(request: NextRequest) {
  const { error, user, serviceClient } = await requireAdmin()
  if (error) return error

  const { project_id, note } = await request.json()
  if (!project_id || !note) return NextResponse.json({ error: 'project_id and note required' }, { status: 400 })

  const { error: insertError } = await serviceClient!
    .from('admin_notes')
    .insert({ project_id, admin_id: user!.id, note })

  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
