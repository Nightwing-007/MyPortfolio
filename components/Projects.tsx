"use client";

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
import { FaTerminal, FaAws } from "react-icons/fa";
import {
  SiPython,
  SiOpencv,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
} from "react-icons/si";

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Python: SiPython,
  OpenCV: SiOpencv,
  "React Native": SiReact,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  MongoDB: SiMongodb,
  "AWS EC2": FaAws,
};

const projects = [
  {
    title: "Real-Time Face Detection & Locating System",
    tech: ["Python", "OpenCV", "DeepFace"],
    desc: "A computer vision system for real-time face detection, recognition, and automated tracking for security applications.",
  },
  {
    title: "Smart Tourist Safety Monitoring Platform",
    tech: ["React Native", "Node.js", "Express.js", "MongoDB", "AWS EC2"],
    desc: "A full-stack mobile application to monitor tourist safety incidents in real-time, deployed on scalable AWS infrastructure.",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
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

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const posX = clientX - left;
    const posY = clientY - top;
    mouseX.set(posX);
    mouseY.set(posY);
    x.set(posX / width - 0.5);
    y.set(posY / height - 0.5);
  }

  function handleMouseLeave() {
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
          whileHover={{ y: -4 }}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
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
              <span className="text-5xl sm:text-6xl font-bold text-glow-purple/[0.08] select-none leading-none">
                0{index + 1}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 group-hover:text-glow-purple transition-colors duration-300">
              {project.title}
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
      </div>
    </section>
  );
}
