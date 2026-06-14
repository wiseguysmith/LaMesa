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
  const color = score >= 70 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626'

  return (
    <div className="relative flex items-center justify-center">
      <svg width="128" height="128" className="-rotate-90">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold text-slate-800">{score}</div>
        <div className="text-xs text-slate-400">/100</div>
      </div>
    </div>
  )
}

function CategoryBar({ label, score }: { label: string; score: number }) {
  const color = score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-slate-700">{score}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

const CATEGORY_LABELS: Record<keyof CategoryScores, string> = {
  problem_clarity: 'Problem Clarity',
  user_clarity: 'User / Customer Clarity',
  technical_feasibility: 'Technical Feasibility',
  team_readiness: 'Team Readiness',
  timeline_realism: 'Timeline Realism',
  prototype_potential: 'Prototype Potential',
  market_impact: 'Market / Impact Potential',
}

export default function ReadinessScore({ score, categoryScores }: ReadinessScoreProps) {
  return (
    <div>
      <div className="flex items-center gap-8 mb-6">
        <ScoreRing score={score} />
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Readiness Score</p>
          <p className="text-slate-600 text-sm">
            {score >= 75
              ? 'Strong project with clear direction.'
              : score >= 50
              ? 'Solid foundation with areas to strengthen.'
              : 'Early-stage — needs more clarity before team formation.'}
          </p>
        </div>
      </div>

      {categoryScores && (
        <div className="space-y-3">
          {(Object.keys(CATEGORY_LABELS) as Array<keyof CategoryScores>).map((key) => (
            <CategoryBar key={key} label={CATEGORY_LABELS[key]} score={categoryScores[key]} />
          ))}
        </div>
      )}
    </div>
  )
}
