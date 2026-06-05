import Navbar from "@/components/Navbar";
import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import ParticleField from "@/components/ParticleField";
import FloatingShapes from "@/components/FloatingShapes";
import SectionDivider from "@/components/SectionDivider";

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
