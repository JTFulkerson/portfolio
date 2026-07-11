export type GithubDay = { date: string; count: number; level: number }

export type GithubActivity =
  | { ok: true; total: number; weeks: Array<Array<GithubDay>> }
  | { ok: false }

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

type CalendarDay = {
  date: string
  contributionCount: number
  contributionLevel: string
}

export async function fetchGithubActivity(
  token: string | undefined,
  fetchImpl: typeof fetch = fetch,
): Promise<GithubActivity> {
  if (!token) return { ok: false }
  try {
    const res = await fetchImpl('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'user-agent': 'johnfulkerson.com',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: 'JTFulkerson' },
      }),
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) return { ok: false }
    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              totalContributions: number
              weeks: Array<{ contributionDays: Array<CalendarDay> }>
            }
          }
        }
      }
    }
    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar) return { ok: false }
    return {
      ok: true,
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVELS[d.contributionLevel] ?? 0,
        })),
      ),
    }
  } catch {
    return { ok: false }
  }
}
