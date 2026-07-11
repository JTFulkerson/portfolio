import { GithubPanel } from '@/components/live/GithubPanel'
import { SpotifyPanel } from '@/components/live/SpotifyPanel'
import { Reveal, SectionHeading } from '@/components/motion'
import { aboutChips, aboutStory } from '@/data/about'

export function About() {
  return (
    <section id="about" className="border-t border-line px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading index={3} title="about" />
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="text-sm leading-relaxed text-muted">{aboutStory}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {aboutChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-line px-3 py-1 text-[11px] text-muted"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              <GithubPanel />
              <SpotifyPanel />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
