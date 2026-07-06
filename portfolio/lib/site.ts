/**
 * Central content config for the portfolio.
 *
 * ─────────────────────────────────────────────────────────────
 *  This is the ONLY file you need to edit to make the site yours.
 *  Anything marked  // TODO  is a placeholder — swap in your real
 *  details, links, and copy. Everything else is wired up for you.
 * ─────────────────────────────────────────────────────────────
 */

export type NavItem = { label: string; href: string }

export type Social = {
  label: string
  href: string
  /** lucide-react icon name, mapped in components/site/icon.tsx */
  icon: "github" | "linkedin" | "twitter" | "dribbble" | "mail" | "globe"
}

export type Project = {
  slug: string
  name: string
  /** Short kind, shown as an eyebrow label. */
  category: string
  year: string
  /** Your role on the project. */
  role: string
  /** One punchy line for cards. */
  summary: string
  /** A fuller paragraph for the detail area. */
  description: string
  /** Skills / tech tags. */
  tags: string[]
  /** 3–4 bullet outcomes. */
  highlights: string[]
  /** Live site URL. Use "" if not public. */
  url: string
  /** Source / repo URL. Use "" if none. */
  repo: string
  /** Show in the large featured row. */
  featured: boolean
  /** Decorative gradient for the preview thumbnail (any CSS colors). */
  accent: { from: string; to: string }
}

export type SkillGroup = {
  /** lucide-react icon name, mapped in components/site/icon.tsx */
  icon: "frontend" | "design" | "backend" | "commerce"
  title: string
  blurb: string
  skills: string[]
}

export type ProcessStep = { step: string; title: string; body: string }
export type Stat = { value: string; label: string }

