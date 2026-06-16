'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Card, { CardBody } from '@/components/ui/Card'
import { ApprovalStatus } from '@/types/database'

interface AdminBuilderActionsProps {
  builderId: string
  currentApproval: ApprovalStatus
  currentBuilderStatus?: string
  preferredTracks?: string[] | null
}

export default function AdminBuilderActions({ builderId, currentApproval, currentBuilderStatus, preferredTracks }: AdminBuilderActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const doAction = async (endpoint: string, body: Record<string, unknown>) => {
    setLoading(endpoint)
    setError(null)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Action failed')
      } else {
        router.refresh()
      }
    } catch {
      setError('Request failed')
    }
    setLoading(null)
  }

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardBody>
        <h2 className="font-semibold text-amber-900 mb-1">Admin Actions</h2>
        <p className="text-xs text-amber-700 mb-4">La Mesa Builder Network</p>
        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>
        )}

        {preferredTracks && preferredTracks.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-2">Preferred Tracks</p>
            <div className="flex flex-wrap gap-1">
              {preferredTracks.map((track) => (
                <span key={track} className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  {track}
                </span>
              ))}
            </div>
          </div>
        )}

        {currentBuilderStatus && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1">Builder Status</p>
            <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded-full capitalize">
              {currentBuilderStatus.replace(/_/g, ' ')}
            </span>
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          {currentApproval !== 'approved' && (
            <Button
              size="sm"
              variant="primary"
              loading={loading === 'approve'}
              onClick={async () => {
                setLoading('approve')
                setError(null)
                try {
                  const r1 = await fetch('/api/admin/approve-builder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ builder_id: builderId }),
                  })
                  const r2 = await fetch('/api/admin/update-builder-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ builder_id: builderId, builder_status: 'approved' }),
                  })
                  if (!r1.ok || !r2.ok) setError('Failed to approve builder')
                  else router.refresh()
                } catch {
                  setError('Request failed')
                }
                setLoading(null)
              }}
            >
              Approve for Builder Network
            </Button>
          )}
          {currentApproval !== 'rejected' && (
            <Button
              size="sm"
              variant="danger"
              loading={loading === 'reject'}
              onClick={async () => {
                setLoading('reject')
                setError(null)
                try {
                  const r1 = await fetch('/api/admin/reject-builder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ builder_id: builderId }),
                  })
                  const r2 = await fetch('/api/admin/update-builder-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ builder_id: builderId, builder_status: 'not_approved' }),
                  })
                  if (!r1.ok || !r2.ok) setError('Failed to reject builder')
                  else router.refresh()
                } catch {
                  setError('Request failed')
                }
                setLoading(null)
              }}
            >
              Not Approved
            </Button>
          )}
          {currentApproval === 'rejected' && (
            <Button
              size="sm"
              variant="secondary"
              loading={loading === '/api/admin/approve-builder'}
              onClick={() => doAction('/api/admin/approve-builder', { builder_id: builderId })}
            >
              Re-Approve
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
