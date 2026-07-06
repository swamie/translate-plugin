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
      <SiteHeader />
      <main className="flex-1">
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
