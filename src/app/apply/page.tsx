import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getServerDictionary } from '@/lib/i18n/server'

export default function ApplyPage() {
  const { dict } = getServerDictionary()
  const t = dict.apply
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A1A3A 0%, #10264C 50%, #16315E 100%)' }}>
        {/* Layered gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 80% 20%, rgba(8,131,168,0.3) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 15% 85%, rgba(245,132,31,0.15) 0%, transparent 55%)',
          }}
        />
        {/* Decorative floating elements */}
        <div
          className="absolute top-10 right-12 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #FBA94C 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-8 left-8 w-40 h-40 rounded-full blur-2xl opacity-15 pointer-events-none hidden md:block"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #0883A8 0%, transparent 70%)' }}
        />

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-block bg-terracotta/20 text-terracotta-light text-sm font-semibold px-3 py-1 rounded-full mb-6 border border-terracotta/30">
            {t.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {t.title}
          </h1>
          <p className="text-base text-amber-300 font-semibold mb-6">
            {t.tableLine}
          </p>
          <p className="text-lg text-warm-muted mb-10 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <Link
            href="/login?mode=signup&redirect=/founder/projects/new"
            className="inline-block bg-terracotta hover:bg-[#0A6E8F] text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors"
          >
            {t.cta}
          </Link>
          <p className="mt-4 text-sm text-warm-muted">
            {t.haveAccount}{' '}
            <Link href="/login?redirect=/founder/projects/new" className="text-terracotta-light hover:text-amber-400 font-medium transition-colors">
              {t.signInLink}
            </Link>
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-brown-dark mb-10 text-center">{t.afterTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.steps.map((item) => (
              <div key={item.number} className="glass-card rounded-2xl p-7 flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
                <div className="w-10 h-10 bg-terracotta text-white rounded-xl flex items-center justify-center text-sm font-bold mb-4">
                  {item.number}
                </div>
                <h3 className="font-semibold text-brown-dark mb-2">{item.title}</h3>
                <p className="text-warm-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Readiness score preview mockup */}
          <div className="mt-14 flex justify-center">
            <div className="glass-card rounded-2xl p-8 max-w-sm w-full text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">{t.sampleLabel}</p>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 36 36" className="w-32 h-32 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E6EEF7" strokeWidth="2.5" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#0883A8" strokeWidth="2.5"
                    strokeDasharray="72 28"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-brown-dark">72</span>
                  <span className="text-xs text-warm-muted">/ 100</span>
                </div>
              </div>
              <p className="font-bold text-brown-dark text-lg mb-1">{t.sampleScoreLabel}</p>
              <p className="text-warm-muted text-xs">{t.sampleScoreSub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-20 px-4 bg-sand">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brown-dark mb-8 text-center">{t.forYouTitle}</h2>
          <ul className="space-y-4">
            {t.forYou.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                <span className="text-brown-mid">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0883A8 0%, #0A6E8F 100%)' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-xl mx-auto text-center text-white relative">
          <h2 className="text-2xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-[#E6EEF7] mb-2">
            {t.ctaDesc}
          </p>
          <p className="text-white/70 text-sm mb-8 opacity-80">{t.ctaNote}</p>
          <Link
            href="/login?mode=signup&redirect=/founder/projects/new"
            className="inline-block bg-white text-terracotta hover:bg-[#F4F7FB] font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
