import { describe, expect, it, vi } from 'vitest'
import { fetchGithubActivity } from './github'

const payload = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 123,
          weeks: [
            {
              contributionDays: [
                {
                  date: '2026-07-01',
                  contributionCount: 2,
                  contributionLevel: 'SECOND_QUARTILE',
                },
              ],
            },
          ],
        },
      },
    },
  },
}

describe('fetchGithubActivity', () => {
  it('returns ok:false without a token', async () => {
    expect(await fetchGithubActivity(undefined)).toEqual({ ok: false })
  })

  it('parses a successful GraphQL response', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(payload), { status: 200 }))
    const result = await fetchGithubActivity('tok', fetchImpl as typeof fetch)
    expect(result).toEqual({
      ok: true,
      total: 123,
      weeks: [[{ date: '2026-07-01', count: 2, level: 2 }]],
    })
  })

  it('returns ok:false on non-200', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response('nope', { status: 401 }))
    expect(await fetchGithubActivity('tok', fetchImpl as typeof fetch)).toEqual(
      {
        ok: false,
      },
    )
  })

  it('returns ok:false when fetch throws', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('network'))
    expect(await fetchGithubActivity('tok', fetchImpl as typeof fetch)).toEqual(
      {
        ok: false,
      },
    )
  })
})
