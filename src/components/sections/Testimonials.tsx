import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-40 bg-[var(--dark-bg)] z-10">
      <div className="container mx-auto px-6 md:px-10 text-center mb-16 md:mb-20">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
          <span className="font-sans font-light text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/70">CLIENT PERSPECTIVES</span>
        </div>
        <h2 className="font-sans font-light text-[clamp(40px,10vw,130px)] leading-[0.95] text-white mb-8 md:mb-10">
          Client<br />Perspectives
        </h2>
        <p className="font-sans font-light text-[15px] md:text-[16px] text-white/70 max-w-2xl mx-auto">
          Real voices from clients who have transformed their events with ElitePro.
        </p>
      </div>

      <div className="container mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {[
          { name: 'Ahmed Al-Rashid', role: 'Marketing Director', quote: 'ElitePro transformed our annual gala into an immersive journey. The attention to detail was unmatched.' },
          { name: 'Fatima Al-Dosari', role: 'Event Manager', quote: 'Their in-house fabrication capability meant we had total control over the quality and timing. No surprises.' },
          { name: 'Khalid Al-Saud', role: 'CEO', quote: 'A partner that truly understands the intersection of Saudi culture and modern innovation.' },
          { name: 'Sarah Johnson', role: 'Creative Lead', quote: 'The technical integration was flawless. They didn’t just build a stage; they built an experience.' }
        ].map((item, i) => (
          <div key={i} className="text-left">
            <p className="font-sans font-light text-xl md:text-2xl text-white mb-6 md:mb-8 leading-relaxed italic">
              "{item.quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-mono text-base md:text-lg">{i + 1}</div>
              <div>
                <div className="font-sans font-normal text-white text-sm">{item.name}</div>
                <div className="font-sans font-light text-white/50 text-[10px] md:text-xs uppercase tracking-wider">{item.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
