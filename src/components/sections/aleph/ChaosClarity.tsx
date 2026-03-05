import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ChaosClarity() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chaos-clarity-word', {
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
    <section ref={containerRef} className="chaos-clarity-section relative w-full h-[80vh] bg-[var(--dark-bg)] flex items-center justify-center">
      <h2 className="font-sans font-light text-[clamp(52px,8vw,110px)] leading-[1.0] text-white text-center">
        <span className="chaos-clarity-word inline-block mr-[0.2em]">From</span>
        <span className="chaos-clarity-word inline-block mr-[0.2em]">Chaos</span>
        <br />
        <span className="chaos-clarity-word inline-block mr-[0.2em]">to</span>
        <span className="chaos-clarity-word inline-block">Clarity</span>
      </h2>
    </section>
  );
}
