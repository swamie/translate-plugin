import { ArrowUpRightIcon, CheckIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Project } from "@/lib/site"
import { cn } from "@/lib/utils"
import { GitHubIcon } from "./brand-icons"
import { BrowserMock } from "./browser-mock"

function ProjectLinks({ project }: { project: Project }) {
  if (!project.url && !project.repo) {
    return (
      <p className="text-xs text-muted-foreground">
        Private client work — a full walkthrough is available on request.
      </p>
    )
  }
  return (
    <div className="flex flex-wrap gap-2">
      {project.url ? (
        <Button asChild variant="brand" size="sm">
          <a href={project.url} target="_blank" rel="noreferrer">
            Visit site
            <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </Button>
      ) : null}
      {project.repo ? (
        <Button asChild variant="outline" size="sm">
          <a href={project.repo} target="_blank" rel="noreferrer">
            <GitHubIcon data-icon="inline-start" />
            View source
          </a>
        </Button>
      ) : null}
    </div>
  )
}

/** Large alternating case-study row for headline projects. */
export function FeaturedProject({
  project,
  reverse = false,
}: {
  project: Project
  reverse?: boolean
}) {
  return (
    <Card className="overflow-hidden p-0 ring-foreground/10 [--card-spacing:0px]">
      <div className="grid items-stretch lg:grid-cols-2">
        <div
          className={cn(
            "relative flex items-center justify-center overflow-hidden bg-muted/40 p-6 sm:p-10",
            reverse && "lg:order-2"
          )}
        >
          <div className="glow-brand absolute inset-10 -z-0 opacity-20" />
          <BrowserMock
            name={project.name}
            accent={project.accent}
            className="card-halo relative w-full max-w-md"
          />
        </div>

        <div
          className={cn(
            "flex flex-col gap-5 p-6 sm:p-9",
            reverse && "lg:order-1"
          )}
        >
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-muted-foreground">
            <Badge variant="brand" className="font-mono">
              {project.category}
            </Badge>
            <span>{project.year}</span>
            <span aria-hidden>·</span>
            <span>{project.role}</span>
          </div>

          <div className="flex flex-col gap-2.5">
            <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.name}
            </h3>
            <p className="text-base text-pretty text-muted-foreground">
              {project.description}
            </p>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-1">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </Card>
  )
}

/** Compact card for secondary projects. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group/proj h-full gap-0 overflow-hidden p-0 ring-foreground/10 transition-all [--card-spacing:0px] hover:ring-brand/30 hover:card-halo">
      <BrowserMock
        name={project.name}
        accent={project.accent}
        className="rounded-none border-x-0 border-t-0"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
          <Badge variant="brand" className="font-mono">
            {project.category}
          </Badge>
          <span>{project.year}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading text-lg font-semibold tracking-tight">
            {project.name}
          </h3>
          <p className="text-sm text-pretty text-muted-foreground">
            {project.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
        <div className="mt-auto pt-2">
          <ProjectLinks project={project} />
        </div>
      </div>
    </Card>
  )
}
