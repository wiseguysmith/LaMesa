'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Card, { CardBody } from '@/components/ui/Card'
import { ApprovalStatus } from '@/types/database'

interface AdminBuilderActionsProps {
  builderId: string
  currentApproval: ApprovalStatus
}

export default function AdminBuilderActions({ builderId, currentApproval }: AdminBuilderActionsProps) {
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
        <h2 className="font-semibold text-amber-900 mb-4">Admin Actions</h2>
        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>
        )}
        <div className="flex gap-3">
          {currentApproval !== 'approved' && (
            <Button
              size="sm"
              variant="primary"
              loading={loading === '/api/admin/approve-builder'}
              onClick={() => doAction('/api/admin/approve-builder', { builder_id: builderId })}
            >
              Approve Builder
            </Button>
          )}
          {currentApproval !== 'rejected' && (
            <Button
              size="sm"
              variant="danger"
              loading={loading === '/api/admin/reject-builder'}
              onClick={() => doAction('/api/admin/reject-builder', { builder_id: builderId })}
            >
              Reject Builder
            </Button>
          )}
          {currentApproval === 'rejected' && (
            <Button
              size="sm"
              variant="secondary"
              loading={loading === '/api/admin/approve-builder'}
              onClick={() => doAction('/api/admin/approve-builder', { builder_id: builderId })}
            >
              Re-Approve Builder
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
