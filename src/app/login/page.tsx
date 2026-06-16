import { Suspense } from 'react'
import Link from 'next/link'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — desktop only */}
      <div
        className="hidden lg:flex lg:w-3/5 relative flex-col justify-between p-14 overflow-hidden"
        style={{ background: '#2D1B0E' }}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 20% 80%, rgba(194,98,45,0.35) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(245,158,11,0.12) 0%, transparent 55%)',
          }}
        />
        {/* Decorative floating blobs */}
        <div
          className="absolute top-16 right-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #C2622D 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-32 left-8 w-48 h-48 rounded-full blur-2xl opacity-15 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 right-8 w-32 h-32 rounded-full blur-2xl opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #E07848 0%, transparent 70%)' }}
        />

        {/* Content */}
        <div className="relative">
          <Link href="/" className="text-4xl font-bold text-terracotta tracking-tight">
            La Mesa
          </Link>
        </div>

        <div className="relative space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-cream leading-snug mb-4">
              Bring your idea<br />
              <span className="gradient-text">to the table.</span>
            </h2>
            <p className="text-warm-muted text-lg leading-relaxed max-w-sm">
              The platform that connects founders with the builders, designers, and thinkers who make ideas real.
            </p>
          </div>

          <ul className="space-y-5">
            {[
              { num: '1', text: 'AI maps the roles your project needs' },
              { num: '2', text: 'Get a readiness score and 30-day roadmap' },
              { num: '3', text: 'ISD coordinators assemble your team' },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-4">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white"
                  style={{ background: '#C2622D' }}
                >
                  {item.num}
                </span>
                <span className="text-warm-muted text-base">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border text-cream/70"
            style={{ borderColor: 'rgba(194,98,45,0.5)' }}
          >
            An ISD Pilot Platform
          </span>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-6">
          <Link href="/" className="text-sm text-warm-muted hover:text-terracotta transition-colors inline-flex items-center gap-1">
            ← Back to home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 lg:hidden">
              <Link href="/" className="text-3xl font-bold text-terracotta">La Mesa</Link>
              <p className="text-warm-muted mt-2 text-sm">Bring your idea to the table.</p>
            </div>
            <div className="mb-6 text-center hidden lg:block">
              <h3 className="text-xl font-bold text-brown-dark">Welcome back</h3>
              <p className="text-warm-muted text-sm mt-1">Sign in or create your account</p>
            </div>
            <Suspense fallback={<div className="bg-sand rounded-xl p-8 text-center text-warm-muted">Loading...</div>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
