import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/adminAuth'

const VALID_FOUNDER_STATUSES = [
  'submitted',
  'pending_consideration',
  'selected',
  'not_selected',
  'matched',
  'building',
  'demo_ready',
  'alumni',
  'archived',
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

  const { project_id, founder_status } = body as { project_id?: string; founder_status?: string }

  if (!project_id || typeof project_id !== 'string') {
    return NextResponse.json({ error: 'project_id is required' }, { status: 400 })
  }
  if (!founder_status || !VALID_FOUNDER_STATUSES.includes(founder_status)) {
    return NextResponse.json({ error: `founder_status must be one of: ${VALID_FOUNDER_STATUSES.join(', ')}` }, { status: 422 })
  }

  const { error } = await serviceClient
    .from('projects')
    .update({ founder_status })
    .eq('id', project_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
