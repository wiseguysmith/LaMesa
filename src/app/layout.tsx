import type { Metadata } from 'next'
import { Roboto, Roboto_Slab, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { getLocale } from '@/lib/i18n/server'
import { LocaleProvider } from '@/lib/i18n/LocaleProvider'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto-slab',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'La Mesa | Founder 12',
  description: 'La Mesa is the ISD Founder 12 cohort portal for Costa Rica, helping accepted founders access cohort support and admin-guided builder formation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = getLocale()

  return (
    <html lang={locale} className={`${roboto.variable} ${robotoSlab.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans">
        <LocaleProvider initialLocale={locale}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}
