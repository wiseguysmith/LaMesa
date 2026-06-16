'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

interface Role {
  id: string
  role: string
  priority: string
  is_filled: boolean
}

interface Member {
  id: string
  user_id: string
  assigned_role: string
  users: { full_name: string } | null
}

interface Suggestion {
  id: string
  builder_id: string
  recommended_role: string
  match_score: number | null
  match_reasons_json: { reasons: string[] } | null
  risks_json: { risks: string[] } | null
  status: string
  users: { full_name: string; email: string } | null
  builder_profiles: {
    skills: string[]
    experience_level: string
    availability_hours_per_week: number
    preferred_tracks?: string[]
  } | null
}

interface MatchCardProps {
  projectId: string
  projectName: string
  projectTrack?: string | null
  roles: Role[]
  members: Member[]
  suggestions: Suggestion[]
  unfilledRoles: Role[]  // kept for parent to pass, not used internally
}

export default function MatchCard({
  projectId,
  projectTrack,
  roles,
  members,
  suggestions: initialSuggestions,
}: MatchCardProps) {
  const router = useRouter()
  const [suggestions, setSuggestions] = useState(initialSuggestions)
  const [loadingMatch, setLoadingMatch] = useState(false)
  const [loadingAssign, setLoadingAssign] = useState<string | null>(null)
  const [loadingRemove, setLoadingRemove] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runMatchSuggestions = async () => {
    setLoadingMatch(true)
    setError(null)
    try {
      const res = await fetch('/api/suggest-matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to run match suggestions')
      } else {
        setSuggestions(data.suggestions || [])
        router.refresh()
      }
    } catch {
      setError('Request failed')
    }
    setLoadingMatch(false)
  }

  const assignBuilder = async (builderId: string, role: string) => {
    setLoadingAssign(builderId)
    setError(null)
    try {
      const res = await fetch('/api/admin/assign-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, builder_id: builderId, assigned_role: role }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to assign builder')
      } else {
        router.refresh()
      }
    } catch {
      setError('Request failed')
    }
    setLoadingAssign(null)
  }

  const removeBuilder = async (builderId: string) => {
    setLoadingRemove(builderId)
    setError(null)
    try {
      const res = await fetch('/api/admin/remove-builder', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, builder_id: builderId }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to remove builder')
      } else {
        router.refresh()
      }
    } catch {
      setError('Request failed')
    }
    setLoadingRemove(null)
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
      )}

      {/* Roles summary */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Role Status</p>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <span
              key={role.id}
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                role.is_filled
                  ? 'bg-green-100 text-green-700'
                  : role.priority === 'high'
                  ? 'bg-red-50 text-red-600'
                  : role.priority === 'medium'
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {role.is_filled ? '✓ ' : ''}{role.role}
            </span>
          ))}
        </div>
      </div>

      {/* Assigned members */}
      {members.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Assigned Team</p>
          <div className="space-y-2">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-2 bg-green-50 border border-green-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-xs font-bold">
                    {member.users?.full_name?.[0] || '?'}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-800">{member.users?.full_name}</span>
                    <span className="text-xs text-slate-400 ml-2">{member.assigned_role}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  loading={loadingRemove === member.user_id}
                  onClick={() => removeBuilder(member.user_id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Match suggestions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            AI Match Suggestions {suggestions.length > 0 && `(${suggestions.length})`}
          </p>
          <Button
            size="sm"
            variant="secondary"
            loading={loadingMatch}
            onClick={runMatchSuggestions}
          >
            {suggestions.length > 0 ? 'Re-run AI Suggestions' : 'Run AI Match Suggestions'}
          </Button>
        </div>

        {suggestions.length === 0 ? (
          <p className="text-slate-400 text-sm">No suggestions yet. Click &quot;Run AI Match Suggestions&quot; to generate matches.</p>
        ) : (
          <div className="space-y-3">
            {suggestions
              .filter((s) => s.status !== 'approved')
              .map((suggestion) => (
                <div key={suggestion.id} className="p-4 bg-white border border-slate-200 rounded-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium text-slate-800 text-sm">
                          {suggestion.users?.full_name || 'Unknown'}
                        </span>
                        <span className="text-xs text-slate-400">{suggestion.users?.email}</span>
                        {suggestion.match_score !== null && (
                          <Badge variant={suggestion.match_score >= 75 ? 'success' : suggestion.match_score >= 60 ? 'warning' : 'default'}>
                            {suggestion.match_score}% match
                          </Badge>
                        )}
                        {projectTrack && suggestion.builder_profiles?.preferred_tracks?.includes(projectTrack) && (
                          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                            Track match: {projectTrack}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-amber-700 font-medium mb-1">Suggested for: {suggestion.recommended_role}</p>
                      <div className="flex gap-4 text-xs text-slate-500 mb-2">
                        {suggestion.builder_profiles?.skills && (
                          <span>Skills: {suggestion.builder_profiles.skills.slice(0, 4).join(', ')}</span>
                        )}
                        {suggestion.builder_profiles?.availability_hours_per_week && (
                          <span>{suggestion.builder_profiles.availability_hours_per_week}h/wk available</span>
                        )}
                      </div>
                      {suggestion.match_reasons_json?.reasons && (
                        <ul className="space-y-0.5">
                          {suggestion.match_reasons_json.reasons.slice(0, 2).map((reason, i) => (
                            <li key={i} className="text-xs text-slate-500">• {reason}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="primary"
                      loading={loadingAssign === suggestion.builder_id}
                      onClick={() => assignBuilder(suggestion.builder_id, suggestion.recommended_role)}
                    >
                      Assign
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
