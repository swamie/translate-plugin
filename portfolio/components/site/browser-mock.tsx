import { cn } from "@/lib/utils"

/**
 * A stylised "browser window" preview.
 *
 * - Pass `screenshot` (a path under /public) to show a REAL screenshot of
 *   the site inside the browser chrome.
 * - With no screenshot, it falls back to a branded gradient placeholder.
 */
export function BrowserMock({
  name,
  url,
  accent,
  screenshot,
  className,
}: {
  name: string
  url?: string
  accent: { from: string; to: string }
  screenshot?: string
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
        style={
          screenshot
            ? undefined
            : {
                backgroundImage: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              }
        }
      >
        {screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={screenshot}
            alt={`Screenshot of the ${name} website`}
            loading="lazy"
            className="absolute inset-0 size-full object-cover object-top"
          />
        ) : (
          <>
            <div className="bg-dots absolute inset-0 opacity-25" />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(0,0,0,0.28), transparent 78%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <span className="font-heading text-2xl font-semibold tracking-tight text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.35)] sm:text-3xl">
                {name}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
