export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  index: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  category: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  deliverables: string[];
  liveUrl: string;
  coverImage: string;
  coverAlt: string;
  galleryImages: {
    src: string;
    alt: string;
    caption: string;
  }[];
  metrics: ProjectMetric[];
}

/**
 * Ganti proyek di bawah dengan karya asli Anda (3-6 proyek unggulan).
 * Gambar sementara akan dibuat pada Tahap 2 sebagai aset lokal ringan.
 */
export const projects: ProjectItem[] = [
  {
    index: "01",
    slug: "kravo",
    title: "KRAVO",
    client: "KRAVO Snack Premium",
    year: "2025",
    role: "Full-Stack Web Developer & System Architect",
    category: "Hybrid E-Commerce (B2B & B2C)",
    summary:
      "Platform e-commerce modern dan terintegrasi untuk produsen makanan ringan (snack) kemasan premium. Dirancang dengan model Hybrid (B2C & B2B) serta fitur khusus pengelolaan rantai pasok pangan berbasis FEFO (First Expired, First Out), menghubungkan pembeli eceran langsung, mitra reseller/grosir, dan operasional staf gudang dalam satu sistem terpadu.",
    challenge:
      "Mengintegrasikan kebutuhan dua segmen pasar berbeda (konsumen eceran B2C dan mitra grosir B2B) sekaligus memastikan rotasi stok produk pangan terkelola secara otomatis dan akurat melalui aturan FEFO guna mencegah kerugian akibat kedaluwarsa barang.",
    approach:
      "Membangun arsitektur decoupled menggunakan SPA React.js v18 (Vite, Tailwind CSS, Lucide React, Axios) pada sisi frontend dan RESTful API Laravel 10 (Sanctum, Eloquent ORM, MySQL) pada sisi backend. Mengintegrasikan payment gateway Midtrans Snap JS untuk transaksi instan serta modul inventaris cerdas untuk pelacakan batch kedaluwarsa.",
    outcome:
      "Mengotomatisasi pemrosesan pesanan multi-tier (retail & grosir), meniadakan risiko kedaluwarsa stok lewat otomasi FEFO, mengamankan transaksi dengan Midtrans Payment Gateway, dan mempercepat alur distribusi produk secara real-time.",
    deliverables: [
      "React.js",
      "Laravel 10",
      "Tailwind CSS",
      "MySQL",
      "REST API",
      "Midtrans",
    ],
    liveUrl: "#",
    coverImage: "/images/kravo1.png",
    coverAlt: "Tampilan website e-commerce KRAVO",
    galleryImages: [
      {
        src: "/images/kravo1.png",
        alt: "KRAVO Beranda & Katalog Produk",
        caption: "Slide 01 — Beranda E-Commerce & Katalog Produk Premium KRAVO",
      },
      {
        src: "/images/kravo2.png",
        alt: "KRAVO Detail Produk & Order",
        caption: "Slide 02 — Detail Produk & Opsi Pembelian Eceran / Grosir",
      },
      {
        src: "/images/kravo3.png",
        alt: "KRAVO Checkout & Midtrans",
        caption: "Slide 03 — Alur Checkout Terintegrasi Midtrans Snap JS",
      },
      {
        src: "/images/kravo4.png",
        alt: "KRAVO Manajemen Inventaris FEFO",
        caption: "Slide 04 — Dashboard Manajemen Inventaris & Batch Kedaluwarsa FEFO",
      },
      {
        src: "/images/kravo5.png",
        alt: "KRAVO Portal Mitra & Admin",
        caption: "Slide 05 — Portal Mitra Reseller / B2B & Manajemen Pesanan Terpadu",
      },
    ],
    metrics: [
      { label: "Model", value: "Hybrid B2B & B2C" },
      { label: "Inventory", value: "FEFO Automation" },
      { label: "Payment", value: "Midtrans Snap" },
    ],
  },
  {
    index: "02",
    slug: "atelier-surya-ceramics",
    title: "Atelier Surya [GANTI]",
    client: "Surya Object Studio, Bali [GANTI]",
    year: "2025",
    role: "Creative Development",
    category: "Object & Craft Flagship",
    summary:
      "Quiet digital showroom for hand-thrown stoneware vessels, centred on tactile photography and unhurried browsing. [GANTI]",
    challenge:
      "Translating the weight and glaze texture of physical ceramics into an online catalogue without resorting to noisy e-commerce patterns. [GANTI]",
    approach:
      "Paired oversized serif titles with sparse technical metadata—clay origin, firing temperature, and edition number—set against deep charcoal surfaces. [GANTI]",
    outcome:
      "First seasonal collection of 120 numbered pieces sold through private inquiry within 72 hours. [GANTI]",
    deliverables: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
    liveUrl: "https://example.com/atelier-surya",
    coverImage: "/images/work-surya.svg",
    coverAlt: "Hand-thrown matte stoneware vessel under directional studio light [GANTI]",
    galleryImages: [
      {
        src: "/images/work-surya.svg",
        alt: "Atelier Surya collection spread [GANTI]",
        caption: "Slide 01 — Main Digital Showroom & Edition Listing",
      },
      {
        src: "/images/work-karsa-detail.svg",
        alt: "Atelier Surya ceramic specification view",
        caption: "Slide 02 — Technical Metadata & Ceramic Firing Specifications",
      },
      {
        src: "/images/work-nusa.svg",
        alt: "Atelier Surya private inquiry checkout flow",
        caption: "Slide 03 — Private Collector Inquiry & Archive Preview",
      },
    ],
    metrics: [
      { label: "Edition Sold", value: "72 hrs" },
      { label: "LCP", value: "0.9s" },
      { label: "Year", value: "2025" },
    ],
  },
  {
    index: "03",
    slug: "nusa-type-foundry",
    title: "Nusa Type Foundry [GANTI]",
    client: "Nusa Collective, Bandung [GANTI]",
    year: "2025",
    role: "Lead UI Engineer & Interaction Design",
    category: "Type Specimen Platform",
    summary:
      "Interactive specimen library and licensing storefront for an independent Southeast Asian typeface foundry. [GANTI]",
    challenge:
      "Designers needed to test optical sizes, diacritics, and variable axes immediately without heavy client bundles slowing down live typing. [GANTI]",
    approach:
      "Engineered a zero-layout-shift specimen tester with variable font subsetting, custom keyboard shortcuts, and stark black-and-bone contrast. [GANTI]",
    outcome:
      "Featured in two international typography annuals and doubled direct studio license orders quarter-over-quarter. [GANTI]",
    deliverables: [
      "TypeScript",
      "React.js",
      "CSS Variables",
      "Web Fonts API",
    ],
    liveUrl: "https://example.com/nusa-foundry",
    coverImage: "/images/work-nusa.svg",
    coverAlt: "High-contrast editorial serif specimen poster in black and bone white [GANTI]",
    galleryImages: [
      {
        src: "/images/work-nusa.svg",
        alt: "Nusa Type interactive specimen view [GANTI]",
        caption: "Slide 01 — Interactive Type Specimen & Live Glyph Tester",
      },
      {
        src: "/images/work-senyap.svg",
        alt: "Nusa Type variable axes inspector",
        caption: "Slide 02 — Variable Font Axis Controls & Optical Sizes",
      },
      {
        src: "/images/work-karsa-detail.svg",
        alt: "Nusa Type licensing storefront",
        caption: "Slide 03 — Studio Licensing Calculator & Specimen Poster",
      },
    ],
    metrics: [
      { label: "License Lift", value: "+118%" },
      { label: "Bundle Size", value: "68 KB" },
      { label: "Year", value: "2025" },
    ],
  },
  {
    index: "04",
    slug: "ruang-senyap-journal",
    title: "Ruang Senyap [GANTI]",
    client: "Senyap Cultural Press, Surabaya [GANTI]",
    year: "2024",
    role: "Art Direction & Full-Stack Build",
    category: "Editorial Publication",
    summary:
      "Biannual essays on Indonesian architecture, soundscapes, and print design, structured for slow long-form reading. [GANTI]",
    challenge:
      "Long essays with footnotes and archival plates often break rhythm on smaller screens and feel cramped on wide monitors. [GANTI]",
    approach:
      "Designed a responsive marginalia system where annotations sit cleanly in the outer columns on desktop and fold gracefully on mobile. [GANTI]",
    outcome:
      "Grew print-plus-digital readership to 14,000 subscribers across Jakarta, Surabaya, and Singapore. [GANTI]",
    deliverables: [
      "Next.js",
      "Laravel",
      "Tailwind CSS",
      "MySQL",
    ],
    liveUrl: "https://example.com/ruang-senyap",
    coverImage: "/images/work-senyap.svg",
    coverAlt: "Minimalist printed journal spread on dark stone surface [GANTI]",
    galleryImages: [
      {
        src: "/images/work-senyap.svg",
        alt: "Ruang Senyap reading view [GANTI]",
        caption: "Slide 01 — Long-Form Editorial Reading Spread & Marginalia",
      },
      {
        src: "/images/work-karsa.svg",
        alt: "Ruang Senyap archive index",
        caption: "Slide 02 — Biannual Issue Archive & Essay Index",
      },
      {
        src: "/images/work-surya.svg",
        alt: "Ruang Senyap mobile reading layout",
        caption: "Slide 03 — Responsive Footnote Drawer & Reader Mode",
      },
    ],
    metrics: [
      { label: "Subscribers", value: "14,000+" },
      { label: "Accessibility", value: "100 / 100" },
      { label: "Year", value: "2024" },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: ProjectItem;
  next: ProjectItem;
} {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const previousIndex = (safeIndex - 1 + projects.length) % projects.length;
  const nextIndex = (safeIndex + 1) % projects.length;

  return {
    previous: projects[previousIndex]!,
    next: projects[nextIndex]!,
  };
}
