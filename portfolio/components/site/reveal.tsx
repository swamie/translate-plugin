"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Fades + lifts its children into view on scroll. Falls back to fully
 * visible when IntersectionObserver is unavailable or motion is reduced.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [shown, setShown] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={cn(
        "reveal translate-y-4 opacity-0 transition-all duration-700 ease-out will-change-transform",
        "data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        className
      )}
    >
      {children}
    </div>
  )
}
