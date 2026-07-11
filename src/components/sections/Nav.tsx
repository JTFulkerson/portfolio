import { usePalette } from '@/components/palette/PaletteProvider'
import { sections } from '@/data/sections'
import { useActiveSection } from '@/lib/use-active-section'

const ids = sections.map((s) => s.id)

export function Nav() {
  const active = useActiveSection(ids)
  const { openPalette } = usePalette()
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="font-mono text-xs text-muted hover:text-fg">
          ~/jfulkerson
        </a>
        <nav className="flex items-center gap-5 text-xs" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={
                active === s.id
                  ? 'font-medium text-fg'
                  : 'text-muted hover:text-fg'
              }
            >
              {s.label}
            </a>
          ))}
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted hover:text-fg"
          >
            ⌘K
          </button>
        </nav>
      </div>
    </header>
  )
}
