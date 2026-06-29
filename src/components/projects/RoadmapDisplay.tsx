'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import { RoadmapWeek } from '@/types/database'

interface RoadmapDisplayProps {
  weeks: RoadmapWeek[]
}

export default function RoadmapDisplay({ weeks }: RoadmapDisplayProps) {
  const [openWeek, setOpenWeek] = useState<number | null>(1)
  const { dict } = useLocale()
  const t = dict.projectDetail

  if (!weeks || weeks.length === 0) {
    return <p className="text-isd-gray text-sm">{t.noRoadmap}</p>
  }

  return (
    <div className="space-y-2">
      {weeks.map((week) => (
        <div key={week.week} className="border border-isd-gray-light rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenWeek(openWeek === week.week ? null : week.week)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-isd-light/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 bg-isd-navy text-white rounded-md flex items-center justify-center text-xs font-mono">
                {week.week}
              </span>
              <div className="text-left">
                <span className="font-medium text-isd-dark text-sm">{t.week} {week.week}</span>
                <span className="text-isd-gray text-xs ml-2">— {week.objective}</span>
              </div>
            </div>
            <span className={`text-isd-teal text-lg font-light transition-transform duration-200 ${openWeek === week.week ? 'rotate-45' : ''}`}>+</span>
          </button>

          {openWeek === week.week && (
            <div className="px-4 pb-4 bg-isd-light/40 border-t border-isd-gray-light">
              <div className="grid md:grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-xs font-mono text-isd-gray uppercase tracking-wide mb-2">{t.tasks}</p>
                  <ul className="space-y-1">
                    {week.tasks.map((task, i) => (
                      <li key={i} className="text-sm text-isd-dark flex gap-2">
                        <span className="text-isd-teal mt-0.5 flex-shrink-0">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-mono text-isd-gray uppercase tracking-wide mb-2">{t.deliverables}</p>
                  <ul className="space-y-1">
                    {week.deliverables.map((d, i) => (
                      <li key={i} className="text-sm text-isd-dark flex gap-2">
                        <span className="text-isd-dark-green mt-0.5 flex-shrink-0">✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-mono text-isd-gray uppercase tracking-wide mb-2">{t.ownerRoles}</p>
                  <div className="flex flex-wrap gap-1">
                    {week.owner_roles.map((role, i) => (
                      <span key={i} className="text-xs bg-isd-mint/30 text-isd-dark border border-isd-mint/40 px-2 py-0.5 rounded-full">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
