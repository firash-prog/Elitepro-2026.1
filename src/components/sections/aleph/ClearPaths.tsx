import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ClearPaths() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = nodesRef.current?.querySelectorAll('.archetype-node');
      if (nodes) {
        nodes.forEach((node, i) => {
          gsap.to(node, {
            x: `+=${Math.random() * 20 - 10}`,
            y: `+=${Math.random() * 20 - 10}`,
            duration: 3 + Math.random() * 2,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.15
          });
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[var(--dark-bg)] flex items-center overflow-hidden">
      {/* Left Content */}
      <div className="w-full md:w-1/2 px-12 md:px-24 z-10">
        <h2 className="font-sans font-light text-[clamp(42px,5.5vw,72px)] leading-none text-white mb-8">
          Clear Paths<br />Ahead
        </h2>
        <p className="font-sans font-light text-[16px] leading-relaxed text-white/78 max-w-md">
          We seek to illuminate complexities within you, mapping you to empirical archetypical structures.
        </p>
      </div>

      {/* Right Visual - Archetype Map */}
      <div ref={nodesRef} className="absolute right-0 top-0 w-full md:w-1/2 h-full flex items-center justify-center opacity-60">
        {/* Simple SVG representation of a network */}
        <svg width="100%" height="100%" viewBox="0 0 600 600" className="w-full h-full">
          <g className="archetype-group" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
             {/* Lines connecting nodes - simplified */}
             <line x1="300" y1="300" x2="200" y2="200" />
             <line x1="300" y1="300" x2="400" y2="200" />
             <line x1="300" y1="300" x2="300" y2="450" />
             <line x1="200" y1="200" x2="150" y2="300" />
             <line x1="400" y1="200" x2="450" y2="300" />
          </g>
          {/* Nodes */}
          <circle cx="300" cy="300" r="20" fill="#4fc3d0" className="archetype-node" opacity="0.8" />
          <circle cx="200" cy="200" r="12" fill="#4fc3d0" className="archetype-node" opacity="0.6" />
          <circle cx="400" cy="200" r="15" fill="#4fc3d0" className="archetype-node" opacity="0.7" />
          <circle cx="300" cy="450" r="18" fill="#4fc3d0" className="archetype-node" opacity="0.75" />
          <circle cx="150" cy="300" r="10" fill="#4fc3d0" className="archetype-node" opacity="0.5" />
          <circle cx="450" cy="300" r="10" fill="#4fc3d0" className="archetype-node" opacity="0.5" />
        </svg>
      </div>
    </section>
  );
}
