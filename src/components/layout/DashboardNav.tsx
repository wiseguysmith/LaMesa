'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import LanguageToggle from '@/components/i18n/LanguageToggle'
import ISDLogo from '@/components/brand/ISDLogo'
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
    <nav className="bg-white border-b border-isd-gray-light sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href={role === 'admin' ? '/admin' : '/dashboard'}>
              <ISDLogo variant="primary" size="sm" showWordmark={true} />
            </Link>

            {/* Nav links */}
            <div className="hidden sm:flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-isd-light text-isd-navy font-semibold'
                      : 'text-isd-gray hover:text-isd-dark hover:bg-isd-light'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: user info + actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <span className="text-sm text-isd-gray hidden sm:block">{fullName || t.user}</span>
            <span className="text-xs bg-isd-mint/40 text-isd-dark px-2.5 py-0.5 rounded-full font-mono capitalize border border-isd-mint/30">
              {roleLabel}
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm text-isd-gray hover:text-isd-dark transition-colors"
            >
              {t.signOut}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
