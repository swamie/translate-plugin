import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { site } from "@/lib/site"
import { SkillIcon } from "./icons"
import { Reveal } from "./reveal"
import { Container, Section, SectionHeading } from "./section"

export function Skills() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeading
          eyebrow="Skillset"
          title="What I bring to a project"
          description="Full-range capability across the stack — from the pixels people see to the systems that run underneath."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {site.skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 70} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/15">
                      <SkillIcon name={group.icon} className="size-5" />
                    </span>
                    <CardTitle className="text-lg">{group.title}</CardTitle>
                  </div>
                  <CardDescription className="pt-1">
                    {group.blurb}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
