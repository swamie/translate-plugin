import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { site } from "@/lib/site"
import { SocialIcon } from "./icons"
import { Container } from "./section"
import { Logo } from "./logo"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t">
      <Container>
        <div className="flex flex-col gap-10 py-14">
          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <div className="flex max-w-xs flex-col gap-3">
              <Logo />
              <p className="text-sm text-muted-foreground">
                {site.role} — building fast, modern websites and web apps that
                get results.
              </p>
              <div className="flex items-center gap-0.5">
                {site.socials
                  .filter((s) => s.href && s.href !== "#")
                  .map((s) => (
                    <Button asChild key={s.label} variant="ghost" size="icon">
                      <a
                        href={s.href}
                        target={
                          s.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noreferrer"
                        aria-label={s.label}
                      >
                        <SocialIcon name={s.icon} />
                      </a>
                    </Button>
                  ))}
              </div>
            </div>

            <nav aria-label="Footer" className="flex flex-col gap-2.5 text-sm">
              <span className="font-medium text-foreground">Explore</span>
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit rounded-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <Separator />

          <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <p>Built with Next.js, Tailwind CSS &amp; shadcn/ui.</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
