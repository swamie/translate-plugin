"use client"

import * as React from "react"
import { SendIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { site } from "@/lib/site"

export function ContactForm() {
  const [pending, setPending] = React.useState(false)
  const [invalid, setInvalid] = React.useState<
    "name" | "email" | "message" | null
  >(null)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    const firstEmpty = !name
      ? "name"
      : !email
        ? "email"
        : !message
          ? "message"
          : null
    if (firstEmpty) {
      setInvalid(firstEmpty)
      toast.error("Please fill in every field before sending.")
      const el = form.elements.namedItem(firstEmpty)
      if (el instanceof HTMLElement) el.focus()
      return
    }
    setInvalid(null)

    setPending(true)
    const subject = encodeURIComponent(`New project enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`

    window.setTimeout(() => {
      setPending(false)
      toast.success("Opening your email app…", {
        description: `If nothing happens, reach me directly at ${site.email}.`,
      })
      form.reset()
    }, 500)
  }

  return (
    <form onSubmit={onSubmit} onChange={() => setInvalid(null)} noValidate>
      <FieldGroup>
        <Field data-invalid={invalid === "name" || undefined}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            placeholder="Jane Doe"
            autoComplete="name"
            aria-invalid={invalid === "name" || undefined}
            required
          />
        </Field>
        <Field data-invalid={invalid === "email" || undefined}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@company.com"
            autoComplete="email"
            aria-invalid={invalid === "email" || undefined}
            required
          />
        </Field>
        <Field data-invalid={invalid === "message" || undefined}>
          <FieldLabel htmlFor="message">Project details</FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell me about your project — goals, timeline, and rough budget…"
            aria-invalid={invalid === "message" || undefined}
            required
          />
          <FieldDescription>
            The more detail you share, the better. I usually reply within a day.
          </FieldDescription>
        </Field>
        <Button
          type="submit"
          variant="brand"
          size="lg"
          className="h-11 w-full px-5 text-sm sm:w-fit"
          disabled={pending}
        >
          {pending ? "Opening…" : "Send message"}
          <SendIcon data-icon="inline-end" />
        </Button>
      </FieldGroup>
    </form>
  )
}
