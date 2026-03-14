import { useEffect, useRef } from 'react';

interface Particle {
  t: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
  direction: number; // 1 = left-to-right, -1 = right-to-left
  trail: { x: number; y: number }[];
}

function bezierPoint(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function SkillBridgeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const particles: Particle[] = [];
    const colors = ['#5865F2', '#00F5FF', '#7C3AED', '#818CF8'];

    for (let i = 0; i < 22; i++) {
      particles.push({
        t: Math.random(),
        speed: 0.0008 + Math.random() * 0.0012,
        size: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.6 + Math.random() * 0.4,
        direction: i % 2 === 0 ? 1 : -1,
        trail: [],
      });
    }

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      // Dot grid background
      ctx.fillStyle = 'rgba(48, 54, 61, 0.25)';
      const gridSize = 28;
      for (let x = gridSize; x < w; x += gridSize) {
        for (let y = gridSize; y < h; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Node positions
      const cx = w / 2;
      const cy = h / 2;
      const nodeRadius = Math.min(w, h) * 0.11;
      const lx = w * 0.2;
      const rx = w * 0.8;

      // Control points for bezier curve
      const cp1x = cx;
      const cp1y = cy - h * 0.25;
      const cp2x = cx;
      const cp2y = cy + h * 0.25;

      // Draw the connection paths (multiple for depth)
      const drawCurve = (alpha: number, width: number, color: string) => {
        ctx.beginPath();
        ctx.moveTo(lx, cy);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, rx, cy);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
      };

      // Ambient glow path
      drawCurve(0.03, 18, 'rgba(88, 101, 242, 0.08)');
      drawCurve(0.06, 8, 'rgba(88, 101, 242, 0.12)');
      drawCurve(0.12, 3, 'rgba(88, 101, 242, 0.2)');
      drawCurve(0.18, 1.5, 'rgba(130, 140, 255, 0.35)');

      // Second curve (bottom arc)
      ctx.beginPath();
      ctx.moveTo(lx, cy);
      ctx.bezierCurveTo(cp1x, cp2y, cp2x, cp1y, rx, cy);
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.08)';
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(lx, cy);
      ctx.bezierCurveTo(cp1x, cp2y, cp2x, cp1y, rx, cy);
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Animate particles
      particles.forEach((p) => {
        p.t += p.speed * p.direction;
        if (p.t > 1) p.t = 0;
        if (p.t < 0) p.t = 1;

        let px: number, py: number;
        if (p.direction === 1) {
          // top bezier
          px = bezierPoint(p.t, lx, cp1x, cp2x, rx);
          py = bezierPoint(p.t, cy, cp1y, cp2y, cy);
        } else {
          // bottom bezier
          px = bezierPoint(p.t, lx, cp1x, cp2x, rx);
          py = bezierPoint(p.t, cy, cp2y, cp1y, cy);
        }

        // Trail
        p.trail.push({ x: px, y: py });
        if (p.trail.length > 12) p.trail.shift();

        // Draw trail
        for (let i = 0; i < p.trail.length - 1; i++) {
          const alpha = (i / p.trail.length) * p.opacity * 0.5;
          ctx.beginPath();
          ctx.moveTo(p.trail[i].x, p.trail[i].y);
          ctx.lineTo(p.trail[i + 1].x, p.trail[i + 1].y);
          ctx.strokeStyle = hexToRgba(p.color, alpha);
          ctx.lineWidth = p.size * 0.7;
          ctx.stroke();
        }

        // Particle glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 4);
        grad.addColorStop(0, hexToRgba(p.color, 0.8));
        grad.addColorStop(1, hexToRgba(p.color, 0));
        ctx.beginPath();
        ctx.arc(px, py, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Left node (You) — Cyan
      const drawNode = (x: number, color1: string, color2: string, label: string, sublabel: string) => {
        // Pulse rings
        const pulseScale = 1 + Math.sin(time * 0.04) * 0.08;
        for (let ring = 3; ring >= 1; ring--) {
          const ringR = nodeRadius * (1 + ring * 0.35 * pulseScale);
          const ringAlpha = (0.12 - ring * 0.03) * (1 + Math.sin(time * 0.04 + ring) * 0.3);
          ctx.beginPath();
          ctx.arc(x, cy, ringR, 0, Math.PI * 2);
          ctx.strokeStyle = color1 + Math.round(ringAlpha * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Node background glow
        const glow = ctx.createRadialGradient(x, cy, 0, x, cy, nodeRadius * 2);
        glow.addColorStop(0, color1 + '40');
        glow.addColorStop(1, color1 + '00');
        ctx.beginPath();
        ctx.arc(x, cy, nodeRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node background
        const nodeBg = ctx.createRadialGradient(x - nodeRadius * 0.3, cy - nodeRadius * 0.3, 0, x, cy, nodeRadius);
        nodeBg.addColorStop(0, 'rgba(22,27,34,0.95)');
        nodeBg.addColorStop(1, 'rgba(13,17,23,0.98)');
        ctx.beginPath();
        ctx.arc(x, cy, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = nodeBg;
        ctx.fill();

        // Node border glow
        const borderGrad = ctx.createLinearGradient(x - nodeRadius, cy, x + nodeRadius, cy);
        borderGrad.addColorStop(0, color1);
        borderGrad.addColorStop(1, color2);
        ctx.beginPath();
        ctx.arc(x, cy, nodeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = borderGrad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        ctx.fillStyle = '#E6EDF3';
        ctx.font = `700 ${nodeRadius * 0.38}px 'Plus Jakarta Sans', Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(label, x, cy + nodeRadius * 0.1);

        ctx.fillStyle = '#8B949E';
        ctx.font = `400 ${nodeRadius * 0.26}px 'Plus Jakarta Sans', Inter, sans-serif`;
        ctx.fillText(sublabel, x, cy + nodeRadius * 0.45);
      };

      drawNode(lx, '#00F5FF', '#5865F2', 'You', 'Teach & Learn');
      drawNode(rx, '#5865F2', '#00F5FF', 'Match', 'Skill Partner');

      // Center "SWAP" badge
      const swapSize = nodeRadius * 0.55;
      const swapGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, swapSize * 1.5);
      swapGlow.addColorStop(0, 'rgba(88,101,242,0.3)');
      swapGlow.addColorStop(1, 'rgba(88,101,242,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, swapSize * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = swapGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, swapSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(22,27,34,0.95)';
      ctx.fill();
      ctx.strokeStyle = '#5865F2';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#5865F2';
      ctx.font = `700 ${swapSize * 0.5}px 'Plus Jakarta Sans', Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('SWAP', cx, cy + swapSize * 0.18);

      time++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}