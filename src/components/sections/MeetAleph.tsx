import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MeetAleph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate V-lines
      const lines = linesRef.current?.children;
      if (lines) {
        gsap.fromTo(lines, 
          { height: '0%' },
          {
            height: '120%',
            duration: 1.5,
            stagger: 0.1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Animate Content
      const content = contentRef.current?.children;
      if (content) {
        gsap.fromTo(content,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.5, // Wait for lines to start
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 bg-[#d8eff8] overflow-hidden z-10 flex flex-col items-center justify-center text-center min-h-[80vh]">
      {/* V-line decorations */}
      <div ref={linesRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
         <div className="absolute bottom-0 left-1/2 w-[1px] h-[120%] bg-[#0a1e3a]/20 origin-bottom rotate-[15deg]" />
         <div className="absolute bottom-0 left-1/2 w-[1px] h-[120%] bg-[#0a1e3a]/20 origin-bottom -rotate-[15deg]" />
         <div className="absolute bottom-0 left-1/2 w-[1px] h-[120%] bg-[#0a1e3a]/20 origin-bottom rotate-[30deg]" />
         <div className="absolute bottom-0 left-1/2 w-[1px] h-[120%] bg-[#0a1e3a]/20 origin-bottom -rotate-[30deg]" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl px-6">
        <h2 className="font-sans font-light text-[clamp(60px,10vw,130px)] leading-[0.95] text-[#0a1e3a] mb-8">
          Meet Elite Integrated
        </h2>
        
        <p className="font-sans font-light text-[18px] leading-[1.6] text-[#0a1e3a]/70 mb-12 max-w-2xl mx-auto">
          Elite Integrated is our proprietary end-to-end system for event delivery. It connects the dots between strategy, design, and execution, ensuring that every event is a masterpiece of coordination.
        </p>

        <button 
          onClick={() => navigate('/aleph')}
          className="flex items-center gap-2 mx-auto px-10 py-[13px] bg-[#3d35b5] rounded-full border-none font-sans font-normal text-[11px] tracking-[0.3em] uppercase text-white shadow-[0_8px_30px_rgba(61,53,181,0.5)] transition-all hover:bg-[#3d35b5]/90 cursor-none hover:scale-105 active:scale-95 pointer-events-auto"
        >
          <span className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
          DISCOVER OUR SOLUTION
        </button>
      </div>
    </section>
  );
}
