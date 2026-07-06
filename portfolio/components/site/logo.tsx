import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-8 place-items-center rounded-lg bg-primary font-heading text-sm font-semibold text-primary-foreground shadow-sm">
        {site.name.charAt(0).toUpperCase()}
      </span>
      {showWordmark ? (
        <span className="font-heading text-[0.95rem] font-semibold tracking-tight">
          {site.handle}
          <span className="text-brand">.</span>
        </span>
      ) : null}
    </span>
  )
}
