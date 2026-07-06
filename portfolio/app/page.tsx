import { About } from "@/components/site/about"
import { Contact } from "@/components/site/contact"
import { Hero } from "@/components/site/hero"
import { Marquee } from "@/components/site/marquee"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { Skills } from "@/components/site/skills"
import { Work } from "@/components/site/work"

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only rounded-md bg-background px-4 py-2 text-sm font-medium ring-2 ring-ring focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero />
        <Marquee />
        <Work />
        <Skills />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
