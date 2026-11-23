"use client";

import { useState } from "react";
import { siGithub } from "simple-icons";
import { siteProfile } from "@/data/site";

function MailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="4.5" fill="#0A66C2" />
      <path
        d="M6.94 5a1.94 1.94 0 1 1 0 3.88 1.94 1.94 0 0 1 0-3.88zM5.22 10.15h3.44V20H5.22V10.15zM10.75 10.15h3.3v1.35h.05c.46-.87 1.58-1.79 3.25-1.79 3.48 0 4.12 2.29 4.12 5.27V20h-3.44v-4.5c0-1.07-.02-2.45-1.49-2.45-1.5 0-1.72 1.17-1.72 2.37V20h-3.47V10.15z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#181717">
      <path d={siGithub.path} />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <defs>
        <radialGradient id="ig-contact-brand-gradient" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#ig-contact-brand-gradient)" />
      <path
        d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0z"
        fill="#FFFFFF"
      />
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.8" stroke="#FFFFFF" strokeWidth="1.8" />
    </svg>
  );
}

function getSocialIcon(label: string) {
  switch (label.toLowerCase()) {
    case "linkedin":
      return <LinkedInIcon className="w-5 h-5 shrink-0" />;
    case "github":
      return <GitHubIcon className="w-5 h-5 shrink-0" />;
    case "instagram":
      return <InstagramIcon className="w-5 h-5 shrink-0" />;
    default:
      return null;
  }
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteProfile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      window.location.href = `mailto:${siteProfile.email}`;
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="py-24 sm:py-28 md:py-36 bg-[#FFFFFF] text-fg border-t border-[rgba(15,23,42,0.08)] overflow-hidden w-full max-w-full"
    >
      <div className="editorial-container space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[rgba(15,23,42,0.08)] pb-6">
          <div className="flex items-center gap-3">
            <span className="type-label text-[#856404]">07 / Inquiries</span>
            <span className="text-border">/</span>
            <span className="type-label text-muted">Collaborations</span>
          </div>
          <span className="type-label text-muted">Surabaya, Indonesia</span>
        </div>

        {/* Large Statement Call to Action */}
        <div className="space-y-4 sm:space-y-5">
          <p className="type-label text-[#856404] tracking-[0.2em]">Initiate Dialogue</p>
          <h2 className="type-display text-[#0F172A] font-light max-w-5xl leading-tight">
            Have a project in mind, or an idea that demands quiet precision?
          </h2>
        </div>

        {/* Interactive Copyable Email Banner in Soft Pearl Grey */}
        <div className="border border-[rgba(15,23,42,0.08)] p-6 sm:p-8 md:p-12 lg:p-14 bg-[#F8FAFC] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-10 rounded-2xl shadow-xs">
          <div className="space-y-3 sm:space-y-4 max-w-full">
            <div className="flex items-center gap-3">
              <MailIcon className="w-5 h-5 text-[#856404]" />
              <p className="type-label text-muted text-[16px]">Direct Electronic Mail</p>
            </div>
            <a
              href={`mailto:${siteProfile.email}`}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0F172A] font-light hover:text-[#856404] transition-colors block break-all leading-tight"
            >
              {siteProfile.email}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyEmail}
              data-cursor-hover
              className="type-btn min-h-[52px] px-7 sm:px-9 py-4 text-[17px] sm:text-[18px] bg-[#0F172A] text-[#FFFFFF] font-sans font-semibold rounded-xl transition-transform active:scale-95 hover:bg-[#1E293B] flex items-center justify-center gap-2.5 w-full sm:w-auto shadow-sm"
              aria-live="polite"
            >
              <MailIcon className="w-5 h-5 shrink-0" />
              <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL ADDRESS"}</span>
            </button>
            <a
              href={`mailto:${siteProfile.email}`}
              className="type-btn min-h-[52px] px-7 sm:px-9 py-4 text-[17px] sm:text-[18px] border border-[rgba(15,23,42,0.12)] bg-[#FFFFFF] text-[#0F172A] hover:bg-[#F1F5F9] hover:border-[#856404] font-semibold transition-colors rounded-xl inline-flex items-center justify-center w-full sm:w-auto"
            >
              WRITE EMAIL &rarr;
            </a>
          </div>
        </div>

        {/* Social and Reference Links in Clean Cards */}
        <div className="editorial-grid border-t border-[rgba(15,23,42,0.08)] pt-10 sm:pt-12 items-baseline">
          <div className="col-span-4 md:col-span-3">
            <p className="type-label text-[#856404] text-[16px]">Social &amp; Repositories</p>
          </div>
          <div className="col-span-4 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mt-6 md:mt-0">
            {siteProfile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 sm:p-6 border border-[rgba(15,23,42,0.08)] bg-[#F8FAFC] hover:bg-[#FFFFFF] hover:border-[#856404]/50 hover:shadow-md transition-all space-y-3 min-h-[44px] rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getSocialIcon(social.label)}
                    <span className="type-label text-[#0F172A] text-[17px] sm:text-[18px] font-bold group-hover:text-[#856404] transition-colors">
                      {social.label}
                    </span>
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wider text-[#856404] opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit &rarr;
                  </span>
                </div>
                <p className="type-meta text-muted text-[17px] font-mono truncate">
                  {social.handle}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
