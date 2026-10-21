import type { MouseEvent } from 'react'

// Scroll behavior comes from CSS (`html { scroll-behavior }`), which already
// switches to instant scrolling for prefers-reduced-motion.
export function scrollToSection(id: string) {
  if (id === 'top') {
    window.scrollTo({ top: 0 })
    return
  }
  document.getElementById(id)?.scrollIntoView()
}

// In-page links keep a real `#id` href (middle-click, copy link, no-JS), but a
// plain click scrolls without adding the hash to the address bar.
export function onSectionLinkClick(
  event: MouseEvent<HTMLAnchorElement>,
  id: string,
) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }
  event.preventDefault()
  scrollToSection(id)
}
