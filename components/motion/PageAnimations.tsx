"use client";

import { gsap, ScrollTrigger, SplitText, useGSAP, FULL_MOTION } from "@/lib/gsap";

/**
 * Satu orkestrator animasi scroll untuk seluruh halaman, digerakkan oleh data-attribute
 * sehingga komponen section tetap bisa menjadi Server Component:
 *
 *  data-split            → heading reveal per baris dengan mask (SplitText)
 *  data-highlight        → kata menyala satu per satu mengikuti scroll (scrub)
 *  data-reveal="fade"    → fade + naik
 *  data-reveal="image"   → clip-path reveal + scale 1.15 → 1 yang lambat
 *  data-stagger          → anak-anak elemen muncul berurutan
 *  data-line             → garis hairline menggambar dirinya
 *  data-parallax="8"     → parallax halus (yPercent)
 *  data-count            → angka menghitung naik
 *  data-timeline-line    → garis timeline vertikal mengikuti scroll
 */
export default function PageAnimations() {
  useGSAP((_, contextSafe) => {
    let cancelled = false;

    const setup = contextSafe!(() => {
      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onComplete: () => split.revert(),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-highlight]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='fade']").forEach((el) => {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          const items = Array.from(group.children).filter(
            (child) => !child.hasAttribute("data-timeline-line"),
          );
          gsap.from(items, {
            y: 36,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 86%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal='image']").forEach((el) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
          tl.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" },
          );
          if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.8, ease: "power3.out" }, 0);
        });

        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax) || 8;
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const match = (el.textContent ?? "").trim().match(/^(\d+)(.*)$/);
          if (!match) return;
          const digits = match[1] ?? "0";
          const suffix = match[2] ?? "";
          const counter = { value: 0 };
          gsap.to(counter, {
            value: Number(digits),
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = `${String(Math.round(counter.value)).padStart(digits.length, "0")}${suffix}`;
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-timeline-line]").forEach((el) => {
          gsap.from(el, {
            scaleY: 0,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top 75%", end: "bottom 60%", scrub: true },
          });
        });
      });

      ScrollTrigger.refresh();
    });

    document.fonts.ready.then(() => {
      if (!cancelled) setup();
    });

    return () => {
      cancelled = true;
    };
  });

  return null;
}
