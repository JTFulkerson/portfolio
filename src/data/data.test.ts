import { describe, expect, it } from 'vitest'
import { aboutChips, aboutStory } from './about'
import { education } from './education'
import { jobs } from './jobs'
import { projects } from './projects'
import { sections } from './sections'
import { socials } from './socials'

describe('content data', () => {
  it('features exactly three jobs, CoStar first', () => {
    const featured = jobs.filter((j) => j.featured)
    expect(featured).toHaveLength(3)
    expect(featured[0].company).toBe('CoStar Group')
    expect(featured[0].title).toBe('Associate Software Engineer')
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
    expect(sections.map((s) => s.id)).toEqual([
      'work',
      'projects',
      'education',
      'about',
    ])
  })

  it('education matches the resume', () => {
    expect(education.degree).toBe('B.S. Computer Science')
    expect(education.gpa).toBe('3.85')
    expect(education.coursework).toHaveLength(4)
    expect(education.activities.map((a) => a.role)).toEqual([
      'Commodore',
      'Boatswain',
    ])
  })

  it('about content exists', () => {
    expect(aboutStory.length).toBeGreaterThan(50)
    expect(aboutChips.length).toBe(3)
  })
})
