import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/adminAuth'

const VALID_OUTCOMES = [
  'prototype_ready',
  'needs_validation',
  'needs_team_support',
  'continue_after_table',
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

  const { project_id, batch_id, outcome, presentation_notes, admin_notes } = body as {
    project_id?: string
    batch_id?: string
    outcome?: string
    presentation_notes?: string
    admin_notes?: string
  }

  if (!project_id || typeof project_id !== 'string') {
    return NextResponse.json({ error: 'project_id is required' }, { status: 400 })
  }
  if (!outcome || !VALID_OUTCOMES.includes(outcome)) {
    return NextResponse.json({ error: `outcome must be one of: ${VALID_OUTCOMES.join(', ')}` }, { status: 422 })
  }

  // Insert demo day outcome record
  const { error: insertError } = await serviceClient.from('demo_day_outcomes').insert({
    project_id,
    batch_id: batch_id || null,
    outcome,
    presentation_notes: presentation_notes || null,
    admin_notes: admin_notes || null,
  })

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  // Update project founder_status based on outcome
  const newFounderStatus = outcome === 'prototype_ready' || outcome === 'continue_after_table'
    ? 'alumni'
    : 'demo_ready'

  const { error: updateError } = await serviceClient
    .from('projects')
    .update({
      founder_status: newFounderStatus,
      demo_day_outcome: outcome,
    })
    .eq('id', project_id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
