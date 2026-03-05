import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CenterLine() {
  const [pageHeight, setPageHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathBlurRef = useRef<SVGPathElement>(null);
  const beamRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      const body = document.body;
      const html = document.documentElement;
      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      setPageHeight(height);
    };

    updateHeight();
    
    const observer = new ResizeObserver(updateHeight);
    observer.observe(document.body);
    
    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const buildPath = (h: number) => {
    if (h === 0) return '';
    const cx = 500; // Center X
    const bendWidth = 300; // Width of the bend (how far left/right)
    const r = 60; // Corner radius
    
    // Vertical segment lengths
    const v1 = 300; // Top straight part
    const v2 = 800; // Side straight part (long vertical)
    const v3 = 300; // Bottom straight part
    
    let d = `M ${cx} 0`;
    let currentY = 0;
    let i = 0;

    while (currentY < h) {
      // Alternating direction: even = Left (-1), odd = Right (1)
      const dir = i % 2 === 0 ? -1 : 1;
      const xSide = cx + (bendWidth * dir);
      
      // 1. Vertical Down Center (Start of cycle)
      // Line to start of first curve
      d += ` L ${cx} ${currentY + v1 - r}`;
      
      // Curve 1: Center -> Outward
      // Q control end
      d += ` Q ${cx} ${currentY + v1} ${cx + r * dir} ${currentY + v1}`;
      
      // 2. Horizontal Out
      // Line to start of second curve
      d += ` L ${xSide - r * dir} ${currentY + v1}`;
      
      // Curve 2: Outward -> Down
      d += ` Q ${xSide} ${currentY + v1} ${xSide} ${currentY + v1 + r}`;
      
      // 3. Vertical Down Side (The long segment)
      d += ` L ${xSide} ${currentY + v1 + v2 - r}`;
      
      // Curve 3: Down -> Inward
      d += ` Q ${xSide} ${currentY + v1 + v2} ${xSide - r * dir} ${currentY + v1 + v2}`;
      
      // 4. Horizontal In
      d += ` L ${cx + r * dir} ${currentY + v1 + v2}`;
      
      // Curve 4: Inward -> Down Center
      d += ` Q ${cx} ${currentY + v1 + v2} ${cx} ${currentY + v1 + v2 + r}`;
      
      // 5. Vertical Down Center (End of cycle)
      currentY += v1 + v2 + v3;
      d += ` L ${cx} ${currentY}`;
      
      i++;
    }
    
    return d;
  };

  const pathData = buildPath(pageHeight);

  useEffect(() => {
    if (pageHeight === 0) return;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const pathBlur = pathBlurRef.current;
      const beam = beamRef.current;
      
      if (!path || !pathBlur || !beam) return;

      const length = path.getTotalLength();

      // 1. Setup Scroll-Draw Animation for the main line
      gsap.set([path, pathBlur], {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to([path, pathBlur], {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1, // Smoother scrub
        },
      });

      // 2. Setup Traveling Glow Light (Beam)
      const beamLength = 600; // Longer beam for the longer path
      gsap.set(beam, {
        strokeDasharray: `${beamLength} ${length}`,
        strokeDashoffset: beamLength,
      });

      gsap.to(beam, {
        strokeDashoffset: -length,
        duration: 12, // Slower duration for longer path
        repeat: -1,
        ease: 'linear',
      });

    }, containerRef);

    return () => ctx.revert();
  }, [pageHeight, pathData]);

  return (
    <div ref={containerRef} className="hidden md:block absolute top-0 left-0 w-full pointer-events-none z-5" style={{ height: `${pageHeight}px` }}>
      <svg className="w-full h-full" viewBox={`0 0 1000 ${pageHeight}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="lineBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="beamGlow">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(79, 195, 208, 1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        
        {/* Blurred glow copy */}
        <path
          ref={pathBlurRef}
          d={pathData}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
          fill="none"
          filter="url(#lineBlur)"
        />
        
        {/* Sharp main line */}
        <path
          ref={pathRef}
          d={pathData}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Traveling Beam Light */}
        <path
          ref={beamRef}
          d={pathData}
          stroke="url(#beamGradient)"
          strokeWidth="5"
          fill="none"
          filter="url(#beamGlow)"
          style={{ mixBlendMode: 'screen' }}
        />
      </svg>
    </div>
  );
}
