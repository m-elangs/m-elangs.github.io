"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, FULL_MOTION } from "@/lib/gsap";
import { siteProfile } from "@/data/site";

/** Marquee infinite yang arah & kecepatannya bereaksi terhadap scroll. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        if (!track.current) return;
        const loop = gsap.to(track.current, {
          xPercent: -50,
          duration: 32,
          ease: "none",
          repeat: -1,
        });
        // Mulai jauh dari titik nol agar bisa diputar mundur tanpa berhenti
        loop.totalTime(loop.duration() * 100);

        let direction = 1;
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            direction = self.direction;
            const boost = Math.min(5, 1 + Math.abs(self.getVelocity()) / 350);
            gsap
              .timeline({ overwrite: true })
              .to(loop, { timeScale: direction * boost, duration: 0.25, ease: "power2.out" })
              .to(loop, { timeScale: direction, duration: 1.2, ease: "power2.out" });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="select-none overflow-hidden whitespace-nowrap bg-[#F8F9FA] py-10 sm:py-12 md:py-16 hairline-top hairline-bottom"
    >
      <div ref={track} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {siteProfile.marqueeItems.map((item) => (
              <div key={`${copy}-${item}`} className="flex items-center gap-8 sm:gap-12 px-4 sm:px-6">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-fg">
                  {item}
                </span>
                <span className="text-lg sm:text-xl text-[#9A7B38]">&#10022;</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
