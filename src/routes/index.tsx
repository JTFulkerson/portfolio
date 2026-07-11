import { createFileRoute } from '@tanstack/react-router'
import { About } from '@/components/sections/About'
import { Footer } from '@/components/sections/Footer'
import { Hero } from '@/components/sections/Hero'
import { Nav } from '@/components/sections/Nav'
import { Projects } from '@/components/sections/Projects'
import { WorkTimeline } from '@/components/sections/WorkTimeline'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkTimeline />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  )
}
