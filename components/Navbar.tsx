"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { siteProfile } from "@/data/site";
import { CURTAIN_EASE } from "@/lib/motion";
import { useLenis } from "@/components/providers/LenisProvider";
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

function useLocalTime(timeZone: string): string {
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
  return time;
}

export default function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { navigate } = usePageTransition();
  const localTime = useLocalTime(siteProfile.timezone);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  // Deteksi section aktif berdasarkan posisi scroll
  useEffect(() => {
    if (pathname.startsWith("/work")) {
      setActiveId("work");
      return;
    }

    const updateActiveSection = () => {
      if (window.scrollY < 220) {
        setActiveId("");
        return;
      }

      const threshold = window.innerHeight * 0.38;
      let current = "";

      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom >= 100) {
          current = link.id;
          break;
        }
        if (rect.top <= threshold) {
          current = link.id;
        }
      }

      setActiveId(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  // Navbar otomatis mengecil atau bersembunyi saat scroll cepat ke bawah, muncul saat scroll ke atas
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 180);
    setScrolled(latest > 30);
  });

  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    document.documentElement.classList.toggle("is-loading", menuOpen);
  }, [menuOpen, lenis]);

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
    if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.2, force: true });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  const activeLabel = navLinks.find((l) => l.id === activeId)?.label || "Home";

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: CURTAIN_EASE }}
        className={`fixed inset-x-0 top-0 z-40 flex items-center transition-[background-color,height,border-color,box-shadow] duration-300 ${
          scrolled && !menuOpen
            ? "h-16 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[rgba(15,23,42,0.08)] shadow-[0_4px_24px_-8px_rgba(15,23,42,0.06)]"
            : "h-16 md:h-20 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="editorial-container flex items-center justify-between gap-4 sm:gap-6">
          {/* Logo Monogram — 30-34px, label >= 16px */}
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
                  className={`nav-pill group relative flex items-center gap-2 h-10 px-3.5 rounded-full text-[15px] xl:text-[16px] font-semibold uppercase tracking-[0.07em] transition-all duration-300 ${
                    isActive
                      ? "nav-pill-active bg-[#0F172A] text-[#FFFFFF] shadow-sm"
                      : "text-[#526071] hover:text-[#0F172A] hover:bg-[#F4F6F8]"
                  }`}
                >
                  {isActive && (
                    <span
                      className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span>{link.label}</span>
                  {!isActive && (
                    <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] scale-x-0 bg-[#9A7B38] transition-transform duration-300 ease-out origin-left group-hover:scale-x-100" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Status & Jam Surabaya Ringkas (Pill 16-18px, padding 10px 22px, single line) */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-2.5 py-2.5 px-5 rounded-full bg-[#F8F9FA] border border-[rgba(15,23,42,0.08)] whitespace-nowrap text-[clamp(16px,0.2vw+15px,18px)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9A7B38] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9A7B38]" />
              </span>
              <span className="font-semibold tracking-wide text-fg/90">
                Available
              </span>
              <span className="text-border">/</span>
              <span className="font-mono text-muted tabular-nums font-medium">
                {localTime || "--:-- WIB"}
              </span>
            </div>
          </div>

          {/* Indikator Halaman Aktif + Tombol Menu Hamburger untuk Layar < 1024px */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="nav-pill-active inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F172A] text-[#FFFFFF] text-[12px] sm:text-[13px] font-semibold uppercase tracking-wider shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
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
      </motion.header>

      {/* Menu Overlay Layar Penuh untuk Mobile & Tablet (< 1024px) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            key="mobile-menu"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: CURTAIN_EASE }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-[#FFFFFF] px-[var(--gutter)] pb-8 pt-24 overflow-y-auto lg:hidden"
          >
            <motion.nav
              aria-label="Mobile navigation"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } },
                hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
              className="flex flex-col my-auto"
            >
              {navLinks.map((link, index) => {
                const isActive = activeId === link.id;
                return (
                  <div key={link.id} className="overflow-hidden border-b border-[rgba(15,23,42,0.08)]">
                    <motion.a
                      href={`/#${link.id}`}
                      onClick={goTo(link.id)}
                      variants={{
                        hidden: { y: "110%" },
                        show: { y: "0%", transition: { duration: 0.7, ease: CURTAIN_EASE } },
                      }}
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
                    </motion.a>
                  </div>
                );
              })}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="space-y-4 border-t border-[rgba(15,23,42,0.08)] pt-6 text-[17px] mt-6"
            >
              <div className="flex items-center justify-between type-label text-muted">
                <span>{siteProfile.location}</span>
                <span className="text-[#0F172A] font-mono tabular-nums">{localTime}</span>
              </div>
              <a
                href={`mailto:${siteProfile.email}`}
                className="block font-serif text-2xl sm:text-3xl text-fg hover:text-[#0F172A] transition-colors break-all"
              >
                {siteProfile.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