export const site = {
  /** ── Identity ─────────────────────────────────────────── */
  name: "Kay", // TODO: your full name / display name
  handle: "voidkay", // used for the logomark + footer
  role: "Web Developer & Designer",
  location: "Available worldwide · Remote", // TODO
  available: true, // shows the "available for work" pill
  email: "voidkay01@gmail.com", // TODO: confirm the address you want public
  // A one-liner for the hero. Keep it confident and specific.
  tagline:
    "I design and build fast, modern websites — from conversion-driven business sites to content platforms and custom tools.",
  // Short about paragraphs.
  about: [
    "I'm a web developer and designer who turns ideas into polished, production-ready websites. I care about the details that make a site feel effortless: clean typography, smooth motion, sensible information architecture, and performance that holds up on real devices.",
    "I work across the whole stack — designing the interface, building the front-end in React and Next.js, wiring up the back-end and CMS, and shipping it live. Recent work spans a service business site, a personal publishing platform, and open-source developer tooling.",
  ],

  /** ── Navigation ───────────────────────────────────────── */
  nav: [
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],

  /** ── Socials (TODO: fill in your real profiles) ───────── */
  socials: [
    { label: "GitHub", href: "https://github.com/swamie", icon: "github" },
    { label: "LinkedIn", href: "#", icon: "linkedin" }, // TODO
    { label: "X / Twitter", href: "#", icon: "twitter" }, // TODO
    { label: "Email", href: "mailto:voidkay01@gmail.com", icon: "mail" },
  ] satisfies Social[],

  /** ── Selected work ────────────────────────────────────── */
  projects: [
    {
      slug: "elite-line-plumbing",
      name: "Elite Line Plumbing",
      category: "Business Website",
      year: "2025",
      role: "Design & Build",
      summary:
        "A conversion-focused website for a plumbing & drainage company — built to turn local searches into booked jobs.",
      description:
        "A complete marketing site for a trades business: clear service pages, trust signals, and a friction-free path to get in touch. Designed mobile-first around how customers actually find and contact a plumber, with click-to-call and a quote request flow front and centre.",
      tags: ["Web Design", "Responsive", "Local SEO", "Lead Gen"], // TODO: adjust to the real stack
      highlights: [
        "Mobile-first service & area pages",
        "Click-to-call and quote-request flow",
        "Local SEO structure and fast load times",
        "Accessible, trust-building brand design",
      ],
      url: "", // TODO: live URL
      repo: "",
      featured: true,
      accent: { from: "oklch(0.62 0.15 245)", to: "oklch(0.72 0.13 200)" },
    },
    {
      slug: "sisim",
      name: "Sisim",
      category: "Personal Blog",
      year: "2025",
      role: "Design & Build",
      summary:
        "A minimal personal blog and writing space — a calm, content-first reading experience.",
      description:
        "A self-publishing platform built around the writing itself: distraction-free layouts, considered typography, and quick navigation between posts. Light and dark themes, fast static pages, and a structure that makes adding new content effortless.",
      tags: ["Blog", "CMS / MDX", "Typography", "Responsive"], // TODO: adjust to the real stack
      highlights: [
        "Content-first, distraction-free reading",
        "Refined editorial typography",
        "Fast static pages, dark & light themes",
        "Effortless to publish new posts",
      ],
      url: "", // TODO: live URL
      repo: "",
      featured: true,
      accent: { from: "oklch(0.6 0.2 305)", to: "oklch(0.68 0.16 350)" },
    },
    {
      slug: "livetranslate",
      name: "LiveTranslate",
      category: "Open-Source Plugin",
      year: "2025",
      role: "Author",
      summary:
        "A Vencord plugin that auto-translates incoming Discord messages in real time, inline under each message.",
      description:
        "A TypeScript/React userplugin for Vencord. It renders a message accessory that auto-detects the source language and translates every incoming message into your language as it arrives — with in-memory caching and translation requests routed through Electron's main process to sidestep CORS.",
      tags: ["TypeScript", "React", "Vencord", "i18n"],
      highlights: [
        "Auto-translates every message in real time",
        "Automatic source-language detection (100+ languages)",
        "In-memory caching to avoid redundant requests",
        "Main-process fetch to bypass renderer CORS",
      ],
      url: "",
      repo: "https://github.com/swamie/translate-plugin",
      featured: false,
      accent: { from: "oklch(0.7 0.15 160)", to: "oklch(0.72 0.13 195)" },
    },
    {
      slug: "livevoicetranslate",
      name: "LiveVoiceTranslate",
      category: "Open-Source Plugin",
      year: "2025",
      role: "Author",
      summary:
        "Real-time mic transcription (Deepgram) that posts a live translation of your speech into a Discord voice channel.",
      description:
        "A Vencord plugin that streams your microphone to Deepgram for live transcription, translates what you said, and posts it as a caption to the channel — so people in a voice call who don't share your language can read along. Handles native Electron audio plumbing and a start/stop control in the chat bar.",
      tags: ["TypeScript", "Deepgram", "WebRTC", "Electron"],
      highlights: [
        "Live microphone transcription via Deepgram",
        "Translates and captions speech in real time",
        "Native Electron audio integration",
        "One-tap start/stop from the chat bar",
      ],
      url: "",
      repo: "https://github.com/swamie/translate-plugin",
      featured: false,
      accent: { from: "oklch(0.75 0.16 75)", to: "oklch(0.68 0.18 40)" },
    },
  ] satisfies Project[],

  /** ── Skills ───────────────────────────────────────────── */
  skillGroups: [
    {
      icon: "frontend",
      title: "Front-End Engineering",
      blurb: "Modern, component-driven interfaces that stay fast and maintainable.",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript (ES2023)",
        "Tailwind CSS",
        "shadcn/ui",
        "HTML5 & CSS3",
        "Framer Motion",
      ],
    },
    {
      icon: "design",
      title: "UI / UX & Design",
      blurb: "Interfaces that look sharp and feel obvious to use, on any screen.",
      skills: [
        "Responsive design",
        "Design systems",
        "Figma",
        "Accessibility (WCAG)",
        "Motion & micro-interactions",
        "Prototyping",
        "Brand & visual design",
      ],
    },
    {
      icon: "backend",
      title: "Full-Stack & Back-End",
      blurb: "APIs, data, and auth wired up cleanly behind the interface.",
      skills: [
        "Node.js",
        "REST APIs",
        "PostgreSQL",
        "Auth (OAuth / JWT)",
        "Serverless & Edge",
        "ORMs (Prisma)",
        "Third-party integrations",
      ],
    },
    {
      icon: "commerce",
      title: "CMS & E-Commerce",
      blurb: "Content and storefronts clients can actually run themselves.",
      skills: [
        "WordPress",
        "Headless CMS",
        "Shopify",
        "SEO fundamentals",
        "Landing pages",
        "Content modelling",
      ],
    },
  ] satisfies SkillGroup[],

  /** Continuous tech marquee under the hero. */
  marquee: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Figma",
    "WordPress",
    "Shopify",
    "Vercel",
    "Git",
    "shadcn/ui",
    "Framer Motion",
    "REST APIs",
  ],

  /** ── How I work ───────────────────────────────────────── */
  process: [
    {
      step: "01",
      title: "Discover",
      body: "We get clear on your goals, audience, and brand — so the site is built to do a job, not just look nice.",
    },
    {
      step: "02",
      title: "Design",
      body: "Wireframes to polished, responsive UI. Accessible, on-brand, and reviewed together before a line of production code.",
    },
    {
      step: "03",
      title: "Build",
      body: "Clean, typed, component-driven code. Fast, SEO-friendly, and easy to extend as you grow.",
    },
    {
      step: "04",
      title: "Launch",
      body: "Optimise, test across devices, deploy, and iterate. You get something you can run and I can keep improving.",
    },
  ] satisfies ProcessStep[],

  /** ── Stats (TODO: replace with your real numbers) ─────── */
  stats: [
    { value: "3+", label: "Years building for the web" },
    { value: "15+", label: "Projects shipped" },
    { value: "95+", label: "Typical Lighthouse score" },
    { value: "<24h", label: "Response time" },
  ] satisfies Stat[],
}

export type Site = typeof site
