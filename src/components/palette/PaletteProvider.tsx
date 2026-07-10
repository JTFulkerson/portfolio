import { createContext, useContext, useEffect, useState } from 'react'
import { CommandPalette } from './CommandPalette'
import type { ReactNode } from 'react'

const PaletteContext = createContext<{ openPalette: () => void }>({
  openPalette: () => {},
})

export function usePalette() {
  return useContext(PaletteContext)
}

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <PaletteContext.Provider value={{ openPalette: () => setOpen(true) }}>
      {children}
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </PaletteContext.Provider>
  )
}
