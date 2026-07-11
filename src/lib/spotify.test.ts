import { describe, expect, it, vi } from 'vitest'
import { fetchNowPlaying } from './spotify'

const creds = {
  clientId: 'id',
  clientSecret: 'secret',
  refreshToken: 'refresh',
}
const tokenResponse = () =>
  new Response(JSON.stringify({ access_token: 'tok' }), { status: 200 })

const track = {
  name: 'Song',
  artists: [{ name: 'Artist A' }, { name: 'Artist B' }],
  external_urls: { spotify: 'https://open.spotify.com/track/x' },
}

function fetchByUrl(routes: Record<string, () => Response>) {
  return vi.fn().mockImplementation((url: string) => {
    for (const [prefix, respond] of Object.entries(routes)) {
      if (String(url).startsWith(prefix)) return Promise.resolve(respond())
    }
    return Promise.reject(new Error(`unexpected url: ${url}`))
  }) as unknown as typeof fetch
}

describe('fetchNowPlaying', () => {
  it('returns ok:false when creds are missing', async () => {
    expect(await fetchNowPlaying({})).toEqual({ ok: false })
  })

  it('parses a currently-playing track', async () => {
    const fetchImpl = fetchByUrl({
      'https://accounts.spotify.com/api/token': tokenResponse,
      'https://api.spotify.com/v1/me/player/currently-playing': () =>
        new Response(JSON.stringify({ item: track }), { status: 200 }),
    })
    expect(await fetchNowPlaying(creds, fetchImpl)).toEqual({
      ok: true,
      playing: true,
      title: 'Song',
      artist: 'Artist A, Artist B',
      url: 'https://open.spotify.com/track/x',
    })
  })

  it('falls back to recently-played on 204', async () => {
    const fetchImpl = fetchByUrl({
      'https://accounts.spotify.com/api/token': tokenResponse,
      'https://api.spotify.com/v1/me/player/currently-playing': () =>
        new Response(null, { status: 204 }),
      'https://api.spotify.com/v1/me/player/recently-played': () =>
        new Response(JSON.stringify({ items: [{ track }] }), { status: 200 }),
    })
    expect(await fetchNowPlaying(creds, fetchImpl)).toEqual({
      ok: true,
      playing: false,
      title: 'Song',
      artist: 'Artist A, Artist B',
      url: 'https://open.spotify.com/track/x',
    })
  })

  it('returns ok:false when the token refresh fails', async () => {
    const fetchImpl = fetchByUrl({
      'https://accounts.spotify.com/api/token': () =>
        new Response('bad', { status: 400 }),
    })
    expect(await fetchNowPlaying(creds, fetchImpl)).toEqual({ ok: false })
  })
})
