import { site } from "@/lib/site"

export function Marquee() {
  const items = site.marquee

  return (
    <div
      aria-hidden
      className="relative flex overflow-hidden border-y bg-muted/30 py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent sm:w-28" />
      <div className="flex w-max animate-marquee items-center gap-8 pr-8">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 text-sm font-medium whitespace-nowrap text-muted-foreground"
          >
            {item}
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-brand/50"
            />
          </span>
        ))}
      </div>
    </div>
  )
}
