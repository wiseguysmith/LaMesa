'use client'

import { useLocale } from '@/lib/i18n/LocaleProvider'

interface CategoryScores {
  problem_clarity: number
  user_clarity: number
  technical_feasibility: number
  team_readiness: number
  timeline_realism: number
  prototype_potential: number
  market_impact: number
}

interface ReadinessScoreProps {
  score: number
  categoryScores?: CategoryScores
}

function ScoreRing({ score }: { score: number }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 70 ? '#0eabcd' : score >= 50 ? '#d97706' : '#dc2626'

  return (
    <div className="relative flex items-center justify-center">
      <svg width="128" height="128" className="-rotate-90">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#e0e0e0" strokeWidth="10" />
        <circle
          cx="64" cy="64" r={radius} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-slab font-normal text-isd-dark text-3xl">{score}</div>
        <div className="text-xs text-isd-gray">/100</div>
      </div>
    </div>
  )
}

function CategoryBar({ label, score }: { label: string; score: number }) {
  const color = score >= 70 ? 'bg-isd-teal' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-isd-gray">{label}</span>
        <span className="font-mono text-isd-dark">{score}</span>
      </div>
      <div className="h-1.5 bg-isd-gray-light rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export default function ReadinessScore({ score, categoryScores }: ReadinessScoreProps) {
  const { dict } = useLocale()
  const t = dict.projectDetail
  const categoryKeys: Array<keyof CategoryScores> = ['problem_clarity', 'user_clarity', 'technical_feasibility', 'team_readiness', 'timeline_realism', 'prototype_potential', 'market_impact']
  return (
    <div>
      <div className="flex items-center gap-6 mb-6">
        <ScoreRing score={score} />
        <div>
          <p className="text-xs font-mono text-isd-gray uppercase tracking-wide mb-1">{t.readinessScore}</p>
          <p className="text-isd-dark text-sm font-medium">
            {score >= 75 ? t.readinessStrong : score >= 50 ? t.readinessSolid : t.readinessEarly}
          </p>
        </div>
      </div>

      {categoryScores && (
        <div className="space-y-3 pt-4 border-t border-isd-gray-light">
          {categoryKeys.map((key) => (
            <CategoryBar key={key} label={t.categories[key]} score={categoryScores[key]} />
          ))}
        </div>
      )}
    </div>
  )
}
