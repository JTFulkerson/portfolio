import { SocialLinks } from '@/components/SocialLinks'
import { SpotifyPanel } from '@/components/live/SpotifyPanel'
import { Typed } from '@/components/motion'

export function Hero() {
  return (
    <section id="top" className="px-5 pb-16 pt-20 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 font-mono text-xs text-prompt">
          $ <Typed text="whoami" />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          John Fulkerson
          <span className="animate-cursor text-accent">_</span>
        </h1>
        <p className="mt-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Associate Software Engineer @ CoStar Group
        </p>
        <p className="mt-4 font-mono text-xs text-muted">
          <span className="text-keyword">const</span> focus = [
          <span className="text-string">{'"systems"'}</span>,{' '}
          <span className="text-string">{'"networks"'}</span>,{' '}
          <span className="text-string">{'"full-stack"'}</span>];
        </p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
          {
            "CS @ University of Delaware '26. I build software people actually use — from generative-AI infrastructure at CoStar to the app running UD's makerspace."
          }
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="rounded-lg bg-fg px-4 py-2 text-xs font-medium text-bg hover:opacity-90"
          >
            View work ↓
          </a>
          <a
            href="/documents/Fulkerson_John_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-line px-4 py-2 font-mono text-xs text-muted hover:text-fg"
          >
            resume.pdf
          </a>
          <SocialLinks primaryOnly className="ml-2" />
        </div>
        <div className="mt-8">
          <SpotifyPanel />
        </div>
      </div>
    </section>
  )
}
