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
    return <p className="text-slate-400 text-sm">{t.noRoadmap}</p>
  }

  return (
    <div className="space-y-3">
      {weeks.map((week) => (
        <div key={week.week} className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenWeek(openWeek === week.week ? null : week.week)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-xs font-bold">
                {week.week}
              </span>
              <div className="text-left">
                <span className="font-medium text-slate-800 text-sm">{t.week} {week.week}</span>
                <span className="text-slate-400 text-xs ml-2">— {week.objective}</span>
              </div>
            </div>
            <span className="text-slate-400 text-xs">{openWeek === week.week ? '▲' : '▼'}</span>
          </button>

          {openWeek === week.week && (
            <div className="px-4 pb-4 bg-slate-50 border-t border-slate-100">
              <div className="grid md:grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{t.tasks}</p>
                  <ul className="space-y-1">
                    {week.tasks.map((task, i) => (
                      <li key={i} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{t.deliverables}</p>
                  <ul className="space-y-1">
                    {week.deliverables.map((d, i) => (
                      <li key={i} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{t.ownerRoles}</p>
                  <ul className="space-y-1">
                    {week.owner_roles.map((role, i) => (
                      <li key={i} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full inline-block mr-1 mb-1">
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
