# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild johnfulkerson.com as a modern single-page portfolio (minimal editorial + terminal accents, light/dark via system preference, ⌘K command palette, scroll-driven motion, live GitHub/Spotify panels) per `docs/superpowers/specs/2026-07-10-portfolio-redesign-design.md`.

**Architecture:** Keep the existing TanStack Start + Tailwind v4 + Cloudflare Workers stack untouched. Replace the multi-page UI with one index route composed of section components; all content lives in typed `src/data/` files. Live data flows through two TanStack server functions (pure fetch logic extracted into testable `src/lib/` modules with injected `fetch`), cached in a per-isolate TTL cache, fetched client-side after paint.

**Tech Stack:** TanStack Start v1, React 19, Tailwind CSS v4 (CSS-first `@theme`), framer-motion 12 (`LazyMotion` + `m`), Vitest + Testing Library, Cloudflare Workers via `@cloudflare/vite-plugin`, `@fontsource-variable/inter` + `@fontsource-variable/jetbrains-mono`.

## Global Constraints

- Package manager is **pnpm**. Never npm/yarn.
- **Do not modify** `wrangler.json`, `vite.config.ts`, or the deploy pipeline. The custom domain `johnfulkerson.com` routing must not change.
- Routes `/resume` (→ `/documents/Fulkerson_John_Resume.pdf`) and `/timer` (→ `https://timer.johnfulkerson.com`) **must keep working**. `/about`, `/projects`, `/work` are deleted with **no redirects**.
- Theming is driven **only** by `prefers-color-scheme` (CSS custom properties + media query). No toggle, no localStorage, no theme JS.
- Only new dependencies allowed: `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono` (both runtime deps).
- Nothing dynamic may block first paint or break the page: server functions return `{ ok: true, ... } | { ok: false }` and never throw to the client; all external fetches use `AbortSignal.timeout(3000)`.
- All motion must respect `prefers-reduced-motion` (typing renders instantly, reveals become plain fades, cursor stops blinking).
- Scroll reveals trigger **once** (`viewport={{ once: true }}`); hover effects are 2px lifts, never scale/bounce.
- Gate for every task: `pnpm test` passes and `pnpm check` (prettier --write + eslint --fix) exits clean.
- `src/routeTree.gen.ts` is generated — never hand-edit; it regenerates when `pnpm dev` or `pnpm build` runs.
- Copy (job descriptions, project blurbs, about story) must match the spec verbatim — it was approved word-for-word.

---

### Task 1: Test tooling, fonts, and design tokens

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/test/smoke.test.ts`
- Modify: `src/styles.css` (full replacement)
- Modify: `package.json` (deps only, via pnpm add)

**Interfaces:**
- Consumes: nothing (first task).
- Produces: Tailwind utility classes used by ALL later tasks: `bg-bg`, `bg-panel`, `text-fg`, `text-muted`, `text-faint`, `border-line`, `text-accent`, `bg-accent`, `text-prompt`, `bg-prompt`, `text-keyword`, `text-string`, `font-sans`, `font-mono`, plus the `.animate-cursor` class. Test env: jsdom with `IntersectionObserver`/`matchMedia`/`scrollIntoView` shims and RTL auto-cleanup.

- [ ] **Step 1: Install font packages**

```bash
pnpm add @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

- [ ] **Step 2: Create `vitest.config.ts`**

Vitest prefers `vitest.config.ts` over `vite.config.ts`, which keeps the Cloudflare/TanStack Start plugins (which can't run under plain vitest) out of the test pipeline:

```ts
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [viteTsConfigPaths({ projects: ['./tsconfig.json'] }), viteReact()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

- [ ] **Step 3: Create `src/test/setup.ts`**

jsdom lacks `IntersectionObserver` (used by framer-motion's `whileInView`/`useInView`), `matchMedia` (used by `useReducedMotion`), and `scrollIntoView`:

```ts
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
globalThis.IntersectionObserver ??= MockIntersectionObserver

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

Element.prototype.scrollIntoView ??= () => {}
```

- [ ] **Step 4: Write a smoke test — `src/test/smoke.test.ts`**

```ts
import { describe, expect, it } from 'vitest'

describe('test environment', () => {
  it('has jsdom + shims', () => {
    expect(typeof document).toBe('object')
    expect(typeof IntersectionObserver).toBe('function')
    expect(typeof window.matchMedia).toBe('function')
  })
})
```

- [ ] **Step 5: Run tests — expect PASS**

Run: `pnpm test`
Expected: 1 test file, 1 passed.

- [ ] **Step 6: Replace `src/styles.css` entirely**

This deletes the unused shadcn boilerplate (`.dark` class variant, sidebar/chart tokens, `tw-animate-css`) and installs the approved token system. Full new contents:

```css
@import 'tailwindcss';
@import '@fontsource-variable/inter';
@import '@fontsource-variable/jetbrains-mono';

:root {
  --bg: #fafafa;
  --panel: #ffffff;
  --fg: #18181b;
  --muted: #52525b;
  --faint: #a1a1aa;
  --line: #e4e4e7;
  --accent: #2563eb;
  --syn-prompt: #16a34a;
  --syn-keyword: #7c3aed;
  --syn-string: #b45309;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0c0c0f;
    --panel: #141419;
    --fg: #fafafa;
    --muted: #a1a1aa;
    --faint: #71717a;
    --line: #27272a;
    --accent: #60a5fa;
    --syn-prompt: #4ade80;
    --syn-keyword: #a78bfa;
    --syn-string: #fbbf24;
  }
}

@theme inline {
  --color-bg: var(--bg);
  --color-panel: var(--panel);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-faint: var(--faint);
  --color-line: var(--line);
  --color-accent: var(--accent);
  --color-prompt: var(--syn-prompt);
  --color-keyword: var(--syn-keyword);
  --color-string: var(--syn-string);
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono Variable', ui-monospace, 'SF Mono', Menlo, monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply m-0 bg-bg font-sans text-fg antialiased;
}

@keyframes cursor-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

.animate-cursor {
  animation: cursor-blink 1.1s step-end infinite;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .animate-cursor {
    animation: none;
  }
}
```

Note: `color-scheme` meta is handled in Task 9 via `<meta name="color-scheme" content="light dark">`.

- [ ] **Step 7: Verify the app still builds with new tokens**

Run: `pnpm build`
Expected: build succeeds. (Old pages will look unstyled/odd — they're deleted in Task 9; only build success matters here.)

- [ ] **Step 8: Commit**

```bash
git add vitest.config.ts src/test/ src/styles.css package.json pnpm-lock.yaml
git commit -m "feat: add vitest setup, self-hosted fonts, and design token system"
```

---

### Task 2: Typed content data files

**Files:**
- Create: `src/data/jobs.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/about.ts`
- Create: `src/data/socials.ts`
- Create: `src/data/sections.ts`
- Test: `src/data/data.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (exact exports later tasks import):
  - `jobs: Array<Job>` where `Job = { title: string; company: string; period: string; status?: 'incoming'; description?: string; featured: boolean }`
  - `projects: Array<Project>` where `Project = { name: string; status: string; link?: string; description: string; tags: Array<string>; image?: string }`
  - `aboutStory: string`, `aboutChips: ReadonlyArray<string>`
  - `socials: Array<Social>` where `Social = { label: string; href: string; primary: boolean }`
  - `sections: Array<{ id: string; label: string }>` (ids: `work`, `projects`, `about`)

