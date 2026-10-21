import { useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { About } from '@/components/sections/About'
import { Education } from '@/components/sections/Education'
import { Footer } from '@/components/sections/Footer'
import { Hero } from '@/components/sections/Hero'
import { Nav } from '@/components/sections/Nav'
import { Projects } from '@/components/sections/Projects'
import { WorkTimeline } from '@/components/sections/WorkTimeline'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const navigate = useNavigate()

  // Old shared links like /#work still land on the section; afterwards the
  // hash is dropped (through the router, so it doesn't reset the scroll).
  useEffect(() => {
    if (!window.location.hash) return
    void navigate({
      to: '/',
      replace: true,
      resetScroll: false,
      hashScrollIntoView: false,
    })
  }, [navigate])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkTimeline />
        <Projects />
        <Education />
        <About />
      </main>
      <Footer />
    </>
  )
}
