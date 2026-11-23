import type { ReactNode } from "react";
import PageAnimations from "@/components/motion/PageAnimations";

/**
 * template.tsx dibuat ulang di setiap navigasi, sehingga seluruh animasi scroll
 * diinisialisasi ulang dengan bersih untuk halaman baru.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <PageAnimations />
    </>
  );
}
