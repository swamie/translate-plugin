import * as React from "react"
import {
  Code2Icon,
  GlobeIcon,
  MailIcon,
  PaletteIcon,
  ServerIcon,
  ShoppingBagIcon,
} from "lucide-react"

import type { SkillGroup, Social } from "@/lib/site"
import { GitHubIcon, LinkedInIcon, XTwitterIcon } from "./brand-icons"

type SvgProps = React.SVGProps<SVGSVGElement>

const socialMap: Record<Social["icon"], React.ComponentType<SvgProps>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: XTwitterIcon,
  dribbble: GlobeIcon,
  mail: MailIcon,
  globe: GlobeIcon,
}

export function SocialIcon({ name, ...props }: { name: Social["icon"] } & SvgProps) {
  const Cmp = socialMap[name] ?? GlobeIcon
  return <Cmp {...props} />
}

const skillMap: Record<SkillGroup["icon"], React.ComponentType<SvgProps>> = {
  frontend: Code2Icon,
  design: PaletteIcon,
  backend: ServerIcon,
  commerce: ShoppingBagIcon,
}

export function SkillIcon({ name, ...props }: { name: SkillGroup["icon"] } & SvgProps) {
  const Cmp = skillMap[name] ?? Code2Icon
  return <Cmp {...props} />
}
