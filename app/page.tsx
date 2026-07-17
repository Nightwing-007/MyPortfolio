import { BackgroundLayers, ClientCursor } from "@/components/ClientEffects";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <div className="bg-bg-base text-text-primary min-h-screen overflow-hidden relative">
      {/* Background layers */}
      <BackgroundLayers />

      {/* UI layers */}
      <ScrollProgress />
      <ClientCursor />
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
