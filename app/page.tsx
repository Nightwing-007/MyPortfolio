import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SectionDivider from "@/components/SectionDivider";

const NoiseOverlay = dynamic(() => import("@/components/NoiseOverlay"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/ParticleField"), { ssr: false });
const FloatingShapes = dynamic(() => import("@/components/FloatingShapes"), { ssr: false });

export default function Home() {
  return (
    <div className="bg-bg-base text-text-primary min-h-screen overflow-hidden relative">
      {/* Background layers */}
      <ParticleField />
      <FloatingShapes />
      <NoiseOverlay />

      {/* UI layers */}
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      {/* Sections */}
      <main className="relative z-[2]">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
      </main>
    </div>
  );
}
