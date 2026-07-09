'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Card, { CardBody } from '@/components/ui/Card'
import { ProjectStatus, ApprovalStatus, FounderStatus } from '@/types/database'

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

const FOUNDER_STATUSES: { value: string; label: string }[] = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'pending_consideration', label: 'Pending Consideration' },
  { value: 'selected', label: 'Selected' },
  { value: 'not_selected', label: 'Not Selected' },
  { value: 'matched', label: 'Matched' },
  { value: 'building', label: 'Building' },
  { value: 'demo_ready', label: 'Demo Ready' },
  { value: 'alumni', label: 'Alumni' },
  { value: 'archived', label: 'Archived' },
]

interface AdminProjectActionsProps {
  projectId: string
  currentStatus: ProjectStatus
  currentApproval: ApprovalStatus
  currentFounderStatus?: FounderStatus
  track?: string | null
  batchName?: string | null
}

export default function AdminProjectActions({
  projectId,
  currentStatus,
  currentApproval,
  currentFounderStatus,
  track,
  batchName,
}: AdminProjectActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [status, setStatus] = useState(currentStatus)
  const [founderStatus, setFounderStatus] = useState<string>(currentFounderStatus || 'submitted')
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

  const handleFounderStatusUpdate = async () => {
    await doAction('/api/admin/update-founder-status', { project_id: projectId, founder_status: founderStatus })
  }

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardBody>
        <h2 className="font-semibold text-amber-900 mb-1">Admin Actions</h2>
        {batchName && (
          <p className="text-xs text-amber-700 mb-4">{batchName} · {track || 'No track'}</p>
        )}

        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">{error}</div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-5">
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

        {/* Founder 12 Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-5 pb-5 border-b border-amber-200">
          <Button
            size="sm"
            variant="primary"
            loading={loading === 'select-table01'}
            onClick={async () => {
              setLoading('select-table01')
              setError(null)
              try {
                const r1 = await fetch('/api/admin/update-founder-status', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ project_id: projectId, founder_status: 'selected' }),
                })
                const r2 = await fetch('/api/admin/update-project-status', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ project_id: projectId, status: 'roles_mapped' }),
                })
                if (!r1.ok || !r2.ok) setError('Failed to accept for Founder 12')
                else router.refresh()
              } catch {
                setError('Request failed')
              }
              setLoading(null)
            }}
          >
            Accept to Founder 12
          </Button>
          <Button
            size="sm"
            variant="secondary"
            loading={loading === 'not-selected'}
            onClick={() => doAction('/api/admin/update-founder-status', { project_id: projectId, founder_status: 'not_selected' })}
          >
            Not Selected
          </Button>
        </div>

        {/* Project Status */}
        <div className="flex items-end gap-3 mb-4">
          <div className="flex-1">
            <Select
              label="Update Project Status"
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

        {/* Founder Status */}
        <div className="flex items-end gap-3 mb-4">
          <div className="flex-1">
            <Select
              label="Update Founder Status"
              options={FOUNDER_STATUSES}
              value={founderStatus}
              onChange={(e) => setFounderStatus(e.target.value)}
            />
          </div>
          <Button
            size="md"
            variant="secondary"
            loading={loading === '/api/admin/update-founder-status'}
            onClick={handleFounderStatusUpdate}
          >
            Update
          </Button>
        </div>

        <div className="mt-4 pt-3 border-t border-amber-200">
          <a
            href="/admin/matches"
            className="text-sm text-amber-700 font-medium hover:text-amber-800"
          >
            Go to Founder 12 Team Formation
          </a>
        </div>
      </CardBody>
    </Card>
  )
}
