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
  type: "work" | "education" | "internship" | "Internship";
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
    period: "2025",
    role: "Cyber Defense Incident Responder",
    organization: "Komdigi",
    location: "Surabaya, Indonesia",
    note: "Monitor security alerts and detect potential threats using SIEM tools and intrusion detection systems. Investigate, analyze, and contain security incidents such as malware infections, phishing attacks, and unauthorized access.",
    type: "Internship",
  },
  {
    period: "2022 — 2026",
    role: "Informatics",
    organization: "Telkom University (TelU)",
    location: "Surabaya, Indonesia",
    note: "Focused on web development, software engineering, and responsive interactive web applications.",
    type: "education",
  },
];
