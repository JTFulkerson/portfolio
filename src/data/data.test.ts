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
    expect(projects.map((p) => p.name)).toEqual([
      'Aroma',
      'Makerspace Platform',
      'Timer',
    ])
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
