import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/adminAuth'

export async function DELETE(request: NextRequest) {
  const { error, serviceClient } = await requireAdmin()
  if (error) return error

  const { project_id, builder_id } = await request.json()
  if (!project_id || !builder_id) {
    return NextResponse.json({ error: 'project_id and builder_id required' }, { status: 400 })
  }

  const { error: deleteError } = await serviceClient!
    .from('project_members')
    .delete()
    .eq('project_id', project_id)
    .eq('user_id', builder_id)

  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
