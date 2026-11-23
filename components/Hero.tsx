"use client";

import { useRef } from "react";
import Image from "next/image";
import { siGithub } from "simple-icons";
import { gsap, SplitText, useGSAP, FULL_MOTION } from "@/lib/gsap";
import { useIntro } from "@/components/providers/IntroProvider";
import { siteProfile } from "@/data/site";

/**
 * Authentic Brand Icons:
 * - LinkedIn: Official LinkedIn Blue (#0A66C2) with white 'in'
 * - Instagram: Official Authentic Instagram Multi-color Gradient
 * - GitHub: Official GitHub Octocat (#181717)
 */
function LinkedInIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="4.5" fill="#0A66C2" />
      <path
        d="M6.94 5a1.94 1.94 0 1 1 0 3.88 1.94 1.94 0 0 1 0-3.88zM5.22 10.15h3.44V20H5.22V10.15zM10.75 10.15h3.3v1.35h.05c.46-.87 1.58-1.79 3.25-1.79 3.48 0 4.12 2.29 4.12 5.27V20h-3.44v-4.5c0-1.07-.02-2.45-1.49-2.45-1.5 0-1.72 1.17-1.72 2.37V20h-3.47V10.15z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <defs>
        <radialGradient id="ig-hero-brand-gradient" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#ig-hero-brand-gradient)" />
      <path
        d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0z"
        fill="#FFFFFF"
      />
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.8" stroke="#FFFFFF" strokeWidth="1.8" />
    </svg>
  );
}

function GitHubIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#181717">
      <path d={siGithub.path} />
    </svg>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { introDone } = useIntro();

  useGSAP(
    () => {
      if (!introDone || !root.current) return;
      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        const title = root.current?.querySelector<HTMLElement>("[data-hero-title]");
        const tagline = root.current?.querySelector<HTMLElement>("[data-hero-tagline]");
        if (!title || !tagline) return;

        // Mask reveal per huruf untuk nama, per baris untuk tagline
        const titleSplit = SplitText.create(title, { type: "lines,chars", mask: "lines" });
        const taglineSplit = SplitText.create(tagline, { type: "lines", mask: "lines" });

        gsap
          .timeline({
            defaults: { ease: "power4.out" },
            onComplete: () => {
              titleSplit.revert();
              taglineSplit.revert();
            },
          })
          .from("[data-hero-rule]", { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power4.inOut", stagger: 0.1 })
          .from("[data-hero-fade]", { y: 16, autoAlpha: 0, duration: 0.9, stagger: 0.06 }, 0.2)
          .from(titleSplit.chars, { yPercent: 115, duration: 1.15, stagger: 0.028 }, 0.15)
          .from(taglineSplit.lines, { yPercent: 110, duration: 1, stagger: 0.08 }, 0.75)
          .from("[data-hero-meta] > *", { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 0.95);

        // Nama bergerak lebih lambat dari scroll (parallax) saat keluar viewport
        gsap.to(title, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root, dependencies: [introDone] },
  );

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-12 pt-32 md:pt-36 bg-[#FFFFFF]"
    >
      <div className="editorial-container">
        <div data-hero-fade className="p-4 sm:p-5 rounded-xl bg-[#F4F6F8] border border-[rgba(15,23,42,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="type-label text-[#856404] text-[16px]">07°15′55″ S 112°45′02″ E</span>
            <span className="text-border">/</span>
            <span className="type-label text-muted text-[16px]">{siteProfile.location}</span>
          </div>
          <p className="type-label text-muted text-[16px]">
            Portfolio &middot; Edition 2026
          </p>
        </div>
      </div>

      <div className="editorial-container my-auto py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Kolom Kiri: Role, Nama, Tagline, dan Aksi */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-7">
            <p data-hero-fade className="type-label tracking-[0.2em] text-[#0F172A] text-[16px] sm:text-[18px] font-bold">
              {siteProfile.role}
            </p>
            <h1 data-hero-title className="type-hero select-none text-fg will-change-transform break-words">
              {siteProfile.name}
            </h1>
            <p data-hero-tagline className="text-[clamp(24px,2.2vw,36px)] font-serif font-normal leading-[1.4] text-fg/90 max-w-2xl pt-1">
              {siteProfile.tagline}
            </p>

            {/* Social Profile Circles (LinkedIn, Instagram, GitHub) with authentic brand colors */}
            <div data-hero-fade className="pt-2 flex items-center gap-3.5">
              <a
                href={siteProfile.socials.find(s => s.label.toLowerCase() === "linkedin")?.href || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-13 h-13 min-w-[52px] min-h-[52px] rounded-full bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[rgba(15,23,42,0.12)] shadow-xs hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <LinkedInIcon className="w-6 h-6" />
              </a>
              <a
                href={siteProfile.socials.find(s => s.label.toLowerCase() === "instagram")?.href || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-13 h-13 min-w-[52px] min-h-[52px] rounded-full bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[rgba(15,23,42,0.12)] shadow-xs hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href={siteProfile.socials.find(s => s.label.toLowerCase() === "github")?.href || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-13 h-13 min-w-[52px] min-h-[52px] rounded-full bg-[#FFFFFF] hover:bg-[#F8FAFC] border border-[rgba(15,23,42,0.12)] shadow-xs hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <GitHubIcon className="w-6 h-6" />
              </a>
            </div>

            {/* 3 Main Action Pills in English & Soft White/Semi-Grey Palette */}
            <div data-hero-fade className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Contact Me (Primary Pill) */}
              <a
                href="#contact"
                className="type-btn min-h-[52px] px-8 py-3.5 text-[17px] sm:text-[18px] rounded-full bg-[#0F172A] text-[#FFFFFF] hover:bg-[#1E293B] shadow-sm hover:shadow-md transition-all duration-300 inline-flex items-center justify-center font-semibold"
              >
                Contact Me
              </a>

              {/* Download CV (Secondary Pill in Soft White-Grey) */}
              <a
                href="/cv.pdf"
                download="CV-Mochamad-Elang-Samudra.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="type-btn min-h-[52px] px-8 py-3.5 text-[17px] sm:text-[18px] rounded-full bg-[#FFFFFF] hover:bg-[#F4F6F8] text-[#0F172A] border border-[rgba(15,23,42,0.12)] shadow-xs hover:border-[rgba(15,23,42,0.24)] transition-all duration-300 inline-flex items-center justify-center font-semibold"
              >
                Download CV
              </a>

              {/* Send Email (Tertiary Pill in Soft White-Grey) */}
              <a
                href={`mailto:${siteProfile.email}`}
                className="type-btn min-h-[52px] px-8 py-3.5 text-[17px] sm:text-[18px] rounded-full bg-[#FFFFFF] hover:bg-[#F4F6F8] text-[#0F172A] border border-[rgba(15,23,42,0.12)] shadow-xs hover:border-[rgba(15,23,42,0.24)] transition-all duration-300 inline-flex items-center justify-center font-semibold"
              >
                Send Email
              </a>
            </div>

            {/* Quick Stats Counter: 4+ Projek | 2+ Tahun Pengalaman Coding */}
            <div
              data-hero-fade
              className="pt-6 mt-4 border-t border-[rgba(15,23,42,0.1)] flex items-center gap-8 sm:gap-14"
            >
              <div>
                <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#0F172A] tracking-tight">
                  4<span className="text-[#856404] font-normal">+</span>
                </p>
                <p className="text-[17px] sm:text-[18px] font-semibold text-[#526071] mt-1.5">
                  Projek
                </p>
              </div>
              <div className="h-14 w-px bg-[rgba(15,23,42,0.15)]" />
              <div>
                <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#0F172A] tracking-tight">
                  2<span className="text-[#856404] font-normal">+</span>
                </p>
                <p className="text-[17px] sm:text-[18px] font-semibold text-[#526071] mt-1.5">
                  Tahun Pengalaman Coding
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Foto Profil Editorial (Posisi seimbang lebih ke tengah) */}
          <div data-hero-fade className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-center items-center">
            <div className="relative aspect-[3/4] w-full max-w-[290px] sm:max-w-[340px] lg:max-w-[360px] overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC] shadow-xl group hover:shadow-2xl transition-all duration-500">
              <Image
                src="/images/fotoformal.jpg"
                alt={siteProfile.portraitAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 p-4 rounded-xl bg-[#FFFFFF]/95 backdrop-blur-md border border-[rgba(15,23,42,0.08)] flex justify-between items-center shadow-xs">
                <div>
                  <p className="type-label text-fg font-bold text-[17px]">{siteProfile.name}</p>
                  <p className="text-[15px] font-mono uppercase tracking-wider text-[#856404] font-semibold">{siteProfile.role}</p>
                </div>
                <span className="type-label text-[#856404] font-semibold text-[16px]">Surabaya, ID</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="editorial-container">
        <div data-hero-rule className="h-px w-full bg-[rgba(15,23,42,0.08)] mb-6" />
        <div data-hero-meta className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          <div className="p-4 sm:p-5 rounded-xl bg-[#F4F6F8] border border-[rgba(15,23,42,0.08)] hover:bg-[#EEF2F6] transition-colors">
            <p className="type-label text-[#856404] text-[16px]">Specialization</p>
            <p className="mt-2 text-[clamp(21px,0.4vw+20px,25px)] font-bold text-fg/90">Full-Stack Web</p>
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-[#F4F6F8] border border-[rgba(15,23,42,0.08)] hover:bg-[#EEF2F6] transition-colors">
            <p className="type-label text-[#856404] text-[16px]">Availability</p>
            <p className="mt-2 text-[clamp(21px,0.4vw+20px,25px)] font-bold text-fg/90">{siteProfile.availability.status}</p>
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-[#F4F6F8] border border-[rgba(15,23,42,0.08)] hover:bg-[#EEF2F6] transition-colors">
            <p className="type-label text-[#856404] text-[16px]">Focus</p>
            <p className="mt-2 text-[clamp(21px,0.4vw+20px,25px)] font-bold text-fg/90">React &middot; Laravel &middot; Node</p>
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-[#F4F6F8] border border-[rgba(15,23,42,0.08)] hover:bg-[#EEF2F6] transition-colors">
            <p className="type-label text-[#856404] text-[16px]">Scroll Index</p>
            <p className="mt-2 text-[clamp(21px,0.4vw+20px,25px)] font-bold text-fg/90">01 &mdash; 08</p>
          </div>
        </div>
      </div>
    </section>
  );
}
