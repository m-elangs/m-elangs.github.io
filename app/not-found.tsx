import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] flex items-center justify-center pt-32 pb-20 bg-[#FFFFFF]">
        <div className="editorial-container text-center space-y-6">
          <p className="type-label text-[#856404]">404 / Error</p>
          <h1 className="font-serif text-5xl md:text-7xl text-fg font-light">
            Page Not Found
          </h1>
          <p className="type-body text-muted max-w-md mx-auto">
            The page you are looking for has been moved, archived, or does not exist.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="type-btn inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 hairline-frame text-fg hover:border-[#9A7B38] hover:text-[#0F172A] transition-colors"
            >
              &larr; Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
