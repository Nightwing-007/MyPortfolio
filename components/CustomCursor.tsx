"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

const ACCENT_COLORS = ["#00A3E0", "#7C3AED", "#10B981"];

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickBursts, setClickBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const particleId = useRef(0);
  const burstId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 280, damping: 26, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setTimeout(() => {
      setIsTouch(!hasFinePointer);
    }, 0);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 6) {
        const newParticle: Particle = {
          id: particleId.current++,
          x: e.clientX,
          y: e.clientY,
          color: ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)],
        };
        setParticles((prev) => [...prev.slice(-20), newParticle]);
      }

      lastPos.current = { x: e.clientX, y: e.clientY };
    },
    [cursorX, cursorY]
  );

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
    const burst = {
      id: burstId.current++,
      x: cursorX.get(),
      y: cursorY.get(),
    };
    setClickBursts((prev) => [...prev.slice(-4), burst]);
  }, [cursorX, cursorY]);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]") ||
        target.closest("[role='button']")
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]") ||
        target.closest("[role='button']")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [isTouch, handleMouseMove, handleMouseDown, handleMouseUp]);

  useEffect(() => {
    if (particles.length === 0) return;
    const timeout = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 450);
    return () => clearTimeout(timeout);
  }, [particles]);

  useEffect(() => {
    if (clickBursts.length === 0) return;
    const timeout = setTimeout(() => {
      setClickBursts((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timeout);
  }, [clickBursts]);

  if (isTouch) return null;

  const ringSize = isHovering ? 60 : isClicking ? 24 : 40;
  const dotSize = isHovering ? 4 : 8;
  const ringColor = isHovering ? "rgba(124, 58, 237, 0.7)" : "rgba(0, 163, 224, 0.5)";
  const dotColor = isHovering ? "var(--accent-purple)" : "var(--t-primary)";

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: `0 0 12px ${ringColor}, 0 0 24px ${ringColor}`,
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring with gradient feel */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: `2px solid ${ringColor}`,
          backdropFilter: "blur(1px)",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: ringColor,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Trail particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
            initial={{
              x: p.x,
              y: p.y,
              opacity: 0.6,
              scale: 1,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              y: p.y - 25,
              opacity: 0,
              scale: 0.3,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              width: 4,
              height: 4,
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}40`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Click burst — neumorphic ripple */}
      <AnimatePresence>
        {clickBursts.map((b) => (
          <motion.div
            key={b.id}
            className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full"
            initial={{
              x: b.x,
              y: b.y,
              width: 8,
              height: 8,
              opacity: 0.5,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              width: 90,
              height: 90,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              border: "2px solid rgba(124, 58, 237, 0.3)",
              boxShadow: "0 0 20px rgba(124, 58, 237, 0.1)",
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
