"use client";

import { motion } from "framer-motion";
import GlitchText from "./GlitchText";
import AnimatedBorder from "./AnimatedBorder";
import RevealOnScroll from "./RevealOnScroll";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { skillCategories, allSkills, experiences, certifications } from "@/lib/data";


export default function About() {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 px-4 md:px-12 bg-bg-base z-[2]"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10 sm:gap-16">
        {/* About Me */}
        <RevealOnScroll mode="fade-up">
          <GlitchText
            text="About Me"
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-8"
          />
          <div className="neu-raised p-6 sm:p-8 mt-4">
            <p className="text-base sm:text-lg text-text-muted leading-relaxed">
              I am a Computer Science student at Sri Eshwar College of Engineering
              (Class of 2028). I enjoy designing performant systems and have a
              strong foundation in Data Structures, Algorithms, and
              Object-Oriented Programming.
            </p>

            {/* Stats row — neumorphic inset */}
            <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-neu-dark/20">
              <div className="flex items-center gap-2 text-sm text-text-muted neu-inset !rounded-full px-4 py-2">
                <FaGraduationCap className="text-glow-purple" />
                <span>Class of 2028</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted neu-inset !rounded-full px-4 py-2">
                <span className="text-glow-green">📍</span>
                <span>Sri Eshwar College of Engineering</span>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Experience */}
        <RevealOnScroll mode="fade-left" delay={0.1}>
          <GlitchText
            text="Experience"
            className="text-2xl sm:text-3xl font-semibold text-text-primary mb-6"
          />
          <div className="flex flex-col gap-6 mt-4">
            {experiences.map((exp, idx) => (
              <AnimatedBorder key={idx} className="rounded-2xl">
                <div className="p-6 sm:p-8 relative">
                  <div className="flex items-start gap-4">
                    {/* Icon — neumorphic concave */}
                    <div className="w-12 h-12 rounded-xl neu-concave flex items-center justify-center flex-shrink-0">
                      <FaBriefcase className="text-glow-purple text-sm" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-text-primary">
                        {exp.title}
                      </h4>
                      <p className="text-cyan-accent font-mono text-sm mb-3">
                        {exp.company}
                      </p>
                      <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-3">
                        {exp.description}
                      </p>
                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-xs font-mono text-glow-green neu-inset !rounded-full uppercase tracking-wider"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedBorder>
            ))}
          </div>
        </RevealOnScroll>

        {/* Certifications */}
        <RevealOnScroll mode="fade-up" delay={0.15}>
          <GlitchText
            text="Certifications"
            className="text-2xl sm:text-3xl font-semibold text-text-primary mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {certifications.map((cert, idx) => (
              <AnimatedBorder key={idx} className="rounded-2xl h-full">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full neu-raised dark:bg-[#0a0a0a] dark:border dark:border-white/[0.08] p-6 sm:p-8 relative group rounded-2xl"
                  aria-label={`View certification for ${cert.title}`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg sm:text-xl font-bold text-zinc-800 dark:text-zinc-100 pr-4">
                          {cert.title}
                        </h4>
                        <ExternalLink className="text-text-muted group-hover:text-glow-purple transition-colors w-5 h-5 flex-shrink-0" />
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 font-mono text-sm mb-4">
                        {cert.issuer}
                      </p>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-mono text-glow-green neu-inset !rounded-full uppercase tracking-wider">
                        {cert.highlight}
                      </span>
                    </div>
                  </div>
                </a>
              </AnimatedBorder>
            ))}
          </div>
        </RevealOnScroll>

        {/* Skills */}
        <RevealOnScroll mode="fade-up" delay={0.2}>
          <GlitchText
            text="Tech Stack"
            className="text-2xl sm:text-3xl font-semibold text-text-primary mb-6"
          />

          {/* Category labels */}
          <div className="flex flex-wrap gap-3 mb-4">
            {skillCategories.map((cat) => (
              <span
                key={cat.label}
                className="px-4 py-1.5 text-xs font-mono text-text-muted neu-inset !rounded-full uppercase tracking-wider"
              >
                {cat.label}
              </span>
            ))}
          </div>

          <div className="w-full overflow-hidden py-6 -mt-2 -mb-6">
            <motion.div
              className="flex gap-3 sm:gap-4 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {[...allSkills, ...allSkills].map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    whileHover={{
                      scale: 1.05,
                      y: -4,
                      boxShadow: `0 0 20px ${skill.color}50, inset 0 0 10px ${skill.color}20`,
                      borderColor: `${skill.color}80`,
                      backgroundColor: `${skill.color}0a`,
                    }}
                    style={{
                      border: "1px solid transparent",
                    }}
                    className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 neu-pill cursor-pointer whitespace-nowrap group transition-all duration-300"
                    data-cursor
                  >
                    <span style={{ color: skill.color }} className="text-base sm:text-lg inline-flex transition-transform group-hover:scale-110">
                      <Icon />
                    </span>
                    <span className="text-text-muted text-sm font-medium group-hover:text-text-primary transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
