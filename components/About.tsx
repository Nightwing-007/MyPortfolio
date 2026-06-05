"use client";

import { motion } from "framer-motion";
import GlitchText from "./GlitchText";
import AnimatedBorder from "./AnimatedBorder";
import RevealOnScroll from "./RevealOnScroll";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiSpringboot,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const skills = [
  { name: "C", icon: SiC, color: "#A8B9CC" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Spring-Boot", icon: SiSpringboot, color: "#6DB33F" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 px-4 md:px-12 bg-bg-base z-[2]"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
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
          <AnimatedBorder className="rounded-2xl mt-4">
            <div className="p-6 sm:p-8 relative">
              <div className="flex items-start gap-4">
                {/* Icon — neumorphic concave */}
                <div className="w-12 h-12 rounded-xl neu-concave flex items-center justify-center flex-shrink-0">
                  <FaBriefcase className="text-glow-purple text-sm" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-text-primary">
                    Winter MERN Stack Internship
                  </h4>
                  <p className="text-cyan-accent font-mono text-sm mb-3">
                    AlgoTutor — 2025
                  </p>
                  <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                    Built full-stack applications with REST APIs, authentication,
                    and database integration.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedBorder>
        </RevealOnScroll>

        {/* Skills */}
        <RevealOnScroll mode="fade-up" delay={0.2}>
          <GlitchText
            text="Tech Stack"
            className="text-2xl sm:text-3xl font-semibold text-text-primary mb-6"
          />

          <div className="w-full overflow-hidden py-6 -mt-2 -mb-6">
            <motion.div
              className="flex gap-3 sm:gap-4 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {[...skills, ...skills].map((skill, index) => {
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
