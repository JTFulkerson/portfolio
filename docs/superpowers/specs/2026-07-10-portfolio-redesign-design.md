# Portfolio Redesign — Design Spec

**Date:** 2026-07-10
**Site:** johnfulkerson.com
**Status:** Approved direction, pending final spec review

## Goal

Replace the current multi-page portfolio with a modern, clean, technically impressive single-page site. The audience is general professional presence (John has accepted a full-time SWE role at CoStar Group starting 2026), so the tone is confident personal identity rather than job-seeking. Must look excellent on both mobile and desktop. Cool but disciplined — never gaudy.

## Visual identity

**Direction:** minimal/editorial base (whitespace, restrained type-driven layout, monochrome + one accent) with systems/terminal accents woven in: `~/jfulkerson` wordmark, `$ whoami` prompt, `const focus = ["systems", "networks", "full-stack"];` in mono with muted syntax-highlight colors.

**Theming:** light and dark, driven purely by `prefers-color-scheme`. No toggle, no localStorage, no JS in the theme path — CSS custom properties with dark values under the media query, mapped into Tailwind v4 via `@theme`. SSR output is correct on first paint in both modes (zero theme flash).

**Type:** one variable sans + one mono, self-hosted, `font-display: swap`.

**Color:** near-monochrome zinc scale; blue accent (CoStar badge, links, cursor); syntax colors (green prompt, violet keyword, amber string) muted in light mode, brighter in dark. All token pairs meet WCAG AA.

## Page structure (single page, top to bottom)

1. **Nav** — sticky, near-invisible. `~/jfulkerson` wordmark left; anchor links (work / projects / about) that highlight with scroll position; `⌘K` hint (tappable icon on mobile).
2. **Hero** — `$ whoami` types itself once (~600ms); "John Fulkerson" with blinking cursor; badge: **Associate Software Engineer @ CoStar Group** (the one colored element); `const focus` line; 1–2 sentence blurb; CTAs: "View work ↓" + `resume.pdf`; social icons. No headshot in hero.
3. **Work** — vertical timeline, replacing card grid: CoStar incoming role (2026 →), CoStar Technology Intern (summer 2025, gen-AI infrastructure framework, TypeScript + AWS), UD Makerspace Lab Assistant → Team Lead (2023 →, leading senior-design team on the makerspace platform). Older roles (Resident Assistant, ActionQuest Dive Instructor, FCPS event tech) collapsed behind an expand affordance.
4. **Projects** — three featured, as editorial full-width rows (no modals): **Aroma** (recipe manager for college students; parses recipes from pasted links, generates meals from on-hand ingredients + dietary preferences; born from going gluten-free; live at aroma.johnfulkerson.com), **Makerspace Platform** (operations/analytics platform in production at UD Pearson Hall), **Timer** (FCPS school-board meeting timer, live at timer.johnfulkerson.com). Mono tech tags, live links, screenshot on hover (desktop) / inline (mobile).
5. **About** — condensed story (2–3 sentences: PADI Open Water Scuba Instructor taught in BVI, UD Sailing Commodore, live-event tech background) + credential chips, alongside two live terminal-styled panels: GitHub activity graph and Spotify now-playing.
6. **Footer** — minimal: copyright, "built with tanstack start on cloudflare workers", socials.

**Socials:** keep existing six (email, GitHub, LinkedIn, Instagram, Twitter, Facebook) unless John trims later; hero shows the professional three, footer may show all.

**Mobile:** same order, single column; live panels stack under the About story; nav collapses to wordmark + menu + ⌘K icon.

## Interactions

### ⌘K command palette

- Opens via ⌘K / Ctrl-K, nav hint click, or mobile tap.
- Hybrid model: fuzzy-filtering command list (↑↓ + ↵, like any palette) with commands styled as shell commands.
- REPL commands produce persistent scrollback output: `whoami`, `ls projects`, `cat resume.pdf`, `sudo hire-me`, `help`.
- Navigation commands (`cd #work`, `open projects/aroma`) close the palette and smooth-scroll / open links.
- Unknown input → friendly `command not found` + suggestions.
- Proper dialog semantics: focus trap, esc closes, visible focus rings.
- Command registry is data (`name`, `description`, `run()`) — adding a command is a one-liner in `src/data/`.

