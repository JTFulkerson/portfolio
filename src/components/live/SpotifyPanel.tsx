import { useEffect, useState } from 'react'
import type { NowPlaying } from '@/lib/spotify'
import { getNowPlaying } from '@/server/live'

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

  if (data && !data.ok) return null

  return (
    <div className="min-h-[72px] rounded-xl border border-line bg-panel p-4">
      <div className="mb-2 font-mono text-[10px] text-faint">$ now-playing</div>
      {data?.ok ? (
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium hover:text-accent"
        >
          ♪ {data.title} — {data.artist}
          <span className="mt-0.5 block text-[10px] font-normal text-faint">
            {data.playing ? 'now playing on Spotify' : 'last played on Spotify'}
          </span>
        </a>
      ) : (
        <div className="text-[11px] text-faint">loading…</div>
      )}
    </div>
  )
}
