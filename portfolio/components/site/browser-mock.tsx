import { cn } from "@/lib/utils"

/**
 * A stylised "browser window" preview standing in for a project screenshot.
 * Swap in a real <img> here later — drop screenshots into /public and render
 * them inside the canvas div.
 */
export function BrowserMock({
  name,
  url,
  accent,
  className,
}: {
  name: string
  url?: string
  accent: { from: string; to: string }
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-card shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b bg-muted/50 px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        <div className="ml-2 flex h-5 flex-1 items-center truncate rounded-md bg-background/70 px-2 text-[11px] text-muted-foreground">
          {url || `${name.toLowerCase().replace(/\s+/g, "")}.com`}
        </div>
      </div>
      <div
        className="relative aspect-[16/10] w-full"
        style={{
          backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
        }}
      >
        <div className="bg-dots absolute inset-0 opacity-25" />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <span className="font-heading text-2xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-3xl">
            {name}
          </span>
        </div>
      </div>
    </div>
  )
}
