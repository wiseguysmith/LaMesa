'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Card, { CardBody } from '@/components/ui/Card'
import { BuilderProfile } from '@/types/database'

const EXPERIENCE_LEVELS = [
  { value: 'Junior', label: 'Junior' },
  { value: 'Mid', label: 'Mid-Level' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Lead', label: 'Lead / Principal' },
]

const COLLABORATION_OPTIONS = [
  { value: 'Portfolio/experience', label: 'Portfolio / Experience' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Equity', label: 'Equity' },
  { value: 'Volunteer/community', label: 'Volunteer / Community' },
  { value: 'To be discussed', label: 'To Be Discussed' },
]

const ALL_ROLES = [
  'Founder / Project Lead',
  'Full-Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'AI Engineer',
  'Blockchain Developer',
  'UX/UI Designer',
  'Product Manager',
  'Marketing/Growth',
  'Sales/Business Development',
  'Content Creator',
  'Operations Coordinator',
  'Data Analyst',
  'Researcher',
  'No-Code Builder',
]

interface BuilderProfileFormProps {
  userId: string
  existingProfile?: BuilderProfile | null
}

export default function BuilderProfileForm({ userId, existingProfile }: BuilderProfileFormProps) {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    location: existingProfile?.location || '',
    languages: existingProfile?.languages?.join(', ') || '',
    skills: existingProfile?.skills?.join(', ') || '',
    experience_level: existingProfile?.experience_level || '',
    portfolio_url: existingProfile?.portfolio_url || '',
    github_url: existingProfile?.github_url || '',
    linkedin_url: existingProfile?.linkedin_url || '',
    interests: existingProfile?.interests?.join(', ') || '',
    availability_hours_per_week: existingProfile?.availability_hours_per_week?.toString() || '',
    collaboration_preference: existingProfile?.collaboration_preference || '',
    project_goals: existingProfile?.project_goals || '',
    bio: existingProfile?.bio || '',
  })

  const [selectedRoles, setSelectedRoles] = useState<string[]>(existingProfile?.preferred_roles || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.skills || selectedRoles.length === 0) {
      setError('Please fill in your skills and select at least one preferred role.')
      return
    }

    setLoading(true)

    const profileData = {
      user_id: userId,
      location: form.location || null,
      languages: form.languages ? form.languages.split(',').map((s) => s.trim()).filter(Boolean) : [],
      skills: form.skills ? form.skills.split(',').map((s) => s.trim()).filter(Boolean) : [],
      experience_level: form.experience_level || null,
      preferred_roles: selectedRoles,
      portfolio_url: form.portfolio_url || null,
      github_url: form.github_url || null,
      linkedin_url: form.linkedin_url || null,
      interests: form.interests ? form.interests.split(',').map((s) => s.trim()).filter(Boolean) : [],
      availability_hours_per_week: form.availability_hours_per_week ? parseInt(form.availability_hours_per_week) : null,
      collaboration_preference: form.collaboration_preference || null,
      project_goals: form.project_goals || null,
      bio: form.bio || null,
    }

    let dbError
    if (existingProfile) {
      const { error } = await supabase
        .from('builder_profiles')
        .update(profileData)
        .eq('user_id', userId)
      dbError = error
    } else {
      const { error } = await supabase
        .from('builder_profiles')
        .insert(profileData)
      dbError = error
    }

    if (dbError) {
      setError(dbError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    router.refresh()
  }

  if (success) {
    return (
      <Card>
        <CardBody className="text-center py-12">
          <div className="text-4xl mb-4">✓</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Profile {existingProfile ? 'Updated' : 'Submitted'}</h2>
          <p className="text-slate-500 mb-6">
            {existingProfile
              ? 'Your profile has been updated.'
              : 'Your builder profile is pending admin review. You\'ll be notified when approved.'}
          </p>
          <Button onClick={() => router.push('/dashboard')} variant="secondary">
            Back to Dashboard
          </Button>
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
          <h2 className="font-semibold text-slate-800 text-lg">About You</h2>
          <Textarea
            label="Short Bio"
            value={form.bio}
            onChange={set('bio')}
            placeholder="Tell founders and the ISD team about yourself..."
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Location"
              value={form.location}
              onChange={set('location')}
              placeholder="e.g., Austin, TX / Remote"
            />
            <Input
              label="Languages"
              value={form.languages}
              onChange={set('languages')}
              placeholder="e.g., English, Spanish"
              hint="Comma-separated"
            />
          </div>
        </CardBody>
      </Card>

      {/* Skills & Experience */}
      <Card>
        <CardBody className="space-y-4">
          <h2 className="font-semibold text-slate-800 text-lg">Skills & Experience</h2>
          <Input
            label="Skills"
            value={form.skills}
            onChange={set('skills')}
            placeholder="e.g., React, Python, Figma, SEO, SQL"
            hint="Comma-separated"
            required
          />
          <Select
            label="Experience Level"
            options={EXPERIENCE_LEVELS}
            value={form.experience_level}
            onChange={set('experience_level')}
            placeholder="Select your level"
          />
          <div>
            <p className="block text-sm font-medium text-slate-700 mb-2">
              Preferred Roles <span className="text-red-500">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedRoles.includes(role)
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Links */}
      <Card>
        <CardBody className="space-y-4">
          <h2 className="font-semibold text-slate-800 text-lg">Portfolio & Links</h2>
          <Input
            label="Portfolio URL"
            type="url"
            value={form.portfolio_url}
            onChange={set('portfolio_url')}
            placeholder="https://yourportfolio.com"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="GitHub URL"
              type="url"
              value={form.github_url}
              onChange={set('github_url')}
              placeholder="https://github.com/username"
            />
            <Input
              label="LinkedIn URL"
              type="url"
              value={form.linkedin_url}
              onChange={set('linkedin_url')}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </CardBody>
      </Card>

      {/* Availability & Goals */}
      <Card>
        <CardBody className="space-y-4">
          <h2 className="font-semibold text-slate-800 text-lg">Availability & Goals</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Availability (hours/week)"
              type="number"
              value={form.availability_hours_per_week}
              onChange={set('availability_hours_per_week')}
              placeholder="e.g., 10"
              min="1"
              max="60"
            />
            <Select
              label="Collaboration Preference"
              options={COLLABORATION_OPTIONS}
              value={form.collaboration_preference}
              onChange={set('collaboration_preference')}
              placeholder="Select preference"
            />
          </div>
          <Input
            label="Interests"
            value={form.interests}
            onChange={set('interests')}
            placeholder="e.g., AI, Education, Sustainability, Healthcare"
            hint="Helps match you to projects you care about. Comma-separated."
          />
          <Textarea
            label="Project Goals"
            value={form.project_goals}
            onChange={set('project_goals')}
            placeholder="What are you hoping to get out of joining a project? Portfolio, experience, equity, learning?"
            rows={3}
          />
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" loading={loading} size="lg">
          {existingProfile ? 'Update Profile' : 'Submit Profile'}
        </Button>
      </div>
    </form>
  )
}
