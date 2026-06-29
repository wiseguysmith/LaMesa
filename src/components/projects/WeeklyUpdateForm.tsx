'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { createClient } from '@/lib/supabase/client'
import { useLocale } from '@/lib/i18n/LocaleProvider'

interface WeeklyUpdateFormProps {
  projectId: string
  currentWeek: number
}

export default function WeeklyUpdateForm({ projectId, currentWeek }: WeeklyUpdateFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const { dict } = useLocale()
  const t = dict.projectDetail
  const [updateText, setUpdateText] = useState('')
  const [blockers, setBlockers] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!updateText.trim()) {
      setError(t.errDescribe)
      return
    }
    setLoading(true)
    setError(null)
    setSuccess(false)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError(t.errLoggedIn)
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase.from('project_updates').insert({
      project_id: projectId,
      author_id: user.id,
      update_text: updateText.trim(),
      blockers: blockers.trim() || null,
      week_number: currentWeek,
    })

    if (insertError) {
      setError(insertError.message)
    } else {
      setSuccess(true)
      setUpdateText('')
      setBlockers('')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="bg-isd-teal/5 border border-isd-teal/20 rounded-xl p-6">
      <h2 className="font-slab font-normal text-isd-dark text-lg mb-4">
        {t.weekUpdate.replace('{n}', String(currentWeek))}
      </h2>
      {success && (
        <div className="mb-4 p-3 bg-isd-mint/20 border border-isd-mint/40 rounded-lg text-sm text-isd-dark-green">
          {t.updateSuccess}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          label={t.accomplishLabel}
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
          placeholder={t.accomplishPh}
          rows={4}
          required
        />
        <Textarea
          label={t.blockersLabel}
          value={blockers}
          onChange={(e) => setBlockers(e.target.value)}
          placeholder={t.blockersPh}
          rows={2}
        />
        <div className="flex justify-end">
          <Button type="submit" loading={loading} size="md">
            {t.submitUpdate.replace('{n}', String(currentWeek))}
          </Button>
        </div>
      </form>
    </div>
  )
}
