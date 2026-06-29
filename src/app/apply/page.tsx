import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getServerDictionary } from '@/lib/i18n/server'

export default function ApplyPage() {
  const { dict } = getServerDictionary()
  const t = dict.apply

  return (
    <div className="min-h-screen flex flex-col bg-isd-light">
      <Navbar />

      {/* Hero */}
      <section className="isd-hero-bg relative overflow-hidden py-24 px-6">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle at top right, #c4fddb, transparent 65%)' }}
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <span className="inline-block bg-isd-mint/20 text-isd-mint text-xs font-mono px-3 py-1 rounded-full mb-6 border border-isd-mint/30 uppercase tracking-widest">
            {t.badge}
          </span>
          <h1 className="font-slab font-normal text-white leading-tight mb-4" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
            {t.title}
          </h1>
          <p className="text-isd-mint text-sm font-mono mb-6 tracking-wide">{t.tableLine}</p>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <Link href="/login?mode=signup&redirect=/founder/projects/new" className="isd-btn-mint text-base px-8 py-3">
            {t.cta}
          </Link>
          <p className="mt-4 text-sm text-white/50">
            {t.haveAccount}{' '}
            <Link href="/login?redirect=/founder/projects/new" className="text-isd-mint hover:underline font-medium">
              {t.signInLink}
            </Link>
          </p>
        </div>
      </section>

      {/* What happens after */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="isd-eyebrow mb-3">{t.afterTitle}</p>
            <div className="isd-section-divider mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.steps.map((item) => (
              <div key={item.number} className="isd-card p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-10 h-10 bg-isd-navy text-white rounded-md flex items-center justify-center text-sm font-mono mb-5">
                  {item.number}
                </div>
                <h3 className="font-slab text-isd-dark text-lg font-normal mb-3">{item.title}</h3>
                <p className="text-isd-gray text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Readiness score preview */}
          <div className="mt-14 flex justify-center">
            <div className="isd-card p-8 max-w-sm w-full text-center">
              <p className="isd-eyebrow mb-4">{t.sampleLabel}</p>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 36 36" className="w-32 h-32 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e0e0e0" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none"
                    stroke="#0eabcd" strokeWidth="2.5"
                    strokeDasharray="72 28" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-slab text-3xl font-normal text-isd-dark">72</span>
                  <span className="text-xs text-isd-gray">/ 100</span>
                </div>
              </div>
              <p className="font-slab text-isd-dark text-lg font-normal mb-1">{t.sampleScoreLabel}</p>
              <p className="text-isd-gray text-xs">{t.sampleScoreSub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 px-6 bg-isd-light">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="isd-eyebrow mb-3">{t.forYouTitle}</p>
            <div className="isd-section-divider mx-auto" />
          </div>
          <ul className="space-y-4">
            {t.forYou.map((item) => (
              <li key={item} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-isd-gray-light">
                <span className="w-5 h-5 rounded-full bg-isd-mint/40 text-isd-dark flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 border border-isd-mint/30">✓</span>
                <span className="text-isd-dark/80 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #efefef 0%, #c4fddb 60%, #ccf4f6 100%)' }}
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-slab font-normal text-isd-dark text-3xl md:text-4xl mb-4">{t.ctaTitle}</h2>
          <p className="text-isd-dark/70 mb-2 leading-relaxed">{t.ctaDesc}</p>
          <p className="text-isd-gray text-sm mb-8">{t.ctaNote}</p>
          <Link href="/login?mode=signup&redirect=/founder/projects/new" className="isd-btn-primary text-base px-8 py-3">
            {t.ctaButton}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
