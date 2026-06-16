import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/adminAuth'

const VALID_BUILDER_STATUSES = [
  'profile_submitted',
  'pending_review',
  'approved',
  'not_approved',
  'eligible_for_matching',
  'assigned',
  'active_builder',
  'alumni_builder',
]

export async function POST(req: NextRequest) {
  const { user, serviceClient } = await requireAdmin()
  if (!user || !serviceClient) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { builder_id, builder_status } = body as { builder_id?: string; builder_status?: string }

  if (!builder_id || typeof builder_id !== 'string') {
    return NextResponse.json({ error: 'builder_id is required' }, { status: 400 })
  }
  if (!builder_status || !VALID_BUILDER_STATUSES.includes(builder_status)) {
    return NextResponse.json({ error: `builder_status must be one of: ${VALID_BUILDER_STATUSES.join(', ')}` }, { status: 422 })
  }

  const { error } = await serviceClient
    .from('builder_profiles')
    .update({ builder_status })
    .eq('user_id', builder_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // If approved, also update the users table approval_status
  if (builder_status === 'approved') {
    await serviceClient
      .from('users')
      .update({ approval_status: 'approved' })
      .eq('id', builder_id)
  } else if (builder_status === 'not_approved') {
    await serviceClient
      .from('users')
      .update({ approval_status: 'rejected' })
      .eq('id', builder_id)
  }

  return NextResponse.json({ success: true })
}
