'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-amber-600 tracking-tight">
            La Mesa
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              How It Works
            </Link>
            <Link href="/apply" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Apply
            </Link>
            <Link href="/join" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Join
            </Link>
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-amber-700 border border-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/apply"
              className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Apply as Founder
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2">
          <Link
            href="/how-it-works"
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => setMobileOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/apply"
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => setMobileOpen(false)}
          >
            Apply as Founder
          </Link>
          <Link
            href="/join"
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => setMobileOpen(false)}
          >
            Join as Builder
          </Link>
          <Link
            href="/login"
            className="block px-3 py-2 rounded-lg text-sm font-medium text-amber-700 hover:bg-amber-50"
            onClick={() => setMobileOpen(false)}
          >
            Log In
          </Link>
        </div>
      )}
    </nav>
  )
}
