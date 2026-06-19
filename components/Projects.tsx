"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import GlitchText from "./GlitchText";
import AnimatedBorder from "./AnimatedBorder";
import RevealOnScroll from "./RevealOnScroll";
import { FaTerminal, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects, notableMentions, techIcons, type Project } from "@/lib/data";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  // Disable 3D tilt on touch / coarse-pointer devices
  const isTouchRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    isTouchRef.current = window.matchMedia("(pointer: coarse)").matches;
    setMounted(true);
  }, []);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    if (isTouchRef.current) return; // skip tilt on touch devices
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const posX = clientX - left;
    const posY = clientY - top;
    mouseX.set(posX);
    mouseY.set(posY);
    x.set(posX / width - 0.5);
    y.set(posY / height - 0.5);
  }

  function handleMouseLeave() {
    if (isTouchRef.current) return;
    x.set(0);
    y.set(0);
  }

  const shineBg = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15), transparent 80%)`;

  return (
    <RevealOnScroll mode={index % 2 === 0 ? "fade-left" : "fade-right"} delay={index * 0.15}>
      <AnimatedBorder className="rounded-2xl h-full">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={isTouchRef.current && mounted ? undefined : { y: -4 }}
          style={
            isTouchRef.current && mounted
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformPerspective: 1000,
                }
          }
          className="relative group cursor-pointer overflow-hidden rounded-2xl h-full"
          data-cursor
        >
          {/* Shine sweep on hover */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 z-0 rounded-2xl"
            style={{ background: shineBg }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl neu-concave flex items-center justify-center">
                <FaTerminal className="text-cyan-accent text-sm" />
              </div>
              <div className="flex items-center gap-2">
                {/* Clickable icons for Live and Repos */}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full neu-pill flex items-center justify-center text-text-muted hover:text-cyan-accent transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${project.title} live demo`}
                    data-cursor
                  >
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                )}
                {project.repos.map((repo) => (
                  <a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full neu-pill flex items-center justify-center text-text-muted hover:text-glow-purple transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${project.title} ${repo.label} repository on GitHub`}
                    title={repo.label}
                    data-cursor
                  >
                    <FaGithub className="text-xs" />
                  </a>
                ))}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 group-hover:text-glow-purple transition-colors duration-300">
              {project.title}
              {project.note && (
                <span className="block text-xs font-mono text-text-dim mt-1 font-normal">
                  ({project.note})
                </span>
              )}
            </h3>

            {/* Tech badges — neumorphic inset pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => {
                const Icon = techIcons[t];
                return (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-glow-green neu-inset !rounded-full uppercase tracking-wider"
                  >
                    {Icon && (
                      <span className="text-[10px] inline-flex">
                        <Icon />
                      </span>
                    )}
                    {t}
                  </span>
                );
              })}
            </div>

            {/* Description */}
            <p className="text-text-muted text-sm sm:text-base leading-relaxed flex-1">
              {project.desc}
            </p>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-glow-purple/0 group-hover:border-glow-purple/30 transition-all duration-500 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-accent/0 group-hover:border-cyan-accent/30 transition-all duration-500 rounded-br-2xl" />
          </div>
        </motion.div>
      </AnimatedBorder>
    </RevealOnScroll>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 px-4 md:px-12 bg-bg-base z-[2]"
    >
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll mode="fade-up">
          <GlitchText
            text="Projects"
            className="text-3xl sm:text-4xl font-bold text-text-primary mb-12"
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Notable Mentions */}
        <RevealOnScroll mode="fade-up" delay={0.3}>
          <div className="mt-16">
            <GlitchText
              text="Notable Mentions"
              className="text-2xl sm:text-3xl font-semibold text-text-primary mb-8"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {notableMentions.map((mention, idx) => (
                <RevealOnScroll key={idx} mode="scale-in" delay={idx * 0.1}>
                  <motion.a
                    href={mention.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="neu-raised p-5 sm:p-6 flex items-center gap-4 group transition-all duration-300 block"
                    data-cursor
                    aria-label={`View ${mention.title} on GitHub`}
                  >
                    <div className="w-10 h-10 rounded-xl neu-concave flex items-center justify-center flex-shrink-0">
                      <FaGithub className="text-text-muted text-sm group-hover:text-glow-purple transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-bold text-sm group-hover:text-glow-purple transition-colors truncate">
                        {mention.title}
                      </p>
                      <p className="text-text-dim text-xs font-mono mt-0.5">
                        View on GitHub →
                      </p>
                    </div>
                  </motion.a>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
