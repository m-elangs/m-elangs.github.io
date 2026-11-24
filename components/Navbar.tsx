"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { siteProfile } from "@/data/site";
import { CURTAIN_EASE } from "@/lib/motion";
import { usePageTransition } from "@/components/providers/TransitionProvider";
import TransitionLink from "@/components/motion/TransitionLink";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Selected Work", id: "work" },
  { label: "Services", id: "services" },
  { label: "Stack", id: "stack" },
  { label: "Experience", id: "experience" },
  { label: "Credentials", id: "credentials" },
  { label: "Contact", id: "contact" },
];

function LocalTimeClock({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(`${format.format(new Date())} WIB`);
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return <>{time || "--:-- WIB"}</>;
}

export default function Navbar() {
  const pathname = usePathname();
  const { navigate } = usePageTransition();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const lastScrollY = useRef(0);

  // Zero-lag rAF-throttled scroll listener for instant Navbar show/hide & active section detection
  useEffect(() => {
    if (pathname.startsWith("/work")) {
      setActiveId("work");
    }

    let rafId: number | null = null;

    const updateOnScroll = () => {
      rafId = null;
      const currentY = window.scrollY;
      const prevY = lastScrollY.current;
      const delta = currentY - prevY;

      setScrolled(currentY > 24);

      if (currentY <= 120) {
        setHidden(false);
      } else if (delta > 6) {
        // Scrolling down
        setHidden(true);
      } else if (delta < -3) {
        // Scrolling up (instant show with zero delay)
        setHidden(false);
      }

      lastScrollY.current = currentY;

      if (pathname.startsWith("/work")) {
        return;
      }

      if (currentY < 200) {
        setActiveId((prev) => (prev !== "" ? "" : prev));
        return;
      }

      const threshold = window.innerHeight * 0.38;
      let currentSection = "";

      for (let i = 0; i < navLinks.length; i++) {
        const link = navLinks[i];
        if (!link) continue;
        const el = document.getElementById(link.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom >= 100) {
          currentSection = link.id;
          break;
        }
        if (rect.top <= threshold) {
          currentSection = link.id;
        }
      }

      setActiveId((prev) => (prev !== currentSection ? currentSection : prev));
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateOnScroll);
      }
    };

    updateOnScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-loading", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const goTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenuOpen(false);
    setActiveId(id);
    if (pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const activeLabel = navLinks.find((l) => l.id === activeId)?.label || "Home";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 flex items-center will-change-transform transition-transform duration-200 ease-out ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !menuOpen
            ? "h-16 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[rgba(15,23,42,0.08)] shadow-[0_4px_20px_-8px_rgba(15,23,42,0.06)]"
            : "h-16 md:h-20 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="editorial-container flex items-center justify-between gap-4 sm:gap-6">
          {/* Logo Monogram */}
          <TransitionLink
            href="/"
            className="group flex items-baseline gap-2.5 sm:gap-3 focus-visible:outline-[#9A7B38]"
            aria-label={`${siteProfile.name} — Home`}
          >
            <span className="font-serif text-[30px] md:text-[34px] font-normal tracking-tight text-fg transition-colors group-hover:text-[#0F172A] leading-none">
              {siteProfile.monogram}
            </span>
            <span className="type-label text-muted text-[16px]">
              Portfolio
            </span>
          </TransitionLink>

          {/* Desktop Navigation Links with Active Section Color Highlight */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={goTo(link.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-pill group relative flex items-center gap-2 h-10 px-3.5 rounded-full text-[15px] xl:text-[16px] font-semibold uppercase tracking-[0.07em] transition-colors duration-150 ${
                    isActive
                      ? "nav-pill-active bg-[#0F172A] text-[#FFFFFF] shadow-xs"
                      : "text-[#526071] hover:text-[#0F172A] hover:bg-[#F4F6F8]"
                  }`}
                >
                  {isActive && (
                    <span
                      className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span>{link.label}</span>
                  {!isActive && (
                    <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] scale-x-0 bg-[#9A7B38] transition-transform duration-200 ease-out origin-left group-hover:scale-x-100" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Status & Surabaya Time Pill */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-2.5 py-2.5 px-5 rounded-full bg-[#F8F9FA] border border-[rgba(15,23,42,0.08)] whitespace-nowrap text-[clamp(16px,0.2vw+15px,18px)]">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9A7B38]" />
              </span>
              <span className="font-semibold tracking-wide text-fg/90">
                Available
              </span>
              <span className="text-border">/</span>
              <span className="font-mono text-muted tabular-nums font-medium">
                <LocalTimeClock timeZone={siteProfile.timezone} />
              </span>
            </div>
          </div>

          {/* Active Page Indicator + Mobile Hamburger Button (< 1024px) */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="nav-pill-active inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F172A] text-[#FFFFFF] text-[12px] sm:text-[13px] font-semibold uppercase tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-[160px]">{activeLabel}</span>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center justify-center min-h-[44px] min-w-[44px] px-4 py-2 hairline-frame text-fg hover:border-[#9A7B38] hover:text-[#0F172A] transition-colors focus-visible:outline-[#9A7B38] type-btn bg-[#FFFFFF]"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Fullscreen Overlay Menu (< 1024px) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            key="mobile-menu"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: CURTAIN_EASE }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-[#FFFFFF] px-[var(--gutter)] pb-8 pt-24 overflow-y-auto lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col my-auto">
              {navLinks.map((link, index) => {
                const isActive = activeId === link.id;
                return (
                  <div key={link.id} className="overflow-hidden border-b border-[rgba(15,23,42,0.08)]">
                    <a
                      href={`/#${link.id}`}
                      onClick={goTo(link.id)}
                      className={`flex items-center justify-between py-3.5 px-3 rounded-xl font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight transition-colors ${
                        isActive
                          ? "bg-[#0F172A]/8 text-[#856404] font-semibold"
                          : "text-fg hover:text-[#0F172A]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {isActive && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#856404] shrink-0" />
                        )}
                        <span>{link.label}</span>
                      </span>
                      <span className="type-label text-[#856404]">
                        {isActive ? "ACTIVE" : String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </div>
                );
              })}
            </nav>

            <div className="space-y-4 border-t border-[rgba(15,23,42,0.08)] pt-6 text-[17px] mt-6">
              <div className="flex items-center justify-between type-label text-muted">
                <span>{siteProfile.location}</span>
                <span className="text-[#0F172A] font-mono tabular-nums">
                  <LocalTimeClock timeZone={siteProfile.timezone} />
                </span>
              </div>
              <a
                href={`mailto:${siteProfile.email}`}
                className="block font-serif text-2xl sm:text-3xl text-fg hover:text-[#0F172A] transition-colors break-all"
              >
                {siteProfile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
