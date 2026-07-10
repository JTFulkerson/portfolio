import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => cleanup())

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

// @ts-expect-error jsdom has no IntersectionObserver
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
globalThis.IntersectionObserver ??= MockIntersectionObserver

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
window.matchMedia ??= ((query: string) =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList) as typeof window.matchMedia

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
Element.prototype.scrollIntoView ??= () => {}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!window.HTMLElement.prototype.scrollTo) {
  window.HTMLElement.prototype.scrollTo = function () {}
}
