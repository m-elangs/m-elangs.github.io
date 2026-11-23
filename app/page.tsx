import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default function HomePage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main className="min-h-dvh">
        <Hero />
        <About />
        <Work />
        <Services />
        <TechStack />
        <Experience />
        <Certificates />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
