import type { Metadata } from 'next'
import './globals.css'
import { getLocale } from '@/lib/i18n/server'
import { LocaleProvider } from '@/lib/i18n/LocaleProvider'

export const metadata: Metadata = {
  title: 'La Mesa — Build Together',
  description: 'La Mesa helps founders, students, and builders form teams, map the roles they need, and move from idea to prototype.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = getLocale()

  return (
    <html lang={locale}>
      <body className="antialiased">
        <LocaleProvider initialLocale={locale}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}
