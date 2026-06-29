import { Suspense } from 'react'
import Link from 'next/link'
import LoginForm from './LoginForm'
import ISDLogo from '@/components/brand/ISDLogo'
import { getServerDictionary } from '@/lib/i18n/server'

export default function LoginPage() {
  const { dict } = getServerDictionary()
  const t = dict.login
  return (
    <div className="min-h-screen flex">
      {/* Left panel — desktop only */}
      <div className="hidden lg:flex lg:w-3/5 relative flex-col justify-between p-14 overflow-hidden isd-hero-bg">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 15% 85%, rgba(14,171,205,0.2) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 85% 15%, rgba(196,253,219,0.08) 0%, transparent 55%)',
          }}
        />

        <div className="relative">
          <Link href="/">
            <ISDLogo variant="white" size="md" showWordmark={true} />
          </Link>
        </div>

        <div className="relative space-y-8">
          <div>
            <span className="inline-block text-xs font-mono text-isd-mint/80 uppercase tracking-widest mb-6 border border-isd-mint/20 px-3 py-1 rounded-full">
              {t.badge}
            </span>
            <h2 className="font-slab font-normal text-white text-4xl leading-snug mb-4">
              {t.leftTitle1}<br />
              <span className="isd-gradient-text">{t.leftTitle2}</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-sm">
              {t.leftDesc}
            </p>
          </div>

          <ul className="space-y-5">
            {t.bullets.map((text, i) => (
              <li key={text} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-md bg-isd-teal flex items-center justify-center text-sm font-mono font-bold flex-shrink-0 text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-white/70 text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <p className="text-white/30 text-xs font-mono">
            © {new Date().getFullYear()} Innovation Smart District · Powered by Mindful Tech
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col bg-isd-light">
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="text-sm text-isd-gray hover:text-isd-dark transition-colors inline-flex items-center gap-1">
            ← {t.backHome}
          </Link>
          <div className="lg:hidden">
            <Link href="/">
              <ISDLogo variant="primary" size="sm" showWordmark={false} />
            </Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 lg:hidden">
              <h2 className="font-slab font-normal text-isd-dark text-2xl mb-1">{t.welcomeBack}</h2>
              <p className="text-isd-gray text-sm">{t.tagline}</p>
            </div>
            <div className="mb-6 text-center hidden lg:block">
              <h3 className="font-slab font-normal text-isd-dark text-2xl">{t.welcomeBack}</h3>
              <p className="text-isd-gray text-sm mt-1">{t.welcomeSub}</p>
            </div>
            <Suspense fallback={
              <div className="bg-white rounded-xl border border-isd-gray-light p-8 text-center text-isd-gray text-sm">
                {t.loading}
              </div>
            }>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
