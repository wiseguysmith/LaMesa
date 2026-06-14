'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Card, { CardBody } from '@/components/ui/Card'
import { ProjectStatus, ApprovalStatus } from '@/types/database'

const PROJECT_STATUSES: { value: string; label: string }[] = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'roles_mapped', label: 'Roles Mapped' },
  { value: 'matching', label: 'Matching' },
  { value: 'team_formed', label: 'Team Formed' },
  { value: 'building', label: 'Building' },
  { value: 'prototype_ready', label: 'Prototype Ready' },
  { value: 'presented_demo_day', label: 'Presented / Demo Day' },
  { value: 'archived', label: 'Archived' },
]

interface AdminProjectActionsProps {
  projectId: string
  currentStatus: ProjectStatus
  currentApproval: ApprovalStatus
}

export default function AdminProjectActions({
  projectId,
  currentStatus,
  currentApproval,
}: AdminProjectActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [status, setStatus] = useState(currentStatus)
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

  const handleStatusUpdate = async () => {
    await doAction('/api/admin/update-project-status', { project_id: projectId, status })
  }

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardBody>
        <h2 className="font-semibold text-amber-900 mb-4">Admin Actions</h2>

        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>
        )}

        <div className="flex flex-wrap gap-3 mb-4">
          {currentApproval === 'pending' && (
            <>
              <Button
                size="sm"
                variant="primary"
                loading={loading === '/api/admin/approve-project'}
                onClick={() => doAction('/api/admin/approve-project', { project_id: projectId })}
              >
                Approve Project
              </Button>
              <Button
                size="sm"
                variant="danger"
                loading={loading === '/api/admin/reject-project'}
                onClick={() => doAction('/api/admin/reject-project', { project_id: projectId })}
              >
                Reject Project
              </Button>
            </>
          )}
          {currentApproval === 'approved' && (
            <Button
              size="sm"
              variant="danger"
              loading={loading === '/api/admin/reject-project'}
              onClick={() => doAction('/api/admin/reject-project', { project_id: projectId })}
            >
              Revoke Approval
            </Button>
          )}
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Select
              label="Update Status"
              options={PROJECT_STATUSES}
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            />
          </div>
          <Button
            size="md"
            variant="secondary"
            loading={loading === '/api/admin/update-project-status'}
            onClick={handleStatusUpdate}
          >
            Update
          </Button>
        </div>

        <div className="mt-4 pt-3 border-t border-amber-200">
          <a
            href="/admin/matches"
            className="text-sm text-amber-700 font-medium hover:text-amber-800"
          >
            Go to Matching for this project →
          </a>
        </div>
      </CardBody>
    </Card>
  )
}
