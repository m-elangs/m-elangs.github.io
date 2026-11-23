"use client";

import { useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";

type IsoPaletteKey = "cyber" | "emerald" | "purple" | "light";
type IsoSpeedKey = "normal" | "fast";

interface PaletteConfig {
  name: string;
  swatch: string;
  vars: Record<string, string>;
  cardBg: string;
  cardBorder: string;
  textMain: string;
  textMuted: string;
}

const PALETTES: Record<IsoPaletteKey, PaletteConfig> = {
  cyber: {
    name: "Cyber Navy",
    swatch: "from-blue-600 to-sky-400",
    cardBg: "rgba(15, 23, 42, 0.92)",
    cardBorder: "rgba(56, 189, 248, 0.25)",
    textMain: "#f8fafc",
    textMuted: "#94a3b8",
    vars: {
      "--iso-accent": "#38bdf8",
      "--iso-accent-2": "#6366f1",
      "--iso-accent-3": "#34d399",
      "--iso-screen-top": "#0f172a",
      "--iso-screen-bottom": "#090e1c",
      "--iso-header-bg": "#162038",
      "--iso-wall-top-a": "#38bdf8",
      "--iso-wall-top-b": "#1d4ed8",
      "--iso-wall-side-a": "#1e293b",
      "--iso-wall-side-b": "#090d16",
      "--iso-rim": "#7dd3fc",
      "--iso-glass-fill": "rgba(56, 189, 248, 0.08)",
      "--iso-glass-stroke": "rgba(125, 211, 252, 0.35)",
      "--iso-badge-front-a": "#1e293b",
      "--iso-badge-front-b": "#0f172a",
      "--iso-shadow-color": "#020617",
    },
  },
  emerald: {
    name: "Emerald Dev",
    swatch: "from-emerald-600 to-teal-300",
    cardBg: "rgba(10, 28, 23, 0.92)",
    cardBorder: "rgba(16, 185, 129, 0.28)",
    textMain: "#ecfdf5",
    textMuted: "#94a3b8",
    vars: {
      "--iso-accent": "#10b981",
      "--iso-accent-2": "#2dd4bf",
      "--iso-accent-3": "#a3e635",
      "--iso-screen-top": "#0c1f1a",
      "--iso-screen-bottom": "#06120f",
      "--iso-header-bg": "#122c25",
      "--iso-wall-top-a": "#34d399",
      "--iso-wall-top-b": "#047857",
      "--iso-wall-side-a": "#132e27",
      "--iso-wall-side-b": "#06120f",
      "--iso-rim": "#6ee7b7",
      "--iso-glass-fill": "rgba(16, 185, 129, 0.09)",
      "--iso-glass-stroke": "rgba(110, 231, 183, 0.35)",
      "--iso-badge-front-a": "#132e27",
      "--iso-badge-front-b": "#091a16",
      "--iso-shadow-color": "#010806",
    },
  },
  purple: {
    name: "Purple Neon",
    swatch: "from-purple-600 to-pink-400",
    cardBg: "rgba(24, 14, 48, 0.92)",
    cardBorder: "rgba(192, 132, 252, 0.3)",
    textMain: "#faf5ff",
    textMuted: "#a1a1aa",
    vars: {
      "--iso-accent": "#c084fc",
      "--iso-accent-2": "#f472b6",
      "--iso-accent-3": "#38bdf8",
      "--iso-screen-top": "#180f30",
      "--iso-screen-bottom": "#0d071c",
      "--iso-header-bg": "#231645",
      "--iso-wall-top-a": "#e879f9",
      "--iso-wall-top-b": "#6d28d9",
      "--iso-wall-side-a": "#241744",
      "--iso-wall-side-b": "#0c061a",
      "--iso-rim": "#f0abfc",
      "--iso-glass-fill": "rgba(192, 132, 252, 0.09)",
      "--iso-glass-stroke": "rgba(240, 171, 252, 0.36)",
      "--iso-badge-front-a": "#251747",
      "--iso-badge-front-b": "#120a26",
      "--iso-shadow-color": "#04010a",
    },
  },
  light: {
    name: "Light Minimal",
    swatch: "from-slate-300 to-blue-500",
    cardBg: "rgba(248, 250, 252, 0.95)",
    cardBorder: "rgba(99, 102, 241, 0.24)",
    textMain: "#0f172a",
    textMuted: "#475569",
    vars: {
      "--iso-accent": "#2563eb",
      "--iso-accent-2": "#4f46e5",
      "--iso-accent-3": "#059669",
      "--iso-screen-top": "#1e293b",
      "--iso-screen-bottom": "#0f172a",
      "--iso-header-bg": "#334155",
      "--iso-wall-top-a": "#93c5fd",
      "--iso-wall-top-b": "#3b82f6",
      "--iso-wall-side-a": "#cbd5e1",
      "--iso-wall-side-b": "#94a3b8",
      "--iso-rim": "#ffffff",
      "--iso-glass-fill": "rgba(59, 130, 246, 0.12)",
      "--iso-glass-stroke": "rgba(59, 130, 246, 0.45)",
      "--iso-badge-front-a": "#ffffff",
      "--iso-badge-front-b": "#e2e8f0",
      "--iso-shadow-color": "#94a3b8",
    },
  },
};

export default function IsometricTerminal3D() {
  const [palette, setPalette] = useState<IsoPaletteKey>("cyber");
  const [speed, setSpeed] = useState<IsoSpeedKey>("normal");
  const [parallax, setParallax] = useState({
    bx: 0,
    by: 0,
    mx: 0,
    my: 0,
    fx: 0,
    fy: 0,
  });
  const stageRef = useRef<HTMLDivElement>(null);

  const activePalette = PALETTES[palette];
  const isFast = speed === "fast";

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setParallax({
      bx: Number((-nx * 5).toFixed(1)),
      by: Number((-ny * 4).toFixed(1)),
      mx: Number((nx * 6).toFixed(1)),
      my: Number((ny * 5).toFixed(1)),
      fx: Number((nx * 13).toFixed(1)),
      fy: Number((ny * 10).toFixed(1)),
    });
  };

  const handleMouseLeave = () => {
    setParallax({ bx: 0, by: 0, mx: 0, my: 0, fx: 0, fy: 0 });
  };

  return (
    <div
      className={`iso-terminal-wrap ${isFast ? "iso-fast" : ""} w-full max-w-full rounded-2xl border p-4 sm:p-6 md:p-8 transition-colors duration-300 shadow-lg`}
      style={
        {
          ...activePalette.vars,
          backgroundColor: activePalette.cardBg,
          borderColor: activePalette.cardBorder,
          color: activePalette.textMain,
        } as CSSProperties
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Compact Info & Controls */}
        <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
          <div className="space-y-2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium border"
              style={{ borderColor: activePalette.cardBorder }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--iso-accent-3)" }}
              />
              <span>{isFast ? "Compiling • 60 FPS" : "Idle • 30° Isometric 3D"}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight leading-snug">
              Isometric Floating{" "}
              <span style={{ color: "var(--iso-accent)" }}>Code Terminal</span>
            </h3>

            <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: activePalette.textMuted }}>
              Interactive 3D SVG workspace built with{" "}
              <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-black/20">
                cos 30° / sin 30°
              </code>{" "}
              projection and 5-layer GPU parallax.
            </p>
          </div>

          {/* Theme Palette Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider" style={{ color: activePalette.textMuted }}>
                3D Color Theme
              </span>
              <span className="font-mono font-semibold" style={{ color: "var(--iso-accent)" }}>
                {activePalette.name}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(PALETTES) as IsoPaletteKey[]).map((key) => {
                const item = PALETTES[key];
                const selected = palette === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPalette(key)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-left"
                    style={{
                      borderColor: selected ? "var(--iso-accent)" : activePalette.cardBorder,
                      backgroundColor: selected ? "rgba(56, 189, 248, 0.14)" : "transparent",
                    }}
                  >
                    <span className={`w-3 h-3 rounded-full bg-gradient-to-tr ${item.swatch} shrink-0`} />
                    <span className="truncate">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animation Speed Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider" style={{ color: activePalette.textMuted }}>
                Animation Speed
              </span>
              <span className="font-mono" style={{ color: activePalette.textMuted }}>
                {isFast ? "Fast (2.1s)" : "Normal (4.8s)"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSpeed("normal")}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer"
                style={{
                  borderColor: !isFast ? "var(--iso-accent)" : activePalette.cardBorder,
                  backgroundColor: !isFast ? "rgba(56, 189, 248, 0.14)" : "transparent",
                }}
              >
                <span>🌊</span> Relaxed
              </button>
              <button
                type="button"
                onClick={() => setSpeed("fast")}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer"
                style={{
                  borderColor: isFast ? "var(--iso-accent)" : activePalette.cardBorder,
                  backgroundColor: isFast ? "rgba(56, 189, 248, 0.14)" : "transparent",
                }}
              >
                <span>⚡</span> Compile
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Compact Isometric 3D SVG Stage */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 order-1 lg:order-2 relative rounded-xl overflow-hidden border p-2 sm:p-3"
          style={{ borderColor: activePalette.cardBorder }}
        >
          {/* Ambient Glows */}
          <div
            className="pointer-events-none absolute -top-16 right-4 w-48 h-48 rounded-full blur-3xl opacity-25 transition-colors duration-500"
            style={{ backgroundColor: "var(--iso-accent)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 left-4 w-48 h-48 rounded-full blur-3xl opacity-20 transition-colors duration-500"
            style={{ backgroundColor: "var(--iso-accent-2)" }}
          />

          <svg
            viewBox="0 0 640 510"
            className="w-full h-auto max-h-[340px] sm:max-h-[380px] lg:max-h-[400px] mx-auto block select-none relative z-10"
            role="img"
            aria-label="Isometric 3D Floating Code Terminal Illustration"
          >
            <defs>
              <linearGradient id="isoTopWallGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--iso-wall-top-a)" />
                <stop offset="100%" stopColor="var(--iso-wall-top-b)" />
              </linearGradient>

              <linearGradient id="isoSideWallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--iso-wall-side-a)" />
                <stop offset="100%" stopColor="var(--iso-wall-side-b)" />
              </linearGradient>

              <linearGradient id="isoScreenGrad" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor="var(--iso-screen-top)" />
                <stop offset="100%" stopColor="var(--iso-screen-bottom)" />
              </linearGradient>

              <linearGradient id="isoBadgeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--iso-badge-front-a)" />
                <stop offset="100%" stopColor="var(--iso-badge-front-b)" />
              </linearGradient>

              <pattern id="isoGridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="var(--iso-accent)"
                  strokeWidth="0.6"
                  opacity="0.28"
                />
              </pattern>

              <filter id="isoGroundBlur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="12" />
              </filter>

              <filter id="isoLayerShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="-8" dy="14" stdDeviation="10" floodColor="#020617" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Layer 1: Ground Shadow */}
            <ellipse
              cx="0"
              cy="0"
              rx="155"
              ry="44"
              fill="var(--iso-shadow-color)"
              filter="url(#isoGroundBlur)"
              className="iso-ground-shadow"
            />

            {/* Layer 2: Translucent Glass Backdrop Plate */}
            <g
              className="iso-parallax-layer"
              style={{ transform: `translate(${parallax.bx}px, ${parallax.by}px)` }}
            >
              <g className="iso-backdrop-float">
                <polygon points="214,72 222,67 482,217 474,222" fill="var(--iso-accent)" opacity="0.35" />
                <polygon points="474,222 482,217 482,392 474,397" fill="var(--iso-accent-2)" opacity="0.3" />
                <polygon
                  points="214,72 474,222 474,397 214,247"
                  fill="var(--iso-glass-fill)"
                  stroke="var(--iso-glass-stroke)"
                  strokeWidth="1.5"
                />
                <g transform="matrix(0.866, 0.5, 0, 1, 214, 72)">
                  <rect x="6" y="6" width="288" height="163" rx="8" fill="url(#isoGridPattern)" />
                  <rect x="18" y="18" width="90" height="8" rx="4" fill="var(--iso-accent)" opacity="0.25" />
                  <rect x="18" y="34" width="140" height="6" rx="3" fill="var(--iso-accent-2)" opacity="0.2" />
                </g>
              </g>
            </g>

            {/* Layer 3: Main Extruded 3D Code Terminal Window */}
            <g
              className="iso-parallax-layer"
              style={{ transform: `translate(${parallax.mx}px, ${parallax.my}px)` }}
            >
              <g className="iso-terminal-float" filter="url(#isoLayerShadow)">
                <polygon points="172,102 194,89.3 454,239.3 432,252" fill="url(#isoTopWallGrad)" />
                <line
                  x1="194"
                  y1="89.3"
                  x2="454"
                  y2="239.3"
                  stroke="var(--iso-rim)"
                  strokeWidth="1.5"
                  opacity="0.85"
                />
                <polygon points="432,252 454,239.3 454,421.3 432,434" fill="url(#isoSideWallGrad)" />
                <line
                  x1="443"
                  y1="246"
                  x2="443"
                  y2="427"
                  stroke="var(--iso-accent)"
                  strokeWidth="1.2"
                  opacity="0.3"
                />
                <polygon
                  points="172,102 432,252 432,434 172,284"
                  fill="url(#isoScreenGrad)"
                  stroke="var(--iso-rim)"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />

                {/* Projected Screen Content */}
                <g transform="matrix(0.866, 0.5, 0, 1, 172, 102)">
                  <path d="M 2 2 L 298 2 L 298 30 L 2 30 Z" fill="var(--iso-header-bg)" />
                  <line x1="2" y1="30" x2="298" y2="30" stroke="var(--iso-accent)" strokeWidth="1" opacity="0.25" />

                  <circle cx="16" cy="16" r="4.2" fill="#fb7185" />
                  <circle cx="30" cy="16" r="4.2" fill="#fbbf24" />
                  <circle cx="44" cy="16" r="4.2" fill="#34d399" />

                  <rect x="64" y="6" width="84" height="24" rx="5" fill="var(--iso-screen-top)" />
                  <circle cx="75" cy="18" r="3" fill="var(--iso-accent)" />
                  <text x="84" y="21.5" fill="#e2e8f0" fontFamily="monospace" fontSize="10.5" fontWeight="600">
                    app.tsx
                  </text>

                  <rect x="234" y="9" width="52" height="14" rx="4" fill="var(--iso-accent)" opacity="0.18" />
                  <text
                    x="260"
                    y="19"
                    textAnchor="middle"
                    fill="var(--iso-accent)"
                    fontFamily="monospace"
                    fontSize="8.5"
                    fontWeight="700"
                  >
                    TSX • 3D
                  </text>

                  <rect x="8" y="110" width="284" height="20" rx="4" fill="var(--iso-accent)" opacity="0.14" />
                  <rect x="8" y="110" width="3" height="20" rx="1.5" fill="var(--iso-accent)" />

                  <g fill="#64748b" fontFamily="monospace" fontSize="9.5" textAnchor="end">
                    <text x="24" y="50">01</text>
                    <text x="24" y="68">02</text>
                    <text x="24" y="86">03</text>
                    <text x="24" y="104">04</text>
                    <text x="24" y="123" fill="var(--iso-accent)" fontWeight="700">05</text>
                    <text x="24" y="142">06</text>
                    <text x="24" y="160">07</text>
                  </g>

                  <rect x="36" y="42" width="38" height="8" rx="4" fill="var(--iso-accent-2)" />
                  <rect x="80" y="42" width="64" height="8" rx="4" fill="#e2e8f0" opacity="0.85" />
                  <rect x="150" y="42" width="28" height="8" rx="4" fill="var(--iso-accent-2)" />
                  <rect x="184" y="42" width="56" height="8" rx="4" fill="var(--iso-accent-3)" />

                  <rect x="36" y="60" width="34" height="8" rx="4" fill="var(--iso-accent)" />
                  <rect x="76" y="60" width="76" height="8" rx="4" fill="#fbbf24" />
                  <rect x="158" y="60" width="32" height="8" rx="4" fill="#94a3b8" opacity="0.7" />

                  <rect x="50" y="78" width="42" height="8" rx="4" fill="var(--iso-accent-2)" />
                  <rect x="98" y="78" width="16" height="8" rx="4" fill="#cbd5e1" opacity="0.7" />

                  <rect x="64" y="96" width="68" height="8" rx="4" fill="var(--iso-accent)" />
                  <rect x="138" y="96" width="46" height="8" rx="4" fill="#f472b6" />
                  <rect x="190" y="96" width="54" height="8" rx="4" fill="var(--iso-accent-3)" />

                  <g transform="translate(78, 115)">
                    <rect x="0" y="0" width="142" height="9" rx="4.5" fill="var(--iso-accent)" className="iso-code-typing" />
                    <rect x="148" y="-2" width="7" height="13" rx="1.5" fill="var(--iso-accent-3)" className="iso-cursor" />
                  </g>

                  <rect x="64" y="134" width="74" height="8" rx="4" fill="var(--iso-accent)" opacity="0.85" />
                  <rect x="50" y="152" width="22" height="8" rx="4" fill="#cbd5e1" opacity="0.65" />
                  <rect x="36" y="166" width="14" height="6" rx="3" fill="#94a3b8" opacity="0.5" />
                </g>
              </g>
            </g>

            {/* Layer 4 & 5: Pop-out 3D Badges & Floating Sparks */}
            <g
              className="iso-parallax-layer"
              style={{ transform: `translate(${parallax.fx}px, ${parallax.fy}px)` }}
            >
              <g className="iso-badge-front-float" filter="url(#isoLayerShadow)">
                <polygon points="126,274 204,319 204,386 126,341" fill="#020617" opacity="0.32" />
                <polygon points="116,262 132,252.8 210,297.8 194,307" fill="url(#isoTopWallGrad)" />
                <polygon points="194,307 210,297.8 210,364.8 194,374" fill="url(#isoSideWallGrad)" />
                <polygon
                  points="116,262 194,307 194,374 116,329"
                  fill="url(#isoBadgeGrad)"
                  stroke="var(--iso-rim)"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <g transform="matrix(0.866, 0.5, 0, 1, 116, 262)">
                  <text
                    x="45"
                    y="42"
                    textAnchor="middle"
                    fill="var(--iso-accent)"
                    fontFamily="monospace"
                    fontSize="26"
                    fontWeight="800"
                  >
                    &lt;/&gt;
                  </text>
                  <rect x="23" y="51" width="44" height="4" rx="2" fill="var(--iso-accent-3)" opacity="0.85" />
                </g>
              </g>

              <g className="iso-badge-top-float" filter="url(#isoLayerShadow)">
                <polygon points="462,158 475,150.5 527,180.5 514,188" fill="url(#isoTopWallGrad)" />
                <polygon points="514,188 527,180.5 527,230.5 514,238" fill="url(#isoSideWallGrad)" />
                <polygon
                  points="462,158 514,188 514,238 462,208"
                  fill="url(#isoBadgeGrad)"
                  stroke="var(--iso-rim)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <g transform="matrix(0.866, 0.5, 0, 1, 462, 158)">
                  <circle cx="48" cy="11" r="3.5" fill="var(--iso-accent-3)" />
                  <text
                    x="30"
                    y="34"
                    textAnchor="middle"
                    fill="var(--iso-accent-2)"
                    fontFamily="monospace"
                    fontSize="20"
                    fontWeight="800"
                  >
                    {"{ }"}
                  </text>
                </g>
              </g>

              <g pointerEvents="none">
                <g className="iso-spark-1">
                  <polygon points="146,186 154,190.6 154,199.8 146,195.2" fill="var(--iso-accent)" />
                </g>
                <g className="iso-spark-2">
                  <polygon points="494,286 503,291.2 503,301.6 494,296.4" fill="var(--iso-accent-3)" />
                </g>
                <g className="iso-spark-3">
                  <polygon points="324,78 331,82 331,90 324,86" fill="var(--iso-accent-2)" />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
