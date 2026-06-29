import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getServerDictionary } from '@/lib/i18n/server'

const roles = [
  { label: 'Full-Stack Developer', group: 'tech' },
  { label: 'Frontend Developer', group: 'tech' },
  { label: 'Backend Developer', group: 'tech' },
  { label: 'AI Engineer', group: 'tech' },
  { label: 'Blockchain Developer', group: 'tech' },
  { label: 'No-Code Builder', group: 'tech' },
  { label: 'UX/UI Designer', group: 'design' },
  { label: 'Content Creator', group: 'design' },
  { label: 'Product Manager', group: 'business' },
  { label: 'Marketing & Growth', group: 'business' },
  { label: 'Sales & Biz Dev', group: 'business' },
  { label: 'Operations', group: 'business' },
  { label: 'Data Analyst', group: 'business' },
  { label: 'Researcher', group: 'business' },
]

const pillStyles: Record<string, string> = {
  tech:     'bg-isd-navy text-white',
  design:   'bg-isd-teal text-white',
  business: 'bg-isd-dark-green text-white',
}

export default function JoinPage() {
  const { dict } = getServerDictionary()
  const t = dict.join

  return (
    <div className="min-h-screen flex flex-col bg-isd-light">
      <Navbar />

      {/* Hero */}
      <section className="isd-hero-bg relative overflow-hidden py-24 px-6">
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle at top right, #c4fddb, transparent 65%)' }}
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <span className="inline-block bg-isd-mint/20 text-isd-mint text-xs font-mono px-3 py-1 rounded-full mb-6 border border-isd-mint/30 uppercase tracking-widest">
            {t.badge}
          </span>
          <h1 className="font-slab font-normal text-white leading-tight mb-6" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
            {t.titleLine1}<br />
            <span className="isd-gradient-text">{t.titleLine2}</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <Link href="/login?mode=signup&redirect=/builder/profile" className="isd-btn-mint text-base px-8 py-3">
            {t.cta}
          </Link>
          <p className="mt-4 text-sm text-white/50">
            {t.haveAccount}{' '}
            <Link href="/login?redirect=/builder/profile" className="text-isd-mint hover:underline font-medium">
              {t.signInLink}
            </Link>
          </p>
        </div>
      </section>

      {/* How it works for builders */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="isd-eyebrow mb-3">{t.howTitle}</p>
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
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 px-6 bg-isd-light">
        <div className="max-w-4xl mx-auto text-center">
          <p className="isd-eyebrow mb-3">{t.rolesTitle}</p>
          <div className="isd-section-divider mx-auto" />
          <p className="text-isd-gray mt-4 mb-10 max-w-xl mx-auto">{t.rolesSubtitle}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {roles.map((role) => (
              <span key={role.label} className={`${pillStyles[role.group]} text-sm px-4 py-2 rounded-full font-medium`}>
                {role.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="isd-eyebrow mb-3">{t.forYouTitle}</p>
            <div className="isd-section-divider mx-auto" />
          </div>
          <ul className="space-y-4">
            {t.forYou.map((item) => (
              <li key={item} className="flex items-start gap-4 bg-isd-light rounded-xl p-5 border border-isd-gray-light">
                <span className="w-5 h-5 rounded-full bg-isd-mint/40 text-isd-dark flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 border border-isd-mint/30">✓</span>
                <span className="text-isd-dark/80 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="isd-hero-bg py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-slab font-normal text-white text-3xl md:text-4xl mb-4">{t.ctaTitle}</h2>
          <p className="text-white/60 mb-8 leading-relaxed">{t.ctaDesc}</p>
          <Link href="/login?mode=signup&redirect=/builder/profile" className="isd-btn-mint text-base px-8 py-3">
            {t.ctaButton}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
