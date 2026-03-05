import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AlephHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.from('.aleph-heading', { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out' })
        .from('.aleph-body', { y: 30, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.6')
        .from('.aleph-photo', { opacity: 0, duration: 1.4, ease: 'power2.out' }, '-=1.0');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center bg-[var(--dark-bg)] overflow-hidden">
      {/* Right Glow */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse at 100% 50%, rgba(26,160,180,0.35) 0%, transparent 50%)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center h-full">
        {/* Left Content */}
        <div className="w-full md:w-[55%] flex flex-col justify-center pr-0 md:pr-12 pt-20 md:pt-0">
          <h1 className="aleph-heading font-sans font-light text-[clamp(58px,7vw,92px)] leading-none text-white mb-8">
            Meet Aleph
          </h1>
          <p className="aleph-body font-sans font-light text-[16px] leading-relaxed text-white/80 max-w-xl">
            We are designing Aleph to surpass classical diagnostic methods in orders of magnitude, in both accuracy and speed. We believe in a future where truth, insight, and wisdom becomes democratized at a moment's notice, when you need it most.
          </p>
        </div>

        {/* Right Visual */}
        <div className="aleph-photo w-full md:w-[45%] h-[50vh] md:h-full absolute right-0 top-0 md:relative z-[-1] md:z-auto">
           <img 
             src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop" 
             alt="Serene woman with closed eyes"
             className="w-full h-full object-cover opacity-60 md:opacity-80 mix-blend-overlay md:mix-blend-normal"
             referrerPolicy="no-referrer"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#071525] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
