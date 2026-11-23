export interface ServiceItem {
  index: string;
  title: string;
  scope: string;
  capabilities: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  note: string;
  type: "work" | "education";
}

export const services: ServiceItem[] = [
  {
    index: "01",
    title: "Art Direction & Interface Design",
    scope: "Editorial systems, typographic hierarchy, and visual pacing for studios and cultural brands. [GANTI]",
    capabilities: [
      "Brand-to-Web Translation",
      "12-Column Editorial Grids",
      "Design Tokens & Systems",
      "Art-Directed Prototyping",
    ],
  },
  {
    index: "02",
    title: "Creative Frontend Engineering",
    scope: "Production Next.js and TypeScript builds tuned for crisp typography, speed, and accessibility. [GANTI]",
    capabilities: [
      "Next.js App Router",
      "Strict TypeScript",
      "Component Architecture",
      "Core Web Vitals Optimization",
    ],
  },
  {
    index: "03",
    title: "Motion & Interaction Choreography",
    scope: "Restrained scroll pacing, page transitions, and micro-interactions that serve the narrative. [GANTI]",
    capabilities: [
      "GSAP & ScrollTrigger",
      "Lenis Smooth Scrolling",
      "Page Curtain Transitions",
      "Reduced-Motion Fallbacks",
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    period: "2024 — Present",
    role: "Independent Creative Developer & Art Director [GANTI]",
    organization: "Arga Pradipta Studio",
    location: "Surabaya, Indonesia",
    note: "Leading design and frontend architecture for architecture firms, design publications, and independent product teams. [GANTI]",
    type: "work",
  },
  {
    period: "2022 — 2024",
    role: "Senior Frontend Developer [GANTI]",
    organization: "Biro Visual Nusantara",
    location: "Jakarta (Remote)",
    note: "Built editorial flagships and reusable design systems across 14 studio launches with a strict 95+ Lighthouse baseline. [GANTI]",
    type: "work",
  },
  {
    period: "2020 — 2022",
    role: "UI/UX Designer & Frontend Engineer [GANTI]",
    organization: "Karya Digital Collective",
    location: "Surabaya, Indonesia",
    note: "Bridged visual design and React implementation for hospitality and cultural clients across Southeast Asia. [GANTI]",
    type: "work",
  },
  {
    period: "2022 — 2026",
    role: "informatic",
    organization: "Telkom University (TelU)",
    location: "Surabaya, Indonesia",
    note: "Thesis on Swiss typographic grids adapted for fluid digital editorial interfaces. [GANTI]",
    type: "education",
  },
];
