'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Card, { CardBody, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { createClient } from '@/lib/supabase/client'

interface WeeklyUpdateFormProps {
  projectId: string
  currentWeek: number
}

export default function WeeklyUpdateForm({ projectId, currentWeek }: WeeklyUpdateFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [updateText, setUpdateText] = useState('')
  const [blockers, setBlockers] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!updateText.trim()) {
      setError('Please describe what your team accomplished this week.')
      return
    }
    setLoading(true)
    setError(null)
    setSuccess(false)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('You must be logged in to submit an update.')
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
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <h2 className="font-semibold text-blue-900">Week {currentWeek} Update</h2>
      </CardHeader>
      <CardBody>
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            Update submitted successfully.
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            label="What did your team accomplish this week?"
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            placeholder="Describe the progress your team made this week..."
            rows={4}
            required
          />
          <Textarea
            label="Any blockers? (optional)"
            value={blockers}
            onChange={(e) => setBlockers(e.target.value)}
            placeholder="Describe any blockers or challenges your team is facing..."
            rows={2}
          />
          <div className="flex justify-end">
            <Button type="submit" loading={loading} size="md">
              Submit Week {currentWeek} Update
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
