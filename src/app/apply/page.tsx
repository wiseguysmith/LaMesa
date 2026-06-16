import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D1B0E 0%, #3D2510 50%, #5C3A1E 100%)' }}>
        {/* Layered gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 80% 20%, rgba(194,98,45,0.3) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 15% 85%, rgba(245,158,11,0.15) 0%, transparent 55%)',
          }}
        />
        {/* Decorative floating elements */}
        <div
          className="absolute top-10 right-12 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-8 left-8 w-40 h-40 rounded-full blur-2xl opacity-15 pointer-events-none hidden md:block"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #C2622D 0%, transparent 70%)' }}
        />

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-block bg-terracotta/20 text-terracotta-light text-sm font-semibold px-3 py-1 rounded-full mb-6 border border-terracotta/30">
            Founder Application
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Bring your idea<br />
            <span className="gradient-text">to the table.</span>
          </h1>
          <p className="text-lg text-warm-muted mb-10 max-w-2xl mx-auto">
            Submit your project and our AI will map the roles you need, score your readiness, and generate a 30-day roadmap — all before you even have a team.
          </p>
          <Link
            href="/login?mode=signup&redirect=/founder/projects/new"
            className="inline-block bg-terracotta hover:bg-[#B05525] text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors"
          >
            Apply as Founder
          </Link>
          <p className="mt-4 text-sm text-warm-muted">
            Already have an account?{' '}
            <Link href="/login?redirect=/founder/projects/new" className="text-terracotta-light hover:text-amber-400 font-medium transition-colors">
              Sign in to submit a project
            </Link>
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-brown-dark mb-10 text-center">What happens after you apply</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'AI Role Mapping',
                desc: 'Instantly see what roles and skills your project needs, with priority levels and reasoning.',
              },
              {
                number: '02',
                title: 'Readiness Score',
                desc: 'Get a 0–100 score across problem clarity, technical feasibility, timeline, and more.',
              },
              {
                number: '03',
                title: '30-Day Roadmap',
                desc: 'A week-by-week milestone plan so your team knows exactly what to tackle first.',
              },
            ].map((item) => (
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
              <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3">Sample AI Output</p>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 36 36" className="w-32 h-32 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F5E6D0" strokeWidth="2.5" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#C2622D" strokeWidth="2.5"
                    strokeDasharray="72 28"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-brown-dark">72</span>
                  <span className="text-xs text-warm-muted">/ 100</span>
                </div>
              </div>
              <p className="font-bold text-brown-dark text-lg mb-1">Readiness Score</p>
              <p className="text-warm-muted text-xs">Strong problem clarity · Team gaps identified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-20 px-4 bg-sand">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brown-dark mb-8 text-center">This is for you if...</h2>
          <ul className="space-y-4">
            {[
              'You have a startup idea, product concept, or community project you want to build.',
              'You need help defining what roles your team should include.',
              'You want a clear, structured plan before approaching potential team members.',
              "You're part of an ISD cohort, hackathon, or innovation program.",
              "You're ready to move from idea to prototype and want expert coordination.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                <span className="text-brown-mid">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #C2622D 0%, #B05525 100%)' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-xl mx-auto text-center text-white relative">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-[#F5E6D0] mb-2">
            Create an account and submit your first project — it takes less than 10 minutes.
          </p>
          <p className="text-[#E8D0B8] text-sm mb-8 opacity-80">No experience required. Just a real idea.</p>
          <Link
            href="/login?mode=signup&redirect=/founder/projects/new"
            className="inline-block bg-white text-terracotta hover:bg-[#FDF6EC] font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Apply as Founder
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
