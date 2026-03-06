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
        {[
          { title: 'Concept Creation', img: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600' },
          { title: 'Venue Sourcing', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600' },
          { title: 'Event Production', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600' },
          { title: 'Audio Visuals', img: 'https://images.unsplash.com/photo-1598368195835-91e67f80c9d7?auto=format&fit=crop&q=80&w=600' },
          { title: 'Guest Management', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600' },
          { title: 'On-site Execution', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600' },
          { title: 'Post-Event', img: 'https://images.unsplash.com/photo-1478147427282-58a871193282?auto=format&fit=crop&q=80&w=600' }
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-10 md:gap-20">
            <div className={`group relative w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-full border border-white/20 flex flex-col items-center justify-center p-6 text-center overflow-hidden transition-all duration-500 hover:border-[#37b99c]/50 hover:shadow-[0_0_40px_rgba(55,185,156,0.2)] ${i === 3 ? 'border-white/40 ring-2 ring-[#37b99c]/30 ring-offset-4 ring-offset-[var(--dark-bg)]' : ''}`}>

              {/* Background Image Layer */}
              <div className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-60 transition-opacity duration-700 ease-in-out group-hover:scale-110">
                <img src={step.img} alt={step.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)] via-[#0a1e3a]/60 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-[#37b99c]/10 mix-blend-overlay" />
              </div>

              {/* Content Layer */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="font-mono text-xs text-[#37b99c] mb-2 font-medium tracking-widest">{`0${i + 1}`}</span>
                <span className="font-sans font-medium text-sm md:text-lg text-white group-hover:text-[#fce01a] transition-colors duration-300 drop-shadow-md">{step.title}</span>
              </div>

              {i === 3 && <div className="absolute inset-0 rounded-full border border-[#37b99c]/40 animate-pulse pointer-events-none" />}
            </div>
            {i < 6 && <div className="text-white/20 text-2xl md:text-3xl font-light">→</div>}
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
