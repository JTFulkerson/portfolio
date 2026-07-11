import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from 'lucide-react'
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
