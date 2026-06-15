import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full mb-6">
            Founder Application
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Bring your idea<br />
            <span className="text-amber-600">to the table.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Submit your project and our AI will map the roles you need, score your readiness, and generate a 30-day roadmap — all before you even have a team.
          </p>
          <Link
            href="/login?mode=signup&redirect=/founder/projects/new"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Apply as Founder
          </Link>
          <p className="mt-4 text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login?redirect=/founder/projects/new" className="text-amber-600 hover:text-amber-700 font-medium">
              Sign in to submit a project
            </Link>
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">What happens after you apply</h2>
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
              <div key={item.number} className="flex flex-col items-start">
                <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm font-bold mb-4">
                  {item.number}
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">This is for you if...</h2>
          <ul className="space-y-4">
            {[
              'You have a startup idea, product concept, or community project you want to build.',
              'You need help defining what roles your team should include.',
              'You want a clear, structured plan before approaching potential team members.',
              'You\'re part of an ISD cohort, hackathon, or innovation program.',
              "You're ready to move from idea to prototype and want expert coordination.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-amber-600">
        <div className="max-w-xl mx-auto text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-amber-100 mb-6">
            Create an account and submit your first project — it takes less than 10 minutes.
          </p>
          <Link
            href="/login?mode=signup&redirect=/founder/projects/new"
            className="inline-block bg-white text-amber-700 hover:bg-amber-50 font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Apply as Founder
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
