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
