import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Role tag color groups
const roles = [
  // Tech
  { label: 'Full-Stack Developer', group: 'tech' },
  { label: 'Frontend Developer', group: 'tech' },
  { label: 'Backend Developer', group: 'tech' },
  { label: 'AI Engineer', group: 'tech' },
  { label: 'Blockchain Developer', group: 'tech' },
  { label: 'No-Code Builder', group: 'tech' },
  // Design
  { label: 'UX/UI Designer', group: 'design' },
  { label: 'Content Creator', group: 'design' },
  // Business
  { label: 'Product Manager', group: 'business' },
  { label: 'Marketing & Growth', group: 'business' },
  { label: 'Sales & Biz Dev', group: 'business' },
  { label: 'Operations', group: 'business' },
  { label: 'Data Analyst', group: 'business' },
  { label: 'Researcher', group: 'business' },
]

const pillStyles: Record<string, string> = {
  tech: 'bg-amber-600 text-white',
  design: 'bg-terracotta text-white',
  business: 'bg-brown-mid text-cream',
}

export default function JoinPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden" style={{ background: '#0A1A3A' }}>
        {/* Layered gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(8,131,168,0.3) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 15% 80%, rgba(245,132,31,0.15) 0%, transparent 55%)',
          }}
        />
        {/* Decorative floating elements */}
        <div
          className="absolute top-12 right-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #0883A8 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-12 left-8 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none hidden md:block"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, #FBA94C 0%, transparent 70%)' }}
        />

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-block bg-terracotta/20 text-terracotta-light text-sm font-semibold px-3 py-1 rounded-full mb-6 border border-terracotta/30">
            Builder Profile
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Have skills?<br />
            <span className="gradient-text">Find a project.</span>
          </h1>
          <p className="text-lg text-warm-muted mb-10 max-w-2xl mx-auto">
            Create your builder profile, share your skills and availability, and get matched to early-stage projects where you can make a real impact.
          </p>
          <Link
            href="/login?mode=signup&redirect=/builder/profile"
            className="inline-block bg-terracotta hover:bg-[#0A6E8F] text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors"
          >
            Join as Builder
          </Link>
          <p className="mt-4 text-sm text-warm-muted">
            Already have an account?{' '}
            <Link href="/login?redirect=/builder/profile" className="text-terracotta-light hover:text-amber-400 font-medium transition-colors">
              Sign in to update your profile
            </Link>
          </p>
        </div>
      </section>

      {/* What builders do */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-brown-dark mb-10 text-center">How it works for builders</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Create Your Profile',
                desc: "Share your skills, experience level, availability, preferred roles, and what kind of project you're looking for.",
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
                <div className="w-10 h-10 bg-terracotta text-white rounded-xl flex items-center justify-center text-sm font-bold mb-4">
                  {item.number}
                </div>
                <h3 className="font-semibold text-brown-dark mb-2">{item.title}</h3>
                <p className="text-warm-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 px-4 bg-sand">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-brown-dark mb-4 text-center">We need all kinds of builders</h2>
          <p className="text-center text-warm-muted mb-10 max-w-xl mx-auto">
            You don&apos;t have to be a developer. Projects need designers, marketers, researchers, and operators too.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {roles.map((role) => (
              <span
                key={role.label}
                className={`${pillStyles[role.group]} text-sm px-4 py-2 rounded-full font-medium shadow-sm`}
              >
                {role.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brown-dark mb-8 text-center">This is for you if...</h2>
          <ul className="space-y-4">
            {[
              'You have skills — code, design, marketing, research — and want real project experience.',
              "You're a student looking to build your portfolio with meaningful work.",
              "You're between projects and want to contribute to something early-stage.",
              "You want to collaborate with founders, learn across functions, and ship a prototype.",
              "You're looking for equity, paid work, or simply a great portfolio piece.",
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
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: '#0A1A3A' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(8,131,168,0.25) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-xl mx-auto text-center text-white relative">
          <h2 className="text-2xl font-bold mb-4">Ready to find your next project?</h2>
          <p className="text-warm-muted mb-6">
            Create your builder profile and get matched with projects that need your skills.
          </p>
          <Link
            href="/login?mode=signup&redirect=/builder/profile"
            className="inline-block bg-terracotta hover:bg-[#0A6E8F] text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Join as Builder
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
