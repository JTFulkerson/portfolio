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
