'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import ISDLogo from '@/components/brand/ISDLogo'

export default function Footer() {
  const { dict } = useLocale()
  const t = dict.footer

  return (
    <footer className="bg-isd-dark text-white">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="md:col-span-2">
          <ISDLogo variant="white" size="sm" showWordmark={true} />
          <div className="isd-section-divider mt-6" />
          <p className="text-sm text-white/60 leading-relaxed max-w-sm mt-2">
            {t.tagline}
          </p>
          <p className="mt-6 text-xs font-mono text-isd-mint/70 tracking-widest uppercase">
            Powered by Mindful Tech
          </p>
        </div>

        {/* Platform links */}
        <div>
          <p className="isd-eyebrow text-isd-mint/80 mb-4">{t.platform}</p>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link href="/how-it-works" className="hover:text-isd-mint transition-colors">{t.howItWorks}</Link></li>
            <li><Link href="/apply" className="hover:text-isd-mint transition-colors">{t.applyFounder}</Link></li>
            <li><Link href="/join" className="hover:text-isd-mint transition-colors">{t.joinBuilder}</Link></li>
          </ul>
        </div>

        {/* Account links */}
        <div>
          <p className="isd-eyebrow text-isd-mint/80 mb-4">{t.account}</p>
          <ul className="space-y-3 text-sm text-white/60">
            <li><Link href="/login" className="hover:text-isd-mint transition-colors">{t.signIn}</Link></li>
            <li><Link href="/login?mode=signup" className="hover:text-isd-mint transition-colors">{t.signUp}</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">{t.rights}</p>
          <p className="text-xs text-white/40">{t.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
