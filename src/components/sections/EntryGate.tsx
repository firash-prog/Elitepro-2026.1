import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function EntryGate({ onEnter }: { onEnter: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<SVGCircleElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate circles drawing in
    tl.to(circlesRef.current, {
      strokeDashoffset: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Pulse animation for "CLICK TO ENTER"
    gsap.to('.enter-text', {
      opacity: 1,
      duration: 1,
      delay: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  const handleClick = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: onEnter,
    });
  };

  // Flower of Life Geometry
  const R = 200;
  const cx = 500; // SVG center x
  const cy = 500; // SVG center y
  const circles = [];

  // Center circle
  circles.push({ cx, cy });

  // 6 surrounding circles
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 * Math.PI) / 180;
    circles.push({
      cx: cx + R * Math.cos(angle),
      cy: cy + R * Math.sin(angle),
    });
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer"
      style={{ background: 'var(--gate-bg)' }}
      onClick={handleClick}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        {circles.map((c, i) => (
          <circle
            key={i}
            ref={(el) => {
              if (el) circlesRef.current[i] = el;
            }}
            cx={c.cx}
            cy={c.cy}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="0.8"
            strokeDasharray={2 * Math.PI * R}
            strokeDashoffset={2 * Math.PI * R}
          />
        ))}
      </svg>
      <div className="enter-text absolute text-white/75 text-xs tracking-[0.4em] uppercase font-light opacity-0">
        Click to Enter
      </div>
    </div>
  );
}
