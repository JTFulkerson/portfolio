import { afterEach, describe, expect, it, vi } from 'vitest'
import { _clearCache, cached } from './edge-cache'

afterEach(() => {
  _clearCache()
  vi.useRealTimers()
})

describe('cached', () => {
  it('returns cached ok values within the TTL', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, value: 1 })
    await cached('a', 60, fetcher)
    await cached('a', 60, fetcher)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('re-fetches after the TTL expires', async () => {
    vi.useFakeTimers()
    const fetcher = vi.fn().mockResolvedValue({ ok: true })
    await cached('b', 60, fetcher)
    vi.setSystemTime(Date.now() + 61_000)
    await cached('b', 60, fetcher)
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('does not cache failures', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false })
    await cached('c', 60, fetcher)
    await cached('c', 60, fetcher)
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
})
