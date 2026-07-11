import { SocialLinks } from '@/components/SocialLinks'

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="font-mono text-[10px] text-faint">
          © {new Date().getFullYear()} · built with tanstack start on
          cloudflare workers
        </span>
        <SocialLinks />
      </div>
    </footer>
  )
}
