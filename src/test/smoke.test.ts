import { describe, expect, it } from 'vitest'

describe('test environment', () => {
  it('has jsdom + shims', () => {
    expect(typeof document).toBe('object')
    expect(typeof IntersectionObserver).toBe('function')
    expect(typeof window.matchMedia).toBe('function')
  })
})
