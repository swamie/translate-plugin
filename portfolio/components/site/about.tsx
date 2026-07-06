import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { site } from "@/lib/site"
import { GitHubIcon } from "./brand-icons"
import { Reveal } from "./reveal"
import { Container, Section, SectionHeading } from "./section"

export function About() {
  const github = site.socials.find((s) => s.icon === "github")

  return (
    <Section id="about" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-brand absolute right-[-6rem] bottom-0 size-96 opacity-15" />
      </div>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="About"
              title="A developer who sweats the details"
            />
            <div className="mt-6 flex flex-col gap-4 text-base text-pretty text-muted-foreground sm:text-lg">
              {site.about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand">
                <a href="#contact">Work with me</a>
              </Button>
              {github ? (
                <Button asChild variant="outline">
                  <a href={github.href} target="_blank" rel="noreferrer">
                    <GitHubIcon data-icon="inline-start" />
                    GitHub
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <Reveal delay={80}>
            <div className="grid grid-cols-2 gap-4">
              {site.stats.map((stat) => (
                <Card size="sm" key={stat.label}>
                  <CardContent className="flex flex-col gap-1">
                    <span className="brand-text font-heading text-3xl font-semibold sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 sm:mt-20">
          <Reveal>
            <h3 className="font-heading text-sm font-medium tracking-wide text-muted-foreground uppercase">
              How I work
            </h3>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.process.map((step, i) => (
              <Reveal key={step.step} delay={i * 70} className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="font-mono text-sm text-brand">
                        {step.step}
                      </span>
                      {step.title}
                    </CardTitle>
                    <CardDescription>{step.body}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