- [ ] **Step 1: Write the failing test — `src/data/data.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { aboutChips, aboutStory } from './about'
import { jobs } from './jobs'
import { projects } from './projects'
import { sections } from './sections'
import { socials } from './socials'

describe('content data', () => {
  it('features exactly three jobs, CoStar incoming first', () => {
    const featured = jobs.filter((j) => j.featured)
    expect(featured).toHaveLength(3)
    expect(featured[0].company).toBe('CoStar Group')
    expect(featured[0].status).toBe('incoming')
  })

  it('has the three approved projects in order', () => {
    expect(projects.map((p) => p.name)).toEqual(['Aroma', 'Makerspace Platform', 'Timer'])
  })

  it('has exactly three primary socials', () => {
    expect(socials.filter((s) => s.primary).map((s) => s.label)).toEqual([
      'Email',
      'GitHub',
      'LinkedIn',
    ])
  })

  it('has section anchors for nav', () => {
    expect(sections.map((s) => s.id)).toEqual(['work', 'projects', 'about'])
  })

  it('about content exists', () => {
    expect(aboutStory.length).toBeGreaterThan(50)
    expect(aboutChips.length).toBe(3)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test`
Expected: FAIL — cannot resolve `./jobs` etc.

- [ ] **Step 3: Create the data files**

`src/data/jobs.ts`:

```ts
export type Job = {
  title: string
  company: string
  period: string
  status?: 'incoming'
  description?: string
  featured: boolean
}

export const jobs: Array<Job> = [
  {
    title: 'Software Engineer',
    company: 'CoStar Group',
    period: '2026 →',
    status: 'incoming',
    featured: true,
  },
  {
    title: 'Technology Intern',
    company: 'CoStar Group',
    period: 'summer 2025',
    description:
      "Built CoStar's first infrastructure-level generative-AI framework — TypeScript + AWS, scaling AI content creation across every product.",
    featured: true,
  },
  {
    title: 'Lab Assistant → Team Lead',
    company: 'UD Pearson Hall Makerspace',
    period: '2023 →',
    description:
      "Leading a senior-design team building the makerspace's operations platform — usage analytics and custom saved queries for staff, students, and deans.",
    featured: true,
  },
  {
    title: 'Resident Assistant',
    company: 'University of Delaware',
    period: '2023 – 2025',
    description:
      'Two years in Residence Life & Housing — up to 60 residents, community building, safety.',
    featured: false,
  },
  {
    title: 'Dive Instructor',
    company: 'ActionQuest · British Virgin Islands',
    period: 'summer 2024',
    description:
      'Taught scuba to students ages 12–16 — led dives, physics and safety instruction, in and out of the water.',
    featured: false,
  },
  {
    title: 'Event Service Technician',
    company: 'Fairfax County Public Schools',
    period: '2019 – 2025',
    description:
      'Live audio, lighting, and streaming for school-board meetings and high-stakes events.',
    featured: false,
  },
]
```

`src/data/projects.ts`:

```ts
export type Project = {
  name: string
  status: string
  link?: string
  description: string
  tags: Array<string>
  image?: string
}

export const projects: Array<Project> = [
  {
    name: 'Aroma',
    status: 'aroma.johnfulkerson.com ↗',
    link: 'https://aroma.johnfulkerson.com',
    description:
      "Recipe manager for college students — paste a link and it parses the recipe; generates meals from what's on hand and your dietary preferences. Born from going gluten-free.",
    tags: ['react', 'llm parsing', 'full-stack'],
  },
  {
    name: 'Makerspace Platform',
    status: 'in production @ UD',
    description:
      'Operations platform for Pearson Hall Makerspace — usage analytics and custom saved queries for staff, students, and deans.',
    tags: ['full-stack', 'analytics', 'senior design'],
  },
  {
    name: 'Timer',
    status: 'timer.johnfulkerson.com ↗',
    link: 'https://timer.johnfulkerson.com',
    description:
      'Meeting timer built for the Fairfax County School Board — used in real board meetings.',
    tags: ['react', 'in production'],
    image: '/images/timer-visual.png',
  },
]
```

`src/data/about.ts`:

```ts
export const aboutStory =
  "Off-screen I'm a PADI Open Water Scuba Instructor (taught in the BVI), served as Commodore of UD's sailing team, and spent years running lights and sound for school-board meetings and theater. I like systems where the details matter — underwater, on stage, or in production."

export const aboutChips: ReadonlyArray<string> = [
  '🤿 PADI Open Water Scuba Instructor',
  '⛵ UD Sailing Commodore',
  '🎭 Live event tech',
]
```

`src/data/socials.ts`:

```ts
export type Social = {
  label: string
  href: string
  primary: boolean
}

export const socials: Array<Social> = [
  { label: 'Email', href: 'mailto:johnfulky@mac.com', primary: true },
  { label: 'GitHub', href: 'https://github.com/JTFulkerson', primary: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jtfulkerson/', primary: true },
  { label: 'Instagram', href: 'https://www.instagram.com/jt_fulkerson/', primary: false },
  { label: 'Twitter', href: 'https://twitter.com/JT_Fulkerson', primary: false },
  { label: 'Facebook', href: 'https://www.facebook.com/john.fulkerson.98837/', primary: false },
]
```

`src/data/sections.ts`:

```ts
export const sections: Array<{ id: string; label: string }> = [
  { id: 'work', label: 'work' },
  { id: 'projects', label: 'projects' },
  { id: 'about', label: 'about' },
]
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add typed content data files"
```

---

### Task 3: Palette logic — fuzzy filter, execution, command registry

**Files:**
- Create: `src/lib/fuzzy.ts`
- Create: `src/lib/palette.ts`
- Create: `src/data/commands.ts`
- Test: `src/lib/fuzzy.test.ts`, `src/lib/palette.test.ts`, `src/data/commands.test.ts`

**Interfaces:**
- Consumes: `projects` from `src/data/projects.ts`.
- Produces:
  - `fuzzyMatch(query: string, target: string): boolean`
  - `filterCommands(commands: Array<Command>, query: string): Array<Command>`
  - `executeInput(commands: Array<Command>, input: string, ctx: CommandContext): CommandResult`
  - `commands: Array<Command>` and types `Command = { name: string; description: string; keywords?: Array<string>; run: (ctx: CommandContext) => CommandResult }`, `CommandContext = { scrollTo: (id: string) => void; open: (url: string) => void }`, `CommandResult = { type: 'output'; lines: Array<string> } | { type: 'action' }`

- [ ] **Step 1: Write failing tests**

`src/lib/fuzzy.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { fuzzyMatch } from './fuzzy'

describe('fuzzyMatch', () => {
  it('matches subsequences case-insensitively', () => {
    expect(fuzzyMatch('cdw', 'cd #work')).toBe(true)
    expect(fuzzyMatch('WHOAMI', 'whoami')).toBe(true)
  })
  it('matches with spaces stripped from query', () => {
    expect(fuzzyMatch('ls proj', 'ls projects/')).toBe(true)
  })
  it('rejects non-subsequences', () => {
    expect(fuzzyMatch('xyz', 'whoami')).toBe(false)
  })
  it('empty query matches everything', () => {
    expect(fuzzyMatch('', 'anything')).toBe(true)
  })
})
```

`src/lib/palette.test.ts`:

```ts
import { describe, expect, it, vi } from 'vitest'
import { executeInput, filterCommands } from './palette'
import type { Command, CommandContext } from '@/data/commands'

const noopCtx: CommandContext = { scrollTo: () => {}, open: () => {} }

const testCommands: Array<Command> = [
  {
    name: 'whoami',
    description: 'about',
    run: () => ({ type: 'output', lines: ['John'] }),
  },
  {
    name: 'cd #work',
    description: 'scroll',
    keywords: ['work'],
    run: (ctx) => {
      ctx.scrollTo('work')
      return { type: 'action' }
    },
  },
]

describe('filterCommands', () => {
  it('returns all commands for empty query', () => {
    expect(filterCommands(testCommands, '')).toHaveLength(2)
  })
  it('filters by name and keywords', () => {
    expect(filterCommands(testCommands, 'work').map((c) => c.name)).toEqual(['cd #work'])
  })
})

describe('executeInput', () => {
  it('runs an exact-name command', () => {
    const result = executeInput(testCommands, 'whoami', noopCtx)
    expect(result).toEqual({ type: 'output', lines: ['John'] })
  })
  it('runs a unique fuzzy match', () => {
    const scrollTo = vi.fn()
    const result = executeInput(testCommands, 'cdw', { ...noopCtx, scrollTo })
    expect(result.type).toBe('action')
    expect(scrollTo).toHaveBeenCalledWith('work')
  })
  it('returns command-not-found output for unknown input', () => {
    const result = executeInput(testCommands, 'rm -rf /', noopCtx)
    expect(result.type).toBe('output')
    if (result.type === 'output') {
      expect(result.lines[0]).toContain('command not found: rm -rf /')
      expect(result.lines[1]).toContain("try 'help'")
    }
  })
})
```

