// Security headers for responses rendered by the Worker. Static files served
// straight from Workers Assets get the non-CSP headers from public/_headers.

export const SECURITY_HEADERS: Readonly<Record<string, string>> = {
  // No includeSubDomains/preload: those would also bind aroma., timer. and
  // other subdomains and are hard to undo.
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
}

// Inline scripts must carry the per-response nonce; script files are allowed
// from this origin. No 'strict-dynamic': it would also require a nonce on the
// framework's <link rel="modulepreload"> tags. Inline styles stay allowed
// because SSR emits style="" attributes for motion.
export function contentSecurityPolicy(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "media-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ')
}

export function createNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return btoa(String.fromCharCode(...bytes))
}

function isHtml(response: Response): boolean {
  return (response.headers.get('content-type') ?? '').includes('text/html')
}

// Returns a copy of the response with the security headers applied. For HTML
// (when `csp` is on), every <script> gets a fresh nonce and a matching CSP is
// sent. Every script in our HTML is emitted by the app itself; there is no
// user-generated markup.
export function withSecurityHeaders(
  response: Response,
  { csp }: { csp: boolean },
): Response {
  const secured = new Response(response.body, response)
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    secured.headers.set(name, value)
  }
  if (!csp || !isHtml(secured)) return secured

  const nonce = createNonce()
  secured.headers.set('Content-Security-Policy', contentSecurityPolicy(nonce))
  return new HTMLRewriter()
    .on('script', {
      element(el) {
        el.setAttribute('nonce', nonce)
      },
    })
    .transform(secured)
}
