"use client";

import { motion } from "framer-motion";

type AnimationMode = "fade-up" | "fade-left" | "fade-right" | "scale-in" | "blur-in";

interface RevealOnScrollProps {
  children: React.ReactNode;
  mode?: AnimationMode;
  delay?: number;
  duration?: number;
  className?: string;
}

const getVariants = (mode: AnimationMode) => {
  switch (mode) {
    case "fade-up":
      return {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      };
    case "fade-left":
      return {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      };
    case "fade-right":
      return {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      };
    case "scale-in":
      return {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1 },
      };
    case "blur-in":
      return {
        hidden: { opacity: 0, filter: "blur(10px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
      };
  }
};

export default function RevealOnScroll({
  children,
  mode = "fade-up",
  delay = 0,
  duration = 0.6,
  className = "",
}: RevealOnScrollProps) {
  const v = getVariants(mode);

  return (
    <motion.div
      initial={v.hidden}
      whileInView={v.visible}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
