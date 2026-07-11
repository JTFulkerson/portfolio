import { useEffect, useState } from 'react'
import type { GithubActivity } from '@/lib/github'
import { getGithubActivity } from '@/server/live'

const LEVEL_CLASSES = [
  'bg-line',
  'bg-prompt/30',
  'bg-prompt/50',
  'bg-prompt/75',
  'bg-prompt',
]

export function GithubPanel() {
  const [data, setData] = useState<GithubActivity | null>(null)

  useEffect(() => {
    let cancelled = false
    getGithubActivity()
      .then((d) => {
        if (!cancelled) setData(d)
      })
      .catch(() => {
        if (!cancelled) setData({ ok: false })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-[104px] rounded-xl border border-line bg-panel p-4">
      <div className="mb-2 font-mono text-[10px] text-faint">
        $ git log --author=jt
      </div>
      {data?.ok ? (
        <>
          <div
            className="flex gap-[3px] overflow-hidden"
            aria-label={`${data.total} GitHub contributions in the last year`}
          >
            {data.weeks.slice(-20).map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} contributions`}
                    className={`h-[7px] w-[7px] rounded-[2px] ${LEVEL_CLASSES[day.level]}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2 text-[11px] text-faint">
            {data.total} contributions this year · live
          </div>
        </>
      ) : (
        <a
          href="https://github.com/JTFulkerson"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-faint hover:text-fg"
        >
          {data ? 'recent work lives on GitHub → @JTFulkerson' : 'loading…'}
        </a>
      )}
    </div>
  )
}
