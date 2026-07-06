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
  /**
   * Optional real screenshot, served from /public
   * (e.g. "/screenshots/elite-line.png"). When set, it replaces the
   * gradient placeholder in the preview. Leave "" to use the gradient.
   */
  screenshot?: string
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
    "I design and build fast, modern websites — front-end, back-end, and everything in between.",
  // Short about paragraphs.
  about: [
    "I'm a web developer and designer who turns ideas into polished, production-ready websites. I care about the details that make a site feel effortless: clean typography, smooth motion, sensible information architecture, and performance that holds up on real devices.",
    "I work across the whole stack — designing the interface, building the front-end in React and Next.js, and engineering the back-end: authentication, databases, APIs, and content management. My recent work spans a conversion-focused business site and a full-stack publishing platform I built end-to-end.",
  ],

  /** ── Navigation ───────────────────────────────────────── */
  nav: [
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],

  /** ── Socials (TODO: fill in your real profiles) ───────── */
  // Links left as "#" are hidden until you add a real URL, so the site
  // never shows a dead link. Fill these in to make them appear.
  socials: [
    { label: "LinkedIn", href: "#", icon: "linkedin" }, // TODO: your LinkedIn URL
    { label: "X / Twitter", href: "#", icon: "twitter" }, // TODO: your X/Twitter URL
    { label: "Email", href: "mailto:voidkay01@gmail.com", icon: "mail" },
  ] satisfies Social[],

  /** ── Selected work (only my own websites) ─────────────── */
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
      screenshot: "", // TODO: "/screenshots/elite-line.png" once captured
      featured: true,
      accent: { from: "oklch(0.62 0.15 245)", to: "oklch(0.72 0.13 200)" },
    },
    {
      slug: "sisim",
      name: "Sisim",
      category: "Full-Stack Blog Platform",
      year: "2025",
      role: "Full-Stack Build",
      summary:
        "A personal blog and publishing platform — designed on the front, fully engineered on the back.",
      description:
        "A full-stack blog I built end-to-end. On the surface it's a calm, content-first reading experience with refined typography; underneath it's a custom back-end that handles authentication, a database-driven content model, and an API that powers posts and a writing/admin dashboard. Built to be fast, secure, and effortless to publish to.",
      tags: ["Next.js", "Node.js", "PostgreSQL", "Auth", "REST API", "TypeScript"], // TODO: match your real stack
      highlights: [
        "Custom back-end: auth, database & content API",
        "Admin dashboard for writing & managing posts",
        "Server-rendered, fast, SEO-friendly pages",
        "Secure sessions and clean data modelling",
      ],
      url: "", // TODO: live URL
      repo: "",
      screenshot: "", // TODO: "/screenshots/sisim.png" once captured
      featured: true,
      accent: { from: "oklch(0.6 0.2 305)", to: "oklch(0.68 0.16 350)" },
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
      body: "Clean, typed, component-driven code — front-end and back-end. Fast, SEO-friendly, and easy to extend as you grow.",
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
    { value: "Full-stack", label: "Front-end to back-end" },
    { value: "95+", label: "Typical Lighthouse score" },
    { value: "<24h", label: "Response time" },
  ] satisfies Stat[],
}

export type Site = typeof site
