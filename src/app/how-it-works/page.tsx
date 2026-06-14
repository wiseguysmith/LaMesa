import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-amber-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">How La Mesa Works</h1>
          <p className="text-lg text-slate-600">
            A structured, AI-assisted process to help you go from idea to team to prototype.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-12">
          {[
            {
              step: '01',
              title: 'Founders Submit Their Project',
              desc: 'Founders fill out a guided application form covering the project idea, problem, target users, category, stage, skills needed, timeline, and goals. This isn\'t a casual note — it\'s a real startup application designed to capture enough information for meaningful AI analysis.',
              forRole: 'For Founders',
            },
            {
              step: '02',
              title: 'AI Analyzes the Project',
              desc: 'Our AI (powered by Anthropic\'s Claude) reads the submission and produces: a readiness score (0–100), category scores across 7 dimensions, recommended roles with priority and reasoning, a suggested team size, and a 30-day milestone roadmap. This happens automatically after submission.',
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
              desc: 'Builders (students, developers, designers, marketers) fill out their profile: skills, experience, availability, preferred roles, portfolio links, and what they\'re looking for in a project. Profiles are reviewed and approved by admin before they are available for matching.',
              forRole: 'For Builders',
            },
            {
              step: '05',
              title: 'AI Suggests Matches',
              desc: 'For approved projects needing builders, admin can trigger AI-powered match suggestions. The AI reviews builder profiles against project requirements and suggests the best fits — with scores and reasoning. Admin reviews every suggestion before assigning anyone.',
              forRole: 'AI + Admin',
            },
            {
              step: '06',
              title: 'Teams Form and Build',
              desc: 'Once builders are assigned, the team can view the project page with the full roadmap, role assignments, and progress updates. Admin tracks progress and can update project status through the pipeline from Team Formed → Building → Prototype Ready → Demo Day.',
              forRole: 'Everyone',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold">
                  {item.step}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{item.forRole}</span>
                </div>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Apply as Founder
            </Link>
            <Link
              href="/join"
              className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-semibold px-6 py-3 rounded-xl transition-colors"
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
