import Badge from '@/components/ui/Badge'
import { ProjectRoleRecommendation } from '@/types/database'

interface RoleRecommendationsProps {
  recommendations: ProjectRoleRecommendation[]
}

export default function RoleRecommendations({ recommendations }: RoleRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return <p className="text-slate-400 text-sm">No role recommendations yet.</p>
  }

  return (
    <div className="space-y-3">
      {recommendations.map((rec) => (
        <div key={rec.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-medium text-slate-800 text-sm">{rec.role}</span>
              <Badge
                variant={rec.priority === 'high' ? 'danger' : rec.priority === 'medium' ? 'warning' : 'muted'}
              >
                {rec.priority}
              </Badge>
              {rec.is_filled && <Badge variant="success">Filled</Badge>}
            </div>
            {rec.reason && <p className="text-slate-500 text-xs">{rec.reason}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
