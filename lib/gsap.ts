"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * Plugin GSAP didaftarkan sekali saja di level modul.
 * Semua komponen meng-import gsap dari file ini, bukan langsung dari "gsap".
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "power4.out", duration: 1 });
}

export const EASE = {
  editorial: "power4.inOut",
  out: "power4.out",
  soft: "power3.out",
} as const;

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const FULL_MOTION = "(prefers-reduced-motion: no-preference)";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION).matches;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
