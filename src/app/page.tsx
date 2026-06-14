import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full mb-6">
            ISD Pilot Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Bring your idea<br />
            <span className="text-amber-600">to the table.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            La Mesa helps founders, students, and builders form teams, map the roles they need, and move from idea to prototype.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Apply as Founder
            </Link>
            <Link
              href="/join"
              className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Join as Builder
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">The Problem</h2>
          <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">
            Finding the right people to build with is one of the hardest parts of turning an idea into something real.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Ideas stall without teams',
                desc: 'Most early-stage founders have the vision but not the builders. Ideas die in isolation.',
              },
              {
                title: 'Skills go unmatched',
                desc: 'Talented students and builders want to contribute but can\'t find the right projects to join.',
              },
              {
                title: 'No structured path',
                desc: 'Without a clear process, early teams waste weeks figuring out who should do what.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The Solution</h2>
          <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
            La Mesa uses AI to map the roles your project needs, score your readiness, and help admin coordinators assemble aligned, capable teams — fast.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🧭', title: 'AI Role Mapping', desc: 'Submit your idea and get an instant breakdown of what roles and skills your project needs.' },
              { icon: '📊', title: 'Readiness Score', desc: 'Get a clear picture of your project\'s strengths, gaps, and what to tackle first.' },
              { icon: '🤝', title: 'Admin-Guided Matching', desc: 'ISD coordinators review AI suggestions and assemble your team with care.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Submit Your Idea', desc: 'Fill out the founder application with your project details, goals, and what you need.' },
              { step: '02', title: 'AI Analysis', desc: 'Our AI scores your project, maps recommended roles, and generates a 30-day roadmap.' },
              { step: '03', title: 'Admin Matches Team', desc: 'ISD coordinators review AI suggestions and assign compatible builders to your project.' },
              { step: '04', title: 'Build Together', desc: 'Your team forms, aligned on the roadmap. Track progress and move toward prototype.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Who It&apos;s For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Founders with Ideas',
                desc: 'You have a startup idea, a product vision, or a project you want to bring to life — but you need a team.',
                cta: 'Apply as Founder',
                href: '/apply',
              },
              {
                title: 'Students & Builders',
                desc: 'You have skills — design, code, marketing, research — and want to put them to work on real projects.',
                cta: 'Join as Builder',
                href: '/join',
              },
              {
                title: 'ISD Communities',
                desc: 'Programs, cohorts, and innovation communities looking for a structured team formation platform.',
                cta: 'Learn More',
                href: '/how-it-works',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-semibold text-slate-800 text-lg mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{item.desc}</p>
                <Link href={item.href} className="text-amber-600 font-semibold text-sm hover:text-amber-700">
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder CTA */}
      <section className="py-20 px-4 bg-amber-600">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to bring your idea to the table?</h2>
          <p className="text-amber-100 mb-8">
            Submit your project application and get AI-powered role mapping, readiness scoring, and a 30-day roadmap in minutes.
          </p>
          <Link
            href="/apply"
            className="bg-white text-amber-700 hover:bg-amber-50 font-semibold px-8 py-4 rounded-xl text-lg transition-colors inline-block"
          >
            Apply as Founder
          </Link>
        </div>
      </section>

      {/* Builder CTA */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Have skills? Find a project.</h2>
          <p className="text-slate-400 mb-8">
            Create your builder profile, share your skills and availability, and get matched to projects where you can make a real impact.
          </p>
          <Link
            href="/join"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors inline-block"
          >
            Join as Builder
          </Link>
        </div>
      </section>

      {/* ISD Context */}
      <section className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-3">About This Pilot</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            La Mesa is an ISD-powered pilot platform designed to test whether structured team formation can help founders, students, and builders move faster from idea to prototype.
            This is an early-stage pilot. Features and access are managed by ISD coordinators.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
