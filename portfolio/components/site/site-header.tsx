"use client"

import * as React from "react"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"
import { SocialIcon } from "./icons"
import { Logo } from "./logo"
import { ModeToggle } from "./mode-toggle"

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const primarySocial = site.socials.find(
    (s) => s.icon !== "mail" && s.href && s.href !== "#"
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b bg-background/75 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          aria-label={`${site.name} — home`}
          className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
          {site.nav.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-0.5">
          {primarySocial ? (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <a
                href={primarySocial.href}
                target="_blank"
                rel="noreferrer"
                aria-label={primarySocial.label}
              >
                <SocialIcon name={primarySocial.icon} />
              </a>
            </Button>
          ) : null}

          <ModeToggle />

          <Button asChild variant="brand" size="sm" className="ml-1 hidden md:inline-flex">
            <a href="#contact">Let&apos;s talk</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle asChild>
                  <span>
                    <Logo />
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-0.5 px-4">
                {site.nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <Separator />
              <SheetFooter>
                <SheetClose asChild>
                  <Button asChild variant="brand">
                    <a href="#contact">Let&apos;s talk</a>
                  </Button>
                </SheetClose>
                <div className="flex items-center gap-1">
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
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
