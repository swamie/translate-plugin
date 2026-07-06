import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import { ContactForm } from "./contact-form"
import { CopyButton } from "./copy-button"
import { SocialIcon } from "./icons"
import { Reveal } from "./reveal"
import { Container, Section, SectionHeading } from "./section"

export function Contact() {
  const elsewhere = site.socials.filter(
    (s) => s.icon !== "mail" && s.href && s.href !== "#"
  )

  return (
    <Section id="contact" className="border-t bg-muted/20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something great"
              description="Have a project in mind, or just want to say hi? Tell me what you're working on and I'll get back to you — usually within a day."
            />

            <Reveal delay={80} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Email
                </span>
                <div className="flex items-center gap-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="rounded-sm font-heading text-lg font-medium tracking-tight underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {site.email}
                  </a>
                  <CopyButton value={site.email} label="Copy email address" />
                </div>
              </div>

              {elsewhere.length ? (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Elsewhere
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {elsewhere.map((s) => (
                      <Button asChild key={s.label} variant="outline" size="sm">
                        <a
                          href={s.href}
                          target={
                            s.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel="noreferrer"
                        >
                          <SocialIcon name={s.icon} data-icon="inline-start" />
                          {s.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : null}

              <Card size="sm" className="bg-card/60">
                <CardContent className="flex items-center gap-3">
                  <span className="relative flex size-2.5 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
                  </span>
                  <p className="text-sm text-muted-foreground">
                    {site.available
                      ? "Currently available for freelance & contract work."
                      : "Currently booked — reach out about future availability."}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <Card>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
