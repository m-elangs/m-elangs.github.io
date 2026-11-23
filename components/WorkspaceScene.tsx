"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

type SceneTheme = "dark" | "light";
type OutfitType = "blazer" | "shirt" | "vest";
type TypingSpeed = "relaxed" | "focus";

const RELAXED_TASKS = [
  "refining modern UI components...",
  "tuning typography & spacing...",
  "sipping coffee while reviewing code...",
  "optimizing smooth SVG motion...",
];

const FOCUS_TASKS = [
  "deploying features to production...",
  "writing high-performance async logic...",
  "debugging API at full speed...",
  "refactoring frontend architecture...",
];

const OUTFIT_META: Record<OutfitType, { label: string; sleeveColor: string }> = {
  blazer: { label: "Blazer", sleeveColor: "#18304F" },
  shirt: { label: "Shirt", sleeveColor: "#F1F5F9" },
  vest: { label: "Vest", sleeveColor: "#F1F5F9" },
};

export default function WorkspaceScene() {
  const [theme, setTheme] = useState<SceneTheme>("dark");
  const [outfit, setOutfit] = useState<OutfitType>("blazer");
  const [speed, setSpeed] = useState<TypingSpeed>("relaxed");
  const [tickerIndex, setTickerIndex] = useState(0);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const isDark = theme === "dark";
  const isFocus = speed === "focus";
  const currentTasks = isFocus ? FOCUS_TASKS : RELAXED_TASKS;
  const activeTask = currentTasks[tickerIndex % currentTasks.length];
  const sleeveColor = OUTFIT_META[outfit].sleeveColor;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setPupil({
      x: Number(Math.max(-2.2, Math.min(2.2, normX * 2.2)).toFixed(2)),
      y: Number(Math.max(-1.4, Math.min(1.4, normY * 1.4)).toFixed(2)),
    });

    setTilt({
      rx: Number((-normY * 3.5).toFixed(2)),
      ry: Number((normX * 4.5).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setPupil({ x: 0, y: 0 });
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      className={`ws-scene ${isDark ? "ws-dark" : ""} ${isFocus ? "ws-focus" : ""} w-full max-w-full`}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
        }}
        className={`relative rounded-2xl overflow-hidden border transition-all duration-300 ease-out p-3 sm:p-4 shadow-[0_18px_40px_-15px_rgba(15,23,42,0.18)] ${
          isDark
            ? "border-[rgba(15,23,42,0.16)] bg-gradient-to-br from-[#0F172A] via-[#131C31] to-[#1E293B] text-white"
            : "border-[rgba(15,23,42,0.1)] bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#EEF2FF] text-[#0F172A]"
        }`}
      >
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-cyan-500/15 blur-3xl" />

        {/* Compact Top Status Bar */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-2.5">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold border ${
              isDark
                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">
              {isFocus ? "Focus Mode • 112 WPM" : "Working • 58 WPM"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch illustration to Day Mode" : "Switch illustration to Night Mode"}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold border transition-colors cursor-pointer shrink-0 ${
              isDark
                ? "bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
          >
            <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
            <span>{isDark ? "Day" : "Night"}</span>
          </button>
        </div>

        {/* Main Interactive SVG Stage */}
        <div className="relative z-10 rounded-xl overflow-hidden border border-black/10 shadow-inner">
          <svg
            viewBox="0 0 640 500"
            className="w-full h-auto block select-none"
            role="img"
            aria-label="Interactive animated illustration of a developer working at a laptop"
          >
            <defs>
              <linearGradient id="wsWallLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EEF2FF" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
              <linearGradient id="wsWallDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#131B2E" />
                <stop offset="100%" stopColor="#0B1120" />
              </linearGradient>

              <linearGradient id="wsSkyDay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#BAE6FD" />
              </linearGradient>
              <linearGradient id="wsSkyNight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </linearGradient>

              <linearGradient id="wsSkinFace" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F3C6A2" />
                <stop offset="100%" stopColor="#E5AE85" />
              </linearGradient>
              <linearGradient id="wsSkinNeck" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D79B71" />
                <stop offset="100%" stopColor="#E6B28B" />
              </linearGradient>

              <linearGradient id="wsHairMain" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#222533" />
                <stop offset="55%" stopColor="#141620" />
                <stop offset="100%" stopColor="#0C0E14" />
              </linearGradient>

              <linearGradient id="wsNavyBlazer" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1E3A5F" />
                <stop offset="100%" stopColor="#11223B" />
              </linearGradient>
              <linearGradient id="wsNavyLapel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#274B7A" />
                <stop offset="100%" stopColor="#162C4B" />
              </linearGradient>

              <linearGradient id="wsVestGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#374151" />
                <stop offset="100%" stopColor="#1F2937" />
              </linearGradient>

              <pattern id="wsKnitPattern" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M0 4 L4 0 L8 4 M0 8 L4 4 L8 8" fill="none" stroke="#4B5563" strokeWidth="0.9" opacity="0.45" />
              </pattern>

              <linearGradient id="wsLaptopShell" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="50%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
              <linearGradient id="wsScreenGlow" x1="0.5" y1="1" x2="0.5" y2="0">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.72" />
                <stop offset="45%" stopColor="#6366F1" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="wsDeskLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E2C7A8" />
                <stop offset="100%" stopColor="#CCA882" />
              </linearGradient>
              <linearGradient id="wsDeskDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>

              <clipPath id="wsWindowClip">
                <rect x="44" y="54" width="166" height="206" rx="12" />
              </clipPath>
            </defs>

            {/* 1. Room Background & Window */}
            <rect
              x="0"
              y="0"
              width="640"
              height="500"
              fill={isDark ? "url(#wsWallDark)" : "url(#wsWallLight)"}
              className="ws-theme-transition"
            />

            <g>
              <rect
                x="38"
                y="48"
                width="178"
                height="218"
                rx="16"
                fill={isDark ? "#1E293B" : "#FFFFFF"}
                stroke={isDark ? "#334155" : "#CBD5E1"}
                strokeWidth="3"
                className="ws-theme-transition"
              />

              <g clipPath="url(#wsWindowClip)">
                {/* Day Sky */}
                <g style={{ opacity: isDark ? 0 : 1, transition: "opacity 0.5s ease" }}>
                  <rect x="44" y="54" width="166" height="206" fill="url(#wsSkyDay)" />
                  <circle cx="168" cy="96" r="20" fill="#FEF08A" />
                  <circle cx="168" cy="96" r="28" fill="#FEF08A" opacity="0.28" />
                  <g className="ws-cloud-drift" opacity="0.92">
                    <path d="M62 128 C62 118 76 115 84 121 C90 112 108 114 112 124 C121 124 125 136 116 139 L68 139 C59 139 56 131 62 128 Z" fill="#FFFFFF" />
                    <path d="M128 164 C128 157 138 155 144 159 C149 152 162 154 165 161 C172 161 175 170 168 172 L132 172 C126 172 124 166 128 164 Z" fill="#FFFFFF" opacity="0.85" />
                  </g>
                  <path d="M44 260 L44 205 L72 205 L72 222 L95 222 L95 190 L132 190 L132 215 L158 215 L158 198 L210 198 L210 260 Z" fill="#93C5FD" opacity="0.7" />
                </g>

                {/* Night Sky */}
                <g style={{ opacity: isDark ? 1 : 0, transition: "opacity 0.5s ease" }}>
                  <rect x="44" y="54" width="166" height="206" fill="url(#wsSkyNight)" />
                  <path d="M168 80 A17 17 0 1 0 184 106 A13.5 13.5 0 1 1 168 80 Z" fill="#FDE68A" />
                  <circle cx="76" cy="88" r="2" fill="#E0F2FE" className="ws-star-1" />
                  <circle cx="118" cy="76" r="1.6" fill="#FDE68A" className="ws-star-2" />
                  <circle cx="94" cy="126" r="1.4" fill="#FFFFFF" className="ws-star-1" />
                  <circle cx="145" cy="122" r="2" fill="#BAE6FD" className="ws-star-2" />
                  <circle cx="66" cy="152" r="1.5" fill="#E0F2FE" className="ws-star-2" />
                  <path d="M44 260 L44 205 L72 205 L72 222 L95 222 L95 190 L132 190 L132 215 L158 215 L158 198 L210 198 L210 260 Z" fill="#090E1A" />
                  <rect x="103" y="200" width="4" height="5" rx="1" fill="#FDE047" opacity="0.8" />
                  <rect x="113" y="200" width="4" height="5" rx="1" fill="#FDE047" opacity="0.5" />
                  <rect x="103" y="212" width="4" height="5" rx="1" fill="#38BDF8" opacity="0.7" />
                  <rect x="166" y="208" width="4" height="5" rx="1" fill="#FDE047" opacity="0.75" />
                  <rect x="55" y="216" width="4" height="5" rx="1" fill="#FDE047" opacity="0.6" />
                </g>
              </g>

              <line x1="127" y1="52" x2="127" y2="262" stroke={isDark ? "#334155" : "#CBD5E1"} strokeWidth="4" className="ws-theme-transition" />
              <line x1="42" y1="168" x2="212" y2="168" stroke={isDark ? "#334155" : "#CBD5E1"} strokeWidth="4" className="ws-theme-transition" />
            </g>

            {/* Minimalist Wall Shelf */}
            <g>
              <rect x="448" y="132" width="144" height="10" rx="5" fill={isDark ? "#334155" : "#CBD5E1"} className="ws-theme-transition" />
              <rect x="462" y="96" width="14" height="36" rx="2.5" fill="#4F46E5" />
              <rect x="478" y="102" width="12" height="30" rx="2.5" fill="#0EA5E9" />
              <rect x="492" y="93" width="15" height="39" rx="2.5" fill="#64748B" />
              <rect x="510" y="106" width="12" height="26" rx="2.5" fill="#F59E0B" transform="rotate(-8 516 132)" />
              <rect x="540" y="96" width="34" height="36" rx="4" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <circle cx="557" cy="110" r="5" fill="#38BDF8" opacity="0.8" />
              <path d="M546 126 L555 117 L562 123 L568 118 L571 126 Z" fill="#6366F1" opacity="0.8" />
            </g>

            {/* 2. Ergonomic Chair */}
            <g>
              <rect x="234" y="176" width="152" height="210" rx="34" fill="#1E293B" stroke="#334155" strokeWidth="3" />
              <rect x="248" y="192" width="124" height="180" rx="24" fill="#0F172A" opacity="0.55" />
            </g>

            {/* 3. Character Torso & Switchable Outfits */}
            <g className="ws-anim-torso">
              <rect x="292" y="218" width="36" height="44" rx="12" fill="url(#wsSkinNeck)" />
              <path d="M292 224 Q310 242 328 224 L328 236 Q310 250 292 236 Z" fill="#C5875E" opacity="0.55" />

              {/* Outfit 1: Navy Blazer */}
              <g className="ws-outfit-layer" opacity={outfit === "blazer" ? 1 : 0}>
                <path d="M204 395 L212 288 C215 262 246 250 284 244 L336 244 C374 250 405 262 408 288 L416 395 Z" fill="url(#wsNavyBlazer)" />
                <path d="M284 244 L310 326 L336 244 Z" fill="#F8FAFC" />
                <path d="M284 244 L297 272 L310 260 L292 240 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                <path d="M336 244 L323 272 L310 260 L328 240 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                <line x1="310" y1="262" x2="310" y2="322" stroke="#CBD5E1" strokeWidth="1.2" />
                <circle cx="310" cy="280" r="2" fill="#94A3B8" />
                <circle cx="310" cy="300" r="2" fill="#94A3B8" />
                <path d="M284 244 L264 268 L276 280 L268 292 L310 334 L295 278 Z" fill="url(#wsNavyLapel)" />
                <path d="M336 244 L356 268 L344 280 L352 292 L310 334 L325 278 Z" fill="url(#wsNavyLapel)" />
                <path d="M350 296 L378 296" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M354 295 L361 286 L372 295 Z" fill="#E2E8F0" />
              </g>

              {/* Outfit 2: White Shirt */}
              <g className="ws-outfit-layer" opacity={outfit === "shirt" ? 1 : 0}>
                <path d="M206 395 L214 288 C218 262 248 250 284 244 L336 244 C372 250 402 262 406 288 L414 395 Z" fill="#F8FAFC" />
                <path d="M214 288 C222 315 228 355 228 395 L206 395 Z" fill="#E2E8F0" opacity="0.65" />
                <path d="M406 288 C398 315 392 355 392 395 L414 395 Z" fill="#E2E8F0" opacity="0.65" />
                <rect x="304" y="258" width="12" height="137" fill="#F1F5F9" />
                <line x1="304" y1="258" x2="304" y2="395" stroke="#CBD5E1" strokeWidth="1" />
                <line x1="316" y1="258" x2="316" y2="395" stroke="#CBD5E1" strokeWidth="1" />
                <circle cx="310" cy="276" r="2.2" fill="#94A3B8" />
                <circle cx="310" cy="300" r="2.2" fill="#94A3B8" />
                <circle cx="310" cy="324" r="2.2" fill="#94A3B8" />
                <path d="M286 242 L274 268 L308 260 L292 239 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                <path d="M334 242 L346 268 L312 260 L328 239 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                <path d="M344 294 L376 294 L376 324 Q360 332 344 324 Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.2" />
              </g>

              {/* Outfit 3: Knit Vest */}
              <g className="ws-outfit-layer" opacity={outfit === "vest" ? 1 : 0}>
                <path d="M206 395 L214 288 C218 262 248 250 284 244 L336 244 C372 250 402 262 406 288 L414 395 Z" fill="#F8FAFC" />
                <path d="M242 252 L284 244 L310 302 L336 244 L378 252 C382 295 384 345 382 395 L238 395 C236 345 238 295 242 252 Z" fill="url(#wsVestGrad)" />
                <path d="M242 252 L284 244 L310 302 L336 244 L378 252 C382 295 384 345 382 395 L238 395 C236 345 238 295 242 252 Z" fill="url(#wsKnitPattern)" />
                <path d="M280 245 L310 308 L340 245" fill="none" stroke="#111827" strokeWidth="5" strokeLinejoin="round" />
                <path d="M282 245 L310 304 L338 245" fill="none" stroke="#9CA3AF" strokeWidth="1.2" strokeLinejoin="round" opacity="0.6" />
                <path d="M286 242 L278 266 L309 258 L292 239 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.1" />
                <path d="M334 242 L342 266 L311 258 L328 239 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.1" />
                <circle cx="310" cy="276" r="2" fill="#94A3B8" />
              </g>
            </g>

            {/* 4. Head, Face & Comma Hair */}
            <g className="ws-anim-head">
              <path d="M254 176 C248 134 268 100 310 98 C352 100 372 134 366 176 C364 192 356 202 350 206 L270 206 C264 202 256 192 254 176 Z" fill="#10121A" />

              <g>
                <ellipse cx="261" cy="186" rx="8.5" ry="13" fill="#E6B28B" />
                <path d="M259 180 C256 184 256 190 260 192" fill="none" stroke="#C5875E" strokeWidth="1.8" strokeLinecap="round" />
                <ellipse cx="359" cy="186" rx="8.5" ry="13" fill="#E6B28B" />
                <path d="M361 180 C364 184 364 190 360 192" fill="none" stroke="#C5875E" strokeWidth="1.8" strokeLinecap="round" />
              </g>

              <path d="M264 152 C264 122 284 112 310 112 C336 112 356 122 356 152 L355 186 C354 206 340 223 323 231 C315 235 305 235 297 231 C280 223 266 206 265 186 Z" fill="url(#wsSkinFace)" />

              <ellipse cx="281" cy="196" rx="10" ry="5.5" fill="#E28B74" opacity="0.22" />
              <ellipse cx="339" cy="196" rx="10" ry="5.5" fill="#E28B74" opacity="0.22" />

              <path d="M276 167 Q289 162 301 166" fill="none" stroke="#1E1B18" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M319 166 Q331 162 344 167" fill="none" stroke="#1E1B18" strokeWidth="3.2" strokeLinecap="round" />

              {/* Left Eye */}
              <g className="ws-anim-eye-left">
                <path d="M277 177 Q289 172 300 177" fill="none" stroke="#C5875E" strokeWidth="1.2" opacity="0.65" />
                <path d="M278 181 Q289 174 300 181 Q289 187 278 181 Z" fill="#FFFFFF" />
                <g transform={`translate(${pupil.x}, ${pupil.y})`}>
                  <circle cx="289" cy="181" r="4.8" fill="#18181B" />
                  <circle cx="290.8" cy="179.4" r="1.4" fill="#FFFFFF" />
                </g>
                <path d="M277 181 Q289 174 301 181" fill="none" stroke="#18181B" strokeWidth="2.1" strokeLinecap="round" />
              </g>

              {/* Right Eye */}
              <g className="ws-anim-eye-right">
                <path d="M320 177 Q331 172 343 177" fill="none" stroke="#C5875E" strokeWidth="1.2" opacity="0.65" />
                <path d="M320 181 Q331 174 342 181 Q331 187 320 181 Z" fill="#FFFFFF" />
                <g transform={`translate(${pupil.x}, ${pupil.y})`}>
                  <circle cx="331" cy="181" r="4.8" fill="#18181B" />
                  <circle cx="332.8" cy="179.4" r="1.4" fill="#FFFFFF" />
                </g>
                <path d="M319 181 Q331 174 343 181" fill="none" stroke="#18181B" strokeWidth="2.1" strokeLinecap="round" />
              </g>

              <path d="M310 181 L308 197 Q310 200 314 198" fill="none" stroke="#C68B63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M298 211 Q310 218 322 211" fill="none" stroke="#9A5B44" strokeWidth="2.3" strokeLinecap="round" />
              <path d="M306 218 Q310 220 314 218" fill="none" stroke="#C68B63" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

              {/* Comma Hair */}
              <g>
                <path d="M259 172 C253 136 270 98 312 96 C348 94 370 122 365 166 C363 178 359 182 356 178 C355 156 350 138 336 128 C326 121 312 120 298 124 C280 129 268 148 264 174 Z" fill="url(#wsHairMain)" />
                <path d="M316 108 C294 110 272 126 268 151 C266 162 271 170 280 172 C289 174 297 167 302 158 C294 162 287 160 285 153 C283 142 294 128 314 122 Z" fill="url(#wsHairMain)" />
                <path d="M314 108 C338 110 356 128 356 154 C356 164 350 171 342 172 C333 173 326 165 322 156 C330 161 337 159 339 151 C342 140 331 126 314 122 Z" fill="url(#wsHairMain)" />
                <path d="M286 105 C304 92 332 95 348 111 C332 106 308 106 286 115 Z" fill="#1B1E2B" />
                <path d="M282 119 C294 111 308 109 318 111" fill="none" stroke="#3B425E" strokeWidth="2.8" strokeLinecap="round" opacity="0.65" />
                <path d="M332 118 C342 124 348 134 349 144" fill="none" stroke="#3B425E" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
                <path d="M276 144 C275 152 278 159 284 162" fill="none" stroke="#3B425E" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              </g>
            </g>

            {/* 5. Typing Arms, Watch & Hands */}
            <g className="ws-anim-hand-left">
              <path d="M214 310 C205 338 208 362 228 368 L254 368 L256 344 L236 338 Z" fill={sleeveColor} className="ws-theme-transition" />
              <rect x="242" y="343" width="12" height="25" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
              <rect x="252" y="346" width="16" height="20" rx="6" fill="#E8B58E" />
              <rect x="253" y="345" width="7" height="22" rx="2" fill="#1E293B" />
              <circle cx="256.5" cy="356" r="5.5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.6" />
              <path d="M256.5 356 L256.5 353 M256.5 356 L259 356" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" />
              <ellipse cx="272" cy="358" rx="11" ry="8" fill="#E8B58E" />
            </g>

            <g className="ws-anim-hand-right">
              <path d="M406 310 C415 338 412 362 392 368 L366 368 L364 344 L384 338 Z" fill={sleeveColor} className="ws-theme-transition" />
              <rect x="366" y="343" width="12" height="25" rx="3" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
              <rect x="352" y="346" width="16" height="20" rx="6" fill="#E8B58E" />
              <ellipse cx="348" cy="358" rx="11" ry="8" fill="#E8B58E" />
            </g>

            {/* 6. Desk, Laptop, Coffee & Plant */}
            <rect
              x="0"
              y="390"
              width="640"
              height="110"
              fill={isDark ? "url(#wsDeskDark)" : "url(#wsDeskLight)"}
              className="ws-theme-transition"
            />
            <line
              x1="0"
              y1="390"
              x2="640"
              y2="390"
              stroke={isDark ? "#475569" : "#B8926A"}
              strokeWidth="3"
              className="ws-theme-transition"
            />

            <ellipse cx="310" cy="402" rx="120" ry="10" fill="#020617" opacity="0.32" />
            <ellipse cx="122" cy="402" rx="34" ry="7" fill="#020617" opacity="0.25" />
            <ellipse cx="526" cy="402" rx="36" ry="7" fill="#020617" opacity="0.25" />

            <polygon
              points="222,300 398,300 448,145 172,145"
              fill="url(#wsScreenGlow)"
              className="ws-anim-screen-glow"
              style={{ mixBlendMode: "screen", pointerEvents: "none" }}
            />

            <g>
              <rect x="218" y="294" width="184" height="102" rx="12" fill="url(#wsLaptopShell)" stroke="#94A3B8" strokeWidth="2" />
              <line x1="230" y1="297" x2="390" y2="297" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" strokeLinecap="round" />
              <g transform="translate(310, 344)">
                <polygon points="0,-11 10,7 -10,7" fill="none" stroke="#38BDF8" strokeWidth="2.4" strokeLinejoin="round" />
                <circle cx="0" cy="1" r="2.6" fill="#38BDF8" />
              </g>
              <path d="M198 394 L422 394 L414 404 L206 404 Z" fill="#64748B" />
              <rect x="284" y="394" width="52" height="3.5" rx="1.5" fill="#94A3B8" />
            </g>

            {/* Coffee Mug + Steam */}
            <g>
              <path d="M112 340 Q106 328 114 316 Q120 306 112 296" fill="none" stroke="#E2E8F0" strokeWidth="2.4" strokeLinecap="round" className="ws-steam-1" />
              <path d="M124 338 Q130 326 122 314 Q116 304 124 294" fill="none" stroke="#E2E8F0" strokeWidth="2.4" strokeLinecap="round" className="ws-steam-2" />
              <path d="M135 342 Q129 332 136 320" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" className="ws-steam-3" />
              <path d="M144 360 C158 360 158 384 144 384" fill="none" stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round" />
              <path d="M98 350 L146 350 L143 394 C142 398 138 400 132 400 L112 400 C106 400 102 398 101 394 Z" fill="#F8FAFC" />
              <rect x="100" y="366" width="44" height="10" fill="#6366F1" opacity="0.85" />
              <ellipse cx="122" cy="350" rx="24" ry="4" fill="#CBD5E1" />
            </g>

            {/* Desk Plant */}
            <g>
              <path d="M526 352 C516 324 494 314 488 326 C484 338 504 352 522 356 Z" fill="#10B981" />
              <path d="M528 352 C538 322 560 314 566 326 C570 338 550 352 532 356 Z" fill="#059669" />
              <path d="M527 352 C522 318 525 298 534 302 C542 308 538 334 530 354 Z" fill="#34D399" />
              <path d="M525 352 C512 328 508 308 516 308 C524 310 526 334 527 352 Z" fill="#047857" />
              <path d="M502 354 L552 354 L545 398 C544 401 540 402 536 402 L518 402 C514 402 510 401 509 398 Z" fill="#D97757" />
              <rect x="498" y="348" width="58" height="10" rx="4" fill="#E68A6B" />
            </g>

            {/* 7. Floating Code Particles */}
            <g pointerEvents="none">
              <g className="ws-particle-1">
                <rect x="172" y="246" width="44" height="26" rx="8" fill="#4F46E5" />
                <text x="194" y="263" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="12" fontWeight="600">
                  &lt;/&gt;
                </text>
              </g>
              <g className="ws-particle-2">
                <rect x="418" y="232" width="40" height="26" rx="8" fill="#0EA5E9" />
                <text x="438" y="249" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="12" fontWeight="600">
                  {"{ }"}
                </text>
              </g>
              <g className="ws-particle-3">
                <circle cx="448" cy="296" r="14" fill="#10B981" />
                <text x="448" y="301" textAnchor="middle" fill="#FFFFFF" fontSize="14">
                  ✦
                </text>
              </g>
              <g className="ws-particle-4">
                <rect x="184" y="190" width="36" height="24" rx="7" fill="#8B5CF6" />
                <text x="202" y="206" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="11" fontWeight="600">
                  01
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Compact Interactive Controls */}
        <div className="relative z-10 mt-3 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Outfit Switcher */}
            <div
              className={`inline-flex items-center gap-1 p-1 rounded-xl border ${
                isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"
              }`}
            >
              {(["blazer", "shirt", "vest"] as OutfitType[]).map((key) => {
                const active = outfit === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setOutfit(key)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? "bg-indigo-600 text-white shadow-xs"
                        : isDark
                          ? "text-slate-300 hover:text-white hover:bg-white/10"
                          : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                    }`}
                  >
                    {OUTFIT_META[key].label}
                  </button>
                );
              })}
            </div>

            {/* Typing Speed Switcher */}
            <div
              className={`inline-flex items-center gap-1 p-1 rounded-xl border ${
                isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"
              }`}
            >
              <button
                type="button"
                onClick={() => setSpeed("relaxed")}
                className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  !isFocus
                    ? "bg-indigo-600 text-white shadow-xs"
                    : isDark
                      ? "text-slate-300 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                }`}
              >
                ☕ Relaxed
              </button>
              <button
                type="button"
                onClick={() => setSpeed("focus")}
                className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                  isFocus
                    ? "bg-indigo-600 text-white shadow-xs"
                    : isDark
                      ? "text-slate-300 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-slate-900 hover:bg-black/5"
                }`}
              >
                ⚡ Focus
              </button>
            </div>
          </div>

          {/* Mini Activity Ticker */}
          <div
            className={`pt-2 border-t flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono ${
              isDark
                ? "border-slate-800 text-slate-400"
                : "border-slate-200 text-slate-500"
            }`}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-indigo-500 font-bold shrink-0">&gt;_</span>
              <span className="truncate">{activeTask}</span>
            </div>
            <span
              className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
              }`}
            >
              Interactive
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
