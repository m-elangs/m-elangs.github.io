import { services } from "@/data/experience";

export default function Services() {
  return (
    <section id="services" aria-label="Services and Capabilities" className="py-20 sm:py-24 md:py-36 border-y border-[rgba(15,23,42,0.08)] bg-[#F4F6F8] overflow-hidden w-full max-w-full">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[rgba(15,23,42,0.08)] pb-6 mb-10 md:mb-12">
          <div className="flex items-center gap-3">
            <span className="type-label text-[#856404]">04 / Services</span>
            <span className="text-border">/</span>
            <span className="type-label text-muted">Core Disciplines</span>
          </div>
          <span className="type-label text-muted">Table Overview</span>
        </div>

        {/* Editorial Table in Distinct Elevated Cards */}
        <div className="space-y-6">
          {services.map((service) => (
            <div
              key={service.index}
              className="p-6 sm:p-8 md:p-10 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-[#FFFFFF] shadow-xs hover:shadow-md transition-all editorial-grid items-start group"
            >
              {/* Index */}
              <div className="col-span-4 md:col-span-2">
                <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#856404] font-light">
                  {service.index}
                </span>
              </div>

              {/* Title & Scope */}
              <div className="col-span-4 md:col-span-5 space-y-3 sm:space-y-4 mt-2 md:mt-0">
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-fg font-normal group-hover:text-[#0F172A] transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="type-body-sm text-muted leading-relaxed max-w-lg">
                  {service.scope.replace(" [GANTI]", "")}
                </p>
              </div>

              {/* Capabilities list */}
              <div className="col-span-4 md:col-span-5 mt-4 sm:mt-6 md:mt-0">
                <p className="type-label text-[#0F172A] mb-3 sm:mb-4 text-[16px]">Deliverables &amp; Tooling</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-[19px] md:text-[21px] font-semibold text-fg/90">
                  {service.capabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 bg-[#856404] rounded-full inline-block shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
