'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const faqs = [
  {
    q: 'Is La Mesa free to use?',
    a: 'La Mesa is an ISD pilot platform. Access is managed by ISD coordinators. Reach out to your ISD program contact to get access.',
  },
  {
    q: 'How long does the AI analysis take?',
    a: 'After submitting your project, the AI analysis — readiness score, role map, and 30-day roadmap — is generated within seconds.',
  },
  {
    q: 'Can I apply as both a founder and a builder?',
    a: 'Not in the same account. You can create separate accounts if you want to participate in both roles, but most people find one role fits better.',
  },
  {
    q: "Does the admin see my profile before it's public?",
    a: 'Yes. All profiles and projects are reviewed and approved by ISD admin before they appear in matching. Nothing is automatic.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-[#F0DEC8] overflow-hidden">
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
            The Process
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">How La Mesa Works</h1>
          <p className="text-lg text-warm-muted">
            A structured, AI-assisted process to help you go from idea to team to prototype.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-3xl mx-auto space-y-8">
          {[
            {
              step: '01',
              title: 'Founders Submit Their Project',
              desc: "Founders fill out a guided application form covering the project idea, problem, target users, category, stage, skills needed, timeline, and goals. This isn't a casual note — it's a real startup application designed to capture enough information for meaningful AI analysis.",
              forRole: 'For Founders',
            },
            {
              step: '02',
              title: 'AI Analyzes the Project',
              desc: "Our AI (powered by Anthropic's Claude) reads the submission and produces: a readiness score (0–100), category scores across 7 dimensions, recommended roles with priority and reasoning, a suggested team size, and a 30-day milestone roadmap. This happens automatically after submission.",
              forRole: 'Automated',
            },
            {
              step: '03',
              title: 'Admin Reviews and Approves',
              desc: 'ISD coordinators review the project, the AI analysis, and approve or request changes. Projects are not visible to builders until they are approved. Admin maintains full control of the matching process.',
              forRole: 'For Admin',
            },
            {
              step: '04',
              title: 'Builders Create Profiles',
              desc: "Builders (students, developers, designers, marketers) fill out their profile: skills, experience, availability, preferred roles, portfolio links, and what they're looking for in a project. Profiles are reviewed and approved by admin before they are available for matching.",
              forRole: 'For Builders',
            },
            {
              step: '05',
              title: 'AI Suggests Matches',
              desc: "For approved projects needing builders, admin can trigger AI-powered match suggestions. The AI reviews builder profiles against project requirements and suggests the best fits — with scores and reasoning. Admin reviews every suggestion before assigning anyone.",
              forRole: 'AI + Admin',
            },
            {
              step: '06',
              title: 'Teams Form and Build',
              desc: 'Once builders are assigned, the team can view the project page with the full roadmap, role assignments, and progress updates. Admin tracks progress and can update project status through the pipeline from Team Formed → Building → Prototype Ready → Demo Day.',
              forRole: 'Everyone',
            },
          ].map((item) => (
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
          <h2 className="text-2xl font-bold text-brown-dark mb-10 text-center">Common Questions</h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-brown-dark mb-4">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-terracotta hover:bg-[#0A6E8F] text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Apply as Founder
            </Link>
            <Link
              href="/join"
              className="border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Join as Builder
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
