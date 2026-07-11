import { createServerFn } from '@tanstack/react-start'
import { cached } from '@/lib/edge-cache'
import { fetchGithubActivity } from '@/lib/github'
import { fetchNowPlaying } from '@/lib/spotify'

async function workerEnv(): Promise<Record<string, string | undefined>> {
  const { env } = await import('cloudflare:workers')
  return env as unknown as Record<string, string | undefined>
}

export const getGithubActivity = createServerFn({ method: 'GET' }).handler(
  async () => {
    const env = await workerEnv()
    return cached('github', 600, () => fetchGithubActivity(env.GITHUB_TOKEN))
  },
)

export const getNowPlaying = createServerFn({ method: 'GET' }).handler(
  async () => {
    const env = await workerEnv()
    return cached('spotify', 60, () =>
      fetchNowPlaying({
        clientId: env.SPOTIFY_CLIENT_ID,
        clientSecret: env.SPOTIFY_CLIENT_SECRET,
        refreshToken: env.SPOTIFY_REFRESH_TOKEN,
      }),
    )
  },
)
