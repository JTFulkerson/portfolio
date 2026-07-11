import { useState } from 'react'
import type { Job } from '@/data/jobs'
import { Reveal, SectionHeading } from '@/components/motion'
import { jobs } from '@/data/jobs'

function JobEntry({ job }: { job: Job }) {
  return (
    <Reveal>
      <div className="text-sm font-semibold">
        {job.title}{' '}
        <span className="font-normal text-muted">· {job.company}</span>
      </div>
      <div className="mt-0.5 font-mono text-[10px] text-faint">
        {job.period}
        {job.status ? <span className="text-prompt"> {job.status}</span> : null}
      </div>
      {job.description ? (
        <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-muted">
          {job.description}
        </p>
      ) : null}
    </Reveal>
  )
}

export function WorkTimeline() {
  const [expanded, setExpanded] = useState(false)
  const featured = jobs.filter((j) => j.featured)
  const rest = jobs.filter((j) => !j.featured)

  return (
    <section id="work" className="border-t border-line px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading index={1} title="work" />
        <div className="flex flex-col gap-7 border-l-2 border-line pl-5">
          {featured.map((job) => (
            <JobEntry key={`${job.title}-${job.company}`} job={job} />
          ))}
          {expanded ? (
            rest.map((job) => (
              <JobEntry key={`${job.title}-${job.company}`} job={job} />
            ))
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="text-left font-mono text-[11px] text-faint hover:text-fg"
            >
              + {rest.length} earlier roles — resident assistant · dive
              instructor · event tech
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
