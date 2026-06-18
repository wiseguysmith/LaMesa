'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Card, { CardBody } from '@/components/ui/Card'
import { BuilderProfile } from '@/types/database'

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
  const { dict } = useLocale()
  const t = dict.builderForm

  const EXPERIENCE_LEVELS = (['Junior', 'Mid', 'Senior', 'Lead'] as const).map((v) => ({ value: v, label: t.experienceLevels[v] }))
  const COLLABORATION_OPTIONS = (['Portfolio/experience', 'Paid', 'Equity', 'Volunteer/community', 'To be discussed'] as const).map((v) => ({ value: v, label: t.collaboration[v] }))

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
      setError(t.errRequired)
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
          <h2 className="text-xl font-bold text-slate-800 mb-2">{existingProfile ? t.successUpdatedTitle : t.successSubmittedTitle}</h2>
          <p className="text-slate-500 mb-6">
            {existingProfile ? t.successUpdatedDesc : t.successSubmittedDesc}
          </p>
          <Button onClick={() => router.push('/dashboard')} variant="secondary">
            {t.backToDashboard}
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
          <h2 className="font-semibold text-slate-800 text-lg">{t.aboutSection}</h2>
          <Textarea
            label={t.bio}
            value={form.bio}
            onChange={set('bio')}
            placeholder={t.bioPh}
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t.location}
              value={form.location}
              onChange={set('location')}
              placeholder={t.locationPh}
            />
            <Input
              label={t.languages}
              value={form.languages}
              onChange={set('languages')}
              placeholder={t.languagesPh}
              hint={t.comma}
            />
          </div>
        </CardBody>
      </Card>

      {/* Skills & Experience */}
      <Card>
        <CardBody className="space-y-4">
          <h2 className="font-semibold text-slate-800 text-lg">{t.skillsSection}</h2>
          <Input
            label={t.skills}
            value={form.skills}
            onChange={set('skills')}
            placeholder={t.skillsPh}
            hint={t.comma}
            required
          />
          <Select
            label={t.experienceLevel}
            options={EXPERIENCE_LEVELS}
            value={form.experience_level}
            onChange={set('experience_level')}
            placeholder={t.experiencePh}
          />
          <div>
            <p className="block text-sm font-medium text-slate-700 mb-2">
              {t.preferredRoles} <span className="text-red-500">*</span>
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
          <h2 className="font-semibold text-slate-800 text-lg">{t.linksSection}</h2>
          <Input
            label={t.portfolio}
            type="url"
            value={form.portfolio_url}
            onChange={set('portfolio_url')}
            placeholder={t.portfolioPh}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t.github}
              type="url"
              value={form.github_url}
              onChange={set('github_url')}
              placeholder={t.githubPh}
            />
            <Input
              label={t.linkedin}
              type="url"
              value={form.linkedin_url}
              onChange={set('linkedin_url')}
              placeholder={t.linkedinPh}
            />
          </div>
        </CardBody>
      </Card>

      {/* Availability & Goals */}
      <Card>
        <CardBody className="space-y-4">
          <h2 className="font-semibold text-slate-800 text-lg">{t.availSection}</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t.availability}
              type="number"
              value={form.availability_hours_per_week}
              onChange={set('availability_hours_per_week')}
              placeholder={t.availabilityPh}
              min="1"
              max="60"
            />
            <Select
              label={t.collab}
              options={COLLABORATION_OPTIONS}
              value={form.collaboration_preference}
              onChange={set('collaboration_preference')}
              placeholder={t.collabPh}
            />
          </div>
          <Input
            label={t.interests}
            value={form.interests}
            onChange={set('interests')}
            placeholder={t.interestsPh}
            hint={t.interestsHint}
          />
          <Textarea
            label={t.projectGoals}
            value={form.project_goals}
            onChange={set('project_goals')}
            placeholder={t.projectGoalsPh}
            rows={3}
          />
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" loading={loading} size="lg">
          {existingProfile ? t.update : t.submit}
        </Button>
      </div>
    </form>
  )
}
