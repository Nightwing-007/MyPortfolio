"use client";

import { motion } from "framer-motion";

interface Shape {
  type: "circle" | "triangle" | "hexagon" | "cross" | "ring";
  x: string;
  y: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
  rotation: number;
}

const shapes: Shape[] = [
  { type: "circle", x: "8%", y: "15%", size: 12, color: "rgba(0, 163, 224, 0.15)", duration: 7, delay: 0, rotation: 0 },
  { type: "triangle", x: "85%", y: "10%", size: 16, color: "rgba(124, 58, 237, 0.12)", duration: 9, delay: 1, rotation: 30 },
  { type: "hexagon", x: "92%", y: "45%", size: 14, color: "rgba(16, 185, 129, 0.1)", duration: 11, delay: 2, rotation: 15 },
  { type: "cross", x: "5%", y: "55%", size: 10, color: "rgba(124, 58, 237, 0.1)", duration: 8, delay: 0.5, rotation: 45 },
  { type: "ring", x: "75%", y: "70%", size: 18, color: "rgba(0, 163, 224, 0.1)", duration: 10, delay: 1.5, rotation: 0 },
  { type: "circle", x: "50%", y: "85%", size: 8, color: "rgba(16, 185, 129, 0.12)", duration: 6, delay: 3, rotation: 0 },
  { type: "triangle", x: "20%", y: "80%", size: 14, color: "rgba(0, 163, 224, 0.08)", duration: 12, delay: 2, rotation: 60 },
  { type: "hexagon", x: "65%", y: "25%", size: 10, color: "rgba(124, 58, 237, 0.08)", duration: 9, delay: 4, rotation: 0 },
  { type: "cross", x: "40%", y: "5%", size: 8, color: "rgba(16, 185, 129, 0.1)", duration: 7, delay: 1, rotation: 20 },
  { type: "ring", x: "30%", y: "50%", size: 12, color: "rgba(124, 58, 237, 0.06)", duration: 13, delay: 3, rotation: 0 },
];

function ShapeSVG({ type, size, color }: { type: Shape["type"]; size: number; color: string }) {
  switch (type) {
    case "circle":
      return <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />;
    case "triangle":
      return (
        <polygon
          points={`${size / 2},0 ${size},${size} 0,${size}`}
          fill={color}
        />
      );
    case "hexagon":
      const r = size / 2;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        return `${r + r * Math.cos(angle)},${r + r * Math.sin(angle)}`;
      }).join(" ");
      return <polygon points={pts} fill={color} />;
    case "cross":
      const t = size * 0.3;
      const s = size;
      return (
        <path
          d={`M${(s - t) / 2},0 h${t} v${(s - t) / 2} h${(s - t) / 2} v${t} h-${(s - t) / 2} v${(s - t) / 2} h-${t} v-${(s - t) / 2} h-${(s - t) / 2} v-${t} h${(s - t) / 2} Z`}
          fill={color}
        />
      );
    case "ring":
      return (
        <>
          <circle cx={size / 2} cy={size / 2} r={size / 2} fill="none" stroke={color} strokeWidth={1.5} />
        </>
      );
    default:
      return null;
  }
}

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden hidden md:block">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: shape.x, top: shape.y, willChange: "transform" }}
          animate={{
            y: [0, -20, 0],
            rotate: [shape.rotation, shape.rotation + 360],
          }}
          transition={{
            y: {
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            },
            rotate: {
              duration: shape.duration * 4,
              repeat: Infinity,
              ease: "linear",
              delay: shape.delay,
            },
          }}
        >
          <svg
            width={shape.size}
            height={shape.size}
            viewBox={`0 0 ${shape.size} ${shape.size}`}
          >
            <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
