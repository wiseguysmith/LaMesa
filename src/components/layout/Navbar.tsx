'use client'

import Link from 'next/link'
import { useState } from 'react'
import ISDLogo from '@/components/brand/ISDLogo'
import LanguageToggle from '@/components/i18n/LanguageToggle'
import { useLocale } from '@/lib/i18n/LocaleProvider'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { dict } = useLocale()
  const t = dict.nav

  return (
    <>
      {/* Top announcement bar */}
      <div className="w-full bg-isd-navy text-white text-xs font-sans text-center py-2 px-4">
        <span className="opacity-80">{t.banner}</span>
        <Link href="/apply" className="ml-3 text-isd-mint font-medium hover:underline">
          {t.applyNow} →
        </Link>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-isd-gray-light">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <ISDLogo variant="primary" size="sm" showWordmark={true} />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="isd-nav-link">{t.howItWorks}</Link>
            <Link href="/apply" className="isd-nav-link">{t.apply}</Link>
            <Link href="/join" className="isd-nav-link">{t.join}</Link>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <Link href="/login" className="isd-nav-link text-sm px-3 py-1.5">
              {t.logIn}
            </Link>
            <Link href="/apply" className="isd-btn-primary text-sm py-2 px-5">
              {t.applyFounder}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded text-isd-dark hover:bg-isd-light"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {open ? (
                <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <>
                  <rect x="3" y="6" width="16" height="1.8" rx="0.9" fill="currentColor" />
                  <rect x="3" y="10.1" width="16" height="1.8" rx="0.9" fill="currentColor" />
                  <rect x="3" y="14.2" width="16" height="1.8" rx="0.9" fill="currentColor" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white border-t border-isd-gray-light px-6 py-4 flex flex-col gap-4">
            <Link href="/how-it-works" className="isd-nav-link text-base" onClick={() => setOpen(false)}>{t.howItWorks}</Link>
            <Link href="/apply" className="isd-nav-link text-base" onClick={() => setOpen(false)}>{t.apply}</Link>
            <Link href="/join" className="isd-nav-link text-base" onClick={() => setOpen(false)}>{t.join}</Link>
            <Link href="/login" className="isd-nav-link text-base" onClick={() => setOpen(false)}>{t.logIn}</Link>
            <div className="flex items-center justify-between pt-2 border-t border-isd-gray-light">
              <LanguageToggle />
              <Link href="/apply" className="isd-btn-primary text-sm py-2 px-5" onClick={() => setOpen(false)}>
                {t.applyFounder}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
