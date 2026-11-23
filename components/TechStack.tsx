"use client";

import React, { useRef } from "react";
import {
  siLaravel,
  siJavascript,
  siTypescript,
  siReact,
  siNodedotjs,
  siMysql,
  siTailwindcss,
  siNextdotjs,
  siPhp,
  siGit,
  siGithub,
  siPostman,
} from "simple-icons";
import { techList } from "@/data/tech";
import type { TechItem } from "@/data/tech";

/**
 * Komponen render logo resmi 100% akurat sesuai brand guidelines:
 * - Laravel: Vektor resmi Simple Icons (FF2D20)
 * - HTML5: W3C Official Dual-Tone Orange Shield dengan angka 5
 * - CSS3: W3C Official Dual-Tone Blue Shield dengan angka 3
 * - JavaScript: Vektor resmi Simple Icons tile kuning dengan JS asli (F7DF1E)
 * - Python: Vektor resmi dua warna (Ular biru #3776AB & Ular kuning #FFD43B)
 * - React: Vektor resmi Simple Icons atom cyan (61DAFB)
 * - TypeScript: Vektor resmi Simple Icons tile biru dengan TS asli (3178C6)
 * - Node.js: Vektor resmi Simple Icons hexagon hijau (5FA04E)
 * - MySQL: Vektor resmi Simple Icons lumba-lumba asli (4479A1)
 * - Tailwind, Next.js, PHP, Git, GitHub, Figma, Postman dengan warna & vektor resmi.
 */
function AuthenticTechLogo({ type }: { type: string }) {
  const iconClass = "w-14 h-14 md:w-16 md:h-16";

  switch (type) {
    case "laravel":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#FF2D20">
          <path d={siLaravel.path} />
        </svg>
      );

    case "html5":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0z" fill="#E34F26" />
          <path d="M12 2.195v19.645l6.73-1.915L20.35 2.195H12z" fill="#EF652A" />
          <path
            d="M12 10.428h4.28l-.307 3.447-3.973 1.073v3.547l6.574-1.824.92-10.341H12v4.098zm0-6.894v3.447h7.623l.307-3.447H12zM4.07 3.534l.92 10.341H12V10.43H7.72l-.307-3.447H12V3.534H4.07zm4.39 9.347l.213 2.385 3.327.899v3.547l-6.574-1.824-.42-4.708h3.454z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "css3":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0z" fill="#1572B6" />
          <path d="M12 2.195v19.645l6.73-1.915L20.35 2.195H12z" fill="#33A9DC" />
          <path
            d="M12 10.428H7.72l-.307-3.447H12V3.534H4.07l.92 10.341H12v-3.447zm0 5.466l-3.327-.899-.213-2.385H5.006l.42 4.708 6.574 1.824V15.894zm0-2.02v-3.447h4.088l.307-3.447H12V3.534h7.93l-.92 10.341H12zm0 5.467v-3.447l3.327-.899.32-3.582h3.454l-.627 7.028-6.474 1.9z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#F7DF1E">
          <path d={siJavascript.path} />
        </svg>
      );

    case "python":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none">
          <path
            d="M11.91 0C5.8 0 6.18 2.64 6.18 2.64l.01 2.74h5.84v.83H3.8S0 5.75 0 11.89c0 6.13 3.32 5.92 3.32 5.92h1.98v-2.77s-.11-3.32 3.25-3.32h5.62s3.14.05 3.14-3.06V3.06S17.84 0 11.91 0zm-3.23 1.83c.61 0 1.11.5 1.11 1.11 0 .62-.5 1.12-1.11 1.12-.62 0-1.12-.5-1.12-1.12 0-.61.5-1.11 1.12-1.11z"
            fill="#3776AB"
          />
          <path
            d="M12.09 24c6.11 0 5.73-2.64 5.73-2.64l-.01-2.74h-5.84v-.83h8.23S24 18.25 24 12.11c0-6.13-3.32-5.92-3.32-5.92h-1.98v2.77s.11 3.32-3.25 3.32h-5.62s-3.14-.05-3.14 3.06v5.6s-.53 3.06 5.4 3.06zm3.23-1.83c-.61 0-1.11-.5-1.11-1.11 0-.62.5-1.12 1.11-1.12.62 0 1.12.5 1.12 1.12 0 .61-.5 1.11-1.12 1.11z"
            fill="#FFD43B"
          />
        </svg>
      );

    case "react":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#61DAFB">
          <path d={siReact.path} />
        </svg>
      );

    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#3178C6">
          <path d={siTypescript.path} />
        </svg>
      );

    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#5FA04E">
          <path d={siNodedotjs.path} />
        </svg>
      );

    case "mysql":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#4479A1">
          <path d={siMysql.path} />
        </svg>
      );

    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#06B6D4">
          <path d={siTailwindcss.path} />
        </svg>
      );

    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#16231C">
          <path d={siNextdotjs.path} />
        </svg>
      );

    case "php":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#777BB4">
          <path d={siPhp.path} />
        </svg>
      );

    case "git":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#F03C2E">
          <path d={siGit.path} />
        </svg>
      );

    case "github":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#16231C">
          <path d={siGithub.path} />
        </svg>
      );

    case "figma":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none">
          <path d="M8 12C5.79 12 4 10.21 4 8C4 5.79 5.79 4 8 4H12V12H8Z" fill="#F24E1E" />
          <path d="M12 4H16C18.21 4 20 5.79 20 8C20 10.21 18.21 12 16 12H12V4Z" fill="#FF7262" />
          <path d="M12 12H16C18.21 12 20 13.79 20 16C20 18.21 18.21 20 16 20C13.79 20 12 18.21 12 16V12Z" fill="#1ABCFE" />
          <path d="M8 20C5.79 20 4 18.21 4 16C4 13.79 5.79 12 8 12H12V16C12 18.21 10.21 20 8 20Z" fill="#0ACF83" />
          <circle cx="8" cy="8" r="4" fill="#F24E1E" />
          <circle cx="16" cy="8" r="4" fill="#FF7262" />
          <circle cx="8" cy="16" r="4" fill="#0ACF83" />
          <circle cx="16" cy="16" r="4" fill="#1ABCFE" />
          <circle cx="12" cy="12" r="4" fill="#A259FF" />
        </svg>
      );

    case "postman":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#FF6C37">
          <path d={siPostman.path} />
        </svg>
      );

    default:
      return null;
  }
}

