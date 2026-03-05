import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OptimalTreatment() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ot-word', {
        opacity: 0,
        filter: 'blur(12px)',
        y: 10,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 50%',
          scrub: 0.6
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] bg-[var(--dark-bg)] flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
        <span className="font-sans font-light text-[11px] tracking-[0.3em] uppercase text-white/60">OPTIMAL TREATMENT</span>
      </div>
      <h2 className="font-sans font-light text-[clamp(52px,8vw,110px)] leading-[1.0] text-white text-center">
        <span className="ot-word inline-block mr-[0.2em]">Optimal</span>
        <span className="ot-word inline-block mr-[0.2em]">Treatment</span>
        <br />
        <span className="ot-word inline-block">Found</span>
      </h2>
    </section>
  );
}
