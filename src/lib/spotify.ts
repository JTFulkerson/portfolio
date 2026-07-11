export type NowPlaying =
  | { ok: true; playing: boolean; title: string; artist: string; url: string }
  | { ok: false }

type SpotifyTrack = {
  name: string
  artists: Array<{ name: string }>
  external_urls: { spotify: string }
}

function toResult(track: SpotifyTrack, playing: boolean): NowPlaying {
  return {
    ok: true,
    playing,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(', '),
    url: track.external_urls.spotify,
  }
}

export async function fetchNowPlaying(
  creds: { clientId?: string; clientSecret?: string; refreshToken?: string },
  fetchImpl: typeof fetch = fetch,
): Promise<NowPlaying> {
  const { clientId, clientSecret, refreshToken } = creds
  if (!clientId || !clientSecret || !refreshToken) return { ok: false }
  try {
    const tokenRes = await fetchImpl('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      signal: AbortSignal.timeout(3000),
    })
    if (!tokenRes.ok) return { ok: false }
    const { access_token } = (await tokenRes.json()) as { access_token: string }
    const authInit = {
      headers: { authorization: `Bearer ${access_token}` },
      signal: AbortSignal.timeout(3000),
    }

    const nowRes = await fetchImpl(
      'https://api.spotify.com/v1/me/player/currently-playing',
      authInit,
    )
    if (nowRes.status === 200) {
      const data = (await nowRes.json()) as { item?: SpotifyTrack }
      if (data.item) return toResult(data.item, true)
    }

    const recentRes = await fetchImpl(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      authInit,
    )
    if (!recentRes.ok) return { ok: false }
    const recent = (await recentRes.json()) as {
      items?: Array<{ track: SpotifyTrack }>
    }
    const track = recent.items?.[0]?.track
    if (!track) return { ok: false }
    return toResult(track, false)
  } catch {
    return { ok: false }
  }
}
