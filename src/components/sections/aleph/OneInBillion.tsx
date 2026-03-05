import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OneInBillion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.oib-heading', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%'
        }
      });
      
      gsap.from('.oib-body', {
        opacity: 0,
        filter: 'blur(10px)',
        y: 10,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#d8eff8] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-end opacity-[0.06]">
         <div className="w-[1px] h-full bg-[#0a1e3a] rotate-[-15deg] origin-bottom transform translate-x-[-20vw]" />
         <div className="w-[1px] h-full bg-[#0a1e3a] rotate-[15deg] origin-bottom transform translate-x-[20vw]" />
      </div>

      <div className="relative z-10 text-center px-6">
        <h2 className="font-sans font-light text-[clamp(60px,10vw,130px)] leading-[0.95] text-[#0a1e3a] mb-12">
          <span className="oib-heading block">One in</span>
          <span className="oib-heading block">8 Billion</span>
        </h2>
        <p className="oib-body font-sans font-light text-[16px] leading-relaxed text-[#0a1e3a]/75 max-w-[480px] mx-auto">
          We embrace your uniqueness and provide you with a tailored path to becoming your best self.
        </p>
      </div>
    </section>
  );
}
