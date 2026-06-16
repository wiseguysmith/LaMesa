import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServiceClient } from '@/lib/supabase/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const { project_id } = await request.json()

    if (!project_id) {
      return NextResponse.json({ error: 'project_id required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    // Fetch project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*, project_role_recommendations(*)')
      .eq('id', project_id)
      .single()

    if (projectError || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Fetch approved builders
    const { data: builders, error: buildersError } = await supabase
      .from('builder_profiles')
      .select('*, users(id, email, full_name)')
      .eq('approval_status', 'approved')

    if (buildersError) {
      return NextResponse.json({ error: 'Failed to fetch builders' }, { status: 500 })
    }

    if (!builders || builders.length === 0) {
      return NextResponse.json({ suggestions: [] })
    }

    const neededRoles = project.project_role_recommendations
      ?.filter((r: { is_filled: boolean }) => !r.is_filled)
      .map((r: { role: string; priority: string }) => `${r.role} (${r.priority} priority)`)
      .join(', ') || 'Various roles'

    const buildersText = builders.map((b) => `
Builder ID: ${b.user_id}
Name: ${(b.users as { full_name: string } | null)?.full_name || 'Unknown'}
Skills: ${b.skills?.join(', ') || 'None listed'}
Experience: ${b.experience_level || 'Not specified'}
Preferred Roles: ${b.preferred_roles?.join(', ') || 'None listed'}
Interests: ${b.interests?.join(', ') || 'None listed'}
Availability: ${b.availability_hours_per_week || '?'} hours/week
Collaboration: ${b.collaboration_preference || 'Not specified'}
    `.trim()).join('\n\n')

    const prompt = `You are an expert talent matching specialist for a startup incubator. Match builders to a project.

PROJECT:
Name: ${project.project_name}
Idea: ${project.one_sentence_idea}
Problem: ${project.problem}
Category: ${project.category}
Stage: ${project.stage}
Roles Needed: ${neededRoles}

AVAILABLE BUILDERS:
${buildersText}

For each builder who is a good match, provide a suggestion. Return raw JSON only (no markdown):
{
  "suggestions": [
    {
      "builder_id": "<user_id>",
      "recommended_role": "<specific role this builder should fill>",
      "match_score": <integer 0-100>,
      "match_reasons": ["<reason 1>", "<reason 2>", "<reason 3>"],
      "risks": ["<potential risk 1>"]
    }
  ]
}

Only include builders with a match_score of 50 or higher. Maximum 5 suggestions. Be specific about why each builder fits.`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected AI response' }, { status: 500 })
    }

    const result = JSON.parse(content.text)

    // Save suggestions to DB
    if (result.suggestions?.length > 0) {
      // Clear previous suggestions for this project
      await supabase.from('match_suggestions').delete().eq('project_id', project_id)

      const rows = result.suggestions.map((s: {
        builder_id: string
        recommended_role: string
        match_score: number
        match_reasons: string[]
        risks: string[]
      }) => ({
        project_id,
        builder_id: s.builder_id,
        recommended_role: s.recommended_role,
        match_score: s.match_score,
        match_reasons_json: { reasons: s.match_reasons },
        risks_json: { risks: s.risks || [] },
        status: 'pending',
      }))

      await supabase.from('match_suggestions').insert(rows)
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error('Error suggesting matches:', err)
    return NextResponse.json({ error: 'Failed to suggest matches' }, { status: 500 })
  }
}
