import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center bg-cream overflow-hidden px-4 py-24 texture-overlay">
        {/* Layered radial gradients for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 75% 15%, rgba(6,182,212,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 15% 80%, rgba(59,130,246,0.14) 0%, transparent 55%), radial-gradient(ellipse 90% 80% at 50% 50%, #F4F7FB 30%, transparent 100%)',
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232D1B0E' fill-opacity='1'%3E%3Cpath d='M0 0h40v1H0zm0 39h40v1H0zM0 0v40H1V0zM39 0v40h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Decorative floating circles */}
        <div
          className="absolute top-20 right-12 w-80 h-80 rounded-full opacity-20 pointer-events-none blur-3xl"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-24 left-8 w-56 h-56 rounded-full opacity-15 pointer-events-none blur-2xl"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #0883A8 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 right-4 w-32 h-32 rounded-full opacity-10 pointer-events-none blur-xl hidden md:block"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #0883A8 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-32 left-1/4 w-20 h-20 rounded-full opacity-10 pointer-events-none blur-xl hidden md:block"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="animate-fade-up flex flex-col items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-warm-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" aria-hidden="true" />
              An Innovation Smart District Initiative
            </span>
            <a
              href="/apply"
              className="inline-block bg-terracotta text-white text-sm font-semibold px-4 py-1.5 rounded-full tracking-wide hover:bg-[#0A6E8F] transition-colors"
            >
              La Mesa Summer 2026 Table — Now accepting applications →
            </a>
          </div>

          {/* H1 */}
          <h1 className="animate-fade-up-delay-1 text-7xl md:text-8xl font-bold leading-tight mb-6">
            <span className="text-brown-dark">Bring your idea</span>
            <br />
            <span className="gradient-text">to the table.</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up-delay-2 text-lg leading-relaxed text-warm-muted max-w-lg mx-auto mb-10">
            La Mesa helps founders, students, and builders form teams, map the roles they need, and move from idea to prototype.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/apply"
              className="bg-terracotta hover:bg-[#0A6E8F] text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors warm-glow"
            >
              Apply as Founder
            </Link>
            <Link
              href="/join"
              className="border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors"
            >
              Join as Builder
            </Link>
          </div>

          {/* Stats row — pill style */}
          <div className="animate-fade-up-delay-3 flex items-center justify-center gap-3 flex-wrap">
            {[
              'Batch 01',
              '30-Day Build Cycle',
              'ISD Powered',
            ].map((stat) => (
              <span
                key={stat}
                className="bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-semibold text-brown-dark border border-brown-dark/10"
                style={{ boxShadow: '0 2px 8px rgba(10,26,58,0.08)' }}
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta text-center mb-4">
            The Problem
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-brown-dark mb-4 text-center">
            Great ideas die alone.
          </h2>
          <p className="text-center text-warm-muted text-lg leading-relaxed mb-14 max-w-xl mx-auto">
            Finding the right people to build with is one of the hardest parts of turning an idea into something real.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💡',
                title: 'Ideas stall without teams',
                desc: 'Most early-stage founders have the vision but not the builders. Ideas die in isolation.',
              },
              {
                icon: '🎯',
                title: 'Skills go unmatched',
                desc: "Talented students and builders want to contribute but can't find the right projects to join.",
              },
              {
                icon: '🗺️',
                title: 'No structured path',
                desc: 'Without a clear process, early teams waste weeks figuring out who should do what.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-7 border-l-4 border-terracotta transition-all duration-300 group hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(8,131,168,0.15)',
                  borderLeft: '4px solid #0883A8',
                  boxShadow: '0 4px 24px rgba(10,26,58,0.08), 0 1px 4px rgba(10,26,58,0.04)',
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 text-lg" style={{ background: 'rgba(8,131,168,0.10)' }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-brown-dark text-lg mb-2 relative">
                  {item.title}
                </h3>
                <p className="text-warm-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="py-16 px-4 bg-cream relative overflow-hidden">
        {/* Decorative blurred circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta mb-4">
            The Solution
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-brown-dark mb-4">
            AI-powered team formation.
          </h2>
          <p className="text-warm-muted text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            La Mesa uses AI to map the roles your project needs, score your readiness, and help ISD coordinators assemble aligned, capable teams — fast.
          </p>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connecting arrows between cards — desktop only */}
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 items-center justify-around pointer-events-none px-[33%] z-10" aria-hidden="true">
              <span className="text-terracotta/40 text-2xl font-bold select-none">→</span>
            </div>
            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 items-center justify-around pointer-events-none px-[0%] z-10" aria-hidden="true">
              <span className="text-transparent select-none">→</span>
              <span className="text-terracotta/40 text-2xl font-bold select-none">→</span>
              <span className="text-transparent select-none">→</span>
            </div>
            {[
              {
                icon: '🧭',
                title: 'AI Role Mapping',
                desc: 'Submit your idea and get an instant breakdown of what roles and skills your project needs.',
              },
              {
                icon: '📊',
                title: 'Readiness Score',
                desc: "Get a clear picture of your project's strengths, gaps, and what to tackle first.",
              },
              {
                icon: '🤝',
                title: 'Admin-Guided Matching',
                desc: 'ISD coordinators review AI suggestions and assemble your team with care.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group border-t-[3px] border-terracotta"
                style={{ background: '#E6EEF7', boxShadow: '0 4px 20px rgba(10,26,58,0.07)' }}
              >
                <div className="w-14 h-14 bg-terracotta rounded-full flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-brown-dark text-lg mb-2">{item.title}</h3>
                <p className="text-warm-muted leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-4 bg-brown-dark relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-10"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #0883A8 0%, transparent 70%)' }}
        />
        <div className="max-w-4xl mx-auto relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-light text-center mb-4">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-cream text-center mb-16">
            Four steps to your team.
          </h2>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting line — desktop only */}
            <div
              className="absolute top-8 left-[12%] right-[12%] h-px hidden md:block"
              aria-hidden="true"
              style={{ background: 'linear-gradient(to right, transparent, rgba(8,131,168,0.4), transparent)' }}
            />
            {[
              {
                step: '01',
                title: 'Submit Your Idea',
                desc: 'Fill out the founder application with your project details, goals, and what you need.',
              },
              {
                step: '02',
                title: 'AI Analysis',
                desc: 'Our AI scores your project, maps recommended roles, and generates a 30-day roadmap.',
              },
              {
                step: '03',
                title: 'ISD Forms Your Table Team',
                desc: 'ISD coordinators review AI suggestions and assemble your Table 01 team with care.',
              },
              {
                step: '04',
                title: 'Build Together',
                desc: 'Your team forms, aligned on the roadmap. Track progress and move toward prototype.',
              },
            ].map((item) => (
              <div key={item.step} className="glass-card-dark rounded-2xl p-6 text-center relative">
                {/* Large decorative number behind content */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-bold text-terracotta opacity-10 leading-none pointer-events-none select-none"
                  aria-hidden="true"
                >
                  {item.step}
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-terracotta text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-cream text-base mb-3">{item.title}</h3>
                  <p className="text-warm-muted leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta text-center mb-4">
            Who It&apos;s For
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-brown-dark mb-14 text-center">
            Built for builders and dreamers.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Founders */}
            <div
              className="rounded-3xl p-10 border-t-4 border-terracotta md:col-span-1 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #E6EEF7 0%, #F4F7FB 100%)', minHeight: '380px' }}
            >
              {/* Watermark emoji */}
              <div className="absolute bottom-4 right-4 text-8xl opacity-[0.07] pointer-events-none select-none" aria-hidden="true">🚀</div>
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-bold text-brown-dark text-xl mb-3">Founders with Ideas</h3>
              <p className="text-warm-muted leading-relaxed mb-5">
                You have a startup idea, a product vision, or a project you want to bring to life — but you need a team.
              </p>
              <ul className="space-y-2 text-sm text-brown-mid mb-6">
                <li className="flex items-start gap-2"><span className="text-terracotta font-bold mt-0.5">✓</span> AI role mapping for your project</li>
                <li className="flex items-start gap-2"><span className="text-terracotta font-bold mt-0.5">✓</span> Readiness score & gap analysis</li>
                <li className="flex items-start gap-2"><span className="text-terracotta font-bold mt-0.5">✓</span> 30-day prototype roadmap</li>
                <li className="flex items-start gap-2"><span className="text-terracotta font-bold mt-0.5">✓</span> Admin-curated team matching</li>
              </ul>
              <Link href="/apply" className="text-terracotta font-semibold text-sm hover:underline">
                Apply as Founder →
              </Link>
            </div>

            {/* Builders */}
            <div
              className="rounded-3xl p-10 border-t-4 border-amber-500 md:col-span-1 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #E6EEF7 0%, #F4F7FB 100%)', minHeight: '380px' }}
            >
              {/* Watermark emoji */}
              <div className="absolute bottom-4 right-4 text-8xl opacity-[0.07] pointer-events-none select-none" aria-hidden="true">🔧</div>
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="font-bold text-brown-dark text-xl mb-3">Students &amp; Builders</h3>
              <p className="text-warm-muted leading-relaxed mb-5">
                You have skills — design, code, marketing, research — and want to put them to work on real projects.
              </p>
              <ul className="space-y-2 text-sm text-brown-mid mb-6">
                <li className="flex items-start gap-2"><span className="text-terracotta font-bold mt-0.5">✓</span> Matched to relevant projects</li>
                <li className="flex items-start gap-2"><span className="text-terracotta font-bold mt-0.5">✓</span> Build real portfolio work</li>
                <li className="flex items-start gap-2"><span className="text-terracotta font-bold mt-0.5">✓</span> Flexible availability options</li>
                <li className="flex items-start gap-2"><span className="text-terracotta font-bold mt-0.5">✓</span> ISD community network</li>
              </ul>
              <Link href="/join" className="text-terracotta font-semibold text-sm hover:underline">
                Join as Builder →
              </Link>
            </div>

            {/* ISD */}
            <div
              className="bg-brown-dark rounded-3xl p-10 md:col-span-1 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
              style={{ minHeight: '380px' }}
            >
              {/* Watermark emoji */}
              <div className="absolute bottom-4 right-4 text-8xl opacity-[0.07] pointer-events-none select-none" aria-hidden="true">🌎</div>
              <div className="text-4xl mb-4">🌎</div>
              <h3 className="font-bold text-cream text-xl mb-3">ISD Communities</h3>
              <p className="text-warm-muted leading-relaxed mb-5">
                Programs, cohorts, and innovation communities looking for a structured team formation platform.
              </p>
              <Link href="/how-it-works" className="text-terracotta-light font-semibold text-sm hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Table ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta mb-4">
            The Table
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-brown-dark mb-4">
            Join the La Mesa Summer 2026 Table.
          </h2>
          <p className="text-warm-muted text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            30 days. Real teams. Real prototypes. One Demo Day.
          </p>
          <div className="flex items-center justify-center gap-8 mb-10 flex-wrap">
            {[
              { stat: '30 Days', desc: 'Build cycle' },
              { stat: '20 Projects', desc: 'Selected ideas' },
              { stat: '1 Demo Day', desc: 'Final showcase' },
            ].map((item) => (
              <div key={item.stat} className="text-center">
                <p className="text-3xl font-bold text-terracotta">{item.stat}</p>
                <p className="text-sm text-warm-muted mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/apply"
            className="inline-block bg-terracotta hover:bg-[#0A6E8F] text-white font-semibold px-10 py-4 rounded-full text-lg transition-colors"
          >
            Apply for a Seat
          </Link>
        </div>
      </section>

      {/* ── Founder CTA ── */}
      <section
        className="py-28 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0883A8 0%, #0A6E8F 60%, #055A77 100%)' }}
      >
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)' }}
        />
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Decorative large circles */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-5"
          aria-hidden="true"
          style={{ background: 'white', filter: 'blur(40px)' }}
        />
        <div
          className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full pointer-events-none opacity-5"
          aria-hidden="true"
          style={{ background: 'white', filter: 'blur(50px)' }}
        />
        <div className="max-w-2xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to bring your idea to the table?
          </h2>
          <p className="text-[#E6EEF7] text-lg leading-relaxed mb-3">
            Submit your project application and get AI-powered role mapping, readiness scoring, and a 30-day roadmap in minutes.
          </p>
          <p className="text-[#E8D0B8] text-sm mb-10 opacity-80">No experience required. Just a real idea.</p>
          <Link
            href="/apply"
            className="bg-white text-terracotta hover:bg-[#F4F7FB] font-semibold px-10 py-5 rounded-full text-lg transition-colors inline-block shadow-lg"
          >
            Apply as Founder
          </Link>
          <p className="text-white/60 text-sm mt-4">Takes less than 5 minutes</p>
        </div>
      </section>

      {/* ── Builder CTA ── */}
      <section
        className="py-28 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A1A3A 0%, #10264C 60%, #16315E 100%)' }}
      >
        {/* Amber radial glow from center */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(217,119,6,0.18) 0%, transparent 65%)' }}
        />
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(rgba(8,131,168,0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Decorative large circles */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-5"
          aria-hidden="true"
          style={{ background: '#0883A8', filter: 'blur(60px)' }}
        />
        <div
          className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full pointer-events-none opacity-5"
          aria-hidden="true"
          style={{ background: '#FBA94C', filter: 'blur(50px)' }}
        />
        <div className="max-w-2xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            Have skills? Find a project.
          </h2>
          <p className="text-warm-muted text-lg leading-relaxed mb-3">
            Create your builder profile, share your skills and availability, and get matched to projects where you can make a real impact.
          </p>
          <p className="text-warm-muted text-sm mb-10 opacity-70">Any skill level welcome. Developers, designers, marketers, researchers.</p>
          <Link
            href="/join"
            className="border-2 border-[#F5841F] text-[#FBA94C] hover:bg-[#F5841F] hover:text-white font-semibold px-10 py-5 rounded-full text-lg transition-colors inline-block"
          >
            Join as Builder
          </Link>
          <p className="text-warm-muted/60 text-sm mt-4">Any skill level welcome</p>
        </div>
      </section>

      {/* ── About This Pilot ── */}
      <section className="py-14 px-4" style={{ background: '#E6EEF7' }}>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm px-10 py-10" style={{ boxShadow: '0 4px 24px rgba(10,26,58,0.08)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-terracotta mb-3 text-center">
              About This Pilot
            </p>
            <h2 className="text-2xl font-bold text-brown-dark mb-4 text-center">
              An early experiment in community-powered innovation.
            </h2>
            <p className="text-warm-muted text-base leading-relaxed text-center mb-8">
              La Mesa is an ISD-powered pilot platform designed to test whether structured team formation can help founders, students, and builders move faster from idea to prototype.
              This is an early-stage pilot. Features and access are managed by ISD coordinators.
            </p>
            {/* Stat blocks */}
            <div className="flex flex-wrap justify-center gap-3">
              {['ISD Powered', 'Early-Stage Pilot', 'Costa Rica'].map((label) => (
                <span
                  key={label}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold text-brown-mid border border-terracotta/20 bg-sand"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
