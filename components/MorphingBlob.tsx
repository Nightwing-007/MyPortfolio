"use client";

import { motion } from "framer-motion";

const blobPaths = [
  "M44.5,-56.2C57.3,-48.2,67.2,-34.2,71.1,-18.7C75,-3.2,72.9,13.7,65.4,27.6C57.9,41.5,45,52.3,30.5,59.1C16,65.9,-0.1,68.6,-16.3,65.5C-32.5,62.4,-48.8,53.5,-58.8,40.1C-68.8,26.7,-72.5,8.9,-69.7,-7.5C-66.9,-23.9,-57.6,-38.9,-44.7,-46.9C-31.8,-54.9,-15.9,-55.9,0.3,-56.3C16.5,-56.6,31.7,-64.2,44.5,-56.2Z",
  "M39.5,-49.2C52.8,-42.8,66.6,-33.1,71.6,-19.8C76.6,-6.5,72.8,10.4,64.8,24.1C56.8,37.8,44.6,48.4,30.7,55.1C16.8,61.8,1.2,64.6,-14.5,62.1C-30.2,59.6,-46,51.8,-55.5,39.3C-65,26.8,-68.2,9.5,-65.5,-5.9C-62.8,-21.3,-54.2,-34.8,-42.6,-41.6C-31,-48.4,-16.4,-48.5,-1.1,-47.1C14.2,-45.7,26.2,-55.6,39.5,-49.2Z",
  "M47.3,-58.9C60.1,-50.6,68.3,-34.8,71.7,-18.2C75.1,-1.6,73.7,15.8,66.1,30C58.5,44.2,44.7,55.2,29.2,61C13.7,66.8,-3.5,67.4,-19.9,63.1C-36.3,58.8,-51.9,49.6,-61.2,36.1C-70.5,22.6,-73.5,4.8,-69.8,-10.8C-66.1,-26.4,-55.7,-39.8,-42.8,-48.2C-29.9,-56.6,-14.9,-60,-0.2,-59.7C14.6,-59.5,34.5,-67.2,47.3,-58.9Z",
];

interface MorphingBlobProps {
  color?: string;
  size?: number;
  className?: string;
}

export default function MorphingBlob({
  color = "rgba(124, 58, 237, 0.12)",
  size = 500,
  className = "",
}: MorphingBlobProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-0 hidden md:block ${className}`}
      animate={{
        scale: [1, 1.05, 0.95, 1],
        rotate: [0, 5, -3, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="-100 -100 200 200"
        className="overflow-visible"
      >
        <motion.path
          fill={color}
          animate={{
            d: blobPaths,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}
