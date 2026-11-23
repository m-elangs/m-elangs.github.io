"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    ) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      const clickable = target?.closest(
        "a, button, [data-cursor-view], [data-cursor-hover]"
      );

      if (clickable) {
        setIsHovered(true);
        if (clickable.getAttribute("data-cursor-view") !== null) {
          setCursorText("VIEW");
        } else {
          setCursorText("");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const render = () => {
      // Smooth lerp for outer ring
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      {/* Center pinpoint */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#9A7B38] transition-transform duration-75 will-change-transform ${
          isHovered ? "scale-0" : "scale-100"
        }`}
      />

      {/* Outer follow circle */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border will-change-transform ${cursorText
          ? "-ml-10 -mt-10 h-20 w-20 border-accent bg-accent text-bg"
          : isHovered
            ? "-ml-6 -mt-6 h-12 w-12 border-accent/70 bg-accent/15"
            : "-ml-4 -mt-4 h-8 w-8 border-fg/30 bg-transparent"
          } transition-[width,height,margin,background-color,border-color] duration-300 ease-out`}
      >
        {cursorText && (
          <span
            ref={labelRef}
            className="text-[13px] font-medium tracking-[0.16em] uppercase"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
