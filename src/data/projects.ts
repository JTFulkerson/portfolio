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
    image: '/images/aroma.jpg',
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
