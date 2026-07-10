import { describe, expect, it } from 'vitest'
import { fuzzyMatch } from './fuzzy'

describe('fuzzyMatch', () => {
  it('matches subsequences case-insensitively', () => {
    expect(fuzzyMatch('cdw', 'cd #work')).toBe(true)
    expect(fuzzyMatch('WHOAMI', 'whoami')).toBe(true)
  })
  it('matches with spaces stripped from query', () => {
    expect(fuzzyMatch('ls proj', 'ls projects/')).toBe(true)
  })
  it('rejects non-subsequences', () => {
    expect(fuzzyMatch('xyz', 'whoami')).toBe(false)
  })
  it('empty query matches everything', () => {
    expect(fuzzyMatch('', 'anything')).toBe(true)
  })
})