`src/data/commands.test.ts`:

```ts
import { describe, expect, it, vi } from 'vitest'
import { commands } from './commands'
import type { CommandContext } from './commands'

const ctx = (): CommandContext => ({ scrollTo: vi.fn(), open: vi.fn() })

const byName = (name: string) => {
  const cmd = commands.find((c) => c.name === name)
  if (!cmd) throw new Error(`missing command: ${name}`)
  return cmd
}

describe('command registry', () => {
  it('includes the spec command set', () => {
    const names = commands.map((c) => c.name)
    for (const required of [
      'whoami',
      'ls projects/',
      'cat resume.pdf',
      'sudo hire-me',
      'help',
      'cd #work',
      'cd #projects',
      'cd #about',
    ]) {
      expect(names).toContain(required)
    }
  })

  it('whoami outputs identity lines', () => {
    const result = byName('whoami').run(ctx())
    expect(result.type).toBe('output')
    if (result.type === 'output') {
      expect(result.lines.join('\n')).toContain('CoStar')
    }
  })

  it('ls projects/ lists all three projects', () => {
    const result = byName('ls projects/').run(ctx())
    if (result.type === 'output') expect(result.lines).toHaveLength(3)
  })

  it('cd #work scrolls and closes', () => {
    const c = ctx()
    const result = byName('cd #work').run(c)
    expect(result.type).toBe('action')
    expect(c.scrollTo).toHaveBeenCalledWith('work')
  })

  it('cat resume.pdf opens the PDF', () => {
    const c = ctx()
    byName('cat resume.pdf').run(c)
    expect(c.open).toHaveBeenCalledWith('/documents/Fulkerson_John_Resume.pdf')
  })

  it('help lists every command name', () => {
    const result = byName('help').run(ctx())
    if (result.type === 'output') {
      expect(result.lines).toHaveLength(commands.length)
    }
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement**

`src/lib/fuzzy.ts`:

```ts
export function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase().replace(/\s+/g, '')
  if (q.length === 0) return true
  const t = target.toLowerCase()
  let i = 0
  for (const ch of t) {
    if (ch === q[i]) i++
    if (i === q.length) return true
  }
  return false
}
```

`src/data/commands.ts`:

```ts
import { projects } from './projects'

export type CommandContext = {
  scrollTo: (id: string) => void
  open: (url: string) => void
}

export type CommandResult =
  | { type: 'output'; lines: Array<string> }
  | { type: 'action' }

export type Command = {
  name: string
  description: string
  keywords?: Array<string>
  run: (ctx: CommandContext) => CommandResult
}

export const commands: Array<Command> = [
  {
    name: 'whoami',
    description: 'about me',
    run: () => ({
      type: 'output',
      lines: [
        "John Fulkerson — CS @ UD '26",
        'Incoming SWE @ CoStar Group',
        'PADI instructor · sailor · builder',
      ],
    }),
  },
  {
    name: 'ls projects/',
    description: 'list all projects',
    keywords: ['projects', 'list'],
    run: () => ({
      type: 'output',
      lines: projects.map(
        (p) => `${p.name.toLowerCase().replace(/\s+/g, '-')}  →  ${p.status}`,
      ),
    }),
  },
  {
    name: 'cat resume.pdf',
    description: 'open my resume',
    keywords: ['resume'],
    run: (ctx) => {
      ctx.open('/documents/Fulkerson_John_Resume.pdf')
      return { type: 'action' }
    },
  },
  {
    name: 'cd #work',
    description: 'scroll to work',
    keywords: ['work'],
    run: (ctx) => {
      ctx.scrollTo('work')
      return { type: 'action' }
    },
  },
  {
    name: 'cd #projects',
    description: 'scroll to projects',
    keywords: ['projects'],
    run: (ctx) => {
      ctx.scrollTo('projects')
      return { type: 'action' }
    },
  },
  {
    name: 'cd #about',
    description: 'scroll to about',
    keywords: ['about'],
    run: (ctx) => {
      ctx.scrollTo('about')
      return { type: 'action' }
    },
  },
  {
    name: 'open projects/aroma',
    description: '↗ aroma.johnfulkerson.com',
    keywords: ['aroma'],
    run: (ctx) => {
      ctx.open('https://aroma.johnfulkerson.com')
      return { type: 'action' }
    },
  },
  {
    name: 'open projects/timer',
    description: '↗ timer.johnfulkerson.com',
    keywords: ['timer'],
    run: (ctx) => {
      ctx.open('https://timer.johnfulkerson.com')
      return { type: 'action' }
    },
  },
  {
    name: 'sudo hire-me',
    description: '?',
    keywords: ['hire'],
    run: () => ({
      type: 'output',
      lines: [
        '[sudo] password for visitor: ********',
        'Permission granted — but the 2026 seat is taken (CoStar Group 🎉).',
        'Always happy to chat → johnfulky@mac.com',
      ],
    }),
  },
  {
    name: 'help',
    description: 'list commands',
    run: () => ({
      type: 'output',
      lines: commands.map((c) => `${c.name.padEnd(22)} ${c.description}`),
    }),
  },
]
```

`src/lib/palette.ts`:

```ts
import { fuzzyMatch } from './fuzzy'
import type { Command, CommandContext, CommandResult } from '@/data/commands'

export function filterCommands(
  commands: Array<Command>,
  query: string,
): Array<Command> {
  if (!query.trim()) return commands
  return commands.filter(
    (c) =>
      fuzzyMatch(query, c.name) ||
      (c.keywords ?? []).some((k) => fuzzyMatch(query, k)),
  )
}

