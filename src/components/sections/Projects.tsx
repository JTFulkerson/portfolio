import type { Project } from '@/data/projects'
import { Reveal, SectionHeading } from '@/components/motion'
import { projects } from '@/data/projects'

function ProjectRow({ project }: { project: Project }) {
  const card = (
    <div className="group rounded-xl border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold">{project.name}</span>
        <span
          className={`font-mono text-[10px] ${project.link ? 'text-accent' : 'text-faint'}`}
        >
          {project.status}
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-line px-1.5 py-0.5 font-mono text-[9px] text-faint"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading="lazy"
          width={1624}
          height={1056}
          className="mt-3 max-h-64 w-full rounded-lg border border-line object-cover object-top sm:mt-0 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:mt-3 sm:group-hover:max-h-64 sm:group-hover:opacity-100"
        />
      ) : null}
    </div>
  )

  return project.link ? (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {card}
    </a>
  ) : (
    card
  )
}

export function Projects() {
  return (
    <section id="projects" className="border-t border-line px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading index={2} title="projects" />
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Reveal key={project.name}>
              <ProjectRow project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
