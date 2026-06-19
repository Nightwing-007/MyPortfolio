"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaChevronUp,
  FaTrophy,
  FaPaperPlane,
} from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks, SiHackerrank } from "react-icons/si";
import GlitchText from "./GlitchText";
import MorphingBlob from "./MorphingBlob";
import RevealOnScroll from "./RevealOnScroll";
import { useCodingStats } from "@/hooks/useCodingStats";

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
        aria-label={label}
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
  loading = false,
  href,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  platform: string;
  count: number;
  total: number;
  loading?: boolean;
  href: string;
  delay?: number;
}) {
  const pct = Math.min((count / total) * 100, 100);

  return (
    <RevealOnScroll mode="fade-up" delay={delay}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -4 }}
        className="neu-raised p-5 sm:p-6 group transition-all duration-300 block"
        data-cursor
        aria-label={`${platform} coding profile`}
      >
        <div className="flex items-center gap-3 mb-4">
          <span style={{ color: iconColor }} className="text-xl inline-flex">
            <Icon />
          </span>
          <div>
            <p className="text-text-primary font-bold text-sm">{platform}</p>
            {loading ? (
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full border-2 border-t-transparent"
                  style={{ borderColor: `${iconColor} transparent ${iconColor} ${iconColor}`, animation: "spin-slow 1s linear infinite" }}
                />
                <p className="text-text-dim text-xs font-mono">Loading...</p>
              </div>
            ) : (
              <p className="text-text-muted text-xs">{count} solved</p>
            )}
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
      </motion.a>
    </RevealOnScroll>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch {
      // Silently fail — Formspree handles validation
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <RevealOnScroll mode="scale-in">
        <div className="neu-raised p-8 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-full neu-concave flex items-center justify-center mx-auto mb-4">
            <FaPaperPlane className="text-glow-green text-xl" />
          </div>
          <h4 className="text-xl font-bold text-text-primary mb-2">
            Message Sent!
          </h4>
          <p className="text-text-muted text-sm">
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSubmitted(false)}
            className="mt-6 px-6 py-2 text-sm font-mono text-glow-purple neu-pill uppercase tracking-wider hover:text-text-primary transition-colors"
            data-cursor
          >
            Send Another
          </motion.button>
        </div>
      </RevealOnScroll>
    );
  }

  return (
    <RevealOnScroll mode="fade-up" delay={0.15}>
      <form
        action="https://formspree.io/f/YOUR_FORM_ID"
        method="POST"
        onSubmit={handleSubmit}
        className="neu-raised p-6 sm:p-8 flex flex-col gap-5"
      >
        <h3 className="text-lg font-bold text-text-primary mb-1">
          Send a Message
        </h3>

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-text-muted text-xs font-mono uppercase tracking-wider"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="w-full px-4 py-3 text-sm text-text-primary placeholder:text-text-dim bg-transparent neu-inset !rounded-xl outline-none focus:ring-1 focus:ring-glow-purple/40 transition-shadow font-medium"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-text-muted text-xs font-mono uppercase tracking-wider"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 text-sm text-text-primary placeholder:text-text-dim bg-transparent neu-inset !rounded-xl outline-none focus:ring-1 focus:ring-glow-purple/40 transition-shadow font-medium"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-message"
            className="text-text-muted text-xs font-mono uppercase tracking-wider"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            placeholder="Tell me about your project or just say hello..."
            className="w-full px-4 py-3 text-sm text-text-primary placeholder:text-text-dim bg-transparent neu-inset !rounded-xl outline-none focus:ring-1 focus:ring-glow-purple/40 transition-shadow font-medium resize-none"
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="relative w-full py-3.5 font-bold text-sm rounded-2xl overflow-hidden group uppercase tracking-wider neu-raised disabled:opacity-60 disabled:cursor-not-allowed"
          data-cursor
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-accent to-glow-purple opacity-90 group-hover:opacity-100 transition-opacity rounded-2xl" />
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative z-10 text-white flex items-center justify-center gap-2">
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <FaPaperPlane className="text-xs" />
                Send Message
              </>
            )}
          </span>
        </motion.button>
      </form>
    </RevealOnScroll>
  );
}

export default function Contact() {
  const { leetCodeSolved, gfgSolved, isLoading } = useCodingStats();

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

        {/* Two-column: Contact info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Left — Contact cards */}
          <div className="flex flex-col gap-4 sm:gap-6">
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
            <ContactCard
              href="https://www.linkedin.com/in/deepakraj-s-76392a314/"
              icon={FaLinkedin}
              iconColor="#0A66C2"
              label="linkedin.com/in/deepakraj-s"
              external
              delay={0.25}
            />
          </div>

          {/* Right — Contact Form */}
          <ContactForm />
        </div>

        {/* Coding Profiles */}
        <RevealOnScroll mode="fade-up" delay={0.2}>
          <GlitchText
            text="Coding Profiles"
            className="text-2xl sm:text-3xl font-semibold text-text-primary mb-6"
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16">
          <StatCard
            icon={SiLeetcode}
            iconColor="#FFA116"
            platform="LeetCode"
            count={leetCodeSolved}
            total={500}
            loading={isLoading}
            href="https://leetcode.com/u/S_Deepakraj/"
            delay={0.25}
          />
          <StatCard
            icon={SiGeeksforgeeks}
            iconColor="#2F8D46"
            platform="GeeksforGeeks"
            count={gfgSolved}
            total={300}
            loading={isLoading}
            href="https://www.geeksforgeeks.org/profile/deepakraj_s"
            delay={0.3}
          />
          <StatCard
            icon={SiHackerrank}
            iconColor="#00EA64"
            platform="HackerRank"
            count={50}
            total={200}
            loading={false}
            href="https://www.hackerrank.com/profile/deepakraj_s20241"
            delay={0.35}
          />
          <StatCard
            icon={FaTrophy}
            iconColor="#10B981"
            platform="Skillrack"
            count={1279}
            total={2000}
            loading={false}
            href="https://www.skillrack.com/faces/resume.xhtml?id=514892&key=8b7f1a5fb7aa85472035223a779bcf00b15fad53"
            delay={0.4}
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
