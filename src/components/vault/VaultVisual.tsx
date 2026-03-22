"use client";

import { useEffect, useRef } from "react";

export default function VaultVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = (canvas.width = 400);
    const H = (canvas.height = 400);
    const cx = W / 2;
    const cy = H / 2;

    let angle = 0;
    let frame: number;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Outer glow
      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 180);
      grad.addColorStop(0, "rgba(94,184,255,0.06)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Rings (tilted hexagonal orbits)
      const rings = [
        { r: 150, color: "rgba(94,184,255,0.18)", tiltX: 72, tiltY: 0 },
        { r: 108, color: "rgba(0,229,195,0.14)", tiltX: 72, tiltY: 25 },
        { r: 180, color: "rgba(94,184,255,0.08)", tiltX: 70, tiltY: -15 },
      ];

      rings.forEach(({ r, color, tiltX }) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, Math.sin((tiltX * Math.PI) / 180));
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });

      // Orbit dots
      const orbiters = [
        { r: 150, speed: 0.6, color: "#00E5C3", size: 5, tiltX: 72 },
        { r: 108, speed: -1.0, color: "#5EB8FF", size: 3.5, tiltX: 72 },
      ];

      orbiters.forEach(({ r, speed, color, size, tiltX }) => {
        const a = angle * speed;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r * Math.sin((tiltX * Math.PI) / 180);

        // Glow
        const glowGrad = ctx.createRadialGradient(
          cx + x, cy + y, 0,
          cx + x, cy + y, size * 4
        );
        glowGrad.addColorStop(0, color + "80");
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(cx + x, cy + y, size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(cx + x, cy + y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Core
      const coreGrad = ctx.createRadialGradient(cx - 10, cy - 10, 5, cx, cy, 55);
      coreGrad.addColorStop(0, "rgba(94,184,255,0.22)");
      coreGrad.addColorStop(0.6, "rgba(94,184,255,0.06)");
      coreGrad.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(94,184,255,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Hexagon symbol in center
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = "rgba(94,184,255,0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 6;
        const px = Math.cos(a) * 22;
        const py = Math.sin(a) * 22;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      // Inner hexagon
      ctx.strokeStyle = "rgba(0,229,195,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3 - Math.PI / 6;
        const px = Math.cos(a) * 12;
        const py = Math.sin(a) * 12;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      angle += 0.008;
      frame = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="opacity-90"
        style={{ width: 400, height: 400 }}
      />
      {/* Floating stat cards */}
      <div
        className="absolute top-8 right-0 bg-panel/90 border border-rim2 rounded-lg px-4 py-3 backdrop-blur-sm"
        style={{ animation: "float 5s ease-in-out infinite" }}
      >
        <p className="font-mono text-[10px] text-text-sub uppercase tracking-widest mb-1">
          Current APY
        </p>
        <p className="font-mono text-[20px] font-medium text-mint">14.82%</p>
        <p className="font-mono text-[10px] text-mint mt-0.5">+0.34% 24h</p>
      </div>
      <div
        className="absolute bottom-12 left-0 bg-panel/90 border border-rim2 rounded-lg px-4 py-3 backdrop-blur-sm"
        style={{ animation: "float 5s 2s ease-in-out infinite" }}
      >
        <p className="font-mono text-[10px] text-text-sub uppercase tracking-widest mb-1">
          Total TVL
        </p>
        <p className="font-mono text-[20px] font-medium text-sky">$4.2M</p>
        <p className="font-mono text-[10px] text-mint mt-0.5">Growing</p>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
