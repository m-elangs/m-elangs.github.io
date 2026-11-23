import { certificates } from "@/data/certificates";

export default function Certificates() {
  return (
    <section id="credentials" aria-label="Certifications and Credentials" className="py-24 md:py-36 hairline-top bg-[#FFFFFF]">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex items-center justify-between hairline-bottom pb-6 mb-10 md:mb-12">
          <div className="flex items-center gap-3">
            <span className="type-label text-[#856404]">06 / Credentials</span>
            <span className="text-border">/</span>
            <span className="type-label text-muted">Certifications &amp; Accreditations</span>
          </div>
          <span className="type-label text-muted">Archive ({certificates.length})</span>
        </div>

        {/* Credentials Table */}
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div
              key={cert.index}
              className="p-6 sm:p-7 rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC] hover:bg-[#FFFFFF] hover:shadow-md transition-all editorial-grid items-center group"
            >
              {/* Index & Year */}
              <div className="col-span-4 md:col-span-2 flex items-baseline justify-between md:block">
                <span className="font-serif text-3xl sm:text-4xl text-[#856404] font-light">
                  {cert.index}
                </span>
                <span className="type-meta text-[#526071] font-bold text-[18px] sm:text-[19px] md:block md:mt-2">{cert.year}</span>
              </div>

              {/* Title & Issuer */}
              <div className="col-span-4 md:col-span-6 mt-2 sm:mt-3 md:mt-0 space-y-1.5 sm:space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-fg font-normal group-hover:text-[#0F172A] transition-colors leading-snug">
                  {cert.title.replace(" [GANTI]", "")}
                </h3>
                <p className="type-meta text-[#526071] text-[18px] sm:text-[19px]">
                  {cert.issuer} &middot; <span className="text-fg/90 font-bold">{cert.category}</span>
                </p>
              </div>

              {/* Credential ID & Link */}
              <div className="col-span-4 md:col-span-4 flex flex-wrap items-center justify-between md:justify-end gap-3 sm:gap-6 mt-3 sm:mt-4 md:mt-0">
                <code className="type-label font-mono text-[#526071] text-[15px] sm:text-[16px] font-semibold">
                  {cert.credentialId.replace("-GANTI", "")}
                </code>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-btn min-h-[48px] px-6 py-3 text-[16px] sm:text-[17px] font-semibold inline-flex items-center justify-center rounded-xl border border-[rgba(15,23,42,0.12)] bg-[#FFFFFF] text-[#0F172A] hover:text-[#856404] hover:border-[#856404] hover:shadow-xs transition-all"
                >
                  VERIFY &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
