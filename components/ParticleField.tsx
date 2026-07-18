"use client";

import { useEffect, useRef } from "react";

interface FloatingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  baseOpacity: number;
}

const COLORS = [
  "rgba(0, 163, 224,",   // cyan
  "rgba(124, 58, 237,",  // purple
  "rgba(16, 185, 129,",  // green
];

// Squared distance threshold to avoid Math.sqrt in hot path
const MOUSE_RADIUS = 100;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const CONN_RADIUS = 130;
const CONN_RADIUS_SQ = CONN_RADIUS * CONN_RADIUS;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const particlesRef = useRef<FloatingParticle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    // Frame throttle: draw every 2nd frame (~30fps)
    let frameCount = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      // Drastically fewer particles on mobile (max 10 vs 30)
      const maxCount = isMobile ? 10 : 30;
      const count = Math.min(maxCount, Math.floor((canvas.width * canvas.height) / 50000));
      const particles: FloatingParticle[] = [];
      for (let i = 0; i < count; i++) {
        const baseOpacity = 0.08 + Math.random() * 0.12;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: 1.5 + Math.random() * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          opacity: baseOpacity,
          baseOpacity,
        });
      }
      particlesRef.current = particles;
    };

    resize();
    window.addEventListener("resize", resize);

    // No mouse tracking needed on touch devices
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouse);
    }

    const draw = () => {
      frameCount++;

      // Skip rendering on hidden tab
      if (document.hidden) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Throttle to ~30fps: only draw every 2nd frame
      if (frameCount % 2 !== 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        // Mouse interaction only on desktop — use squared distance
        if (!isMobile && mx >= 0) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            p.vx += (dx / dist) * force * 0.12;
            p.vy += (dy / dist) * force * 0.12;
            p.opacity = Math.min(0.4, p.baseOpacity + force * 0.2);
          } else {
            p.opacity += (p.baseOpacity - p.opacity) * 0.02;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Soft particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.fill();

        // Subtle glow — skip on mobile to reduce overdraw
        if (!isMobile) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          grad.addColorStop(0, `${p.color} ${p.opacity * 0.3})`);
          grad.addColorStop(1, `${p.color} 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      // Faint connections — skip entirely on mobile (O(n²) is expensive)
      // Use squared distance to avoid sqrt in inner loop
      if (!isMobile) {
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const a = particlesRef.current[i];
            const b = particlesRef.current[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < CONN_RADIUS_SQ) {
              const dist = Math.sqrt(distSq);
              const lineOpacity = (1 - dist / CONN_RADIUS) * 0.04;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(100, 100, 100, ${lineOpacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
