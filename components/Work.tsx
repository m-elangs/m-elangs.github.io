"use client";

import Image from "next/image";
import { projects } from "@/data/projects";
import TransitionLink from "@/components/motion/TransitionLink";

export default function Work() {

  return (
    <section id="work" aria-label="Selected Work" className="py-20 sm:py-24 md:py-36 bg-[#FFFFFF] overflow-hidden w-full max-w-full">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="border-b border-[rgba(15,23,42,0.08)] mb-10 sm:mb-14 flex items-center justify-between pb-6">
          <div className="flex items-center gap-3">
            <span className="type-label text-[#856404]">03 / Selected Work</span>
            <span className="text-border">/</span>
            <span className="type-label text-muted">2024 &mdash; 2026</span>
          </div>
          <span className="type-label text-muted">Index ({projects.length})</span>
        </div>

        {/* Project Cards List - Always Visible & Fully Responsive with Dedicated Visual Plates */}
        <div className="space-y-8 sm:space-y-10">
          {projects.map((project) => {
            const title = project.title.replace(" [GANTI]", "");
            const client = project.client.replace(" [GANTI]", "");
            const summary = project.summary.replace(" [GANTI]", "");

            return (
              <article
                key={project.slug}
                className="group relative p-6 sm:p-8 md:p-10 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC] hover:bg-[#FFFFFF] hover:shadow-xl hover:border-[rgba(15,23,42,0.16)] transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Left Column: Project Details & Action */}
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                    {/* Index & Metadata Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-3xl sm:text-4xl text-[#856404] font-light">
                          {project.index}
                        </span>
                        <span className="text-border">/</span>
                        <span className="type-meta text-muted font-bold text-[18px] sm:text-[20px]">
                          {project.year}
                        </span>
                      </div>
                      <span className="type-label text-muted text-[16px]">{project.category}</span>
                    </div>

                    {/* Title */}
                    <div>
                      <TransitionLink href={`/work/${project.slug}`} className="block group-hover:text-[#0F172A]">
                        <h3 className="font-serif text-[clamp(32px,4vw,56px)] font-light text-fg leading-tight transition-transform duration-500 group-hover:translate-x-1.5 break-words">
                          {title}
                        </h3>
                      </TransitionLink>
                      <p className="type-label text-[#856404] mt-2 font-bold text-[16px]">
                        {client}
                      </p>
                    </div>

                    {/* Summary Description */}
                    <p className="type-body-sm text-muted leading-relaxed max-w-2xl">
                      {summary}
                    </p>

                    {/* Role & CTA Button */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <span className="type-meta text-muted text-[18px] sm:text-[20px]">
                        Role: <span className="text-fg/90 font-bold">{project.role}</span>
                      </span>
                      <TransitionLink
                        href={`/work/${project.slug}`}
                        className="btn-ink type-btn min-h-[50px] inline-flex items-center justify-center rounded-xl border border-[rgba(15,23,42,0.12)] bg-[#FFFFFF] px-7 py-3.5 text-fg text-[17px] sm:text-[18px] font-semibold [--ink:#0F172A] group-hover:border-[#0F172A] group-hover:text-[#FFFFFF] transition-colors"
                      >
                        <span>View case</span>
                        <span aria-hidden="true" className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </TransitionLink>
                    </div>
                  </div>

                  {/* Right Column: High Quality Project Preview Plate (Visible on all screens) */}
                  <div className="lg:col-span-5">
                    <TransitionLink href={`/work/${project.slug}`} className="block">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#FFFFFF] shadow-xs group-hover:shadow-md transition-shadow">
                        <Image
                          src={project.coverImage}
                          alt={project.coverAlt.replace(" [GANTI]", "")}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-3 right-3 px-3.5 py-2 rounded-lg bg-[#FFFFFF]/95 backdrop-blur-xs text-[15px] sm:text-[16px] font-mono uppercase tracking-wider text-[#0F172A] font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                          Inspect &rarr;
                        </div>
                      </div>
                    </TransitionLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
