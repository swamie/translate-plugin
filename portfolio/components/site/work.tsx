import { site } from "@/lib/site"
import { FeaturedProject, ProjectCard } from "./project-card"
import { Reveal } from "./reveal"
import { Container, Section, SectionHeading } from "./section"

export function Work() {
  const featured = site.projects.filter((p) => p.featured)
  const rest = site.projects.filter((p) => !p.featured)

  return (
    <Section id="work" className="border-t bg-muted/20">
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="Client websites, start to finish"
          description="Websites I've designed, built, and shipped end-to-end — front-end, back-end, and everything in between."
        />

        <div className="mt-12 flex flex-col gap-8">
          {featured.map((project, i) => (
            <Reveal key={project.slug}>
              <FeaturedProject project={project} reverse={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        {rest.length ? (
          <div className="mt-16">
            <Reveal>
              <h3 className="font-heading text-sm font-medium tracking-wide text-muted-foreground uppercase">
                Also building — open source
              </h3>
            </Reveal>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {rest.map((project, i) => (
                <Reveal key={project.slug} delay={i * 80} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
