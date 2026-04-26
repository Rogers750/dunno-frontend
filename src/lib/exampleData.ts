import type { GeneratedContent } from "@/lib/api";

export const EXAMPLE_NAME     = "Sagar Mehta";
export const EXAMPLE_USERNAME = "sagarmehta";

export const EXAMPLE_CONTENT: GeneratedContent = {
  summary:
    "Product-minded engineer with 4 years building consumer-facing products at scale. " +
    "I've shipped features used by 20M+ users, led a design system adopted across 6 teams, " +
    "and grown a checkout conversion rate by 18% through relentless iteration.",

  stats: [
    { value: "20M+",  label: "users reached" },
    { value: "18%",   label: "conversion lift" },
    { value: "4 yrs", label: "experience" },
    { value: "6",     label: "teams served" },
  ],

  experience: [
    {
      title: "Senior Frontend Engineer",
      company: "CRED",
      period: "2023 – Present",
      highlights: [
        "Led redesign of the rewards discovery surface — increased weekly active engagement by 32%.",
        "Built and owns the internal design-token system adopted by 6 product squads.",
        "Reduced first-contentful-paint from 3.4s to 1.1s on the home feed through bundle splitting and lazy hydration.",
      ],
    },
    {
      title: "UI Engineer",
      company: "Razorpay",
      period: "2022 – 2023",
      highlights: [
        "Shipped the new checkout v2 flow — A/B tested against 4M monthly transactions, lifted conversion by 18%.",
        "Built accessible, animated component library (42 components) used across Dashboard and Magic Checkout.",
        "Collaborated with design to create motion guidelines now documented in the internal Figma system.",
      ],
    },
    {
      title: "Frontend Developer",
      company: "Meesho",
      period: "2021 – 2022",
      highlights: [
        "Owned the seller onboarding web app serving 500K+ new sellers per quarter.",
        "Reduced form drop-off by 27% through UX improvements and smart field validation.",
      ],
    },
    {
      title: "Frontend Intern",
      company: "Groww",
      period: "2020 – 2021",
      highlights: [
        "Built SIP (Systematic Investment Plan) calculator used by 1M+ users.",
        "Implemented real-time portfolio chart with sub-100ms update latency.",
      ],
    },
  ],

  skills: [
    { category: "Languages",   items: ["TypeScript", "JavaScript", "HTML", "CSS", "Python"] },
    { category: "Frameworks",  items: ["React", "Next.js", "React Native", "Framer Motion", "Vite"] },
    { category: "Design",      items: ["Figma", "Design Systems", "Accessibility", "Motion Design", "Storybook"] },
    { category: "Performance", items: ["Web Vitals", "Lighthouse", "Bundle Analysis", "SSR", "ISR"] },
    { category: "Tools",       items: ["Git", "Vercel", "PostHog", "LaunchDarkly", "Linear"] },
  ],

  projects: [
    {
      id: "1", source: "github", included: true, display_order: 1,
      title: "Pebble UI",
      description:
        "Open-source React component library with 50+ accessible components, dark mode support, and fluid motion primitives built on Framer Motion.",
      url: "https://github.com/sagarmehta/pebble-ui",
      tags: ["React", "TypeScript", "Framer Motion", "Storybook"],
    },
    {
      id: "2", source: "github", included: true, display_order: 2,
      title: "Logboard",
      description:
        "Real-time analytics dashboard for micro-SaaS founders. Built with Next.js, WebSockets, and Recharts. 400+ GitHub stars.",
      url: "https://github.com/sagarmehta/logboard",
      tags: ["Next.js", "WebSocket", "Recharts", "Supabase"],
    },
    {
      id: "3", source: "github", included: true, display_order: 3,
      title: "Motionkit",
      description:
        "Declarative animation toolkit for React. Write spring physics and gesture interactions in 3 lines. Zero dependencies beyond Framer Motion.",
      url: "https://github.com/sagarmehta/motionkit",
      tags: ["React", "Framer Motion", "TypeScript"],
    },
    {
      id: "4", source: "github", included: true, display_order: 4,
      title: "Paletto",
      description:
        "AI-powered colour palette generator for design systems. Input a brand hex, get a full accessible token set in seconds.",
      url: "https://github.com/sagarmehta/paletto",
      tags: ["Next.js", "OpenAI", "Tailwind", "WCAG"],
    },
  ],

  education: [
    {
      degree: "B.E., Information Technology",
      institution: "BITS Pilani",
      year: "2021",
      gpa: "8.4",
    },
  ],
};
