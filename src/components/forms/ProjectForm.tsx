'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Card, { CardBody } from '@/components/ui/Card'
import { Track } from '@/types/database'

const CATEGORIES = [
  { value: 'AI', label: 'AI' },
  { value: 'Blockchain/Web3', label: 'Blockchain / Web3' },
  { value: 'Robotics', label: 'Robotics' },
  { value: 'Education', label: 'Education' },
  { value: 'Fintech', label: 'Fintech' },
  { value: 'Health/Wellness', label: 'Health / Wellness' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Climate/Sustainability', label: 'Climate / Sustainability' },
  { value: 'Creative/Media', label: 'Creative / Media' },
  { value: 'Community Impact', label: 'Community Impact' },
  { value: 'Other', label: 'Other' },
]

const STAGES = [
  { value: 'Idea', label: 'Idea' },
  { value: 'Research', label: 'Research' },
  { value: 'Prototype', label: 'Prototype' },
  { value: 'MVP', label: 'MVP' },
  { value: 'Launched', label: 'Launched' },
]

const COLLABORATION = [
  { value: 'Portfolio/experience', label: 'Portfolio / Experience' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Equity', label: 'Equity' },
  { value: 'Volunteer/community', label: 'Volunteer / Community' },
  { value: 'To be discussed', label: 'To Be Discussed' },
]

const TRACKS: { value: Track; label: string; description: string }[] = [
  { value: 'AI', label: 'AI', description: 'Intelligent software, agents, ML, data products' },
  { value: 'Web3', label: 'Web3', description: 'Blockchain, smart contracts, decentralized apps' },
  { value: 'Robotics', label: 'Robotics', description: 'Hardware, automation, physical-world systems' },
  { value: 'Climate', label: 'Climate', description: 'Sustainability, energy, circular economy, environment' },
  { value: 'Community Impact', label: 'Community Impact', description: 'Civic tech, education, health access, equity' },
  { value: 'Student Founder', label: 'Student Founder', description: 'First-time founders from schools or youth programs' },
  { value: 'Technical Founder', label: 'Technical Founder', description: 'Builders turning technical insight into startups' },
  { value: 'Nontechnical Founder', label: 'Nontechnical Founder', description: 'Domain experts and operators who need technical collaborators' },
]

interface ProjectFormProps {
  userId: string
}

export default function ProjectForm({ userId }: ProjectFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    project_name: '',
    one_sentence_idea: '',
    problem: '',
    target_users: '',
    category: '',
    stage: '',
    skills_needed: '',
    timeline: '',
    availability_expectation: '',
    desired_team_size: '',
    collaboration_expectation: '',
    location_preference: '',
    founder_goals: '',
    additional_notes: '',
  })
  const [primaryTrack, setPrimaryTrack] = useState<Track | ''>('')
  const [secondaryTrack, setSecondaryTrack] = useState<Track | ''>('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'form' | 'analyzing'>('form')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.project_name || !form.one_sentence_idea || !form.problem || !form.category || !form.stage) {
      setError('Please fill in all required fields.')
      return
    }
    if (!primaryTrack) {
      setError('Please select a track for your project.')
      return
    }

    setLoading(true)
    setStep('analyzing')

    try {
      const projectData = {
        founder_id: userId,
        project_name: form.project_name,
        one_sentence_idea: form.one_sentence_idea,
        problem: form.problem,
        target_users: form.target_users || null,
        category: form.category,
        stage: form.stage,
        skills_needed: form.skills_needed ? form.skills_needed.split(',').map((s) => s.trim()).filter(Boolean) : [],
        timeline: form.timeline || null,
        availability_expectation: form.availability_expectation || null,
        desired_team_size: form.desired_team_size ? parseInt(form.desired_team_size) : null,
        collaboration_expectation: form.collaboration_expectation || null,
        location_preference: form.location_preference || null,
        founder_goals: form.founder_goals || null,
        additional_notes: form.additional_notes || null,
        status: 'submitted',
        approval_status: 'pending',
        track: primaryTrack || null,
        secondary_track: secondaryTrack || null,
        founder_status: 'pending_consideration',
      }

      // Insert project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single()

      if (projectError || !project) {
        setError(projectError?.message || 'Failed to save project')
        setLoading(false)
        setStep('form')
        return
      }

      // Trigger AI analysis
      const analysisRes = await fetch('/api/analyze-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      })

      if (analysisRes.ok) {
        const analysis = await analysisRes.json()

        // Update project with AI results
        await supabase
          .from('projects')
          .update({
            readiness_score: analysis.readiness_score,
            ai_summary: analysis.ai_summary,
            ai_analysis_json: analysis,
            status: 'roles_mapped',
          })
          .eq('id', project.id)

        // Save role recommendations
        if (analysis.role_recommendations?.length > 0) {
          const roleRows = analysis.role_recommendations.map((r: { role: string; priority: string; reason: string }) => ({
            project_id: project.id,
            role: r.role,
            priority: r.priority,
            reason: r.reason,
            is_filled: false,
          }))
          await supabase.from('project_role_recommendations').insert(roleRows)
        }

        // Generate roadmap
        const roadmapRes = await fetch('/api/generate-roadmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ project: projectData, roleRecommendations: analysis.role_recommendations }),
        })

        if (roadmapRes.ok) {
          const roadmap = await roadmapRes.json()
          await supabase.from('project_roadmaps').insert({
            project_id: project.id,
            roadmap_json: roadmap,
          })
        }
      }

      router.push(`/founder/projects/${project.id}`)
    } catch (err) {
      console.error(err)
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
      setStep('form')
    }
  }

  if (step === 'analyzing') {
    return (
      <Card>
        <CardBody className="text-center py-20">
          <div className="flex justify-center mb-6">
            <svg className="animate-spin h-12 w-12 text-amber-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Submitting your application...</h2>
          <p className="text-slate-500">
            Our AI is reviewing your project, mapping roles, and generating your 30-day roadmap. This takes about 15 seconds.
          </p>
          <p className="text-sm text-amber-700 font-medium mt-3">La Mesa Summer 2026 Table · Table 01</p>
        </CardBody>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <Card>
        <CardBody className="space-y-4">
          <h2 className="font-semibold text-slate-800 text-lg">Project Basics</h2>
          <Input
            label="Project Name"
            value={form.project_name}
            onChange={set('project_name')}
            placeholder="My Startup Name"
            required
          />
          <Input
            label="One-Sentence Idea"
            value={form.one_sentence_idea}
            onChange={set('one_sentence_idea')}
            placeholder="A platform that helps X do Y by doing Z"
            required
            hint="Keep it clear and specific. This is your elevator pitch."
          />
          <Textarea
            label="Problem Being Solved"
            value={form.problem}
            onChange={set('problem')}
            placeholder="Describe the specific problem you're solving and why it matters..."
            required
            rows={4}
          />
          <Input
            label="Target Users"
            value={form.target_users}
            onChange={set('target_users')}
            placeholder="e.g., Small business owners, college students, healthcare workers"
          />
        </CardBody>
      </Card>

      {/* Project Details */}
      <Card>
        <CardBody className="space-y-4">
          <h2 className="font-semibold text-slate-800 text-lg">Project Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              options={CATEGORIES}
              value={form.category}
              onChange={set('category')}
              placeholder="Select a category"
              required
            />
            <Select
              label="Current Stage"
              options={STAGES}
              value={form.stage}
              onChange={set('stage')}
              placeholder="Select a stage"
              required
            />
          </div>
          <Input
            label="Skills Needed"
            value={form.skills_needed}
            onChange={set('skills_needed')}
            placeholder="e.g., React, Python, UI Design, Marketing"
            hint="Separate with commas"
          />
          <Input
            label="Timeline"
            value={form.timeline}
            onChange={set('timeline')}
            placeholder="e.g., 30 days to prototype, 3 months to MVP"
          />
        </CardBody>
      </Card>

      {/* Team & Collaboration */}
      <Card>
        <CardBody className="space-y-4">
          <h2 className="font-semibold text-slate-800 text-lg">Team & Collaboration</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Desired Team Size"
              type="number"
              value={form.desired_team_size}
              onChange={set('desired_team_size')}
              placeholder="e.g., 4"
              min="1"
              max="20"
            />
            <Select
              label="Collaboration Expectation"
              options={COLLABORATION}
              value={form.collaboration_expectation}
              onChange={set('collaboration_expectation')}
              placeholder="Select expectation"
            />
          </div>
          <Input
            label="Availability Expectation"
            value={form.availability_expectation}
            onChange={set('availability_expectation')}
            placeholder="e.g., 10 hours/week for 4 weeks"
          />
          <Input
            label="Location Preference"
            value={form.location_preference}
            onChange={set('location_preference')}
            placeholder="e.g., Remote, Austin TX, Hybrid"
          />
        </CardBody>
      </Card>

      {/* Goals & Notes */}
      <Card>
        <CardBody className="space-y-4">
          <h2 className="font-semibold text-slate-800 text-lg">Goals & Additional Info</h2>
          <Textarea
            label="Founder Goals"
            value={form.founder_goals}
            onChange={set('founder_goals')}
            placeholder="What do you want to achieve? What does success look like for you?"
            rows={3}
          />
          <Textarea
            label="Additional Notes"
            value={form.additional_notes}
            onChange={set('additional_notes')}
            placeholder="Anything else we should know about your project..."
            rows={3}
          />
        </CardBody>
      </Card>

      {/* Track Selection */}
      <Card>
        <CardBody className="space-y-4">
          <div>
            <h2 className="font-semibold text-slate-800 text-lg mb-1">Which track best fits your project?</h2>
            <p className="text-slate-500 text-sm">Select your primary track. You may also choose an optional secondary track.</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Primary Track <span className="text-red-500">*</span></p>
            <div className="grid grid-cols-2 gap-3">
              {TRACKS.map((track) => (
                <button
                  key={track.value}
                  type="button"
                  onClick={() => setPrimaryTrack(track.value)}
                  className={`text-left p-3 rounded-lg border-2 transition-all ${
                    primaryTrack === track.value
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30'
                  }`}
                >
                  <p className={`font-semibold text-sm ${primaryTrack === track.value ? 'text-amber-800' : 'text-slate-800'}`}>
                    {track.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{track.description}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Secondary Track <span className="text-slate-400">(optional)</span></p>
            <div className="grid grid-cols-2 gap-3">
              {TRACKS.filter((t) => t.value !== primaryTrack).map((track) => (
                <button
                  key={track.value}
                  type="button"
                  onClick={() => setSecondaryTrack(secondaryTrack === track.value ? '' : track.value)}
                  className={`text-left p-3 rounded-lg border-2 transition-all ${
                    secondaryTrack === track.value
                      ? 'border-slate-400 bg-slate-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <p className={`font-semibold text-sm ${secondaryTrack === track.value ? 'text-slate-800' : 'text-slate-600'}`}>
                    {track.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{track.description}</p>
                </button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" loading={loading} size="lg">
          Apply for a seat at La Mesa
        </Button>
      </div>
    </form>
  )
}
