import type { Metadata, Viewport } from "next";
import { cormorantGaramond, dmSans } from "@/lib/fonts";
import { siteProfile } from "@/data/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteProfile.siteUrl),
  title: {
    default: `${siteProfile.name.replace(" [GANTI]", "")} — ${siteProfile.role.replace(" [GANTI]", "")}`,
    template: `%s — ${siteProfile.name.replace(" [GANTI]", "")}`,
  },
  description: siteProfile.bio.replace(" [GANTI]", ""),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteProfile.siteUrl,
    siteName: siteProfile.name.replace(" [GANTI]", ""),
    title: `${siteProfile.name.replace(" [GANTI]", "")} — ${siteProfile.role.replace(" [GANTI]", "")}`,
    description: siteProfile.bio.replace(" [GANTI]", ""),
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteProfile.name.replace(" [GANTI]", "")} — ${siteProfile.role.replace(" [GANTI]", "")}`,
    description: siteProfile.bio.replace(" [GANTI]", ""),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable}`}
    >
      <body className="bg-bg text-fg font-sans antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
