"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAnimate } from "motion/react";
import { CURTAIN_EASE } from "@/lib/motion";
import { prefersReducedMotion } from "@/lib/gsap";
import { siteProfile } from "@/data/site";

interface TransitionState {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionState>({
  navigate: () => undefined,
});

export function usePageTransition(): TransitionState {
  return useContext(TransitionContext);
}

/**
 * Page transition bergaya curtain/wipe (Motion).
 * 1. Tirai deep forest naik menutupi layar.
 * 2. Router berpindah halaman di balik tirai.
 * 3. Tirai melanjutkan gerakan ke atas dan membuka halaman baru.
 */
export default function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const pending = useRef(false);

  const navigate = useCallback(
    async (href: string) => {
      if (pending.current) return;
      if (prefersReducedMotion() || !scope.current) {
        router.push(href);
        return;
      }
      pending.current = true;
      await animate(scope.current, { y: ["100%", "0%"] }, { duration: 0.8, ease: CURTAIN_EASE });
      router.push(href);
    },
    [animate, router, scope],
  );

  useEffect(() => {
    if (!pending.current || !scope.current) return;
    const el = scope.current;
    animate(el, { y: "-100%" }, { duration: 0.9, delay: 0.2, ease: CURTAIN_EASE }).then(() => {
      pending.current = false;
      animate(el, { y: "100%" }, { duration: 0 });
    });
  }, [pathname, animate, scope]);

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={scope}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[85] flex items-end justify-between bg-[#0F172A] p-[var(--gutter)] text-[#FFFFFF]"
        style={{ transform: "translateY(100%)" }}
      >
        <span className="font-serif text-6xl md:text-8xl font-light">{siteProfile.monogram}</span>
        <span className="type-label text-[#D4AF37]">Loading next chapter</span>
      </div>
    </TransitionContext.Provider>
  );
}
