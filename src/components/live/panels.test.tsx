import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GithubPanel } from './GithubPanel'
import { SpotifyPanel } from './SpotifyPanel'
import { getGithubActivity, getNowPlaying } from '@/server/live'

vi.mock('@/server/live', () => ({
  getGithubActivity: vi.fn(),
  getNowPlaying: vi.fn(),
}))

beforeEach(() => {
  vi.mocked(getGithubActivity).mockReset()
  vi.mocked(getNowPlaying).mockReset()
})

describe('GithubPanel', () => {
  it('renders the contribution grid on success', async () => {
    vi.mocked(getGithubActivity).mockResolvedValue({
      ok: true,
      total: 321,
      weeks: [[{ date: '2026-07-01', count: 2, level: 2 }]],
    })
    render(<GithubPanel />)
    expect(await screen.findByText(/321 contributions/)).toBeTruthy()
  })

  it('renders the static fallback on failure', async () => {
    vi.mocked(getGithubActivity).mockResolvedValue({ ok: false })
    render(<GithubPanel />)
    expect(await screen.findByText(/@JTFulkerson/)).toBeTruthy()
  })
})

describe('SpotifyPanel', () => {
  it('renders now playing on success', async () => {
    vi.mocked(getNowPlaying).mockResolvedValue({
      ok: true,
      playing: true,
      title: 'Song',
      artist: 'Artist',
      url: 'https://open.spotify.com/track/x',
    })
    render(<SpotifyPanel />)
    expect(await screen.findByText(/Song — Artist/)).toBeTruthy()
    expect(screen.getByText(/now playing/)).toBeTruthy()
  })

  it('renders last played when not playing', async () => {
    vi.mocked(getNowPlaying).mockResolvedValue({
      ok: true,
      playing: false,
      title: 'Song',
      artist: 'Artist',
      url: 'https://open.spotify.com/track/x',
    })
    render(<SpotifyPanel />)
    expect(await screen.findByText(/last played/)).toBeTruthy()
  })

  it('hides the prompt line on failure', async () => {
    vi.mocked(getNowPlaying).mockResolvedValue({ ok: false })
    render(<SpotifyPanel />)
    await vi.waitFor(() => expect(screen.queryByText('music')).toBeNull())
  })
})
