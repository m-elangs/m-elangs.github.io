"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface IntroState {
  introDone: boolean;
  finishIntro: () => void;
}

const IntroContext = createContext<IntroState>({
  introDone: true,
  finishIntro: () => undefined,
});

/** Memberi tahu Hero kapan preloader selesai agar reveal teks dimulai tepat waktu. */
export default function IntroProvider({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const finishIntro = useCallback(() => setIntroDone(true), []);
  const value = useMemo(() => ({ introDone, finishIntro }), [introDone, finishIntro]);

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro(): IntroState {
  return useContext(IntroContext);
}
