import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/adminAuth'

export async function POST(request: NextRequest) {
  const { error, serviceClient } = await requireAdmin()
  if (error) return error

  const { builder_id } = await request.json()
  if (!builder_id) return NextResponse.json({ error: 'builder_id required' }, { status: 400 })

  const { error: updateError } = await serviceClient!
    .from('builder_profiles')
    .update({ approval_status: 'approved' })
    .eq('user_id', builder_id)

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