function TechCard({ item }: { item: TechItem }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center group cursor-pointer">
      {/* Kartu Kotak Bersudut Halus (Rounded Card Sesuai Referensi Gambar) */}
      <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl md:rounded-3xl bg-[#F8F9FA] border border-[rgba(15,23,42,0.08)] flex items-center justify-center p-4 sm:p-5 shadow-xs transition-all duration-300 ease-out group-hover:-translate-y-2.5 group-hover:shadow-lg group-hover:border-[#9A7B38] group-hover:bg-[#FFFFFF]">
        <AuthenticTechLogo type={item.iconType} />
      </div>

      {/* Label Nama Teknologi di bawah kartu (15-17px / 16-18px) */}
      <span className="mt-3 type-meta font-medium text-fg/90 group-hover:text-[#0F172A] transition-colors text-center tracking-tight">
        {item.name}
      </span>
    </div>
  );
}

export default function TechStack() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Duplikasi list 3 kali untuk putaran carousel panjang, mulus, dan tanpa henti
  const marqueeItems = [...techList, ...techList, ...techList];

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const offset = direction === "left" ? -350 : 350;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section id="stack" aria-label="Technology and Tools" className="py-24 md:py-32 hairline-top overflow-hidden bg-[#FFFFFF]">
      <div className="editorial-container mb-8 md:mb-14">
        {/* Header Seksi Persis Sesuai Gambar Referensi */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="type-label text-[#856404]">
              TECHNOLOGY
            </p>
            <h2 className="type-heading text-fg font-light">
              Technology &amp; Tools
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="type-meta text-muted hidden sm:inline-block">
              {techList.length} Core Technologies &middot; Production Ready
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full hairline-frame flex items-center justify-center text-fg hover:border-[#9A7B38] hover:text-[#0F172A] hover:bg-[#F8F9FA] transition-colors text-base"
                aria-label="Scroll left"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full hairline-frame flex items-center justify-center text-fg hover:border-[#9A7B38] hover:text-[#0F172A] hover:bg-[#F8F9FA] transition-colors text-base"
                aria-label="Scroll right"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track dengan Animasi Meluncur Otomatis */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto no-scrollbar py-4 sm:py-6 select-none touch-pan-x"
        tabIndex={0}
        aria-label="Technology tools slider"
      >
        <div className="tech-carousel-track gap-4 sm:gap-6 md:gap-7 px-[var(--gutter)]">
          {marqueeItems.map((item, index) => (
            <TechCard key={`${item.name}-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* Petunjuk Interaksi Halus di Bawah Slider */}
      <div className="editorial-container mt-6 sm:mt-8">
        <div className="p-4 sm:p-5 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#F4F6F8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-muted">
          <span className="type-label text-muted">
            &larr; Hover to pause &middot; Drag to explore &rarr;
          </span>
          <span className="type-label text-[#856404]">
            React &middot; Laravel &middot; TypeScript &middot; Node.js &middot; MySQL &middot; Python
          </span>
        </div>
      </div>
    </section>
  );
}
