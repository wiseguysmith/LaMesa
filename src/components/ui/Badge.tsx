'use client'

import { ProjectStatus, ApprovalStatus } from '@/types/database'
import { useLocale } from '@/lib/i18n/LocaleProvider'

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
  const { dict } = useLocale()
  const variantMap: Record<ProjectStatus, BadgeProps['variant']> = {
    submitted: 'muted',
    under_review: 'info',
    roles_mapped: 'info',
    matching: 'warning',
    team_formed: 'warning',
    building: 'success',
    prototype_ready: 'success',
    presented_demo_day: 'success',
    archived: 'muted',
  }

  const label = dict.app.status[status] || status
  return <Badge variant={variantMap[status] || 'default'}>{label}</Badge>
}

export function ApprovalBadge({ status }: { status: ApprovalStatus }) {
  const { dict } = useLocale()
  const variantMap: Record<ApprovalStatus, BadgeProps['variant']> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
  }

  const label = dict.app.approval[status] || status
  return <Badge variant={variantMap[status]}>{label}</Badge>
}
