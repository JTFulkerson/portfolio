import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MotionProvider, Reveal, SectionHeading, Typed } from './motion'

describe('Typed', () => {
  it('types out the full text over time', async () => {
    render(
      <MotionProvider>
        <Typed text="whoami" speed={5} />
      </MotionProvider>,
    )
    await waitFor(() =>
      expect(screen.getByLabelText('whoami').textContent).toBe('whoami'),
    )
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
