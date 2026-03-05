import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ResearchAccess() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[var(--dark-bg)] flex flex-col items-center justify-center text-center px-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
        <span className="font-sans font-light text-[11px] tracking-[0.3em] uppercase text-white/60">GET RESEARCH ACCESS</span>
      </div>
      
      <h2 className="font-sans font-light text-[clamp(42px,5.5vw,72px)] leading-[1.1] text-white mb-8 max-w-3xl">
        Get research access<br />to Aleph
      </h2>
      
      <p className="font-sans font-light text-[16px] leading-relaxed text-white/78 max-w-[520px] mb-12">
        Reach out to become part of our early trial studies, and discover how one second can transform a lifetime of wellbeing.
      </p>
      
      <button className="flex items-center gap-3 px-[52px] py-[14px] bg-[#3d35b5] rounded-full border-none font-sans font-normal text-[11px] tracking-[0.3em] uppercase text-white shadow-[0_8px_30px_rgba(61,53,181,0.5)] transition-all hover:bg-[#4a3dcc] hover:shadow-[0_12px_40px_rgba(61,53,181,0.65)] cursor-none hover:scale-105 active:scale-95 pointer-events-auto">
        <span className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
        Join The Waitlist
      </button>
    </section>
  );
}
