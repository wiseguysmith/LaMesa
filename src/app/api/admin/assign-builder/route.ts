import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/adminAuth'

export async function POST(request: NextRequest) {
  const { error, user, serviceClient } = await requireAdmin()
  if (error) return error

  const { project_id, builder_id, assigned_role } = await request.json()
  if (!project_id || !builder_id || !assigned_role) {
    return NextResponse.json({ error: 'project_id, builder_id, and assigned_role required' }, { status: 400 })
  }

  const { error: insertError } = await serviceClient!
    .from('project_members')
    .upsert({
      project_id,
      user_id: builder_id,
      assigned_role,
      assignment_status: 'assigned',
      assigned_by: user!.id,
    })

  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })

  // Update suggestion status to approved
  await serviceClient!
    .from('match_suggestions')
    .update({ status: 'approved' })
    .eq('project_id', project_id)
    .eq('builder_id', builder_id)

  return NextResponse.json({ success: true })
}
