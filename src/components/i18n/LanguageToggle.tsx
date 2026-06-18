'use client'

import { useLocale } from '@/lib/i18n/LocaleProvider'
import type { Locale } from '@/lib/i18n/config'

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useLocale()

  const option = (value: Locale, label: string) => (
    <button
      type="button"
      onClick={() => setLocale(value)}
      aria-pressed={locale === value}
      className={`px-2 py-0.5 rounded-full text-xs font-bold tracking-wide transition-all ${
        locale === value
          ? 'bg-terracotta text-white shadow-sm'
          : 'text-warm-muted hover:text-brown-dark'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-cool-border bg-white/70 p-0.5 backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Language"
    >
      {option('es', 'ES')}
      {option('en', 'EN')}
    </div>
  )
}
