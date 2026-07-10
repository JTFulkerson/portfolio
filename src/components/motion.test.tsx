import { act, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MotionProvider, Reveal, SectionHeading, Typed } from './motion'

describe('Typed', () => {
  it('types out the full text over time', async () => {
    vi.useFakeTimers()
    render(
      <MotionProvider>
        <Typed text="whoami" speed={10} />
      </MotionProvider>,
    )
    await act(async () => {
      vi.advanceTimersByTime(200)
    })
    expect(screen.getByLabelText('whoami').textContent).toBe('whoami')
    vi.useRealTimers()
  })
})

describe('Reveal', () => {
  it('renders its children', () => {
    render(
      <MotionProvider>
        <Reveal>
          <p>hello</p>
        </Reveal>
      </MotionProvider>,
    )
    expect(screen.getByText('hello')).toBeTruthy()
  })
})

describe('SectionHeading', () => {
  it('renders the padded index and title', () => {
    render(
      <MotionProvider>
        <SectionHeading index={1} title="work" />
      </MotionProvider>,
    )
    expect(screen.getByText('work')).toBeTruthy()
  })
})
