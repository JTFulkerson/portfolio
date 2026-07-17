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
    title: 'Associate Software Engineer',
    company: 'CoStar Group',
    period: '2026 →',
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
