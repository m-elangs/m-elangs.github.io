"use client";

import dynamic from "next/dynamic";

// Cursor kustom dimuat dinamis (tidak ikut bundle awal & tidak di-render di server)
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function ClientEffects() {
  return <CustomCursor />;
}
