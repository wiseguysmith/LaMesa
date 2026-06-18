import { cookies, headers } from 'next/headers'
import { LOCALE_COOKIE, detectLocale, isLocale, type Locale } from './config'
import { getDictionary } from './dictionaries'

// Resolve the active locale on the server: explicit cookie wins, otherwise
// fall back to Accept-Language detection (Spanish-first).
export function getLocale(): Locale {
  const cookie = cookies().get(LOCALE_COOKIE)?.value
  if (isLocale(cookie)) return cookie
  return detectLocale(headers().get('accept-language'))
}

export function getServerDictionary() {
  const locale = getLocale()
  return { locale, dict: getDictionary(locale) }
}
