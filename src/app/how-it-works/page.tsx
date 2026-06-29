'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLocale } from '@/lib/i18n/LocaleProvider'

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-isd-gray-light overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <h3 className="font-slab font-normal text-isd-dark text-base">{q}</h3>
        <span
          className={`text-isd-teal text-xl font-light ml-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 border-t border-isd-gray-light">
          <p className="text-isd-gray text-sm leading-relaxed pt-4">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function HowItWorksPage() {
  const { dict } = useLocale()
  const t = dict.howPage

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
          <h1 className="font-slab font-normal text-white text-4xl md:text-5xl mb-4">{t.title}</h1>
          <p className="text-white/70 text-lg leading-relaxed">{t.subtitle}</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6 bg-isd-light">
        <div className="max-w-3xl mx-auto space-y-6">
          {t.steps.map((item, i) => (
            <div key={item.step} className="flex gap-6 group">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-isd-navy text-white rounded-md flex items-center justify-center font-mono text-sm">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <div className="isd-card p-6 flex-1 border-l-4 border-isd-teal hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-slab font-normal text-isd-dark text-lg">{item.title}</h3>
                  <span className="text-xs bg-isd-mint/30 text-isd-dark px-2 py-0.5 rounded-full font-mono border border-isd-mint/30">
                    {item.forRole}
                  </span>
                </div>
                <p className="text-isd-gray leading-relaxed text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="isd-eyebrow mb-3">{t.faqTitle}</p>
            <div className="isd-section-divider mx-auto" />
          </div>
          <div className="space-y-3">
            {t.faqs.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #efefef 0%, #c4fddb 60%, #ccf4f6 100%)' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-slab font-normal text-isd-dark text-3xl mb-8">{t.ctaTitle}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="isd-btn-primary text-base px-7 py-3">{t.applyFounder}</Link>
            <Link href="/join" className="isd-btn-outline-navy text-base px-7 py-3">{t.joinBuilder}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
