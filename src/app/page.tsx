import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getServerDictionary } from '@/lib/i18n/server'

export default function LandingPage() {
  const { dict } = getServerDictionary()
  const t = dict

  return (
    <div className="min-h-screen flex flex-col bg-isd-light">
      <Navbar />

      {/* ── Hero ── */}
      <section className="isd-hero-bg relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h48v1H0zm0 47h48v1H0zM0 0v48H1V0zM47 0v48h1V0z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        {/* Accent glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle at top right, #c4fddb, transparent 60%)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-36 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="isd-eyebrow text-isd-mint mb-6">{t.hero.initiative}</p>
            <h1 className="font-slab font-normal text-white leading-tight mb-6" style={{ fontSize: 'clamp(44px, 6vw, 72px)' }}>
              {t.hero.titleLine1}{' '}
              <span className="isd-gradient-text">{t.hero.titleLine2}</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="isd-btn-mint text-base px-7 py-3">
                {t.hero.applyFounder}
              </Link>
              <Link href="/how-it-works" className="isd-btn-outline text-base px-7 py-3">
                {t.hero.exploreEcosystem}
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
              {t.hero.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-slab text-isd-mint text-2xl font-normal">{stat.value}</p>
                  <p className="text-white/50 text-xs mt-0.5 font-mono tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual — Founder 12 callout card */}
          <div className="hidden md:block">
            <div className="isd-card-dark p-8 rounded-2xl">
              <p className="isd-eyebrow text-isd-mint mb-3">Now Accepting Applications</p>
              <h2 className="font-slab text-white text-4xl font-normal mb-2">Founder 12</h2>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                A selective 90-day cohort — from proof of concept to capital readiness. Beginning July 25.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { val: '12', label: 'Founders' },
                  { val: '90', label: 'Days' },
                  { val: 'Free', label: 'To Apply' },
                ].map((s) => (
                  <div key={s.label} className="text-center py-3 rounded-lg" style={{ background: 'rgba(196,253,219,0.08)' }}>
                    <p className="font-slab text-isd-mint text-xl">{s.val}</p>
                    <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/apply" className="isd-btn-mint w-full justify-center text-sm py-2.5">
                Apply at LaMesaCR.Mindfultech.Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What is La Mesa ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="isd-eyebrow mb-3">{t.about.eyebrow}</p>
            <div className="isd-section-divider" />
            <h2 className="font-slab font-normal text-isd-dark text-4xl md:text-5xl leading-tight mb-6">
              {t.about.title}
            </h2>
            <p className="text-isd-gray leading-relaxed mb-6">
              {t.about.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.about.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border border-isd-navy/20 text-isd-navy bg-isd-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* Visual accent */}
          <div className="isd-light-gradient rounded-2xl p-10 flex flex-col items-center justify-center min-h-[280px]">
            <p className="font-slab text-isd-dark text-3xl font-normal text-center leading-snug mb-4">
              &quot;The epicenter of startups in Latin America.&quot;
            </p>
            <p className="text-xs font-mono text-isd-navy/60 tracking-widest uppercase">Innovation Smart District</p>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-24 px-6 bg-isd-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="isd-eyebrow mb-3">{t.problem.eyebrow}</p>
            <div className="isd-section-divider mx-auto" />
            <h2 className="font-slab font-normal text-isd-dark text-4xl md:text-5xl mt-2">{t.problem.title}</h2>
            <p className="text-isd-gray mt-4 max-w-xl mx-auto leading-relaxed">{t.problem.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.problem.cards.map((item) => (
              <div key={item.title} className="isd-card p-8 hover:-translate-y-1 transition-transform duration-300">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-5"
                  style={{ background: 'rgba(14,171,205,0.1)' }}
                >
                  {item.icon}
                </div>
                <h3 className="font-slab text-isd-dark text-xl font-normal mb-3">{item.title}</h3>
                <p className="text-isd-gray text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="isd-eyebrow mb-3">{t.solution.eyebrow}</p>
            <div className="isd-section-divider mx-auto" />
            <h2 className="font-slab font-normal text-isd-dark text-4xl md:text-5xl mt-2">{t.solution.title}</h2>
            <p className="text-isd-gray mt-4 max-w-2xl mx-auto leading-relaxed">{t.solution.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.solution.cards.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-8 border border-isd-gray-light hover:-translate-y-1 transition-transform duration-300"
                style={{ background: 'linear-gradient(145deg, #ffffff 0%, #efefef 100%)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: 'rgba(196,253,219,0.5)' }}
                >
                  {item.icon}
                </div>
                <h3 className="font-slab text-isd-dark text-xl font-normal mb-3">{item.title}</h3>
                <p className="text-isd-gray text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="isd-hero-bg py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="isd-eyebrow text-isd-mint mb-3">{t.how.eyebrow}</p>
            <div className="isd-section-divider mx-auto" style={{ background: 'linear-gradient(90deg, #c4fddb, #8fcedc)' }} />
            <h2 className="font-slab font-normal text-white text-4xl md:text-5xl mt-2">{t.how.title}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {t.how.steps.map((item, i) => (
              <div key={item.step} className="isd-card-dark p-7 rounded-xl relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-normal mb-5"
                  style={{ background: 'rgba(196,253,219,0.15)', color: '#c4fddb', border: '1px solid rgba(196,253,219,0.3)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-slab text-white text-lg font-normal mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="isd-eyebrow mb-3">{t.who.eyebrow}</p>
            <div className="isd-section-divider mx-auto" />
            <h2 className="font-slab font-normal text-isd-dark text-4xl md:text-5xl mt-2">{t.who.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Founders */}
            <div className="isd-card p-10 border-t-4 border-isd-navy hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-slab text-isd-dark text-xl font-normal mb-3">{t.who.founders.title}</h3>
              <p className="text-isd-gray text-sm leading-relaxed mb-5">{t.who.founders.desc}</p>
              <ul className="space-y-2 text-sm text-isd-dark/70 mb-6">
                {t.who.founders.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-isd-teal font-bold mt-0.5 flex-shrink-0">✓</span> {b}
                  </li>
                ))}
              </ul>
              <Link href="/apply" className="isd-btn-primary text-sm py-2 px-5">
                {t.who.founders.cta}
              </Link>
            </div>

            {/* Builders */}
            <div className="isd-card p-10 border-t-4 border-isd-teal hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl mb-4">🛠️</div>
              <h3 className="font-slab text-isd-dark text-xl font-normal mb-3">{t.who.builders.title}</h3>
              <p className="text-isd-gray text-sm leading-relaxed mb-5">{t.who.builders.desc}</p>
              <ul className="space-y-2 text-sm text-isd-dark/70 mb-6">
                {t.who.builders.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-isd-teal font-bold mt-0.5 flex-shrink-0">✓</span> {b}
                  </li>
                ))}
              </ul>
              <Link href="/join" className="isd-btn-outline-navy text-sm py-2 px-5">
                {t.who.builders.cta}
              </Link>
            </div>

            {/* ISD */}
            <div className="isd-hero-bg p-10 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl mb-4">🌎</div>
              <h3 className="font-slab text-white text-xl font-normal mb-3">{t.who.isd.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5">{t.who.isd.desc}</p>
              <Link href="/how-it-works" className="isd-btn-mint text-sm py-2 px-5">
                {t.who.isd.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder 12 CTA ── */}
      <section
        className="py-28 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #efefef 0%, #c4fddb 60%, #ccf4f6 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="isd-eyebrow text-isd-navy mb-4">Founder 12</p>
          <div className="isd-section-divider mx-auto" />
          <h2 className="font-slab font-normal text-isd-dark text-4xl md:text-5xl mt-2 mb-5">
            {t.founderCta.title}
          </h2>
          <p className="text-isd-dark/70 text-lg leading-relaxed mb-3 max-w-2xl mx-auto">
            {t.founderCta.desc}
          </p>
          <p className="text-isd-navy/60 text-sm mb-10">{t.founderCta.note}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/apply" className="isd-btn-primary text-base px-8 py-3">
              {t.founderCta.cta}
            </Link>
          </div>
          <p className="text-isd-gray text-xs mt-5">{t.founderCta.time}</p>
        </div>
      </section>

      {/* ── Builder CTA ── */}
      <section className="isd-hero-bg py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="isd-eyebrow text-isd-mint mb-4">{t.builderCta.eyebrow ?? 'Builders'}</p>
          <div className="isd-section-divider mx-auto" style={{ background: 'linear-gradient(90deg, #c4fddb, #8fcedc)' }} />
          <h2 className="font-slab font-normal text-white text-4xl md:text-5xl mt-2 mb-5">
            {t.builderCta.title}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-3 max-w-2xl mx-auto">
            {t.builderCta.desc}
          </p>
          <p className="text-white/40 text-sm mb-10">{t.builderCta.note}</p>
          <Link href="/join" className="isd-btn-mint text-base px-8 py-3">
            {t.builderCta.cta}
          </Link>
          <p className="text-white/30 text-xs mt-5">{t.builderCta.time}</p>
        </div>
      </section>

      {/* Cohort stats */}
      <section className="py-20 px-6 bg-isd-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="isd-eyebrow text-isd-mint mb-3">{t.table.eyebrow}</p>
            <h2 className="font-slab font-normal text-white text-4xl mb-3">{t.table.title}</h2>
            <p className="text-white/50 max-w-xl mx-auto">{t.table.subtitle}</p>
          </div>
          <div className="flex justify-center gap-16 mb-10 flex-wrap">
            {t.table.stats.map((item) => (
              <div key={item.stat} className="text-center">
                <p className="font-slab text-isd-mint text-4xl font-normal">{item.stat}</p>
                <p className="text-white/40 text-sm mt-1 font-mono tracking-wide">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/apply" className="isd-btn-mint text-base px-8 py-3">
              {t.table.cta}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
