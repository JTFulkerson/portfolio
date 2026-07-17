import { useEffect, useRef, useState } from 'react'
import type { CommandContext, OutputLine } from '@/data/commands'
import { commands } from '@/data/commands'
import { executeInput, filterCommands } from '@/lib/palette'

type ScrollbackEntry = { input: string; lines: Array<OutputLine> }

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState(0)
  const [scrollback, setScrollback] = useState<Array<ScrollbackEntry>>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollbackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    } else {
      setInput('')
      setSelected(0)
    }
  }, [open])

  useEffect(() => {
    scrollbackRef.current?.scrollTo({ top: scrollbackRef.current.scrollHeight })
  }, [scrollback])

  if (!open) return null

  const ctx: CommandContext = {
    scrollTo: (id) => {
      onClose()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    },
    open: (url) => {
      onClose()
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    clear: () => setScrollback([]),
  }

  const filtered = filterCommands(commands, input)

  const run = (raw: string) => {
    const result = executeInput(commands, raw, ctx)
    if (result.type === 'output') {
      setScrollback((s) => [...s, { input: raw.trim(), lines: result.lines }])
    } else if (result.type === 'async-output') {
      const entry: ScrollbackEntry = { input: raw.trim(), lines: ['…'] }
      setScrollback((s) => [...s, entry])
      const patch = (lines: Array<OutputLine>) =>
        setScrollback((s) => s.map((e) => (e === entry ? { ...e, lines } : e)))
      result.lines.then(patch, () => patch(['command failed']))
    }
    setInput('')
    setSelected(0)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(filtered[selected]?.name ?? input)
    } else if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-line bg-panel shadow-2xl">
        {scrollback.length > 0 && (
          <div
            ref={scrollbackRef}
            data-testid="scrollback"
            className="max-h-40 overflow-y-auto border-b border-line px-4 py-2 font-mono text-[11px]"
          >
            {scrollback.map((entry, i) => (
              <div key={i} className="py-1">
                <div>
                  <span className="text-prompt">❯</span> {entry.input}
                </div>
                {entry.lines.map((line, j) =>
                  typeof line === 'string' ||
                  !line.href.startsWith('https://') ? (
                    <div key={j} className="whitespace-pre-wrap text-muted">
                      {typeof line === 'string' ? line : line.text}
                    </div>
                  ) : (
                    <div key={j}>
                      <a
                        href={line.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted underline-offset-2 hover:text-accent hover:underline"
                      >
                        {line.text}
                      </a>
                    </div>
                  ),
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="font-mono text-xs text-prompt">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setSelected(0)
            }}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent font-mono text-xs text-fg outline-none placeholder:text-faint"
            placeholder="type a command…"
            aria-label="Command input"
          />
        </div>
        <ul
          className="max-h-64 overflow-y-auto p-2"
          role="listbox"
          aria-label="Commands"
        >
          {filtered.map((c, i) => (
            <li key={c.name} role="option" aria-selected={i === selected}>
              <button
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-mono text-[11px] ${
                  i === selected ? 'bg-line/60 text-fg' : 'text-muted'
                }`}
                onMouseEnter={() => setSelected(i)}
                onClick={() => run(c.name)}
              >
                <span>{c.name}</span>
                <span className="text-[9px] text-faint">{c.description}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 border-t border-line px-4 py-2 font-mono text-[9px] text-faint">
          <span>↑↓ navigate</span>
          <span>↵ run</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}
