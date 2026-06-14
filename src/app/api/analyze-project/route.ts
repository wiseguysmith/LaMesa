import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const project = await request.json()

    const prompt = `You are an expert startup advisor and team formation specialist. Analyze this startup project submission and provide a comprehensive assessment.

Project Submission:
- Project Name: ${project.project_name}
- One-Sentence Idea: ${project.one_sentence_idea}
- Problem Being Solved: ${project.problem}
- Target Users: ${project.target_users || 'Not specified'}
- Category: ${project.category}
- Current Stage: ${project.stage}
- Skills Needed: ${project.skills_needed?.join(', ') || 'Not specified'}
- Timeline: ${project.timeline || 'Not specified'}
- Desired Team Size: ${project.desired_team_size || 'Not specified'}
- Collaboration Expectation: ${project.collaboration_expectation || 'Not specified'}
- Location Preference: ${project.location_preference || 'Not specified'}
- Founder Goals: ${project.founder_goals || 'Not specified'}
- Additional Notes: ${project.additional_notes || 'None'}

Provide a JSON response (no markdown, no code blocks, raw JSON only) with this exact structure:
{
  "readiness_score": <integer 0-100>,
  "category_scores": {
    "problem_clarity": <integer 0-100>,
    "user_clarity": <integer 0-100>,
    "technical_feasibility": <integer 0-100>,
    "team_readiness": <integer 0-100>,
    "timeline_realism": <integer 0-100>,
    "prototype_potential": <integer 0-100>,
    "market_impact": <integer 0-100>
  },
  "ai_summary": "<2-3 sentence project summary>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "risks": ["<risk 1>", "<risk 2>", "<risk 3>"],
  "next_steps": ["<step 1>", "<step 2>", "<step 3>"],
  "role_recommendations": [
    { "role": "<role name>", "priority": "<high|medium|low>", "reason": "<why this role is needed>" }
  ],
  "suggested_team_size": <integer>,
  "missing_info": ["<missing info 1>", "<missing info 2>"]
}

Be honest and constructive. Score based on the actual quality and completeness of the submission. Recommend realistic roles from this list: Founder / Project Lead, Full-Stack Developer, Frontend Developer, Backend Developer, AI Engineer, Blockchain Developer, UX/UI Designer, Product Manager, Marketing/Growth, Sales/Business Development, Content Creator, Operations Coordinator, Data Analyst, Researcher, No-Code Builder.`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected AI response' }, { status: 500 })
    }

    const analysis = JSON.parse(content.text)
    return NextResponse.json(analysis)
  } catch (err) {
    console.error('Error analyzing project:', err)
    return NextResponse.json({ error: 'Failed to analyze project' }, { status: 500 })
  }
}
