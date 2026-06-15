import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function JoinPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-amber-500/20 text-amber-400 text-sm font-semibold px-3 py-1 rounded-full mb-6">
            Builder Profile
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Have skills?<br />
            <span className="text-amber-400">Find a project.</span>
          </h1>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Create your builder profile, share your skills and availability, and get matched to early-stage projects where you can make a real impact.
          </p>
          <Link
            href="/login?mode=signup&redirect=/builder/profile"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Join as Builder
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/login?redirect=/builder/profile" className="text-amber-400 hover:text-amber-300 font-medium">
              Sign in to update your profile
            </Link>
          </p>
        </div>
      </section>

      {/* What builders do */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">How it works for builders</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Create Your Profile',
                desc: 'Share your skills, experience level, availability, preferred roles, and what kind of project you\'re looking for.',
              },
              {
                number: '02',
                title: 'Get Reviewed',
                desc: 'ISD admin reviews your profile and approves you for matching. This keeps the community quality high.',
              },
              {
                number: '03',
                title: 'Get Matched',
                desc: 'AI suggests you to projects that fit your skills. Admin makes the final call and introduces you to the founder.',
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

      {/* Roles */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">We need all kinds of builders</h2>
          <p className="text-center text-slate-500 mb-10 max-w-xl mx-auto">
            You don&apos;t have to be a developer. Projects need designers, marketers, researchers, and operators too.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              'Full-Stack Developer',
              'Frontend Developer',
              'Backend Developer',
              'AI Engineer',
              'Blockchain Developer',
              'UX/UI Designer',
              'Product Manager',
              'Marketing & Growth',
              'Sales & Biz Dev',
              'Content Creator',
              'Operations',
              'Data Analyst',
              'Researcher',
              'No-Code Builder',
            ].map((role) => (
              <span
                key={role}
                className="bg-white border border-slate-200 text-slate-700 text-sm px-4 py-2 rounded-lg shadow-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">This is for you if...</h2>
          <ul className="space-y-4">
            {[
              'You have skills — code, design, marketing, research — and want real project experience.',
              "You're a student looking to build your portfolio with meaningful work.",
              "You're between projects and want to contribute to something early-stage.",
              "You want to collaborate with founders, learn across functions, and ship a prototype.",
              "You're looking for equity, paid work, or simply a great portfolio piece.",
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
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-xl mx-auto text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to find your next project?</h2>
          <p className="text-slate-400 mb-6">
            Create your builder profile and get matched with projects that need your skills.
          </p>
          <Link
            href="/login?mode=signup&redirect=/builder/profile"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Join as Builder
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
