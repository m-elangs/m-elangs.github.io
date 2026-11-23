import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { siteProfile } from "@/data/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  const cleanTitle = project.title.replace(" [GANTI]", "");
  const cleanSummary = project.summary.replace(" [GANTI]", "");

  return {
    title: `${cleanTitle} — ${project.category}`,
    description: cleanSummary,
    openGraph: {
      title: `${cleanTitle} — ${siteProfile.name.replace(" [GANTI]", "")}`,
      description: cleanSummary,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(slug);
  const cleanTitle = project.title.replace(" [GANTI]", "");
  const cleanClient = project.client.replace(" [GANTI]", "");
  const cleanSummary = project.summary.replace(" [GANTI]", "");
  const cleanChallenge = project.challenge.replace(" [GANTI]", "");
  const cleanApproach = project.approach.replace(" [GANTI]", "");
  const cleanOutcome = project.outcome.replace(" [GANTI]", "");

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />

      <main className="min-h-dvh pt-32 sm:pt-36 pb-20 sm:pb-28 bg-[#FFFFFF]">
        <article className="editorial-container space-y-14 sm:space-y-20 md:space-y-28">
          {/* Back Navigation & Breadcrumb */}
          <nav aria-label="Breadcrumb" className="hairline-bottom pb-6">
            <Link
              href="/#work"
              className="type-label text-[#856404] hover:text-[#0F172A] transition-colors inline-flex items-center gap-2.5 group min-h-[44px]"
            >
              <span
                aria-hidden="true"
                className="transform group-hover:-translate-x-1.5 transition-transform text-lg"
              >
                &larr;
              </span>
              <span>INDEX / ARCHIVE</span>
            </Link>
          </nav>

          {/* Project Title & Summary */}
          <header className="space-y-6 sm:space-y-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-serif text-[clamp(28px,2vw,32px)] text-[#856404]">{project.index}</span>
              <span className="text-border">/</span>
              <span className="type-label text-muted">{project.category}</span>
              <span className="text-border">/</span>
              <span className="type-meta text-muted">{project.year}</span>
            </div>

            <h1 className="type-display text-fg font-light break-words">
              {cleanTitle}
            </h1>

            <p className="type-lead text-muted max-w-4xl leading-relaxed">
              {cleanSummary}
            </p>
          </header>

          {/* Project Metadata Matrix */}
          <div className="rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC] p-6 sm:p-8 md:p-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <p className="type-label text-[#856404]">Client</p>
              <p className="text-fg/90 mt-1.5 text-[clamp(18px,0.3vw+17px,20px)] font-medium">{cleanClient}</p>
            </div>
            <div>
              <p className="type-label text-[#856404]">Discipline / Role</p>
              <p className="text-fg/90 mt-1.5 text-[clamp(18px,0.3vw+17px,20px)] font-medium">{project.role}</p>
            </div>
            <div>
              <p className="type-label text-[#856404]">Timeline</p>
              <p className="text-fg/90 mt-1.5 text-[clamp(18px,0.3vw+17px,20px)] font-medium">{project.year}</p>
            </div>
            <div>
              <p className="type-label text-[#856404]">Artifact</p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0F172A] hover:text-[#856404] mt-1.5 text-[clamp(18px,0.3vw+17px,20px)] inline-flex items-center gap-1.5 font-medium transition-colors min-h-[44px]"
              >
                <span>Live Release</span>
                <span aria-hidden="true">&nearr;</span>
              </a>
            </div>
          </div>

          {/* Hero Cover Image Plate */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC] shadow-xs">
            <Image
              src={project.coverImage}
              alt={project.coverAlt.replace(" [GANTI]", "")}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Narrative Case Study: Challenge & Approach */}
          <section aria-labelledby="case-narrative" className="editorial-grid pt-6 sm:pt-8 gap-y-8">
            <div className="col-span-4 md:col-span-3">
              <h2 id="case-narrative" className="type-label text-[#0F172A]">
                The Brief &amp; Execution
              </h2>
            </div>
            <div className="col-span-4 md:col-span-9 space-y-6">
              <div className="p-6 sm:p-8 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC] space-y-3">
                <h3 className="font-serif text-[clamp(24px,2vw,30px)] text-fg font-normal">The Core Problem</h3>
                <p className="type-body text-muted leading-relaxed">
                  {cleanChallenge}
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC] space-y-3">
                <h3 className="font-serif text-[clamp(24px,2vw,30px)] text-fg font-normal">Architectural Approach</h3>
                <p className="type-body text-muted leading-relaxed">
                  {cleanApproach}
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC] space-y-3">
                <h3 className="font-serif text-[clamp(24px,2vw,30px)] text-fg font-normal">Measured Outcome</h3>
                <p className="type-body text-muted leading-relaxed">
                  {cleanOutcome}
                </p>
              </div>
            </div>
          </section>

          {/* Key Metrics Strip */}
          <section aria-label="Key Performance Metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-6 sm:p-7 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC] shadow-xs"
              >
                <p className="font-serif text-[clamp(40px,4vw,64px)] text-[#0F172A] font-light leading-none">
                  {metric.value}
                </p>
                <p className="type-label text-[#856404] mt-3">{metric.label}</p>
              </div>
            ))}
          </section>

          {/* Deliverables Table */}
          <section aria-label="Project Deliverables" className="editorial-grid">
            <div className="col-span-4 md:col-span-3">
              <h3 className="type-label text-[#0F172A]">Scope &amp; Deliverables</h3>
            </div>
            <div className="col-span-4 md:col-span-9 mt-6 md:mt-0">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-[17px] md:text-[18px] text-fg/90">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-3 hairline-bottom pb-3">
                    <span className="h-2 w-2 bg-[#856404] rounded-full inline-block shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Gallery Plates */}
          <section aria-label="Project Gallery" className="space-y-8 sm:space-y-10 pt-6 sm:pt-10">
            <h3 className="type-label text-[#0F172A]">Monograph Plates</h3>
            <div className="space-y-10 sm:space-y-16">
              {project.galleryImages.map((plate, index) => (
                <figure key={index} className="space-y-3 sm:space-y-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden hairline-frame bg-[#F8F9FA]">
                    <Image
                      src={plate.src}
                      alt={plate.alt.replace(" [GANTI]", "")}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between type-meta text-muted">
                    <span className="text-[#856404] font-medium">Plate 0{index + 1}</span>
                    <span>{plate.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Adjacent Project Navigation Portal */}
          <nav aria-label="Next Case Study" className="hairline-top pt-12 sm:pt-20">
            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4 sm:gap-8">
              <Link
                href={`/work/${previous.slug}`}
                className="group flex-1 hairline-frame p-6 sm:p-8 md:p-10 hover:bg-[#F8F9FA] transition-colors min-h-[44px]"
              >
                <span className="type-label text-[#856404]">&larr; PREVIOUS CASE</span>
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-fg font-light mt-3 group-hover:text-[#0F172A] transition-colors">
                  {previous.title.replace(" [GANTI]", "")}
                </p>
                <span className="type-meta text-muted mt-2 block">
                  {previous.category}
                </span>
              </Link>

              <Link
                href={`/work/${next.slug}`}
                className="group flex-1 hairline-frame p-6 sm:p-8 md:p-10 text-left sm:text-right hover:bg-[#F8F9FA] transition-colors min-h-[44px]"
              >
                <span className="type-label text-[#856404]">NEXT CASE &rarr;</span>
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-fg font-light mt-3 group-hover:text-[#0F172A] transition-colors">
                  {next.title.replace(" [GANTI]", "")}
                </p>
                <span className="type-meta text-muted mt-2 block">
                  {next.category}
                </span>
              </Link>
            </div>
          </nav>
        </article>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
