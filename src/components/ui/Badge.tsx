import { ProjectStatus, ApprovalStatus } from '@/types/database'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted'
  className?: string
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    muted: 'bg-slate-50 text-slate-500',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const map: Record<ProjectStatus, { label: string; variant: BadgeProps['variant'] }> = {
    submitted: { label: 'Submitted', variant: 'muted' },
    under_review: { label: 'Under Review', variant: 'info' },
    roles_mapped: { label: 'Roles Mapped', variant: 'info' },
    matching: { label: 'Matching', variant: 'warning' },
    team_formed: { label: 'Team Formed', variant: 'warning' },
    building: { label: 'Building', variant: 'success' },
    prototype_ready: { label: 'Prototype Ready', variant: 'success' },
    presented_demo_day: { label: 'Demo Day', variant: 'success' },
    archived: { label: 'Archived', variant: 'muted' },
  }

  const { label, variant } = map[status] || { label: status, variant: 'default' as const }
  return <Badge variant={variant}>{label}</Badge>
}

export function ApprovalBadge({ status }: { status: ApprovalStatus }) {
  const map: Record<ApprovalStatus, { label: string; variant: BadgeProps['variant'] }> = {
    pending: { label: 'Pending', variant: 'warning' },
    approved: { label: 'Approved', variant: 'success' },
    rejected: { label: 'Rejected', variant: 'danger' },
  }

  const { label, variant } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}
