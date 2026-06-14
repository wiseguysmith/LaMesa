import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/adminAuth'

export async function POST(request: NextRequest) {
  const { error, serviceClient } = await requireAdmin()
  if (error) return error

  const { project_id, status } = await request.json()
  if (!project_id || !status) return NextResponse.json({ error: 'project_id and status required' }, { status: 400 })

  const { error: updateError } = await serviceClient!
    .from('projects')
    .update({ status })
    .eq('id', project_id)

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
