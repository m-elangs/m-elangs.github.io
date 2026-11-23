import { siteProfile } from "@/data/site";

export default function About() {
  const studioPrinciples = [
    {
      num: "I",
      title: "Clean Code",
      desc: "Writing structured, readable, and maintainable code to support long-term development.",
    },
    {
      num: "II",
      title: "Functional Design",
      desc: "Building intuitive interfaces with a focus on usability, consistency, and responsive layouts.",
    },
    {
      num: "III",
      title: "Continuous Growth",
      desc: "Learning new technologies and improving development practices through real projects.",
    },
  ];

  return (
    <section id="about" aria-label="About the Practice" className="py-20 sm:py-24 md:py-36 border-y border-[rgba(15,23,42,0.08)] bg-[#F4F6F8] overflow-hidden w-full max-w-full">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b border-[rgba(15,23,42,0.08)] pb-5 sm:pb-6 mb-10 md:mb-16">
          <p className="type-label text-[#856404]">02 / About</p>
          <span className="type-label text-muted text-left sm:text-right">Philosophy &amp; Stance</span>
        </div>

        <div className="space-y-10 sm:space-y-14">
          {/* Statement & Ethos Card */}
          <div className="p-6 sm:p-10 md:p-14 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#FFFFFF] shadow-sm">
            <p className="type-label text-[#856404] mb-3 text-[16px]">Manifesto</p>
            <h2 className="font-serif text-[clamp(32px,3.5vw,54px)] text-fg font-normal leading-snug max-w-4xl">
              Turning ideas into functional applications through thoughtful development.
            </h2>
            <p className="type-body text-muted leading-relaxed mt-6 sm:mt-8 max-w-4xl">
              {siteProfile.bio}
            </p>

            {/* Verified Practice Metrics */}
            <div className="mt-8 pt-8 border-t border-[rgba(15,23,42,0.08)] flex items-center gap-8 sm:gap-14">
              <div>
                <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#0F172A] tracking-tight">
                  6
                </p>
                <p className="text-[17px] sm:text-[18px] font-semibold text-[#526071] mt-1.5">
                  Projects
                </p>
              </div>
              <div className="h-14 w-px bg-[rgba(15,23,42,0.15)]" />
              <div>
                <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#0F172A] tracking-tight">
                  3
                </p>
                <p className="text-[17px] sm:text-[18px] font-semibold text-[#526071] mt-1.5">
                  Years Coding Experience
                </p>
              </div>
            </div>
          </div>

          {/* Principles list */}
          <div className="space-y-6">
            <p className="type-label text-[#0F172A] px-1 text-[16px]">Development Principles</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {studioPrinciples.map((tenet) => (
                <div key={tenet.num} className="p-6 sm:p-8 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#FFFFFF] shadow-sm space-y-3 hover:shadow-md transition-shadow">
                  <span className="text-[20px] font-bold text-[#856404]">{tenet.num}</span>
                  <h3 className="font-serif text-[clamp(26px,2.2vw,34px)] text-fg font-normal leading-snug">{tenet.title}</h3>
                  <p className="type-body-sm text-muted leading-relaxed">{tenet.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
