import { experience } from "@/data/experience";

export default function Experience() {
  const workItems = experience.filter((item) => item.type === "work");
  const educationItems = experience.filter((item) => item.type === "education");

  return (
    <section id="experience" aria-label="Experience & Background" className="py-20 sm:py-24 md:py-36 border-y border-[rgba(15,23,42,0.08)] bg-[#F4F6F8]">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[rgba(15,23,42,0.08)] pb-6 mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="type-label text-[#856404]">05 / Background</span>
            <span className="text-border">/</span>
            <span className="type-label text-muted">Chronology</span>
          </div>
          <span className="type-label text-muted">2016 &mdash; Present</span>
        </div>

        <div className="editorial-grid gap-y-12">
          {/* Work History */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 space-y-6 sm:space-y-8">
            <h3 className="type-label text-[#0F172A] px-1 text-[16px] sm:text-[17px]">
              Professional Practice &middot; Work
            </h3>
            <div className="space-y-4">
              {workItems.map((item, idx) => (
                <div key={idx} className="p-6 sm:p-7 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#FFFFFF] shadow-xs space-y-2.5 sm:space-y-3 group hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                    <h4 className="font-serif text-[clamp(26px,2.2vw,34px)] text-fg font-normal group-hover:text-[#0F172A] transition-colors leading-snug">
                      {item.role.replace(" [GANTI]", "")}
                    </h4>
                    <span className="type-meta text-[#856404] font-bold text-[17px] sm:text-[19px] shrink-0">{item.period}</span>
                  </div>
                  <p className="type-meta text-[#526071] font-semibold text-[18px] sm:text-[19px]">
                    {item.organization} &middot; {item.location}
                  </p>
                  <p className="type-body-sm text-muted leading-relaxed pt-1">
                    {item.note.replace(" [GANTI]", "")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:pl-10 space-y-6 sm:space-y-8">
            <h3 className="type-label text-[#0F172A] px-1 text-[16px] sm:text-[17px]">
              Formal Education &middot; Degrees
            </h3>
            <div className="space-y-4">
              {educationItems.map((item, idx) => (
                <div key={idx} className="p-6 sm:p-7 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#FFFFFF] shadow-xs space-y-2.5 sm:space-y-3 group hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                    <h4 className="font-serif text-[clamp(26px,2.2vw,34px)] text-fg font-normal group-hover:text-[#0F172A] transition-colors leading-snug">
                      {item.role.replace(" [GANTI]", "")}
                    </h4>
                    <span className="type-meta text-[#856404] font-bold text-[17px] sm:text-[19px] shrink-0">{item.period}</span>
                  </div>
                  <p className="type-meta text-[#526071] font-semibold text-[18px] sm:text-[19px]">
                    {item.organization} &middot; {item.location}
                  </p>
                  <p className="type-body-sm text-muted leading-relaxed pt-1">
                    {item.note.replace(" [GANTI]", "")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
