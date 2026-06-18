"use client";

import { useRef, useEffect, useState } from "react";

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  glowOnHover?: boolean;
}

export default function AnimatedBorder({
  children,
  className = "",
  borderWidth = 1.5,
  glowOnHover = true,
}: AnimatedBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animRef = useRef<number>(0);

  useEffect(() => {
    let lastTime = 0;
    const speed = isHovered ? 120 : 60;

    const animate = (time: number) => {
      if (lastTime > 0) {
        const delta = (time - lastTime) / 1000;
        setAngle((prev) => (prev + speed * delta) % 360);
      }
      lastTime = time;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isHovered]);

  const gradientColors = `#00A3E0, #7C3AED, #10B981, #00A3E0`;

  return (
    <div
      ref={containerRef}
      className={`relative group flex flex-col ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ padding: borderWidth }}
    >
      {/* Rotating gradient border */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: `conic-gradient(from ${angle}deg, ${gradientColors})`,
          opacity: isHovered && glowOnHover ? 0.8 : 0.3,
          borderRadius: "inherit",
        }}
      />

      {/* Glow layer */}
      <div
        className="absolute inset-0 rounded-2xl blur-lg transition-opacity duration-300"
        style={{
          background: `conic-gradient(from ${angle}deg, ${gradientColors})`,
          opacity: isHovered && glowOnHover ? 0.2 : 0.03,
          borderRadius: "inherit",
        }}
      />

      {/* Inner content */}
      <div
        className="relative rounded-2xl flex-1"
        style={{
          background: "var(--neu-bg)",
          borderRadius: "inherit",
        }}
      >
        {children}
      </div>
    </div>
  );
}
