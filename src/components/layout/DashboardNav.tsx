'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import LanguageToggle from '@/components/i18n/LanguageToggle'
import { UserRole } from '@/types/database'

interface DashboardNavProps {
  role: UserRole
  fullName: string | null
}

export default function DashboardNav({ role, fullName }: DashboardNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const { dict } = useLocale()
  const t = dict.app.nav

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const founderLinks = [
    { href: '/dashboard', label: t.dashboard },
    { href: '/founder/projects/new', label: t.newProject },
  ]

  const builderLinks = [
    { href: '/dashboard', label: t.dashboard },
    { href: '/builder/profile', label: t.myProfile },
    { href: '/builder/projects', label: t.myProjects },
  ]

  const adminLinks = [
    { href: '/admin', label: t.overview },
    { href: '/admin/projects', label: t.projects },
    { href: '/admin/builders', label: t.builders },
    { href: '/admin/matches', label: t.matching },
  ]

  const links = role === 'admin' ? adminLinks : role === 'builder' ? builderLinks : founderLinks
  const roleLabel = role === 'admin' ? t.roleAdmin : role === 'builder' ? t.roleBuilder : t.roleFounder

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href={role === 'admin' ? '/admin' : '/dashboard'} className="text-xl font-bold text-amber-600">
              La Mesa
            </Link>
            <div className="flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <span className="text-sm text-slate-500">{fullName || t.user}</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full capitalize">{roleLabel}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-slate-500 hover:text-slate-800"
            >
              {t.signOut}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
