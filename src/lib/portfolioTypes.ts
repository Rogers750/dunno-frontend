import type { GeneratedContent } from "@/lib/api";

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    website: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    other: string[];
  };
  stats?: Array<{ label: string; value: string }>;
  skills: Array<{ category: string; items: string[] }>;
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
    highlights: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    tech: string[];
    github: string;
    live: string;
    highlights: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    duration: string;
  }>;
}

export type TemplateId = "minimal" | "dark-glass" | "creative";

export const TEMPLATE_TO_BACKEND: Record<TemplateId, string> = {
  "minimal":    "executive_minimal",
  "dark-glass": "modern_dark",
  "creative":   "creative_dev",
};

export const TEMPLATE_FROM_BACKEND: Record<string, TemplateId> = {
  "executive_minimal": "minimal",
  "modern_dark":       "dark-glass",
  "creative_dev":      "creative",
};

export interface TemplateInfo {
  id: TemplateId;
  label: string;
  description: string;
}

export const TEMPLATES: TemplateInfo[] = [
  { id: "minimal",    label: "Executive Minimal", description: "Clean · White · Typographic" },
  { id: "dark-glass", label: "Dark Glass",         description: "Dark · Glassy · Premium" },
  { id: "creative",   label: "Creative Bold",      description: "Bold · Expressive · Vibrant" },
];

export function extractGitHubUsername(url: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts[0] ?? null;
  } catch {
    const match = url.match(/github\.com\/([^/\s]+)/);
    return match?.[1] ?? null;
  }
}

export function adaptGeneratedContent(content: GeneratedContent): PortfolioData {
  return {
    personal: content.personal,
    social: content.social,
    stats: content.stats,
    skills: content.skills ?? [],
    experience: content.experience ?? [],
    projects: content.projects ?? [],
    education: content.education ?? [],
  };
}

export const EXAMPLE_PORTFOLIO: PortfolioData = {
  personal: {
    name: "Sagar Mehta",
    title: "Senior Frontend Engineer",
    bio: "Product-minded engineer with 4 years building consumer-facing products at scale. I've shipped features used by 20M+ users, led a design system adopted across 6 teams, and grown checkout conversion by 18% through relentless iteration.",
    location: "Bengaluru, India",
    email: "sagar@example.com",
    phone: "",
    website: "https://dunnoai.com/sagarmehta",
  },
  social: {
    github: "https://github.com/sagarmehta",
    linkedin: "https://linkedin.com/in/sagarmehta",
    twitter: "https://twitter.com/sagarmehta",
    other: [],
  },
  stats: [
    { value: "20M+",  label: "users reached" },
    { value: "18%",   label: "conversion lift" },
    { value: "4 yrs", label: "experience" },
    { value: "6",     label: "teams served" },
  ],
  experience: [
    {
      company: "CRED",
      role: "Senior Frontend Engineer",
      duration: "2023 – Present",
      description: "",
      highlights: [
        "Led redesign of the rewards discovery surface — increased weekly active engagement by 32%.",
        "Built and owns the internal design-token system adopted by 6 product squads.",
        "Reduced first-contentful-paint from 3.4s to 1.1s on the home feed through bundle splitting and lazy hydration.",
      ],
    },
    {
      company: "Razorpay",
      role: "UI Engineer",
      duration: "2022 – 2023",
      description: "",
      highlights: [
        "Shipped the new checkout v2 flow — A/B tested against 4M monthly transactions, lifted conversion by 18%.",
        "Built accessible, animated component library (42 components) used across Dashboard and Magic Checkout.",
      ],
    },
    {
      company: "Meesho",
      role: "Frontend Developer",
      duration: "2021 – 2022",
      description: "",
      highlights: [
        "Owned the seller onboarding web app serving 500K+ new sellers per quarter.",
        "Reduced form drop-off by 27% through UX improvements and smart field validation.",
      ],
    },
  ],
  skills: [
    { category: "Languages",   items: ["TypeScript", "JavaScript", "HTML", "CSS", "Python"] },
    { category: "Frameworks",  items: ["React", "Next.js", "React Native", "Vite"] },
    { category: "Design",      items: ["Figma", "Design Systems", "Accessibility", "Storybook"] },
    { category: "Performance", items: ["Web Vitals", "Lighthouse", "Bundle Analysis", "SSR"] },
    { category: "Tools",       items: ["Git", "Vercel", "PostHog", "Linear"] },
  ],
  projects: [
    {
      name: "Pebble UI",
      description: "Open-source React component library with 50+ accessible components, dark mode support, and fluid motion primitives.",
      tech: ["React", "TypeScript", "Framer Motion", "Storybook"],
      github: "https://github.com/sagarmehta/pebble-ui",
      live: "",
      highlights: [],
    },
    {
      name: "Logboard",
      description: "Real-time analytics dashboard for micro-SaaS founders. Built with Next.js, WebSockets, and Recharts. 400+ GitHub stars.",
      tech: ["Next.js", "WebSocket", "Recharts", "Supabase"],
      github: "https://github.com/sagarmehta/logboard",
      live: "",
      highlights: [],
    },
    {
      name: "Motionkit",
      description: "Declarative animation toolkit for React. Write spring physics and gesture interactions in 3 lines.",
      tech: ["React", "Framer Motion", "TypeScript"],
      github: "https://github.com/sagarmehta/motionkit",
      live: "",
      highlights: [],
    },
    {
      name: "Paletto",
      description: "AI-powered colour palette generator for design systems. Input a brand hex, get a full accessible token set in seconds.",
      tech: ["Next.js", "OpenAI", "Tailwind", "WCAG"],
      github: "https://github.com/sagarmehta/paletto",
      live: "",
      highlights: [],
    },
  ],
  education: [
    {
      institution: "BITS Pilani",
      degree: "B.E., Information Technology",
      duration: "2017 – 2021",
    },
  ],
};
