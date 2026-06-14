import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/adminAuth'

export async function POST(request: NextRequest) {
  const { error, serviceClient } = await requireAdmin()
  if (error) return error

  const { project_id } = await request.json()
  if (!project_id) return NextResponse.json({ error: 'project_id required' }, { status: 400 })

  const { error: updateError } = await serviceClient!
    .from('projects')
    .update({ approval_status: 'rejected' })
    .eq('id', project_id)

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
