import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CommandPalette } from './CommandPalette'
import { PaletteProvider, usePalette } from './PaletteProvider'

describe('CommandPalette', () => {
  it('renders nothing when closed', () => {
    render(<CommandPalette open={false} onClose={() => {}} />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('shows the command list and filters as you type', () => {
    render(<CommandPalette open onClose={() => {}} />)
    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(screen.getByText('whoami')).toBeTruthy()
    fireEvent.change(screen.getByLabelText('Command input'), {
      target: { value: 'resume' },
    })
    expect(screen.getByText('cat resume.pdf')).toBeTruthy()
    expect(screen.queryByText('whoami')).toBeNull()
  })

  it('runs a REPL command on Enter and prints scrollback', () => {
    render(<CommandPalette open onClose={() => {}} />)
    const input = screen.getByLabelText('Command input')
    fireEvent.change(input, { target: { value: 'whoami' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByTestId('scrollback').textContent).toContain('CoStar')
  })

  it('prints command-not-found for unknown input', () => {
    render(<CommandPalette open onClose={() => {}} />)
    const input = screen.getByLabelText('Command input')
    fireEvent.change(input, { target: { value: 'zzzzzz' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByTestId('scrollback').textContent).toContain(
      'command not found',
    )
  })

  it('closes on Escape', () => {
    const onClose = vi.fn()
    render(<CommandPalette open onClose={onClose} />)
    fireEvent.keyDown(screen.getByLabelText('Command input'), { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })
})

describe('PaletteProvider', () => {
  it('opens the palette on ⌘K', () => {
    render(
      <PaletteProvider>
        <div>page</div>
      </PaletteProvider>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()
    fireEvent.keyDown(window, { key: 'k', metaKey: true })
    expect(screen.getByRole('dialog')).toBeTruthy()
  })

  it('exposes openPalette via usePalette', () => {
    function Opener() {
      const { openPalette } = usePalette()
      return <button onClick={openPalette}>open</button>
    }
    render(
      <PaletteProvider>
        <Opener />
      </PaletteProvider>,
    )
    fireEvent.click(screen.getByText('open'))
    expect(screen.getByRole('dialog')).toBeTruthy()
  })
})
