import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center bg-cream overflow-hidden px-4 py-24">
        {/* Decorative warm radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, #F5E6D0 0%, #FDF6EC 55%, transparent 100%)',
          }}
        />
        {/* Decorative circle accents */}
        <div
          className="absolute top-16 right-8 w-72 h-72 rounded-full opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #C2622D 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-16 left-4 w-48 h-48 rounded-full opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #D97706 0%, transparent 70%)' }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-block bg-sand text-terracotta text-sm font-semibold px-4 py-1.5 rounded-full mb-8 tracking-wide">
            ISD Pilot Platform
          </div>

          {/* H1 */}
          <h1 className="text-7xl md:text-8xl font-bold leading-tight mb-6">
            <span className="text-brown-dark">Bring your idea</span>
            <br />
            <span className="text-terracotta">to the table.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg leading-relaxed text-warm-muted max-w-lg mx-auto mb-10">
            La Mesa helps founders, students, and builders form teams, map the roles they need, and move from idea to prototype.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/apply"
              className="bg-terracotta hover:bg-[#B05525] text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors"
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

          {/* Social proof */}
          <p className="text-sm text-warm-muted tracking-wide">
            Powered by ISD &nbsp;·&nbsp; Early-stage pilot &nbsp;·&nbsp; Now open
          </p>
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
                className="bg-sand rounded-2xl p-7 border-l-4 border-terracotta"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-brown-dark text-lg mb-2">{item.title}</h3>
                <p className="text-warm-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta mb-4">
            The Solution
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-brown-dark mb-4">
            AI-powered team formation.
          </h2>
          <p className="text-warm-muted text-lg leading-relaxed mb-14 max-w-2xl mx-auto">
            La Mesa uses AI to map the roles your project needs, score your readiness, and help ISD coordinators assemble aligned, capable teams — fast.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
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
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-brown-dark text-lg mb-2">{item.title}</h3>
                <p className="text-warm-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-4 bg-brown-dark">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-light text-center mb-4">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-cream text-center mb-16">
            Four steps to your team.
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
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
                title: 'Admin Matches Team',
                desc: 'ISD coordinators review AI suggestions and assign compatible builders to your project.',
              },
              {
                step: '04',
                title: 'Build Together',
                desc: 'Your team forms, aligned on the roadmap. Track progress and move toward prototype.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-5xl font-bold text-terracotta mb-4">{item.step}</div>
                <h3 className="font-bold text-cream text-lg mb-3">{item.title}</h3>
                <p className="text-warm-muted leading-relaxed text-sm">{item.desc}</p>
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
            <div className="bg-sand rounded-3xl p-8 border-t-4 border-terracotta md:col-span-1">
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
            <div className="bg-sand rounded-3xl p-8 border-t-4 border-brown-mid md:col-span-1">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="font-bold text-brown-dark text-xl mb-3">Students & Builders</h3>
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
            <div className="bg-brown-dark rounded-3xl p-8 md:col-span-1">
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

      {/* ── Founder CTA ── */}
      <section className="py-24 px-4 bg-terracotta">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to bring your idea to the table?
          </h2>
          <p className="text-[#F5E6D0] text-lg leading-relaxed mb-10">
            Submit your project application and get AI-powered role mapping, readiness scoring, and a 30-day roadmap in minutes.
          </p>
          <Link
            href="/apply"
            className="border-2 border-white text-white hover:bg-white hover:text-terracotta font-semibold px-8 py-4 rounded-full text-lg transition-colors inline-block"
          >
            Apply as Founder
          </Link>
        </div>
      </section>

      {/* ── Builder CTA ── */}
      <section className="py-24 px-4 bg-brown-mid">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            Have skills? Find a project.
          </h2>
          <p className="text-warm-muted text-lg leading-relaxed mb-10">
            Create your builder profile, share your skills and availability, and get matched to projects where you can make a real impact.
          </p>
          <Link
            href="/join"
            className="border-2 border-[#D97706] text-[#F59E0B] hover:bg-[#D97706] hover:text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors inline-block"
          >
            Join as Builder
          </Link>
        </div>
      </section>

      {/* ── About This Pilot ── */}
      <section className="py-20 px-4 bg-sand">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta mb-4">
            About This Pilot
          </p>
          <h2 className="text-2xl font-bold text-brown-dark mb-5">
            An early experiment in community-powered innovation.
          </h2>
          <p className="text-warm-muted text-lg leading-relaxed">
            La Mesa is an ISD-powered pilot platform designed to test whether structured team formation can help founders, students, and builders move faster from idea to prototype.
            This is an early-stage pilot. Features and access are managed by ISD coordinators.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
