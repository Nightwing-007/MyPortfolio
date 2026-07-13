"use client";

import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";
import GlowingGrid from "./GlowingGrid";
import TypewriterSubtitle from "./TypewriterSubtitle";
import MorphingBlob from "./MorphingBlob";
import { FaChevronDown } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 50,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-bg-base">
      {/* Glowing Grid */}
      <GlowingGrid />

      {/* Morphing blobs behind content */}
      <MorphingBlob
        color="rgba(124, 58, 237, 0.08)"
        size={600}
        className="-top-40 -right-60"
      />
      <MorphingBlob
        color="rgba(0, 163, 224, 0.06)"
        size={500}
        className="-bottom-40 -left-60"
      />
      <MorphingBlob
        color="rgba(16, 185, 129, 0.05)"
        size={400}
        className="top-1/3 left-1/2"
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center flex flex-col items-center max-w-4xl px-4"
      >
        {/* Available badge — neumorphic pill */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mb-8 px-5 py-2.5 neu-pill text-xs font-mono text-text-muted tracking-widest uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-glow-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-glow-green" />
          </span>
          Available for Opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-8xl font-bold mb-6 tracking-tight text-text-primary"
        >
          <ScrambleText text="Deepakraj S" />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl mb-12 font-medium h-8"
        >
          <TypewriterSubtitle />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
          {/* Primary — neumorphic gradient */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            data-cursor
            className="relative px-6 sm:px-8 py-4 min-h-[44px] font-bold text-sm sm:text-base rounded-2xl overflow-hidden group uppercase tracking-wider neu-raised"
            aria-label="View projects section"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-accent to-glow-purple opacity-90 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 text-white flex items-center gap-2">
              View Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.a>

          {/* Secondary — neumorphic flat */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            data-cursor
            className="px-6 sm:px-8 py-4 min-h-[44px] font-bold text-sm sm:text-base rounded-2xl neu-flat text-text-primary uppercase tracking-wider hover:text-glow-purple transition-colors duration-300"
            aria-label="Go to contact section"
          >
            Get In Touch
          </motion.a>

          {/* Download Resume — same style as secondary */}
          <motion.a
            href="https://drive.google.com/file/d/1jPLuRIqS7-X5sRIf3RXcq5lx0aDcIWR9/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            data-cursor
            className="px-6 sm:px-8 py-4 min-h-[44px] font-bold text-sm sm:text-base rounded-2xl neu-flat text-text-primary uppercase tracking-wider hover:text-glow-purple transition-colors duration-300 flex items-center gap-2"
            aria-label="Download resume PDF"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — neumorphic circle */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-text-dim text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-10 h-10 rounded-full neu-flat flex items-center justify-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaChevronDown className="text-glow-purple text-xs" />
        </motion.div>
      </motion.div>
    </section>
  );
}
