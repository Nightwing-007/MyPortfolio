"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface GridCell {
  x: number;
  y: number;
  opacity: number;
  targetOpacity: number;
}

export default function GlowingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const animFrameRef = useRef<number>(0);
  const cellsRef = useRef<GridCell[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const timeRef = useRef(0);

  const CELL_SIZE = 60;
  const GLOW_RADIUS = 200;

  const initCells = useCallback(
    (width: number, height: number) => {
      const cells: GridCell[] = [];
      const cols = Math.ceil(width / CELL_SIZE) + 1;
      const rows = Math.ceil(height / CELL_SIZE) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            x: c * CELL_SIZE,
            y: r * CELL_SIZE,
            opacity: 0,
            targetOpacity: 0,
          });
        }
      }
      cellsRef.current = cells;
    },
    [CELL_SIZE]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = !window.matchMedia("(hover: hover)").matches;
    setIsMobile(mobile);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCells(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (!mobile) {
      window.addEventListener("mousemove", handleMouse);
    }

    // Cache grid-line color and update on theme change
    let gridLineColor = getComputedStyle(document.documentElement).getPropertyValue('--grid-line').trim() || "rgba(0, 0, 0, 0.03)";
    const observer = new MutationObserver(() => {
      gridLineColor = getComputedStyle(document.documentElement).getPropertyValue('--grid-line').trim() || "rgba(0, 0, 0, 0.03)";
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const draw = () => {
      timeRef.current += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cells = cellsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        if (mobile) {
          const wave =
            Math.sin(cell.x * 0.008 + timeRef.current * 2) *
            Math.cos(cell.y * 0.006 + timeRef.current * 1.5) *
            0.5 +
            0.5;
          cell.targetOpacity = wave * 0.04;
        } else {
          if (mx >= 0) {
            const dx = cell.x - mx;
            const dy = cell.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            cell.targetOpacity = dist < GLOW_RADIUS ? (1 - dist / GLOW_RADIUS) * 0.15 : 0;
          } else {
            cell.targetOpacity = 0;
          }
        }

        cell.opacity += (cell.targetOpacity - cell.opacity) * 0.08;

        if (cell.opacity > 0.003) {
          ctx.strokeStyle = `rgba(0, 163, 224, ${cell.opacity})`;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(cell.x, cell.y, CELL_SIZE, CELL_SIZE);
        }
      }

      // Base grid — theme-adaptive lines (color cached, updated via MutationObserver)
      ctx.strokeStyle = gridLineColor;
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= canvas.width; x += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
    };
  }, [initCells, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
