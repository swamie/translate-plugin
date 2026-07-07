import { ArrowRightIcon, MapPinIcon, SparklesIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { site } from "@/lib/site"
import { BrowserMock } from "./browser-mock"
import { Container, Section } from "./section"
import { Reveal } from "./reveal"

function AvailabilityPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 py-1 pr-3 pl-2.5 text-xs font-medium text-muted-foreground backdrop-blur">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-brand" />
      </span>
      {site.available ? "Available for new projects" : "Currently booked"}
    </span>
  )
}

export function Hero() {
  const feature = site.projects.find((p) => p.featured) ?? site.projects[0]

  return (
    <Section id="top" className="relative overflow-hidden pt-14 pb-16 sm:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="glow-brand absolute -top-28 right-[-6rem] size-[34rem] opacity-40" />
        <div className="glow-brand absolute top-40 left-[-8rem] size-[26rem] opacity-20" />
      </div>

      <Container>
        <div className="grid items-center gap-12 pb-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <AvailabilityPill />
            </Reveal>

            <div className="flex flex-col gap-5">
              <Reveal delay={60}>
                <p className="text-sm font-medium text-muted-foreground">
                  Hi, I&apos;m {site.name} — {site.role.toLowerCase()}.
                </p>
              </Reveal>
              <Reveal delay={110}>
                <h1 className="font-heading max-w-2xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  I design &amp; build{" "}
                  <span className="brand-text">modern, high-performance</span>{" "}
                  websites.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
                  {site.tagline}
                </p>
              </Reveal>
            </div>

            <Reveal delay={210}>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild variant="brand" size="lg" className="h-11 px-5 text-sm">
                  <a href="#work">
                    View my work
                    <ArrowRightIcon data-icon="inline-end" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-11 px-5 text-sm">
                  <a href="#contact">Get in touch</a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon className="size-4" />
                  {site.location}
                </span>
                <Separator />
                <span className="inline-flex items-center gap-1.5">
                  <SparklesIcon className="size-4 text-brand" />
                  Full-stack, front-end to back-end
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="relative">
            <div className="relative mx-auto w-full max-w-md lg:mr-0 lg:ml-auto">
              <div className="glow-brand absolute -inset-8 -z-10 opacity-40" />
              <BrowserMock
                name={feature.name}
                url={feature.url || undefined}
                accent={feature.accent}
                screenshot={feature.screenshot}
                className="card-halo"
              />
              <Card
                size="sm"
                className="absolute -bottom-6 -left-3 w-max max-w-[13rem] shadow-lg sm:-left-6"
              >
                <CardContent className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/12 text-brand">
                    <SparklesIcon className="size-4" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {site.stats[0]?.value} years
                    </span>
                    <span className="text-xs text-muted-foreground">
                      building for the web
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Badge
                variant="brand"
                className="absolute -top-3 right-3 h-7 shadow-sm sm:right-5"
              >
                Lighthouse {site.stats[2]?.value}
              </Badge>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

function Separator() {
  return <span aria-hidden className="hidden h-4 w-px bg-border sm:inline-block" />
}
