import { Reveal, SectionHeading } from '@/components/motion'
import { education } from '@/data/education'

export function Education() {
  return (
    <section id="education" className="border-t border-line px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading index={3} title="education" />
        <Reveal>
          <div className="text-sm font-semibold">
            {education.school}{' '}
            <span className="font-normal text-muted">
              · {education.location}
            </span>
          </div>
          <div className="mt-0.5 font-mono text-[10px] text-faint">
            {education.period}
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            {education.degree} · {education.concentration} concentration
          </p>
          <p className="mt-1 font-mono text-[11px] text-muted">
            <span className="text-keyword">gpa</span> {education.gpa}
            <span className="text-faint"> · </span>
            <span className="text-keyword">cs</span> {education.majorGpa}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {education.deansList}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {education.coursework.map((course) => (
              <span
                key={course}
                className="rounded border border-line px-1.5 py-0.5 font-mono text-[9px] text-faint"
              >
                {course}
              </span>
            ))}
          </div>
          <ul className="mt-4 flex flex-col gap-1">
            {education.activities.map((a) => (
              <li key={a.role} className="text-xs text-muted">
                {a.role} <span className="text-faint">· {a.org}</span>{' '}
                <span className="font-mono text-[10px] text-faint">
                  {a.period}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
