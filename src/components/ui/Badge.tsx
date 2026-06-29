'use client'

import { ProjectStatus, ApprovalStatus } from '@/types/database'
import { useLocale } from '@/lib/i18n/LocaleProvider'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted' | 'navy'
  className?: string
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-isd-light text-isd-dark border border-isd-gray-light',
    success: 'bg-isd-mint/30 text-isd-dark-green border border-isd-mint',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger:  'bg-red-50 text-red-700 border border-red-200',
    info:    'bg-isd-cyan-light/40 text-isd-navy border border-isd-mint-mid/40',
    muted:   'bg-isd-light text-isd-gray border border-isd-gray-light',
    navy:    'bg-isd-navy text-white border border-isd-navy',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sans ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { dict } = useLocale()
  const variantMap: Record<ProjectStatus, BadgeProps['variant']> = {
    submitted:           'muted',
    under_review:        'info',
    roles_mapped:        'info',
    matching:            'warning',
    team_formed:         'warning',
    building:            'success',
    prototype_ready:     'success',
    presented_demo_day:  'navy',
    archived:            'muted',
  }

  const label = dict.app.status[status] || status
  return <Badge variant={variantMap[status] || 'default'}>{label}</Badge>
}

export function ApprovalBadge({ status }: { status: ApprovalStatus }) {
  const { dict } = useLocale()
  const variantMap: Record<ApprovalStatus, BadgeProps['variant']> = {
    pending:  'warning',
    approved: 'success',
    rejected: 'danger',
  }

  const label = dict.app.approval[status] || status
  return <Badge variant={variantMap[status]}>{label}</Badge>
}
