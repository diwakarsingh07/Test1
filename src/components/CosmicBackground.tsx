import React, { useEffect, useRef } from 'react';

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate stars
    const starCount = Math.min(Math.floor((width * height) / 8000), 220);
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
      twinkleSpeed: number;
      color: string;
    }> = [];

    const colors = ['#ffffff', '#e0f2fe', '#bae6fd', '#fed7aa', '#fef08a'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        speed: (Math.random() * 0.15 + 0.05) * (prefersReducedMotion ? 0 : 1),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    let frame = 0;
    const render = () => {
      frame++;
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep radial cosmic glow
      const cx = width * 0.5 + (mouseX - width * 0.5) * 0.05;
      const cy = height * 0.4 + (mouseY - height * 0.5) * 0.05;
      
      const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.85);
      gradient.addColorStop(0, 'rgba(14, 25, 45, 0.45)');
      gradient.addColorStop(0.5, 'rgba(7, 12, 22, 0.3)');
      gradient.addColorStop(1, 'rgba(5, 7, 12, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle celestial orbit rings
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(width, height) * 0.32, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.03)';
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(width, height) * 0.55, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        if (!prefersReducedMotion) {
          star.y -= star.speed;
          if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          }
        }

        const twinkle = Math.sin(frame * star.twinkleSpeed + i) * 0.25;
        const currentAlpha = Math.max(0.15, Math.min(1, star.alpha + twinkle));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="absolute inset-0 grid-backdrop opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070c]/50 to-[#05070c]" />
    </div>
  );
};
