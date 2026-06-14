'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { UserRole } from '@/types/database'

interface DashboardNavProps {
  role: UserRole
  fullName: string | null
}

export default function DashboardNav({ role, fullName }: DashboardNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const founderLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/founder/projects/new', label: 'New Project' },
  ]

  const builderLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/builder/profile', label: 'My Profile' },
    { href: '/builder/projects', label: 'My Projects' },
  ]

  const adminLinks = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/projects', label: 'Projects' },
    { href: '/admin/builders', label: 'Builders' },
    { href: '/admin/matches', label: 'Matching' },
  ]

  const links = role === 'admin' ? adminLinks : role === 'builder' ? builderLinks : founderLinks

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
            <span className="text-sm text-slate-500">{fullName || 'User'}</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full capitalize">{role}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-slate-500 hover:text-slate-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
