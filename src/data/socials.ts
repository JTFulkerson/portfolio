export type Social = {
  label: string
  href: string
  primary: boolean
}

export const socials: Array<Social> = [
  { label: 'Email', href: 'mailto:johnfulky@mac.com', primary: true },
  { label: 'GitHub', href: 'https://github.com/JTFulkerson', primary: true },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jtfulkerson/',
    primary: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/jt_fulkerson/',
    primary: false,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/JT_Fulkerson',
    primary: false,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/john.fulkerson.98837/',
    primary: false,
  },
]
