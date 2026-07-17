import { useEffect, useState } from 'react'
import type { NowPlaying } from '@/lib/spotify'
import { getNowPlaying } from '@/server/live'

function Equalizer() {
  return (
    <span
      aria-hidden
      className="mr-1.5 inline-flex items-end gap-[2px] align-[-1px]"
    >
      <span className="eq-bar h-[10px] w-[2px] rounded-[1px] bg-prompt" />
      <span className="eq-bar h-[10px] w-[2px] rounded-[1px] bg-prompt [animation-delay:0.25s]" />
      <span className="eq-bar h-[10px] w-[2px] rounded-[1px] bg-prompt [animation-delay:0.5s]" />
    </span>
  )
}

export function SpotifyPanel() {
  const [data, setData] = useState<NowPlaying | null>(null)

  useEffect(() => {
    let cancelled = false
    getNowPlaying()
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
    <div className="min-h-[20px] font-mono text-[11px]">
      {data && !data.ok ? null : (
        <>
          <span className="text-prompt">$</span>{' '}
          <span className="text-faint">music</span>{' '}
          {data?.ok ? (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent"
            >
              {data.playing ? <Equalizer /> : '♪ '}
              {data.title} — {data.artist}
              <span className="text-faint">
                {' '}
                · {data.playing ? 'now playing' : 'last played'}
              </span>
            </a>
          ) : (
            <span className="text-faint">…</span>
          )}
        </>
      )}
    </div>
  )
}
