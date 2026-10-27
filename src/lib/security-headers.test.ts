import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  SECURITY_HEADERS,
  contentSecurityPolicy,
  createNonce,
  withSecurityHeaders,
} from './security-headers'

// jsdom has no HTMLRewriter (a Workers runtime API); record what it is asked to
// do instead. The real rewriter is exercised by the workerd preview build.
class FakeHTMLRewriter {
  static nonces: Array<string> = []
  private selector = ''
  on(selector: string, handler: { element: (el: unknown) => void }) {
    this.selector = selector
    handler.element({
      setAttribute: (name: string, value: string) => {
        if (this.selector === 'script' && name === 'nonce') {
          FakeHTMLRewriter.nonces.push(value)
        }
      },
    })
    return this
  }
  transform(response: Response) {
    return response
  }
}

const html = () =>
  new Response('<html><script>1</script></html>', {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })

describe('security headers', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    FakeHTMLRewriter.nonces = []
  })

  it('builds a CSP that only allows nonced inline scripts', () => {
    const csp = contentSecurityPolicy('abc123')
    expect(csp).toContain("script-src 'self' 'nonce-abc123'")
    expect(csp).not.toMatch(/script-src[^;]*unsafe-inline/)
    expect(csp).toContain("object-src 'none'")
    expect(csp).toContain("frame-ancestors 'none'")
  })

  it('creates a fresh 128-bit nonce each time', () => {
    const a = createNonce()
    expect(a).toMatch(/^[A-Za-z0-9+/]{22}==$/)
    expect(createNonce()).not.toBe(a)
  })

  it('adds the base headers but no CSP to non-HTML responses', () => {
    const res = withSecurityHeaders(Response.json({ ok: true }), { csp: true })
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      expect(res.headers.get(name)).toBe(value)
    }
    expect(res.headers.get('content-security-policy')).toBeNull()
  })

  it('skips the CSP when disabled (dev)', () => {
    const res = withSecurityHeaders(html(), { csp: false })
    expect(res.headers.get('x-frame-options')).toBe('DENY')
    expect(res.headers.get('content-security-policy')).toBeNull()
  })

  it('nonces every script with the nonce named in the CSP', () => {
    vi.stubGlobal('HTMLRewriter', FakeHTMLRewriter)
    const res = withSecurityHeaders(html(), { csp: true })
    const csp = res.headers.get('content-security-policy') ?? ''
    const nonce = /'nonce-([^']+)'/.exec(csp)?.[1]
    expect(nonce).toBeTruthy()
    expect(FakeHTMLRewriter.nonces).toEqual([nonce])
  })
})
