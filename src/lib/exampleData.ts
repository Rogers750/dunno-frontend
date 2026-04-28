import type { GeneratedContent } from "@/lib/api";

export const EXAMPLE_NAME     = "Sagar Mehta";
export const EXAMPLE_USERNAME = "sagarmehta";

export const EXAMPLE_CONTENT: GeneratedContent = {
  personal: {
    name: "Sagar Mehta",
    title: "Senior Frontend Engineer",
    bio:
      "Product-minded engineer with 4 years building consumer-facing products at scale. " +
      "I've shipped features used by 20M+ users, led a design system adopted across 6 teams, " +
      "and grown a checkout conversion rate by 18% through relentless iteration.",
    location: "Bengaluru, India",
    email: "sagar@example.com",
    phone: "",
    website: "https://dunnoai.com/sagarmehta",
  },

  social: {
    github: "https://github.com/sagarmehta",
    linkedin: "https://linkedin.com/in/sagarmehta",
    twitter: "",
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
      role: "Senior Frontend Engineer",
      company: "CRED",
      duration: "2023 – Present",
      description: "",
      highlights: [
        "Led redesign of the rewards discovery surface — increased weekly active engagement by 32%.",
        "Built and owns the internal design-token system adopted by 6 product squads.",
        "Reduced first-contentful-paint from 3.4s to 1.1s on the home feed through bundle splitting and lazy hydration.",
      ],
    },
    {
      role: "UI Engineer",
      company: "Razorpay",
      duration: "2022 – 2023",
      description: "",
      highlights: [
        "Shipped the new checkout v2 flow — A/B tested against 4M monthly transactions, lifted conversion by 18%.",
        "Built accessible, animated component library (42 components) used across Dashboard and Magic Checkout.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Meesho",
      duration: "2021 – 2022",
      description: "",
      highlights: [
        "Owned the seller onboarding web app serving 500K+ new sellers per quarter.",
        "Reduced form drop-off by 27% through UX improvements and smart field validation.",
      ],
    },
    {
      role: "Frontend Intern",
      company: "Groww",
      duration: "2020 – 2021",
      description: "",
      highlights: [
        "Built SIP calculator used by 1M+ users.",
        "Implemented real-time portfolio chart with sub-100ms update latency.",
      ],
    },
  ],

  skills: [
    { category: "Languages",   items: ["TypeScript", "JavaScript", "HTML", "CSS", "Python"] },
    { category: "Frameworks",  items: ["React", "Next.js", "React Native", "Framer Motion", "Vite"] },
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
      degree: "B.E., Information Technology",
      institution: "BITS Pilani",
      duration: "2017 – 2021",
    },
  ],
};
