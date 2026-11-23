"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useIntro } from "@/components/providers/IntroProvider";
import { useLenis } from "@/components/providers/LenisProvider";
import { siteProfile } from "@/data/site";

/** Counter 0 → 100 dengan tirai keluar (± 2.4 detik), bisa di-skip dengan klik / Esc / Enter. */
export default function Preloader() {
  const { finishIntro } = useIntro();
  const lenis = useLenis();
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        finishIntro();
        setDone(true);
        return;
      }

      document.documentElement.classList.add("is-loading");
      const counter = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("is-loading");
          setDone(true);
        },
      });

      tl.to(counter, {
        value: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
        },
      })
        .to("[data-preloader-bar]", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
        .from("[data-preloader-fade]", { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.08, ease: "power3.out" }, 0)
        .to("[data-preloader-inner]", { yPercent: -40, autoAlpha: 0, duration: 0.55, ease: "power3.in" })
        .add(finishIntro, "-=0.15")
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<");

      timeline.current = tl;
    },
    { scope: root },
  );

  useEffect(() => {
    if (!lenis) return;
    if (done) lenis.start();
    else lenis.stop();
  }, [lenis, done]);

  useEffect(() => {
    if (done) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") timeline.current?.timeScale(4);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col bg-[#FFFFFF] text-[#0F172A]"
    >
      <div data-preloader-inner className="editorial-container flex flex-1 flex-col justify-between py-8 md:py-10">
        <div className="flex items-center justify-between">
          <span data-preloader-fade className="font-serif text-[28px] md:text-[32px]">{siteProfile.monogram}</span>
          <button
            type="button"
            data-preloader-fade
            onClick={() => timeline.current?.timeScale(4)}
            className="type-btn text-[#526071] hover:text-[#0F172A] transition-colors min-h-[44px] flex items-center px-3"
          >
            Skip intro
          </button>
        </div>

        <div className="space-y-6">
          <p data-preloader-fade className="type-label text-[#0F172A]">
            {siteProfile.role} &middot; {siteProfile.location}
          </p>
          <div className="flex items-end justify-between gap-6">
            <p data-preloader-fade className="font-serif text-3xl md:text-5xl font-light max-w-xl leading-tight">
              {siteProfile.name}
            </p>
            <span
              ref={countRef}
              className="font-serif font-light leading-none tabular-nums text-[clamp(4.5rem,16vw,14rem)]"
            >
              000
            </span>
          </div>
          <div className="h-px w-full bg-[rgba(15,23,42,0.08)]">
            <div data-preloader-bar className="h-px w-full origin-left scale-x-0 bg-[#9A7B38]" />
          </div>
        </div>
      </div>
    </div>
  );
}