### Motion choreography

1. One hero moment: `$ whoami` typing (~600ms), then stillness; only the cursor blinks.
2. Scroll reveals: fade/rise 12–16px, ~450ms, staggered, trigger **once** (never re-animate, no parallax).
3. Hovers are physical: 2px lift + shadow on rows, underline-sweep on links; no scaling/bouncing.
4. Section number labels (`01 · work`) tick up briefly on entering view.
5. `prefers-reduced-motion`: typing renders instantly, reveals become plain fades, all else off.

Implementation: framer-motion (already a dependency) with `LazyMotion` + `m` components to minimize bundle.

## Architecture

**Stack unchanged:** TanStack Start + React 19 + Tailwind v4 + Cloudflare Workers (wrangler.json with custom domain stays as-is).

**Code structure:**

- `src/routes/index.tsx` — thin composition of section components.
- `src/components/sections/` — `Hero`, `WorkTimeline`, `Projects`, `About`, `Footer`, `Nav`.
- `src/components/palette/` — palette dialog, REPL scrollback, command execution.
- `src/data/` — typed content: `jobs.ts`, `projects.ts`, `about.ts`, `commands.ts`, `socials.ts`. Content edits never touch components.
- `src/styles.css` — design tokens (`--bg`, `--fg`, `--muted`, `--accent`, syntax colors) + dark overrides + `@theme` mapping.

**Routes:**

- `/` — the site.
- `/resume` — redirect to `/documents/Fulkerson_John_Resume.pdf`. **Must keep.**
- `/timer` — redirect to `https://timer.johnfulkerson.com`. **Must keep.**
- `/about`, `/projects`, `/work` — deleted, no redirects (confirmed acceptable).

**Live data — two TanStack server functions on the Worker:**

- **GitHub:** contribution data via GraphQL API; read-only token as Worker secret; edge-cached ~10 min.
- **Spotify:** refresh-token flow; client ID/secret/refresh token as Worker secrets; edge-cached ~60s; falls back to recently-played ("last played") when idle.
- Both fetch client-side after mount — never block paint; panels have fixed dimensions (no layout shift).
- Secrets via `wrangler secret` in prod, `.dev.vars` locally. Setup (all free) walked through during implementation.

## Error handling

- Nothing dynamic can break the page. Server functions return typed `{ ok: true, data } | { ok: false }` — never throw to the client. Panel fetches time out at ~3s.
- GitHub panel failure → static fallback line. Spotify failure → "last played" → hidden (collapse without layout shift).
- Palette: unknown commands are content (`command not found — try 'help'`), not errors.
- JS disabled: SSR output is the full readable page minus live panels and palette.

## Testing

- Vitest + Testing Library, focused on real logic:
  - Palette: command parsing, fuzzy filter, navigation vs. REPL execution, keyboard interaction.
  - Server functions: fallback paths (mocked fetch failures → degraded results), cache behavior.
- Section components: TypeScript + render smoke test (they're declarative renders of typed data).
- Gate: `pnpm check` (prettier + eslint) and `pnpm test`.

## Performance & accessibility targets

- Lighthouse ≥95 all categories; LCP < 1.5s.
- SSR at edge; zero blocking data fetches; LazyMotion; self-hosted fonts; sized + lazy images.
- Semantic landmarks per section; palette is a real dialog with focus trap; AA contrast both themes; `prefers-reduced-motion` respected.

## Out of scope

- WebGL/3D hero (explicitly declined — keeps the "clean, not gaudy" constraint).
- Theme toggle (system preference only).
- Edge-stats footer flourish (declined in favor of GitHub + Spotify).
- CMS/MDX content pipeline (typed `src/data/` files instead).
- Project detail pages / case studies (single page only; can be added later).

## Open items for implementation

- Screenshot/asset capture for Aroma project row (site is live; grab during implementation).
- Spotify app registration + refresh token generation (walkthrough with John).
- GitHub personal access token (read-only) creation.
- Final social link trim decision (default: keep all six).
