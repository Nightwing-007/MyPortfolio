"use client";

import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaCode,
  FaChevronUp,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import GlitchText from "./GlitchText";
import MorphingBlob from "./MorphingBlob";
import RevealOnScroll from "./RevealOnScroll";

function ContactCard({
  href,
  icon: Icon,
  iconColor,
  label,
  external = false,
  delay = 0,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  label: string;
  external?: boolean;
  delay?: number;
}) {
  return (
    <RevealOnScroll mode="scale-in" delay={delay}>
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="neu-raised p-5 sm:p-6 flex items-center gap-4 group transition-all duration-300 block"
        data-cursor
      >
        {/* Icon — concave container */}
        <div className="w-12 h-12 rounded-xl neu-concave flex items-center justify-center flex-shrink-0">
          <span style={{ color: iconColor }} className="text-xl inline-flex group-hover:scale-110 transition-transform">
            <Icon />
          </span>
        </div>
        <span className="text-text-muted font-medium text-sm sm:text-base break-all group-hover:text-text-primary transition-colors">
          {label}
        </span>
      </motion.a>
    </RevealOnScroll>
  );
}

function StatCard({
  icon: Icon,
  iconColor,
  platform,
  count,
  total,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  platform: string;
  count: number;
  total: number;
  delay?: number;
}) {
  const pct = Math.min((count / total) * 100, 100);

  return (
    <RevealOnScroll mode="fade-up" delay={delay}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="neu-raised p-5 sm:p-6 group transition-all duration-300"
        data-cursor
      >
        <div className="flex items-center gap-3 mb-4">
          <span style={{ color: iconColor }} className="text-xl inline-flex">
            <Icon />
          </span>
          <div>
            <p className="text-text-primary font-bold text-sm">{platform}</p>
            <p className="text-text-muted text-xs">{count} solved</p>
          </div>
        </div>

        {/* Progress bar — inset track */}
        <div className="w-full h-2 neu-inset !rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${iconColor}, ${iconColor}88)` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </div>
      </motion.div>
    </RevealOnScroll>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 px-4 md:px-12 bg-bg-base z-[2] overflow-hidden"
    >
      {/* Blob behind section */}
      <MorphingBlob
        color="rgba(0, 163, 224, 0.06)"
        size={500}
        className="-top-20 -right-40"
      />
      <MorphingBlob
        color="rgba(16, 185, 129, 0.05)"
        size={400}
        className="-bottom-20 -left-40"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <RevealOnScroll mode="blur-in">
          <div className="text-center mb-4">
            <GlitchText
              text="Get In Touch"
              className="text-3xl sm:text-4xl font-bold text-text-primary"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll mode="fade-up" delay={0.1}>
          <p className="text-center text-text-muted mb-12 text-base sm:text-lg">
            Let&apos;s build something amazing together.
          </p>
        </RevealOnScroll>

        {/* Contact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <ContactCard
            href="mailto:deepakraj.s2024cse@sece.ac.in"
            icon={FaEnvelope}
            iconColor="#00A3E0"
            label="deepakraj.s2024cse@sece.ac.in"
            delay={0.1}
          />
          <ContactCard
            href="tel:9444308768"
            icon={FaPhone}
            iconColor="#10B981"
            label="9444308768"
            delay={0.15}
          />
          <ContactCard
            href="https://github.com/Nightwing-007"
            icon={FaGithub}
            iconColor="var(--t-primary)"
            label="github.com/Nightwing-007"
            external
            delay={0.2}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16">
          <StatCard
            icon={SiLeetcode}
            iconColor="#FFA116"
            platform="LeetCode"
            count={219}
            total={500}
            delay={0.25}
          />
          <StatCard
            icon={FaCode}
            iconColor="#10B981"
            platform="Skillrack"
            count={1279}
            total={2000}
            delay={0.3}
          />
        </div>

        {/* Footer */}
        <RevealOnScroll mode="fade-up" delay={0.3}>
          <div className="flex flex-col items-center gap-6 pt-8">
            {/* Neumorphic separator */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neu-dark/40 to-transparent mb-4" />

            {/* Back to top */}
            <motion.button
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-11 h-11 rounded-full neu-raised flex items-center justify-center text-text-muted hover:text-glow-purple transition-colors"
              data-cursor
              aria-label="Back to top"
            >
              <FaChevronUp className="text-sm" />
            </motion.button>

            <p className="text-text-dim text-xs sm:text-sm tracking-widest uppercase font-mono">
              © {new Date().getFullYear()} Deepakraj S. All rights reserved.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
