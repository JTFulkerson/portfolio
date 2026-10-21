import { afterEach, describe, expect, it, vi } from 'vitest'
import { onSectionLinkClick, scrollToSection } from './scroll'
import type { MouseEvent } from 'react'

const click = (init: Partial<MouseEvent<HTMLAnchorElement>> = {}) => {
  const preventDefault = vi.fn()
  const event = {
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    preventDefault,
    ...init,
  } as unknown as MouseEvent<HTMLAnchorElement>
  return { event, preventDefault }
}

describe('section scrolling', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('scrolls a section into view by id', () => {
    const el = document.createElement('section')
    el.id = 'work'
    el.scrollIntoView = vi.fn()
    document.body.appendChild(el)
    scrollToSection('work')
    expect(el.scrollIntoView).toHaveBeenCalled()
  })

  it('scrolls the window for #top', () => {
    const spy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    scrollToSection('top')
    expect(spy).toHaveBeenCalledWith({ top: 0 })
  })

  it('a plain click scrolls without following the hash link', () => {
    const el = document.createElement('section')
    el.id = 'about'
    el.scrollIntoView = vi.fn()
    document.body.appendChild(el)
    const { event, preventDefault } = click()
    onSectionLinkClick(event, 'about')
    expect(preventDefault).toHaveBeenCalled()
    expect(el.scrollIntoView).toHaveBeenCalled()
  })

  it('modified or middle clicks keep normal link behavior', () => {
    for (const init of [{ metaKey: true }, { ctrlKey: true }, { button: 1 }]) {
      const { event, preventDefault } = click(init)
      onSectionLinkClick(event, 'about')
      expect(preventDefault).not.toHaveBeenCalled()
    }
  })
})
