"use client";

import { useState } from "react";

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  glowOnHover?: boolean;
}

/**
 * Pure-CSS animated border using @property --border-angle.
 * Eliminates the per-instance requestAnimationFrame loop that
 * previously ran for every AnimatedBorder on the page.
 */
export default function AnimatedBorder({
  children,
  className = "",
  borderWidth = 1.5,
  glowOnHover = true,
}: AnimatedBorderProps) {
  const [isHovered, setIsHovered] = useState(false);

  const gradientColors = `#00A3E0, #7C3AED, #10B981, #00A3E0`;

  return (
    <div
      className={`animated-border-wrapper relative group flex flex-col ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ padding: borderWidth }}
    >
      {/* Rotating gradient border — now driven by CSS animation */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300 animated-border-gradient"
        style={{
          background: `conic-gradient(from var(--border-angle, 0deg), ${gradientColors})`,
          opacity: isHovered && glowOnHover ? 0.8 : 0.3,
          borderRadius: "inherit",
        }}
      />

      {/* Glow layer */}
      <div
        className="absolute inset-0 rounded-2xl blur-lg transition-opacity duration-300 animated-border-gradient"
        style={{
          background: `conic-gradient(from var(--border-angle, 0deg), ${gradientColors})`,
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
