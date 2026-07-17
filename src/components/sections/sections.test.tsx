import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { About } from './About'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Nav } from './Nav'
import { Projects } from './Projects'
import { WorkTimeline } from './WorkTimeline'
import { PaletteProvider } from '@/components/palette/PaletteProvider'
import { MotionProvider } from '@/components/motion'

vi.mock('@/server/live', () => ({
  getGithubActivity: vi.fn().mockResolvedValue({ ok: false }),
  getNowPlaying: vi.fn().mockResolvedValue({ ok: false }),
}))

const wrap = (ui: React.ReactNode) => (
  <MotionProvider>
    <PaletteProvider>{ui}</PaletteProvider>
  </MotionProvider>
)

describe('sections render', () => {
  it('Nav shows wordmark, anchors, and palette hint', () => {
    render(wrap(<Nav />))
    expect(screen.getByText('~/jfulkerson')).toBeTruthy()
    expect(screen.getByText('work')).toBeTruthy()
    expect(screen.getByLabelText('⌘K — open command palette')).toBeTruthy()
  })

  it('Hero shows name, CoStar badge, and resume link', () => {
    render(wrap(<Hero />))
    expect(screen.getByText(/John Fulkerson/)).toBeTruthy()
    expect(
      screen.getByText('Associate Software Engineer @ CoStar Group'),
    ).toBeTruthy()
    expect(
      screen.getByText('resume.pdf').closest('a')?.getAttribute('href'),
    ).toBe('/documents/Fulkerson_John_Resume.pdf')
  })

  it('WorkTimeline shows featured jobs and an expander', () => {
    render(wrap(<WorkTimeline />))
    expect(screen.getByText('Technology Intern')).toBeTruthy()
    expect(screen.queryByText('Resident Assistant')).toBeNull()
    screen.getByText(/earlier roles/).click()
  })

  it('Projects renders all three with links', () => {
    render(wrap(<Projects />))
    expect(screen.getByText('Aroma').closest('a')?.getAttribute('href')).toBe(
      'https://aroma.johnfulkerson.com',
    )
    expect(screen.getByText('Makerspace Platform')).toBeTruthy()
    expect(screen.getByText('Timer')).toBeTruthy()
  })

  it('About renders story and chips', () => {
    render(wrap(<About />))
    expect(
      screen.getByText(/PADI Open Water Scuba Instructor \(taught/),
    ).toBeTruthy()
    expect(screen.getByText('⛵ UD Sailing Commodore')).toBeTruthy()
  })

  it('Footer renders the stack credit', () => {
    render(wrap(<Footer />))
    expect(
      screen.getByText(/tanstack start on cloudflare workers/),
    ).toBeTruthy()
  })
})
