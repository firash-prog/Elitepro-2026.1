import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ReconnectingNature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<SVGSVGElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const orbits = orbitsRef.current;
      const gradient = gradientRef.current;
      
      if (orbits) {
        // Select individual orbit groups
        const orbit1 = orbits.querySelector('.orbit-1');
        const orbit2 = orbits.querySelector('.orbit-2');
        const orbit3 = orbits.querySelector('.orbit-3');
        const orbit4 = orbits.querySelector('.orbit-4');

        // Animate orbits with different speeds and directions
        gsap.to(orbit1, { rotation: 360, duration: 60, repeat: -1, ease: 'linear' });
        gsap.to(orbit2, { rotation: -360, duration: 80, repeat: -1, ease: 'linear' });
        gsap.to(orbit3, { rotation: 360, duration: 100, repeat: -1, ease: 'linear' });
        gsap.to(orbit4, { rotation: -360, duration: 120, repeat: -1, ease: 'linear' });

        // Parallax effect on scroll
        gsap.to(orbits, {
          y: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          }
        });
      }

      if (gradient) {
        // Scroll-responsive background gradient transformation
        gsap.fromTo(gradient,
          { opacity: 0, x: '20%' },
          {
            opacity: 1,
            x: '0%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%', // Start fading in as we enter
              end: 'center center', // Fully visible by center
              scrub: 0.5,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-40 min-h-screen flex items-center overflow-hidden z-10 bg-[#050c1e]">
      {/* Dynamic Background Gradient */}
      <div 
        ref={gradientRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-0"
        style={{
          background: 'radial-gradient(circle at 80% 50%, rgba(26,160,180,0.25) 0%, rgba(5,12,30,0) 60%)'
        }}
      />

      {/* Orbital Background System */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
         <svg 
            ref={orbitsRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vmax] h-[140vmax] opacity-20 md:opacity-30"
            viewBox="0 0 1000 1000"
         >
            {/* Orbit 1 - Inner */}
            <g className="orbit-1" style={{ transformOrigin: '500px 500px' }}>
              <circle cx="500" cy="500" r="150" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="500" cy="350" r="3" fill="white" />
            </g>

            {/* Orbit 2 - Dashed */}
            <g className="orbit-2" style={{ transformOrigin: '500px 500px' }}>
              <circle cx="500" cy="500" r="280" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
              <circle cx="220" cy="500" r="4" fill="white" />
            </g>

            {/* Orbit 3 - Middle */}
            <g className="orbit-3" style={{ transformOrigin: '500px 500px' }}>
              <circle cx="500" cy="500" r="400" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="780" cy="500" r="2" fill="white" />
            </g>

            {/* Orbit 4 - Outer */}
            <g className="orbit-4" style={{ transformOrigin: '500px 500px' }}>
              <circle cx="500" cy="500" r="480" fill="none" stroke="white" strokeWidth="0.2" />
              <circle cx="500" cy="980" r="5" fill="white" opacity="0.5" />
            </g>
         </svg>
      </div>

      {/* Interactive Node 01 */}
      <div 
        ref={nodeRef}
        className="hidden md:flex absolute top-[30%] left-[60%] w-16 h-16 items-center justify-center group cursor-pointer z-20"
      >
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full border border-white/20 scale-100 group-hover:scale-150 transition-transform duration-500 ease-out" />
        {/* Core */}
        <div className="w-8 h-8 rounded-full bg-[#050c1e] border border-white/40 flex items-center justify-center text-[10px] text-white font-mono group-hover:bg-white group-hover:text-[#050c1e] transition-colors duration-300">
          01
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-2xl">
           <div className="mb-8 flex items-center gap-3">
            <div className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
            <span className="font-sans font-light text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/70">RECONNECTING WITH VISION</span>
          </div>
          <h2 className="font-sans font-light text-[clamp(32px,8vw,60px)] leading-[1.1] text-white mb-8 md:mb-10">
            Reconnecting<br />with vision.
          </h2>
          <p className="font-sans font-light text-[15px] md:text-[16px] leading-[1.6] text-white/70 max-w-md mb-10 md:mb-12">
            Modern event experiences often feel disconnected—fragmented across multiple vendors, inconsistent in quality, and misaligned with the strategic goals of the host.
          </p>

          <div className="pl-6 border-l border-white/20">
            <h3 className="font-sans font-normal text-lg md:text-xl text-white mb-3 md:mb-4">Beyond fragmented execution</h3>
            <p className="font-sans font-light text-[14px] md:text-[15px] leading-[1.6] text-white/60">
              We bridge this gap by bringing design, fabrication, and technology under one roof. This ensures that the initial spark of inspiration is carried through to the final guest experience without dilution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
