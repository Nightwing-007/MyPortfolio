"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "span";
  className?: string;
}

export default function GlitchText({ text, as: Tag = "h2", className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <motion.div
      className="relative inline-block"
      onHoverStart={() => setIsGlitching(true)}
      onHoverEnd={() => setIsGlitching(false)}
      onViewportEnter={() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 400);
      }}
      viewport={{ once: true }}
    >
      <Tag className={`relative ${className}`}>
        <span className="relative z-10">{text}</span>

        {/* Cyan layer */}
        <span
          className="absolute inset-0 z-0"
          style={{
            color: "var(--accent-cyan)",
            opacity: isGlitching ? 0.9 : 0,
            clipPath: isGlitching
              ? "polygon(0 15%, 100% 15%, 100% 40%, 0 40%)"
              : "polygon(0 0, 0 0, 0 0, 0 0)",
            transform: isGlitching ? "translate(-3px, 1px)" : "translate(0, 0)",
            transition: "all 0.08s steps(2)",
          }}
          aria-hidden
        >
          {text}
        </span>

        {/* Purple layer */}
        <span
          className="absolute inset-0 z-0"
          style={{
            color: "var(--accent-purple)",
            opacity: isGlitching ? 0.9 : 0,
            clipPath: isGlitching
              ? "polygon(0 60%, 100% 60%, 100% 85%, 0 85%)"
              : "polygon(0 0, 0 0, 0 0, 0 0)",
            transform: isGlitching ? "translate(3px, -1px)" : "translate(0, 0)",
            transition: "all 0.08s steps(2)",
          }}
          aria-hidden
        >
          {text}
        </span>
      </Tag>
    </motion.div>
  );
}