export function executeInput(
  commands: Array<Command>,
  input: string,
  ctx: CommandContext,
): CommandResult {
  const name = input.trim()
  const exact = commands.find((c) => c.name === name)
  if (exact) return exact.run(ctx)
  const matches = filterCommands(commands, name)
  if (matches.length === 1) return matches[0].run(ctx)
  return {
    type: 'output',
    lines: [
      `command not found: ${name}`,
      matches.length > 1
        ? `did you mean: ${matches
            .slice(0, 3)
            .map((c) => c.name)
            .join(', ')}?`
        : `try 'help'`,
    ],
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test`
Expected: all pass. (Note the `executeInput` unknown-input test uses `'rm -rf /'` which matches nothing → the `try 'help'` branch.)

- [ ] **Step 5: Commit**

```bash
git add src/lib/fuzzy.ts src/lib/palette.ts src/data/commands.ts src/lib/*.test.ts src/data/commands.test.ts
git commit -m "feat: add palette command registry, fuzzy filter, and execution logic"
```

---

### Task 4: Command palette UI + provider + ⌘K hotkey

**Files:**
- Create: `src/components/palette/CommandPalette.tsx`
- Create: `src/components/palette/PaletteProvider.tsx`
- Test: `src/components/palette/CommandPalette.test.tsx`

**Interfaces:**
- Consumes: `commands`, `CommandContext` from `@/data/commands`; `executeInput`, `filterCommands` from `@/lib/palette`.
- Produces:
  - `CommandPalette({ open, onClose }: { open: boolean; onClose: () => void })` — the dialog.
  - `PaletteProvider({ children }: { children: ReactNode })` — mounts the palette, registers the ⌘K/Ctrl-K listener.
  - `usePalette(): { openPalette: () => void }` — used by Nav (Task 7).

- [ ] **Step 1: Write failing tests — `src/components/palette/CommandPalette.test.tsx`**

```tsx
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
    expect(screen.getByTestId('scrollback').textContent).toContain('command not found')
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement `src/components/palette/CommandPalette.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react'
import { commands } from '@/data/commands'
import type { CommandContext } from '@/data/commands'
import { executeInput, filterCommands } from '@/lib/palette'

type ScrollbackEntry = { input: string; lines: Array<string> }

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
  }

  const filtered = filterCommands(commands, input)

  const run = (raw: string) => {
    const result = executeInput(commands, raw, ctx)
    if (result.type === 'output') {
      setScrollback((s) => [...s, { input: raw.trim(), lines: result.lines }])
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
                {entry.lines.map((line, j) => (
                  <div key={j} className="whitespace-pre-wrap text-muted">
                    {line}
                  </div>
                ))}
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
        <ul className="max-h-64 overflow-y-auto p-2" role="listbox" aria-label="Commands">
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
```

(Focus trap note: the input is the only tabbable entry point and Tab is swallowed; Esc and backdrop click close. This satisfies the dialog requirement without a dependency.)

- [ ] **Step 4: Implement `src/components/palette/PaletteProvider.tsx`**

```tsx
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CommandPalette } from './CommandPalette'

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
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/palette/
git commit -m "feat: add command palette dialog, provider, and cmd-k hotkey"
```

---

### Task 5: Motion primitives

**Files:**
- Create: `src/components/motion.tsx`
- Test: `src/components/motion.test.tsx`

**Interfaces:**
- Consumes: design tokens from Task 1 (`text-faint`, `text-fg`, `font-mono`).
- Produces:
  - `MotionProvider({ children }: { children: ReactNode })` — `LazyMotion` wrapper (bundle-slim animations).
  - `Reveal({ children, delay?, className? })` — fade/rise 14px over 450ms, `once: true`.
  - `Typed({ text, speed? }: { text: string; speed?: number })` — types text; instant under reduced motion.
  - `SectionHeading({ index, title }: { index: number; title: string })` — mono `01 · work` label whose number ticks up on entering view.

- [ ] **Step 1: Write failing tests — `src/components/motion.test.tsx`**

```tsx
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/components/motion.tsx`**

```tsx
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <m.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </m.div>
  )
}

export function Typed({ text, speed = 45 }: { text: string; speed?: number }) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)
  const done = reduced ? text.length : count

  useEffect(() => {
    if (reduced || count >= text.length) return
    const t = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(t)
  }, [count, reduced, speed, text.length])

  return <span aria-label={text}>{text.slice(0, done)}</span>
}

export function SectionHeading({
  index,
  title,
}: {
  index: number
  title: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced || n >= index) {
      setN(index)
      return
    }
    const t = setTimeout(() => setN((v) => v + 1), 120)
    return () => clearTimeout(t)
  }, [inView, n, index, reduced])

  return (
    <div ref={ref} className="mb-8 font-mono text-xs text-faint">
      {String(n).padStart(2, '0')} · <span className="font-semibold text-fg">{title}</span>
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion.tsx src/components/motion.test.tsx
git commit -m "feat: add LazyMotion provider, Reveal, Typed, and SectionHeading primitives"
```

---

### Task 6: Live-data core — TTL cache, GitHub, Spotify (pure, injected fetch)

**Files:**
- Create: `src/lib/edge-cache.ts`
- Create: `src/lib/github.ts`
- Create: `src/lib/spotify.ts`
- Test: `src/lib/edge-cache.test.ts`, `src/lib/github.test.ts`, `src/lib/spotify.test.ts`

**Interfaces:**
- Consumes: nothing internal.
- Produces:
  - `cached<T extends { ok: boolean }>(key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<T>` and `_clearCache(): void` (tests only). Only `ok: true` results are cached; failures are retried on next request.
  - `fetchGithubActivity(token: string | undefined, fetchImpl?: typeof fetch): Promise<GithubActivity>` where `GithubActivity = { ok: true; total: number; weeks: Array<Array<GithubDay>> } | { ok: false }` and `GithubDay = { date: string; count: number; level: number }` (level 0–4).
  - `fetchNowPlaying(creds: { clientId?: string; clientSecret?: string; refreshToken?: string }, fetchImpl?: typeof fetch): Promise<NowPlaying>` where `NowPlaying = { ok: true; playing: boolean; title: string; artist: string; url: string } | { ok: false }`.

- [ ] **Step 1: Write failing tests**

`src/lib/edge-cache.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from 'vitest'
import { _clearCache, cached } from './edge-cache'

afterEach(() => {
  _clearCache()
  vi.useRealTimers()
})

describe('cached', () => {
  it('returns cached ok values within the TTL', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, value: 1 })
    await cached('a', 60, fetcher)
    await cached('a', 60, fetcher)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('re-fetches after the TTL expires', async () => {
    vi.useFakeTimers()
    const fetcher = vi.fn().mockResolvedValue({ ok: true })
    await cached('b', 60, fetcher)
    vi.setSystemTime(Date.now() + 61_000)
    await cached('b', 60, fetcher)
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('does not cache failures', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: false })
    await cached('c', 60, fetcher)
    await cached('c', 60, fetcher)
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
})
```

`src/lib/github.test.ts`:

```ts
import { describe, expect, it, vi } from 'vitest'
import { fetchGithubActivity } from './github'

const payload = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 123,
          weeks: [
            {
              contributionDays: [
                {
                  date: '2026-07-01',
                  contributionCount: 2,
                  contributionLevel: 'SECOND_QUARTILE',
                },
              ],
            },
          ],
        },
      },
    },
  },
}

describe('fetchGithubActivity', () => {
  it('returns ok:false without a token', async () => {
    expect(await fetchGithubActivity(undefined)).toEqual({ ok: false })
  })

  it('parses a successful GraphQL response', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(payload), { status: 200 }))
    const result = await fetchGithubActivity('tok', fetchImpl as typeof fetch)
    expect(result).toEqual({
      ok: true,
      total: 123,
      weeks: [[{ date: '2026-07-01', count: 2, level: 2 }]],
    })
  })

  it('returns ok:false on non-200', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('nope', { status: 401 }))
    expect(await fetchGithubActivity('tok', fetchImpl as typeof fetch)).toEqual({
      ok: false,
    })
  })

  it('returns ok:false when fetch throws', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('network'))
    expect(await fetchGithubActivity('tok', fetchImpl as typeof fetch)).toEqual({
      ok: false,
    })
  })
})
```

`src/lib/spotify.test.ts`:

```ts
import { describe, expect, it, vi } from 'vitest'
import { fetchNowPlaying } from './spotify'

const creds = { clientId: 'id', clientSecret: 'secret', refreshToken: 'refresh' }
const tokenResponse = () =>
  new Response(JSON.stringify({ access_token: 'tok' }), { status: 200 })

const track = {
  name: 'Song',
  artists: [{ name: 'Artist A' }, { name: 'Artist B' }],
  external_urls: { spotify: 'https://open.spotify.com/track/x' },
}

function fetchByUrl(routes: Record<string, () => Response>) {
  return vi.fn().mockImplementation((url: string) => {
    for (const [prefix, respond] of Object.entries(routes)) {
      if (String(url).startsWith(prefix)) return Promise.resolve(respond())
    }
    return Promise.reject(new Error(`unexpected url: ${url}`))
  }) as unknown as typeof fetch
}

describe('fetchNowPlaying', () => {
  it('returns ok:false when creds are missing', async () => {
    expect(await fetchNowPlaying({})).toEqual({ ok: false })
  })

  it('parses a currently-playing track', async () => {
    const fetchImpl = fetchByUrl({
      'https://accounts.spotify.com/api/token': tokenResponse,
      'https://api.spotify.com/v1/me/player/currently-playing': () =>
        new Response(JSON.stringify({ item: track }), { status: 200 }),
    })
    expect(await fetchNowPlaying(creds, fetchImpl)).toEqual({
      ok: true,
      playing: true,
      title: 'Song',
      artist: 'Artist A, Artist B',
      url: 'https://open.spotify.com/track/x',
    })
  })

  it('falls back to recently-played on 204', async () => {
    const fetchImpl = fetchByUrl({
      'https://accounts.spotify.com/api/token': tokenResponse,
      'https://api.spotify.com/v1/me/player/currently-playing': () =>
        new Response(null, { status: 204 }),
      'https://api.spotify.com/v1/me/player/recently-played': () =>
        new Response(JSON.stringify({ items: [{ track }] }), { status: 200 }),
    })
    expect(await fetchNowPlaying(creds, fetchImpl)).toEqual({
      ok: true,
      playing: false,
      title: 'Song',
      artist: 'Artist A, Artist B',
      url: 'https://open.spotify.com/track/x',
    })
  })

  it('returns ok:false when the token refresh fails', async () => {
    const fetchImpl = fetchByUrl({
      'https://accounts.spotify.com/api/token': () =>
        new Response('bad', { status: 400 }),
    })
    expect(await fetchNowPlaying(creds, fetchImpl)).toEqual({ ok: false })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement**

`src/lib/edge-cache.ts` (per-isolate memo: Workers isolates stay warm between requests, giving effective edge caching without the Cache API's dev/test friction; failures are never cached so outages self-heal):

```ts
type CacheEntry = { expires: number; value: unknown }

const memory = new Map<string, CacheEntry>()

export async function cached<T extends { ok: boolean }>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const now = Date.now()
  const hit = memory.get(key)
  if (hit && hit.expires > now) return hit.value as T
  const value = await fetcher()
  if (value.ok) memory.set(key, { expires: now + ttlSeconds * 1000, value })
  return value
}

export function _clearCache() {
  memory.clear()
}
```

`src/lib/github.ts`:

```ts
export type GithubDay = { date: string; count: number; level: number }

export type GithubActivity =
  | { ok: true; total: number; weeks: Array<Array<GithubDay>> }
  | { ok: false }

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

type CalendarDay = {
  date: string
  contributionCount: number
  contributionLevel: string
}

export async function fetchGithubActivity(
  token: string | undefined,
  fetchImpl: typeof fetch = fetch,
): Promise<GithubActivity> {
  if (!token) return { ok: false }
  try {
    const res = await fetchImpl('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'user-agent': 'johnfulkerson.com',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: 'JTFulkerson' } }),
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) return { ok: false }
    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              totalContributions: number
              weeks: Array<{ contributionDays: Array<CalendarDay> }>
            }
          }
        }
      }
    }
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar) return { ok: false }
    return {
      ok: true,
      total: calendar.totalContributions,
      weeks: calendar.weeks.map((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
          level: LEVELS[d.contributionLevel] ?? 0,
        })),
      ),
    }
  } catch {
    return { ok: false }
  }
}
```

`src/lib/spotify.ts`:

```ts
export type NowPlaying =
  | { ok: true; playing: boolean; title: string; artist: string; url: string }
  | { ok: false }

type SpotifyTrack = {
  name: string
  artists: Array<{ name: string }>
  external_urls: { spotify: string }
}

function toResult(track: SpotifyTrack, playing: boolean): NowPlaying {
  return {
    ok: true,
    playing,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(', '),
    url: track.external_urls.spotify,
  }
}

export async function fetchNowPlaying(
  creds: { clientId?: string; clientSecret?: string; refreshToken?: string },
  fetchImpl: typeof fetch = fetch,
): Promise<NowPlaying> {
  const { clientId, clientSecret, refreshToken } = creds
  if (!clientId || !clientSecret || !refreshToken) return { ok: false }
  try {
    const tokenRes = await fetchImpl('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      signal: AbortSignal.timeout(3000),
    })
    if (!tokenRes.ok) return { ok: false }
    const { access_token } = (await tokenRes.json()) as { access_token: string }
    const authInit = {
      headers: { authorization: `Bearer ${access_token}` },
      signal: AbortSignal.timeout(3000),
    }

    const nowRes = await fetchImpl(
      'https://api.spotify.com/v1/me/player/currently-playing',
      authInit,
    )
    if (nowRes.status === 200) {
      const data = (await nowRes.json()) as { item?: SpotifyTrack }
      if (data.item) return toResult(data.item, true)
    }

    const recentRes = await fetchImpl(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      authInit,
    )
    if (!recentRes.ok) return { ok: false }
    const recent = (await recentRes.json()) as {
      items?: Array<{ track: SpotifyTrack }>
    }
    const track = recent.items?.[0]?.track
    if (!track) return { ok: false }
    return toResult(track, false)
  } catch {
    return { ok: false }
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/edge-cache.ts src/lib/github.ts src/lib/spotify.ts src/lib/edge-cache.test.ts src/lib/github.test.ts src/lib/spotify.test.ts
git commit -m "feat: add cached GitHub and Spotify fetchers with graceful failure"
```

---

### Task 7: Server functions + live panels

**Files:**
- Create: `src/server/live.ts`
- Create: `src/components/live/GithubPanel.tsx`
- Create: `src/components/live/SpotifyPanel.tsx`
- Test: `src/components/live/panels.test.tsx`

**Interfaces:**
- Consumes: `cached` from `@/lib/edge-cache`; `fetchGithubActivity`/`GithubActivity` from `@/lib/github`; `fetchNowPlaying`/`NowPlaying` from `@/lib/spotify`.
- Produces:
  - `getGithubActivity(): Promise<GithubActivity>` and `getNowPlaying(): Promise<NowPlaying>` — TanStack server functions (callable from the client as async functions).
  - `GithubPanel()` and `SpotifyPanel()` — self-fetching client components used by the About section (Task 8).

- [ ] **Step 1: Write failing tests — `src/components/live/panels.test.tsx`**

`src/server/live.ts` is mocked with a factory so its `cloudflare:workers` dynamic import never loads in tests:

```tsx
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getGithubActivity, getNowPlaying } from '@/server/live'
import { GithubPanel } from './GithubPanel'
import { SpotifyPanel } from './SpotifyPanel'

vi.mock('@/server/live', () => ({
  getGithubActivity: vi.fn(),
  getNowPlaying: vi.fn(),
}))

beforeEach(() => {
  vi.mocked(getGithubActivity).mockReset()
  vi.mocked(getNowPlaying).mockReset()
})

describe('GithubPanel', () => {
  it('renders the contribution grid on success', async () => {
    vi.mocked(getGithubActivity).mockResolvedValue({
      ok: true,
      total: 321,
      weeks: [[{ date: '2026-07-01', count: 2, level: 2 }]],
    })
    render(<GithubPanel />)
    expect(await screen.findByText(/321 contributions/)).toBeTruthy()
  })

  it('renders the static fallback on failure', async () => {
    vi.mocked(getGithubActivity).mockResolvedValue({ ok: false })
    render(<GithubPanel />)
    expect(await screen.findByText(/@JTFulkerson/)).toBeTruthy()
  })
})

describe('SpotifyPanel', () => {
  it('renders now playing on success', async () => {
    vi.mocked(getNowPlaying).mockResolvedValue({
      ok: true,
      playing: true,
      title: 'Song',
      artist: 'Artist',
      url: 'https://open.spotify.com/track/x',
    })
    render(<SpotifyPanel />)
    expect(await screen.findByText(/Song — Artist/)).toBeTruthy()
    expect(screen.getByText(/now playing/)).toBeTruthy()
  })

  it('renders last played when not playing', async () => {
    vi.mocked(getNowPlaying).mockResolvedValue({
      ok: true,
      playing: false,
      title: 'Song',
      artist: 'Artist',
      url: 'https://open.spotify.com/track/x',
    })
    render(<SpotifyPanel />)
    expect(await screen.findByText(/last played/)).toBeTruthy()
  })

  it('renders nothing on failure', async () => {
    vi.mocked(getNowPlaying).mockResolvedValue({ ok: false })
    const { container } = render(<SpotifyPanel />)
    await vi.waitFor(() => expect(container.innerHTML).toBe(''))
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement `src/server/live.ts`**

The `cloudflare:workers` env is imported **dynamically inside the handlers** so it can never leak into the client bundle or break vitest:

```ts
import { createServerFn } from '@tanstack/react-start'
import { cached } from '@/lib/edge-cache'
import { fetchGithubActivity } from '@/lib/github'
import { fetchNowPlaying } from '@/lib/spotify'

async function workerEnv(): Promise<Record<string, string | undefined>> {
  const { env } = await import('cloudflare:workers')
  return env as unknown as Record<string, string | undefined>
}

export const getGithubActivity = createServerFn({ method: 'GET' }).handler(
  async () => {
    const env = await workerEnv()
    return cached('github', 600, () => fetchGithubActivity(env.GITHUB_TOKEN))
  },
)

export const getNowPlaying = createServerFn({ method: 'GET' }).handler(
  async () => {
    const env = await workerEnv()
    return cached('spotify', 60, () =>
      fetchNowPlaying({
        clientId: env.SPOTIFY_CLIENT_ID,
        clientSecret: env.SPOTIFY_CLIENT_SECRET,
        refreshToken: env.SPOTIFY_REFRESH_TOKEN,
      }),
    )
  },
)
```

- [ ] **Step 4: Implement the panels**

`src/components/live/GithubPanel.tsx`:

```tsx
import { useEffect, useState } from 'react'
import { getGithubActivity } from '@/server/live'
import type { GithubActivity } from '@/lib/github'

const LEVEL_CLASSES = [
  'bg-line',
  'bg-prompt/30',
  'bg-prompt/50',
  'bg-prompt/75',
  'bg-prompt',
]

export function GithubPanel() {
  const [data, setData] = useState<GithubActivity | null>(null)

  useEffect(() => {
    let cancelled = false
    getGithubActivity()
      .then((d) => {
        if (!cancelled) setData(d)
      })
      .catch(() => {
        if (!cancelled) setData({ ok: false })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-[104px] rounded-xl border border-line bg-panel p-4">
      <div className="mb-2 font-mono text-[10px] text-faint">
        $ git log --author=jt
      </div>
      {data?.ok ? (
        <>
          <div
            className="flex gap-[3px] overflow-hidden"
            aria-label={`${data.total} GitHub contributions in the last year`}
          >
            {data.weeks.slice(-20).map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} contributions`}
                    className={`h-[7px] w-[7px] rounded-[2px] ${LEVEL_CLASSES[day.level]}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2 text-[11px] text-faint">
            {data.total} contributions this year · live
          </div>
        </>
      ) : (
        <a
          href="https://github.com/JTFulkerson"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-faint hover:text-fg"
        >
          {data ? 'recent work lives on GitHub → @JTFulkerson' : 'loading…'}
        </a>
      )}
    </div>
  )
}
```

`src/components/live/SpotifyPanel.tsx`:

```tsx
import { useEffect, useState } from 'react'
import { getNowPlaying } from '@/server/live'
import type { NowPlaying } from '@/lib/spotify'

export function SpotifyPanel() {
  const [data, setData] = useState<NowPlaying | null>(null)

  useEffect(() => {
    let cancelled = false
    getNowPlaying()
      .then((d) => {
        if (!cancelled) setData(d)
      })
      .catch(() => {
        if (!cancelled) setData({ ok: false })
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (data && !data.ok) return null

  return (
    <div className="min-h-[72px] rounded-xl border border-line bg-panel p-4">
      <div className="mb-2 font-mono text-[10px] text-faint">$ now-playing</div>
      {data?.ok ? (
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium hover:text-accent"
        >
          ♪ {data.title} — {data.artist}
          <span className="mt-0.5 block text-[10px] font-normal text-faint">
            {data.playing ? 'now playing on Spotify' : 'last played on Spotify'}
          </span>
        </a>
      ) : (
        <div className="text-[11px] text-faint">loading…</div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test`
Expected: all pass.

- [ ] **Step 6: Verify the client build doesn't choke on `cloudflare:workers`**

Run: `pnpm build`
Expected: build succeeds (dynamic import stays server-side).

- [ ] **Step 7: Commit**

```bash
git add src/server/ src/components/live/
git commit -m "feat: add live-data server functions and GitHub/Spotify panels"
```

---

### Task 8: Section components

**Files:**
- Create: `src/components/SocialLinks.tsx`
- Create: `src/lib/use-active-section.ts`
- Create: `src/components/sections/Nav.tsx`
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/WorkTimeline.tsx`
- Create: `src/components/sections/Projects.tsx`
- Create: `src/components/sections/About.tsx`
- Create: `src/components/sections/Footer.tsx`
- Test: `src/components/sections/sections.test.tsx`

**Interfaces:**
- Consumes: everything produced by Tasks 2, 4 (`usePalette`), 5 (`MotionProvider`, `Reveal`, `Typed`, `SectionHeading`), 7 (`GithubPanel`, `SpotifyPanel`).
- Produces: `Nav()`, `Hero()`, `WorkTimeline()`, `Projects()`, `About()`, `Footer()` — assembled by Task 9. Also `SocialLinks({ primaryOnly?, className? })` and `useActiveSection(ids: Array<string>): string | null`.

- [ ] **Step 1: Write failing tests — `src/components/sections/sections.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MotionProvider } from '@/components/motion'
import { PaletteProvider } from '@/components/palette/PaletteProvider'
import { About } from './About'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Nav } from './Nav'
import { Projects } from './Projects'
import { WorkTimeline } from './WorkTimeline'

vi.mock('@/server/live', () => ({
  getGithubActivity: vi.fn().mockResolvedValue({ ok: false }),
  getNowPlaying: vi.fn().mockResolvedValue({ ok: false }),
}))

const wrap = (ui: React.ReactNode) => (
  <MotionProvider>
    <PaletteProvider>{ui}</PaletteProvider>
  </MotionProvider>
)

describe('sections render', () => {
  it('Nav shows wordmark, anchors, and palette hint', () => {
    render(wrap(<Nav />))
    expect(screen.getByText('~/jfulkerson')).toBeTruthy()
    expect(screen.getByText('work')).toBeTruthy()
    expect(screen.getByLabelText('Open command palette')).toBeTruthy()
  })

  it('Hero shows name, CoStar badge, and resume link', () => {
    render(wrap(<Hero />))
    expect(screen.getByText(/John Fulkerson/)).toBeTruthy()
    expect(screen.getByText('Incoming Software Engineer @ CoStar Group')).toBeTruthy()
    expect(screen.getByText('resume.pdf').closest('a')?.getAttribute('href')).toBe(
      '/documents/Fulkerson_John_Resume.pdf',
    )
  })

  it('WorkTimeline shows featured jobs and an expander', () => {
    render(wrap(<WorkTimeline />))
    expect(screen.getByText('Technology Intern')).toBeTruthy()
    expect(screen.queryByText('Resident Assistant')).toBeNull()
    screen.getByText(/earlier roles/).click()
  })

  it('Projects renders all three with links', () => {
    render(wrap(<Projects />))
    expect(screen.getByText('Aroma').closest('a')?.getAttribute('href')).toBe(
      'https://aroma.johnfulkerson.com',
    )
    expect(screen.getByText('Makerspace Platform')).toBeTruthy()
    expect(screen.getByText('Timer')).toBeTruthy()
  })

  it('About renders story and chips', () => {
    render(wrap(<About />))
    expect(screen.getByText(/PADI Open Water Scuba Instructor \(taught/)).toBeTruthy()
    expect(screen.getByText('⛵ UD Sailing Commodore')).toBeTruthy()
  })

  it('Footer renders the stack credit', () => {
    render(wrap(<Footer />))
    expect(screen.getByText(/tanstack start on cloudflare workers/)).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement shared pieces**

`src/components/SocialLinks.tsx` (lucide icons replace the old `/public/icons/*.svg` files):

```tsx
import { Facebook, Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import { socials } from '@/data/socials'

const ICONS = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram,
  Twitter,
  Facebook,
} as const

export function SocialLinks({
  primaryOnly = false,
  className = '',
}: {
  primaryOnly?: boolean
  className?: string
}) {
  const list = primaryOnly ? socials.filter((s) => s.primary) : socials
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {list.map((s) => {
        const Icon = ICONS[s.label as keyof typeof ICONS]
        return (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            target="_blank"
            rel="noopener noreferrer"
            className="text-faint transition-colors hover:text-fg"
          >
            <Icon className="h-4 w-4" />
          </a>
        )
      })}
    </div>
  )
}
```

`src/lib/use-active-section.ts`:

```ts
import { useEffect, useState } from 'react'

export function useActiveSection(ids: Array<string>): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
```

- [ ] **Step 4: Implement the sections**

`src/components/sections/Nav.tsx`:

```tsx
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
                active === s.id ? 'font-medium text-fg' : 'text-muted hover:text-fg'
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
```

`src/components/sections/Hero.tsx`:

```tsx
import { SocialLinks } from '@/components/SocialLinks'
import { Typed } from '@/components/motion'

export function Hero() {
  return (
    <section id="top" className="px-5 pb-16 pt-20 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 font-mono text-xs text-prompt">
          $ <Typed text="whoami" />
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          John Fulkerson
          <span className="animate-cursor text-accent">_</span>
        </h1>
        <p className="mt-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Incoming Software Engineer @ CoStar Group
        </p>
        <p className="mt-4 font-mono text-xs text-muted">
          <span className="text-keyword">const</span> focus = [
          <span className="text-string">{'"systems"'}</span>,{' '}
          <span className="text-string">{'"networks"'}</span>,{' '}
          <span className="text-string">{'"full-stack"'}</span>];
        </p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
          {"CS @ University of Delaware '26. I build software people actually use — from generative-AI infrastructure at CoStar to the app running UD's makerspace."}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="rounded-lg bg-fg px-4 py-2 text-xs font-medium text-bg hover:opacity-90"
          >
            View work ↓
          </a>
          <a
            href="/documents/Fulkerson_John_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-line px-4 py-2 font-mono text-xs text-muted hover:text-fg"
          >
            resume.pdf
          </a>
          <SocialLinks primaryOnly className="ml-2" />
        </div>
      </div>
    </section>
  )
}
```

`src/components/sections/WorkTimeline.tsx`:

```tsx
import { useState } from 'react'
import { Reveal, SectionHeading } from '@/components/motion'
import { jobs } from '@/data/jobs'
import type { Job } from '@/data/jobs'

function JobEntry({ job }: { job: Job }) {
  return (
    <Reveal>
      <div className="text-sm font-semibold">
        {job.title} <span className="font-normal text-muted">· {job.company}</span>
      </div>
      <div className="mt-0.5 font-mono text-[10px] text-faint">
        {job.period}
        {job.status ? <span className="text-prompt"> {job.status}</span> : null}
      </div>
      {job.description ? (
        <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-muted">
          {job.description}
        </p>
      ) : null}
    </Reveal>
  )
}

export function WorkTimeline() {
  const [expanded, setExpanded] = useState(false)
  const featured = jobs.filter((j) => j.featured)
  const rest = jobs.filter((j) => !j.featured)

  return (
    <section id="work" className="border-t border-line px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading index={1} title="work" />
        <div className="flex flex-col gap-7 border-l-2 border-line pl-5">
          {featured.map((job) => (
            <JobEntry key={`${job.title}-${job.company}`} job={job} />
          ))}
          {expanded ? (
            rest.map((job) => <JobEntry key={`${job.title}-${job.company}`} job={job} />)
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="text-left font-mono text-[11px] text-faint hover:text-fg"
            >
              + {rest.length} earlier roles — resident assistant · dive instructor ·
              event tech
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
```

`src/components/sections/Projects.tsx`:

```tsx
import { Reveal, SectionHeading } from '@/components/motion'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

function ProjectRow({ project }: { project: Project }) {
  const card = (
    <div className="group rounded-xl border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold">{project.name}</span>
        <span
          className={`font-mono text-[10px] ${project.link ? 'text-accent' : 'text-faint'}`}
        >
          {project.status}
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-line px-1.5 py-0.5 font-mono text-[9px] text-faint"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading="lazy"
          width={1624}
          height={1056}
          className="mt-3 max-h-64 w-full rounded-lg border border-line object-cover object-top sm:mt-0 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:mt-3 sm:group-hover:max-h-64 sm:group-hover:opacity-100"
        />
      ) : null}
    </div>
  )

  return project.link ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
      {card}
    </a>
  ) : (
    card
  )
}

export function Projects() {
  return (
    <section id="projects" className="border-t border-line px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading index={2} title="projects" />
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Reveal key={project.name}>
              <ProjectRow project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

`src/components/sections/About.tsx`:

```tsx
import { GithubPanel } from '@/components/live/GithubPanel'
import { SpotifyPanel } from '@/components/live/SpotifyPanel'
import { Reveal, SectionHeading } from '@/components/motion'
import { aboutChips, aboutStory } from '@/data/about'

export function About() {
  return (
    <section id="about" className="border-t border-line px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading index={3} title="about" />
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="text-sm leading-relaxed text-muted">{aboutStory}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {aboutChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-line px-3 py-1 text-[11px] text-muted"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              <GithubPanel />
              <SpotifyPanel />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

`src/components/sections/Footer.tsx`:

```tsx
import { SocialLinks } from '@/components/SocialLinks'

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="font-mono text-[10px] text-faint">
          © {new Date().getFullYear()} · built with tanstack start on cloudflare
          workers
        </span>
        <SocialLinks />
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/SocialLinks.tsx src/lib/use-active-section.ts src/components/sections/
git commit -m "feat: add nav, hero, work timeline, projects, about, and footer sections"
```

---

### Task 9: Assemble the page, update the shell, delete the old site

**Files:**
- Modify: `src/routes/index.tsx` (full replacement)
- Modify: `src/routes/__root.tsx` (full replacement)
- Delete: `src/routes/about.tsx`, `src/routes/projects.tsx`, `src/routes/work.tsx`
- Delete: `src/components/Header.tsx`, `src/components/ProjectHighlighted.tsx`, `src/components/WorkHighlighted.tsx`, `src/components/SocialIcons.tsx`, `src/logo.svg`
- Delete unused assets: `public/icons/email.svg`, `public/icons/github.svg`, `public/icons/linkedin.svg`, `public/icons/instagram.svg`, `public/icons/twitter.svg`, `public/icons/facebook.svg`, `public/images/costar-logo.png`, `public/images/ud-minimal-logo.jpg`, `public/images/actionquest-logo.png`, `public/images/fcps-minimal-logo.png`, `public/images/personalized-plates-dashboard.png`, `public/images/meal-request-visual.png`, `public/images/wordle-visual.png`, `public/images/ud-sailing.jpg`, `public/images/headshot.png`
- Keep untouched: `src/routes/resume.tsx`, `src/routes/timer.tsx`, `public/documents/`, `public/favicon.ico`, `public/images/timer-visual.png`, `public/icons/timer-favicon.png`, `public/sounds/`

**Interfaces:**
- Consumes: all section components (Task 8), `PaletteProvider` (Task 4), `MotionProvider` (Task 5).
- Produces: the finished site.

- [ ] **Step 1: Replace `src/routes/index.tsx`**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { About } from '@/components/sections/About'
import { Footer } from '@/components/sections/Footer'
import { Hero } from '@/components/sections/Hero'
import { Nav } from '@/components/sections/Nav'
import { Projects } from '@/components/sections/Projects'
import { WorkTimeline } from '@/components/sections/WorkTimeline'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkTimeline />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Replace `src/routes/__root.tsx`**

Removes the old `Header`, adds providers, real metadata, and the `color-scheme` meta (dark scrollbars/form controls follow the system):

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { MotionProvider } from '@/components/motion'
import { PaletteProvider } from '@/components/palette/PaletteProvider'

import appCss from '../styles.css?url'

const title = 'John Fulkerson — Software Engineer'
const description =
  "Incoming Software Engineer at CoStar Group. CS @ University of Delaware '26. Systems, networks, and full-stack work."

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'color-scheme', content: 'light dark' },
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://johnfulkerson.com' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const isDev = import.meta.env.DEV
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <MotionProvider>
          <PaletteProvider>{children}</PaletteProvider>
        </MotionProvider>
        {isDev && (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Delete the old routes, components, and unused assets**

```bash
git rm src/routes/about.tsx src/routes/projects.tsx src/routes/work.tsx \
  src/components/Header.tsx src/components/ProjectHighlighted.tsx \
  src/components/WorkHighlighted.tsx src/components/SocialIcons.tsx src/logo.svg \
  public/icons/email.svg public/icons/github.svg public/icons/linkedin.svg \
  public/icons/instagram.svg public/icons/twitter.svg public/icons/facebook.svg \
  public/images/costar-logo.png public/images/ud-minimal-logo.jpg \
  public/images/actionquest-logo.png public/images/fcps-minimal-logo.png \
  public/images/personalized-plates-dashboard.png \
  public/images/meal-request-visual.png public/images/wordle-visual.png \
  public/images/ud-sailing.jpg public/images/headshot.png
```

- [ ] **Step 4: Regenerate the route tree and verify everything**

Run: `pnpm build`
Expected: build succeeds and `src/routeTree.gen.ts` no longer references the deleted routes.

Run: `pnpm test`
Expected: all tests pass.

Run: `pnpm check`
Expected: exits clean (it may rewrite formatting; re-run until clean).

- [ ] **Step 5: Manual smoke test in the dev server**

Run: `pnpm dev` and verify in a browser:
1. `/` renders the full page: nav, typed `$ whoami`, CoStar badge, timeline, three projects, about, footer.
2. `⌘K` opens the palette; `whoami` prints output; `cd #projects` scrolls; Esc closes.
3. `/resume` opens the PDF. `/timer` redirects to timer.johnfulkerson.com.
4. Toggle macOS dark mode (System Settings → Appearance) — the site follows with no flash.
5. Live panels show fallbacks (no secrets configured yet — GitHub shows the @JTFulkerson line, Spotify hides).
6. Narrow the window to phone width — single column, nav intact.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: assemble single-page portfolio, remove old multi-page site"
```

---

### Task 10: Secrets, live verification, and polish

**Files:**
- Create: `.dev.vars.example`
- Create: `scripts/spotify-refresh-token.mjs`
- Modify: `.gitignore` (add `.dev.vars`)
- Possibly modify: `src/data/projects.ts` (Aroma image, if John provides a screenshot)

**Interfaces:**
- Consumes: server functions from Task 7 read `GITHUB_TOKEN`, `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` from the Worker env.
- Produces: a fully live production deployment.

- [ ] **Step 1: Add `.dev.vars` handling**

Append `.dev.vars` to `.gitignore`. Create `.dev.vars.example`:

```
GITHUB_TOKEN=ghp_xxx            # classic PAT, read:user scope only
SPOTIFY_CLIENT_ID=xxx           # developer.spotify.com app
SPOTIFY_CLIENT_SECRET=xxx
SPOTIFY_REFRESH_TOKEN=xxx       # generate with: node scripts/spotify-refresh-token.mjs
```

- [ ] **Step 2: Create `scripts/spotify-refresh-token.mjs`**

One-time helper to mint the refresh token (uses the user-authorization code flow):

```js
// Usage:
//   1. In your Spotify app settings add redirect URI: http://127.0.0.1:8888/callback
//   2. SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=xxx node scripts/spotify-refresh-token.mjs
//   3. Open the printed URL, approve, and the refresh token prints here.
import http from 'node:http'

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
if (!clientId || !clientSecret) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET')
  process.exit(1)
}

const redirectUri = 'http://127.0.0.1:8888/callback'
const scope = 'user-read-currently-playing user-read-recently-played'
const authUrl = new URL('https://accounts.spotify.com/authorize')
authUrl.search = new URLSearchParams({
  response_type: 'code',
  client_id: clientId,
  scope,
  redirect_uri: redirectUri,
}).toString()

console.log('\nOpen this URL and approve access:\n\n' + authUrl.href + '\n')

http
  .createServer(async (req, res) => {
    const code = new URL(req.url, redirectUri).searchParams.get('code')
    if (!code) return res.end('No code in callback')
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    })
    const json = await tokenRes.json()
    res.end('Done — check your terminal.')
    console.log('\nSPOTIFY_REFRESH_TOKEN=' + json.refresh_token + '\n')
    process.exit(0)
  })
  .listen(8888)
```

- [ ] **Step 3: Walk John through credential creation (interactive — requires John)**

1. **GitHub:** github.com → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token with only the `read:user` scope, no expiration concerns are John's call. Paste into `.dev.vars` as `GITHUB_TOKEN`.
2. **Spotify:** developer.spotify.com/dashboard → Create app (name: `portfolio`, redirect URI `http://127.0.0.1:8888/callback`) → copy Client ID/Secret into the env, then run the script from Step 2 and capture `SPOTIFY_REFRESH_TOKEN`.
3. Copy `.dev.vars.example` → `.dev.vars` and fill all four values.

- [ ] **Step 4: Verify live data locally**

Run: `pnpm dev`
Expected: GitHub panel renders the real contribution grid; Spotify panel shows a real track (play something first, or confirm the "last played" state).

- [ ] **Step 5: Aroma screenshot (requires John)**

Ask John for a screenshot of aroma.johnfulkerson.com (or capture one via a browser). Save as `public/images/aroma.png`, then set `image: '/images/aroma.png'` on the Aroma entry in `src/data/projects.ts`. If no screenshot is available, skip — the row renders fine without one.

- [ ] **Step 6: Lighthouse check**

```bash
pnpm build && pnpm serve
npx lighthouse http://localhost:4173 --view
```

Expected: ≥95 in Performance, Accessibility, Best Practices, SEO. Fix regressions before proceeding (most likely culprits: image sizing, contrast, missing aria labels).

- [ ] **Step 7: Set production secrets and deploy (requires John's approval)**

```bash
pnpm wrangler secret put GITHUB_TOKEN
pnpm wrangler secret put SPOTIFY_CLIENT_ID
pnpm wrangler secret put SPOTIFY_CLIENT_SECRET
pnpm wrangler secret put SPOTIFY_REFRESH_TOKEN
pnpm deploy
```

Verify https://johnfulkerson.com renders the new site, live panels populate, `/resume` and `/timer` still work.

- [ ] **Step 8: Commit**

```bash
git add .dev.vars.example scripts/spotify-refresh-token.mjs .gitignore src/data/projects.ts public/images/aroma.png
git commit -m "feat: add live-data credential setup and launch polish"
```
