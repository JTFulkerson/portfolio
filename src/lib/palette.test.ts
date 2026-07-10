import { describe, expect, it, vi } from 'vitest'
import { executeInput, filterCommands } from './palette'
import type { Command, CommandContext } from '@/data/commands'

const noopCtx: CommandContext = { scrollTo: () => {}, open: () => {} }

const testCommands: Array<Command> = [
  {
    name: 'whoami',
    description: 'about',
    run: () => ({ type: 'output', lines: ['John'] }),
  },
  {
    name: 'cd #work',
    description: 'scroll',
    keywords: ['work'],
    run: (ctx) => {
      ctx.scrollTo('work')
      return { type: 'action' }
    },
  },
]

describe('filterCommands', () => {
  it('returns all commands for empty query', () => {
    expect(filterCommands(testCommands, '')).toHaveLength(2)
  })
  it('filters by name and keywords', () => {
    expect(filterCommands(testCommands, 'work').map((c) => c.name)).toEqual([
      'cd #work',
    ])
  })
})

describe('executeInput', () => {
  it('runs an exact-name command', () => {
    const result = executeInput(testCommands, 'whoami', noopCtx)
    expect(result).toEqual({ type: 'output', lines: ['John'] })
  })
  it('runs a unique fuzzy match', () => {
    const scrollTo = vi.fn()
    const result = executeInput(testCommands, 'cdw', { ...noopCtx, scrollTo })
    expect(result.type).toBe('action')
    expect(scrollTo).toHaveBeenCalledWith('work')
  })
  it('returns command-not-found output for unknown input', () => {
    const result = executeInput(testCommands, 'rm -rf /', noopCtx)
    expect(result.type).toBe('output')
    if (result.type === 'output') {
      expect(result.lines[0]).toContain('command not found: rm -rf /')
      expect(result.lines[1]).toContain("try 'help'")
    }
  })
})
