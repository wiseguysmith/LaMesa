import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const { project, roleRecommendations } = await request.json()

    const rolesText = roleRecommendations
      ?.map((r: { role: string; priority: string }) => `${r.role} (${r.priority} priority)`)
      .join(', ') || 'TBD'

    const prompt = `You are a startup execution expert. Create a practical 30-day milestone roadmap for this project.

Project: ${project.project_name}
Idea: ${project.one_sentence_idea}
Problem: ${project.problem}
Category: ${project.category}
Stage: ${project.stage}
Target Team Roles: ${rolesText}
Timeline Goal: ${project.timeline || 'Prototype in 30 days'}

Create a 4-week roadmap. Return raw JSON only (no markdown, no code blocks):
{
  "weeks": [
    {
      "week": 1,
      "objective": "<clear objective for the week>",
      "tasks": ["<specific task 1>", "<specific task 2>", "<specific task 3>", "<specific task 4>"],
      "deliverables": ["<deliverable 1>", "<deliverable 2>"],
      "owner_roles": ["<role responsible>"]
    },
    {
      "week": 2,
      "objective": "<objective>",
      "tasks": ["<task 1>", "<task 2>", "<task 3>", "<task 4>"],
      "deliverables": ["<deliverable 1>", "<deliverable 2>"],
      "owner_roles": ["<role>"]
    },
    {
      "week": 3,
      "objective": "<objective>",
      "tasks": ["<task 1>", "<task 2>", "<task 3>", "<task 4>"],
      "deliverables": ["<deliverable 1>", "<deliverable 2>"],
      "owner_roles": ["<role>"]
    },
    {
      "week": 4,
      "objective": "<objective>",
      "tasks": ["<task 1>", "<task 2>", "<task 3>", "<task 4>"],
      "deliverables": ["<deliverable 1>", "<deliverable 2>"],
      "owner_roles": ["<role>"]
    }
  ]
}

Week 1 should focus on: Clarify problem, define MVP, validate assumptions
Week 2 should focus on: Build prototype foundation
Week 3 should focus on: Test with users, refine product
Week 4 should focus on: Prepare demo, pitch, and next-step plan

Make tasks specific and actionable for this particular project.`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Unexpected AI response' }, { status: 500 })
    }

    const roadmap = JSON.parse(content.text)
    return NextResponse.json(roadmap)
  } catch (err) {
    console.error('Error generating roadmap:', err)
    return NextResponse.json({ error: 'Failed to generate roadmap' }, { status: 500 })
  }
}
