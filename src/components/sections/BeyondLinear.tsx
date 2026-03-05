import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BeyondLinear() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-40 bg-[var(--dark-bg)] flex flex-col items-center justify-center z-10">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
        <span className="font-sans font-light text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/70">VERTICAL STRATEGY I</span>
      </div>
      
      <div className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full border border-white/20 flex items-center justify-center mb-10 text-center p-8">
        <span className="font-sans font-light text-white tracking-[0.2em] uppercase text-sm md:text-base">Event<br />Management</span>
      </div>

      <p className="max-w-2xl text-center font-sans font-light text-[clamp(20px,3.5vw,44px)] leading-[1.4] text-white px-6">
        Moving upmarket from "party planning" to "strategic event management" for corporate and government clients.
      </p>
    </section>
  );
}
