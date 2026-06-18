export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'
export const LOCALE_COOKIE = 'locale'

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'es' || value === 'en'
}

// Pick a locale from an Accept-Language header. Spanish-first by default.
export function detectLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale
  // Look at the first / highest-priority language tag.
  const primary = acceptLanguage.split(',')[0]?.trim().toLowerCase() ?? ''
  if (primary.startsWith('en')) return 'en'
  if (primary.startsWith('es')) return 'es'
  // If English appears anywhere with no Spanish, prefer English; else default.
  const lower = acceptLanguage.toLowerCase()
  if (lower.includes('en') && !lower.includes('es')) return 'en'
  return defaultLocale
}
