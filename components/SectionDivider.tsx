"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative w-full py-10 flex items-center justify-center z-[2]">
      {/* Main gradient line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-text-dim/30 to-transparent" />

      {/* Center node */}
      <div className="absolute flex items-center justify-center">
        {/* Pulsing glow */}
        <motion.div
          className="absolute w-5 h-5 rounded-full bg-cyan-accent/15 blur-md"
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Core dot */}
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-accent/60 shadow-[0_0_8px_rgba(0,163,224,0.3)]" />

        {/* Circuit traces */}
        <div className="absolute w-10 h-[1px] -left-12 bg-gradient-to-r from-transparent to-cyan-accent/20" />
        <div className="absolute w-10 h-[1px] -right-12 bg-gradient-to-l from-transparent to-cyan-accent/20" />
        <div className="absolute w-[1px] h-3 -top-4 bg-gradient-to-t from-cyan-accent/20 to-transparent" />
        <div className="absolute w-[1px] h-3 -bottom-4 bg-gradient-to-b from-cyan-accent/20 to-transparent" />
      </div>
    </div>
  );
}
