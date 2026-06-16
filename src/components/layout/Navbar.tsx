'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Warm announcement banner */}
      <div className="bg-terracotta text-white text-xs font-medium text-center py-2 px-4 tracking-wide">
        ISD Pilot — Now accepting founders and builders&nbsp;
        <Link href="/apply" className="underline underline-offset-2 hover:opacity-80 transition-opacity">
          Apply now →
        </Link>
      </div>

      {/* Main nav */}
      <nav
        className={`bg-cream border-b border-[#F0DEC8] transition-shadow duration-200 ${
          scrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-terracotta tracking-tight group">
              La Mesa
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-terracotta ml-0.5 mb-1 align-bottom opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/how-it-works" className="nav-link-underline text-sm font-medium text-brown-mid hover:text-terracotta transition-colors">
                How It Works
              </Link>
              <Link href="/apply" className="nav-link-underline text-sm font-medium text-brown-mid hover:text-terracotta transition-colors">
                Apply
              </Link>
              <Link href="/join" className="nav-link-underline text-sm font-medium text-brown-mid hover:text-terracotta transition-colors">
                Join
              </Link>
            </div>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-terracotta border border-terracotta hover:bg-terracotta hover:text-white px-4 py-2 rounded-full transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/apply"
                className="bg-terracotta hover:bg-[#B05525] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
              >
                Apply as Founder
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-brown-mid hover:bg-sand transition-colors"
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
          <div className="md:hidden bg-cream border-t border-[#F0DEC8] px-4 py-4 space-y-2">
            <Link
              href="/how-it-works"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-brown-mid hover:bg-sand"
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/apply"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-brown-mid hover:bg-sand"
              onClick={() => setMobileOpen(false)}
            >
              Apply as Founder
            </Link>
            <Link
              href="/join"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-brown-mid hover:bg-sand"
              onClick={() => setMobileOpen(false)}
            >
              Join as Builder
            </Link>
            <Link
              href="/login"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-terracotta hover:bg-sand"
              onClick={() => setMobileOpen(false)}
            >
              Log In
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
