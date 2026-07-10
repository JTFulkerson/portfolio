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

  it('moves the selection with ArrowDown and ArrowUp', () => {
    render(<CommandPalette open onClose={() => {}} />)
    const input = screen.getByLabelText('Command input')
    const options = screen.getAllByRole('option')
    expect(options[0].getAttribute('aria-selected')).toBe('true')
    expect(options[1].getAttribute('aria-selected')).toBe('false')

    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(options[0].getAttribute('aria-selected')).toBe('false')
    expect(options[1].getAttribute('aria-selected')).toBe('true')

    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(options[0].getAttribute('aria-selected')).toBe('true')
    expect(options[1].getAttribute('aria-selected')).toBe('false')
  })

  it('resets the selection to index 0 when the filter query changes', () => {
    render(<CommandPalette open onClose={() => {}} />)
    const input = screen.getByLabelText('Command input')

    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    let options = screen.getAllByRole('option')
    expect(options[2].getAttribute('aria-selected')).toBe('true')

    fireEvent.change(input, { target: { value: 'projects' } })
    options = screen.getAllByRole('option')
    expect(options[0].getAttribute('aria-selected')).toBe('true')
  })

  it('resets input and selection after the palette closes and reopens', () => {
    const { rerender } = render(<CommandPalette open onClose={() => {}} />)
    const input = screen.getByLabelText('Command input')
    fireEvent.change(input, { target: { value: 'resume' } })
    expect((input as HTMLInputElement).value).toBe('resume')

    rerender(<CommandPalette open={false} onClose={() => {}} />)
    rerender(<CommandPalette open onClose={() => {}} />)

    const reopenedInput = screen.getByLabelText('Command input')
    expect((reopenedInput as HTMLInputElement).value).toBe('')
  })

  it('swallows Tab and keeps focus on the input', () => {
    render(<CommandPalette open onClose={() => {}} />)
    const input = screen.getByLabelText('Command input')
    input.focus()
    expect(document.activeElement).toBe(input)

    const event = fireEvent.keyDown(input, { key: 'Tab' })
    expect(event).toBe(false)
    expect(document.activeElement).toBe(input)
  })

  it('calls onClose when the backdrop is clicked', () => {
    const onClose = vi.fn()
    const { container } = render(<CommandPalette open onClose={onClose} />)
    const backdrop = container.querySelector('[class*="bg-black/50"]')
    expect(backdrop).toBeTruthy()
    fireEvent.click(backdrop as Element)
    expect(onClose).toHaveBeenCalled()
  })

  it('scrolls to the target section and closes on a navigation command', () => {
    const work = document.createElement('div')
    work.id = 'work'
    document.body.appendChild(work)
    const scrollSpy = vi.fn()
    work.scrollIntoView = scrollSpy

    const onClose = vi.fn()
    render(<CommandPalette open onClose={onClose} />)
    const input = screen.getByLabelText('Command input')
    fireEvent.change(input, { target: { value: 'cd #work' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onClose).toHaveBeenCalled()
    expect(scrollSpy).toHaveBeenCalled()

    document.body.removeChild(work)
  })

  it('opens an external link and closes on a project link command', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const onClose = vi.fn()
    render(<CommandPalette open onClose={onClose} />)
    const input = screen.getByLabelText('Command input')
    fireEvent.change(input, { target: { value: 'open projects/aroma' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onClose).toHaveBeenCalled()
    expect(openSpy).toHaveBeenCalledWith(
      'https://aroma.johnfulkerson.com',
      '_blank',
      'noopener,noreferrer',
    )

    openSpy.mockRestore()
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
