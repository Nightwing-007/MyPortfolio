"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px]"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
        background: "linear-gradient(90deg, #00A3E0, #7C3AED, #10B981)",
        boxShadow:
          "0 0 8px rgba(0, 163, 224, 0.3), 0 0 16px rgba(124, 58, 237, 0.15)",
      }}
    />
  );
}
