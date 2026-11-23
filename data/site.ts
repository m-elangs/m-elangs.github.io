export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface SiteProfile {
  name: string;
  monogram: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  timezone: string;
  availability: {
    status: string;
    available: boolean;
  };
  email: string;
  portraitAlt: string;
  siteUrl: string;
  socials: SocialLink[];
  marqueeItems: string[];
}

/**
 * Semua field bertanda [GANTI] adalah placeholder realistis.
 * Ubah isi file ini untuk memperbarui identitas di seluruh situs.
 */
export const siteProfile: SiteProfile = {
  name: "Mochamad Elang Samudra",
  monogram: "EL",
  role: "Web Developer",
  tagline: "From Concept to Code, Bringing Ideas to Life.",
  bio: "I'm a Web Developer with a background in Informatics, focused on building web applications using React.js, Laravel, TypeScript, and Node.js. I have an interest in developing reliable front-end and back-end solutions, with an emphasis on clean code, practical functionality, and maintainable systems.  I value continuous learning, problem-solving, and collaboration. I'm looking to grow as a developer while contributing to projects that deliver real value to users and businesses.",
  location: "Surabaya, Indonesia",
  timezone: "Asia/Jakarta",
  availability: {
    status: "Available for commissions",
    available: true,
  },
  email: "elangsamudra660@gmail.com",
  portraitAlt: "Monochrome editorial portrait of Mochamad Elang Samudra",
  siteUrl: "https://elangsamudra.studio",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mochamad-elang-samudra-0489532b7",
      handle: "in/mochamad-elang-samudra",
    },
    {
      label: "GitHub",
      href: "https://github.com/m-elangs",
      handle: "@m-elangs",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/m.elangs?dmpr=Y3l1ZjJpNDk3cmhv",
      handle: "@m.elangs",
    },
  ],
  marqueeItems: [
    "Art Direction",
    "Editorial Web",
    "Design Systems",
    "Motion Choreography",
    "Frontend Architecture",
    "Type-Driven UI",
    "Creative Development",
  ],
};
