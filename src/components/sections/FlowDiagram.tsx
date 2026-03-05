import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FlowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const row = rowRef.current;
      const bg = bgRef.current;
      if (!row) return;

      const getScrollAmount = () => {
        return -(row.scrollWidth - window.innerWidth);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${row.scrollWidth}`,
          invalidateOnRefresh: true,
        }
      });

      tl.to(row, {
        x: getScrollAmount,
        ease: 'none',
      });

      if (bg) {
        tl.to(bg, {
          x: () => getScrollAmount() * 0.15, // Moves at 15% speed of the row
          ease: 'none',
        }, 0);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="flow-section relative w-full h-screen bg-[var(--dark-bg)] overflow-hidden flex items-center z-10">
      {/* Background Parallax Element */}
      <div ref={bgRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-max opacity-[0.03] pointer-events-none select-none whitespace-nowrap z-0">
        <span className="text-[30vw] font-bold text-white leading-none">
          SYSTEMATIC PROCESS FLOW
        </span>
      </div>

      <div ref={rowRef} className="flow-row relative z-10 flex items-center gap-10 md:gap-20 px-10 md:px-20 min-w-max">
        {/* Nodes */}
        {['Concept Creation', 'Venue Sourcing', 'Event Production', 'Audio Visuals', 'Guest Management', 'On-site Execution', 'Post-Event'].map((step, i) => (
          <div key={i} className="flex items-center gap-10 md:gap-20">
            <div className={`relative w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-full border border-white/15 flex flex-col items-center justify-center p-6 text-center ${i === 3 ? 'border-white/40 bg-white/5' : ''}`}>
              <span className="font-mono text-xs text-white/50 mb-2">{`0${i + 1}`}</span>
              <span className="font-sans font-light text-sm md:text-base text-white">{step}</span>
              {i === 3 && <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse" />}
            </div>
            {i < 6 && <div className="text-white/20 text-2xl md:text-4xl">→</div>}
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 max-w-[280px] md:max-w-md pointer-events-none z-20">
        <h3 className="font-sans font-light text-2xl md:text-3xl text-white mb-2 md:mb-4">Flawless Execution</h3>
        <p className="font-sans font-light text-sm md:text-base text-white/60">Delivering seamless corporate and government events from concept to completion.</p>
      </div>
    </section>
  );
}
