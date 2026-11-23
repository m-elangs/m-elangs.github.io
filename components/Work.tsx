"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import type { ProjectItem } from "@/data/projects";
import TransitionLink from "@/components/motion/TransitionLink";

export default function Work() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const openInspector = (project: ProjectItem, initialIndex = 0) => {
    setActiveProject(project);
    setSlideIndex(initialIndex);
  };

  const closeInspector = () => {
    setActiveProject(null);
    setSlideIndex(0);
  };

  useEffect(() => {
    if (!activeProject) return;
    const total = activeProject.galleryImages.length;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeInspector();
      if (e.key === "ArrowRight") setSlideIndex((prev) => (prev + 1) % total);
      if (e.key === "ArrowLeft") setSlideIndex((prev) => (prev - 1 + total) % total);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject]);

  return (
    <section
      id="work"
      aria-label="Selected Work"
      className="py-20 sm:py-24 md:py-36 bg-[#FFFFFF] overflow-hidden w-full max-w-full"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div className="border-b border-[rgba(15,23,42,0.08)] mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 pb-5 sm:pb-6">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="type-label text-[#856404]">03 / Selected Work</span>
            <span className="text-border">/</span>
            <span className="type-label text-muted">2024 &mdash; 2026</span>
          </div>
          <span className="type-label text-muted text-left sm:text-right">
            Index ({projects.length})
          </span>
        </div>

        {/* 2-Column Vertical Project Cards Grid (Clean & Proportional like Reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project) => {
            const title = project.title.replace(" [GANTI]", "");
            const client = project.client.replace(" [GANTI]", "");
            const summary = project.summary.replace(" [GANTI]", "");
            const approach = project.approach.replace(" [GANTI]", "");
            const outcome = project.outcome.replace(" [GANTI]", "");
            const slideCount = project.galleryImages.length;

            return (
              <article
                key={project.slug}
                className="group flex flex-col rounded-2xl border border-[rgba(15,23,42,0.1)] bg-[#FFFFFF] hover:shadow-xl hover:border-[rgba(15,23,42,0.2)] transition-all duration-500 overflow-hidden"
              >
                {/* Top Preview Area with Category Pill & Clickable Inspect Button */}
                <div className="relative p-3 sm:p-4 bg-[#F8FAFC] border-b border-[rgba(15,23,42,0.08)]">
                  <div
                    onClick={() => openInspector(project, 0)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openInspector(project, 0);
                      }
                    }}
                    aria-label={`Inspect ${title} website photo slides`}
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#FFFFFF] shadow-xs cursor-pointer"
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.coverAlt.replace(" [GANTI]", "")}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/45 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                    {/* Top-Left Category Badge (Like Friend's Reference) */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/95 backdrop-blur-xs text-[#0F172A] text-[12px] sm:text-[13px] font-semibold shadow-sm border border-[rgba(15,23,42,0.08)]">
                        {project.category}
                      </span>
                    </div>

                    {/* Top-Right Search/Magnify Icon Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openInspector(project, 0);
                      }}
                      aria-label={`Open ${title} photo slideshow`}
                      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#FFFFFF]/95 backdrop-blur-xs text-[#0F172A] hover:bg-[#0F172A] hover:text-[#FFFFFF] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
                      </svg>
                    </button>

                    {/* Bottom-Right Interactive Inspect Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openInspector(project, 0);
                      }}
                      className="absolute bottom-3 right-3 z-10 px-3.5 py-1.5 rounded-lg bg-[#FFFFFF]/95 hover:bg-[#0F172A] text-[#0F172A] hover:text-[#FFFFFF] backdrop-blur-xs text-[12px] sm:text-[13px] font-mono uppercase tracking-wider font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Inspect ({slideCount})</span>
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>

                {/* Card Body: Title, Rich Description, Action Buttons & Tech Stack Pills */}
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    {/* Index, Client & Year */}
                    <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-mono text-[#856404] font-semibold">
                      <span>
                        {project.index} &middot; {client}
                      </span>
                      <span>{project.year}</span>
                    </div>

                    {/* Project Title */}
                    <TransitionLink
                      href={`/work/${project.slug}`}
                      className="block group-hover:text-[#0F172A]"
                    >
                      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-fg leading-snug break-words">
                        {title} &mdash; {project.role}
                      </h3>
                    </TransitionLink>

                    {/* Detailed Paragraph Description (Matching Friend's Card Layout) */}
                    <p className="text-[15px] sm:text-[16px] text-muted leading-relaxed">
                      {summary} {approach} {outcome}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Action Buttons Row: View Case + Inspect Slides */}
                    <div className="flex flex-wrap items-center gap-3">
                      <TransitionLink
                        href={`/work/${project.slug}`}
                        className="min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl border border-[#0F172A]/20 bg-[#FFFFFF] hover:bg-[#0F172A] text-[#0F172A] hover:text-[#FFFFFF] text-[14px] sm:text-[15px] font-semibold inline-flex items-center gap-2 transition-colors shadow-2xs"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                          />
                        </svg>
                        <span>View Case</span>
                      </TransitionLink>

                      <button
                        type="button"
                        onClick={() => openInspector(project, 0)}
                        className="min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl border border-[rgba(15,23,42,0.12)] bg-[#F8FAFC] hover:bg-[#0F172A] text-[#0F172A] hover:text-[#FFFFFF] text-[14px] sm:text-[15px] font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <circle cx="8.5" cy="9.5" r="1.5" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 20" />
                        </svg>
                        <span>Inspect Slides ({slideCount})</span>
                      </button>
                    </div>

                    {/* Tech Stack Pill Tags (Bottom Row like Friend's Card) */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {project.deliverables.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1 rounded-full bg-[#F4F6F8] border border-[rgba(15,23,42,0.08)] text-[#0F172A] text-[12px] sm:text-[13px] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Interactive Website Photo Slideshow Lightbox Modal (When Inspect is Clicked) */}
      {activeProject && (() => {
        const currentSlide = activeProject.galleryImages[slideIndex] ?? activeProject.galleryImages[0];
        if (!currentSlide) return null;
        return (
        <div
          onClick={closeInspector}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title.replace(" [GANTI]", "")} Photo Slideshow`}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-2xl bg-[#0F172A] border border-white/15 text-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 flex items-center justify-between gap-3 bg-slate-900/90">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
                  <span>{activeProject.index}</span>
                  <span>/</span>
                  <span className="truncate">{activeProject.category}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white truncate">
                  {activeProject.title.replace(" [GANTI]", "")}
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-200">
                  Slide {slideIndex + 1} / {activeProject.galleryImages.length}
                </span>
                <button
                  type="button"
                  onClick={closeInspector}
                  aria-label="Close photo inspector"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Active Slide Image Viewport */}
            <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
              <Image
                src={currentSlide.src}
                alt={currentSlide.alt.replace(" [GANTI]", "")}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain p-2 sm:p-4"
              />

              {/* Previous Slide Button */}
              <button
                type="button"
                onClick={() =>
                  setSlideIndex(
                    (prev) =>
                      (prev - 1 + activeProject.galleryImages.length) %
                      activeProject.galleryImages.length
                  )
                }
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-slate-950 border border-white/20 flex items-center justify-center transition-all shadow-lg cursor-pointer"
              >
                &larr;
              </button>

              {/* Next Slide Button */}
              <button
                type="button"
                onClick={() =>
                  setSlideIndex((prev) => (prev + 1) % activeProject.galleryImages.length)
                }
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-slate-950 border border-white/20 flex items-center justify-center transition-all shadow-lg cursor-pointer"
              >
                &rarr;
              </button>
            </div>

            {/* Slide Caption & Thumbnail Selector Bar */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-white/10 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-300 font-mono">
                {currentSlide.caption}
              </p>

              {/* Slide Selector Pills */}
              <div className="flex items-center gap-2 shrink-0">
                {activeProject.galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSlideIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      idx === slideIndex
                        ? "bg-teal-400 text-slate-950 shadow-sm"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        );
      })()}
    </section>
  );
}
