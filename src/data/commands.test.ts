import { describe, expect, it, vi } from 'vitest'
import { commands } from './commands'
import type { CommandContext } from './commands'
import { getNowPlaying } from '@/server/live'

vi.mock('@/server/live', () => ({ getNowPlaying: vi.fn() }))

const ctx = (): CommandContext => ({
  scrollTo: vi.fn(),
  open: vi.fn(),
  clear: vi.fn(),
})

const byName = (name: string) => {
  const cmd = commands.find((c) => c.name === name)
  if (!cmd) throw new Error(`missing command: ${name}`)
  return cmd
}

describe('command registry', () => {
  it('includes the spec command set', () => {
    const names = commands.map((c) => c.name)
    for (const required of [
      'whoami',
      'ls projects/',
      'cat resume.pdf',
      'sudo hire-me',
      'help',
      'cd #work',
      'cd #projects',
      'cd #about',
    ]) {
      expect(names).toContain(required)
    }
  })

  it('whoami outputs identity lines', () => {
    const result = byName('whoami').run(ctx())
    expect(result.type).toBe('output')
    if (result.type === 'output') {
      expect(result.lines.join('\n')).toContain('CoStar')
    }
  })

  it('ls projects/ lists all three projects', () => {
    const result = byName('ls projects/').run(ctx())
    if (result.type === 'output') expect(result.lines).toHaveLength(3)
  })

  it('cd #work scrolls and closes', () => {
    const c = ctx()
    const result = byName('cd #work').run(c)
    expect(result.type).toBe('action')
    expect(c.scrollTo).toHaveBeenCalledWith('work')
  })

  it('cat resume.pdf opens the PDF', () => {
    const c = ctx()
    byName('cat resume.pdf').run(c)
    expect(c.open).toHaveBeenCalledWith('/documents/Fulkerson_John_Resume.pdf')
  })

  it('music resolves now-playing lines asynchronously', async () => {
    vi.mocked(getNowPlaying).mockResolvedValue({
      ok: true,
      playing: true,
      title: 'Song',
      artist: 'Artist',
      url: 'https://open.spotify.com/track/x',
    })
    const result = byName('music').run(ctx())
    expect(result.type).toBe('async-output')
    if (result.type === 'async-output') {
      const lines = await result.lines
      expect(lines[0]).toEqual({
        text: '♪ Song — Artist',
        href: 'https://open.spotify.com/track/x',
      })
      expect(lines[1]).toContain('now playing')
    }
  })

  it('music reports gracefully when spotify is unavailable', async () => {
    vi.mocked(getNowPlaying).mockResolvedValue({ ok: false })
    const result = byName('music').run(ctx())
    if (result.type === 'async-output') {
      const lines = await result.lines
      expect(lines[0]).toContain('spotify:')
    }
  })

  it('clear invokes the terminal reset', () => {
    const c = ctx()
    const result = byName('clear').run(c)
    expect(result.type).toBe('action')
    expect(c.clear).toHaveBeenCalled()
  })

  it('help lists every command name', () => {
    const result = byName('help').run(ctx())
    if (result.type === 'output') {
      expect(result.lines).toHaveLength(commands.length)
    }
  })
})
