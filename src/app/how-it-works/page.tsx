'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLocale } from '@/lib/i18n/LocaleProvider'

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-[#DCE4ED] overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <h3 className="font-semibold text-brown-dark">{q}</h3>
        <span
          className={`text-terracotta text-xl font-light ml-4 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-warm-muted text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function HowItWorksPage() {
  const { dict } = useLocale()
  const t = dict.howPage
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A1A3A 0%, #10264C 100%)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(8,131,168,0.25) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-block bg-terracotta/20 text-terracotta-light text-sm font-semibold px-3 py-1 rounded-full mb-6 border border-terracotta/30">
            {t.badge}
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-lg text-warm-muted">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-3xl mx-auto space-y-8">
          {t.steps.map((item) => (
            <div key={item.step} className="flex gap-6 group">
              <div className="flex-shrink-0 relative">
                {/* Large decorative number */}
                <div
                  className="absolute -top-3 -left-2 text-6xl font-bold text-terracotta opacity-10 leading-none pointer-events-none select-none"
                  aria-hidden="true"
                >
                  {item.step}
                </div>
                <div className="relative w-12 h-12 bg-terracotta text-white rounded-xl flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 flex-1 border-l-4 border-terracotta shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-brown-dark text-lg">{item.title}</h3>
                  <span className="text-xs bg-sand text-terracotta px-2 py-0.5 rounded-full font-medium">{item.forRole}</span>
                </div>
                <p className="text-warm-muted leading-relaxed text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-sand">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brown-dark mb-10 text-center">{t.faqTitle}</h2>
          <div className="space-y-3">
            {t.faqs.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-brown-dark mb-4">{t.ctaTitle}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-terracotta hover:bg-[#0A6E8F] text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              {t.applyFounder}
            </Link>
            <Link
              href="/join"
              className="border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              {t.joinBuilder}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
