"use client";

import { siteProfile } from "@/data/site";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(255,255,255,0.12)] py-12 sm:py-16 bg-[#0F172A] text-[#94A3B8] overflow-hidden w-full max-w-full">
      <div className="editorial-container space-y-10 sm:space-y-14">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-8">
          <div>
            <p className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FFFFFF] font-light">
              {siteProfile.name}
            </p>
            <p className="type-label text-[#D4AF37] mt-3 text-[16px] sm:text-[17px]">
              {siteProfile.role}
            </p>
            <p className="text-[18px] sm:text-[19px] text-[#CBD5E1] mt-3 max-w-lg leading-relaxed">
              Designed with editorial restraint. No templates, no artificial noise.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="type-btn min-h-[52px] px-7 py-4 text-[16px] sm:text-[17px] border border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.06)] text-[#FFFFFF] font-semibold rounded-xl hover:bg-[#FFFFFF] hover:text-[#0F172A] hover:border-[#FFFFFF] shadow-xs transition-colors"
              aria-label="Back to top of page"
            >
              BACK TO TOP &uarr;
            </button>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.12)] pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[16px] sm:text-[17px] font-medium uppercase tracking-[0.08em] text-[#CBD5E1]">
            &copy; {currentYear} Mochamad Elang Samudra. All rights reserved.
          </p>
          <div className="text-[16px] lg:text-[18px] font-medium uppercase tracking-[0.08em] text-[#94A3B8] flex flex-wrap items-center gap-4 sm:gap-6">
            <span>Next.js 15 &middot; GSAP &middot; Lenis</span>
            <span className="text-[#CBD5E1]">Surabaya, Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
