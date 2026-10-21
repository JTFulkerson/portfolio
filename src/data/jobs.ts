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
    description:
      "Building AI-focused, full-stack features for CoStar products on a shared-services team — .NET and TypeScript, plus DevOps and AWS infrastructure for the team's services.",
    featured: true,
  },
  {
    title: 'Technology Intern',
    company: 'CoStar Group',
    period: 'summer 2025',
    description:
      "Contributed to CoStar's first infrastructure-level generative-AI framework for scaling content creation across products — built and shipped TypeScript + AWS systems that made workflows faster, more accurate, and cheaper, with the docs to run them.",
    featured: true,
  },
  {
    title: 'Lab Assistant → Team Lead',
    company: 'UD Pearson Hall Makerspace',
    period: '2023 – 2026',
    description:
      "Managed three senior-design teams building the makerspace's full-stack operations dashboard — real-time space-usage and finance tracking. Day to day: helping users, running machine queues, leading trainings, and maintaining fabrication equipment.",
    featured: true,
  },
  {
    title: 'Teaching Assistant',
    company: 'University of Delaware',
    period: '2025 – 2026',
    description:
      'Supported a 40-student full-stack web development course (React, Node.js, REST APIs) through office hours and Discord, and graded projects with actionable feedback on performance and security.',
    featured: false,
  },
  {
    title: 'Resident Assistant',
    company: 'University of Delaware',
    period: '2023 – 2025',
    description:
      "Two years in Residence Life & Housing — communities of 60 residents (apartment-style) and 20 (dorm-style); events, community building, and supporting residents' academic and personal success.",
    featured: false,
  },
  {
    title: 'Scuba Instructor',
    company: 'ActionQuest · British Virgin Islands',
    period: 'summer 2024',
    description:
      'Taught diving and dive safety to students ages 12–18 through hands-on PADI lessons and in-water training — teamwork, inclusion, and safety first.',
    featured: false,
  },
  {
    title: 'Event Service Technician',
    company: 'Fairfax County Public Schools',
    period: '2022 – 2025',
    description:
      'Technical support for live events, including school-board and superintendent meetings — built and ran the audio, lighting, and streaming systems.',
    featured: false,
  },
  {
    title: 'Student Technician',
    company: 'Fairfax County Public Schools',
    period: '2019 – 2022',
    description:
      'Lead technician for lighting, sound, and projections in theater and auditorium productions, and the main client contact for events.',
    featured: false,
  },
]
