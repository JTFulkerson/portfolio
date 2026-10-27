import handler, { createServerEntry } from '@tanstack/react-start/server-entry'
import { withSecurityHeaders } from '@/lib/security-headers'

// Same as the default TanStack Start entry, plus security headers on every
// Worker response. The CSP is skipped in dev, where Vite injects its own
// inline scripts and HMR websocket.
export default createServerEntry({
  async fetch(request, opts) {
    const response = await handler.fetch(request, opts)
    return withSecurityHeaders(response, { csp: !import.meta.env.DEV })
  },
})
