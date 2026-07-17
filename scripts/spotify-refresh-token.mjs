// Usage:
//   1. In your Spotify app settings add redirect URI: http://127.0.0.1:8888/callback
//   2. SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=xxx node scripts/spotify-refresh-token.mjs
//   3. Open the printed URL, approve, and the refresh token prints here.
import http from 'node:http'

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
if (!clientId || !clientSecret) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET')
  process.exit(1)
}

const redirectUri = 'http://127.0.0.1:8888/callback'
const scope = 'user-read-currently-playing user-read-recently-played'
const authUrl = new URL('https://accounts.spotify.com/authorize')
authUrl.search = new URLSearchParams({
  response_type: 'code',
  client_id: clientId,
  scope,
  redirect_uri: redirectUri,
}).toString()

console.log('\nOpen this URL and approve access:\n\n' + authUrl.href + '\n')

http
  .createServer(async (req, res) => {
    const code = new URL(req.url, redirectUri).searchParams.get('code')
    if (!code) return res.end('No code in callback')
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    })
    const json = await tokenRes.json()
    res.end('Done — check your terminal.')
    console.log('\nSPOTIFY_REFRESH_TOKEN=' + json.refresh_token + '\n')
    process.exit(0)
  })
  .listen(8888)
