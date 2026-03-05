import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GuidingPrinciples() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full py-40 bg-[var(--dark-bg)] overflow-hidden z-10">
      <div className="container mx-auto px-10 flex flex-col md:flex-row items-start">
        {/* Giant "4" */}
        <div className="w-full md:w-1/2 relative h-screen sticky top-0 flex items-center">
          <span className="font-sans font-light text-[55vw] leading-[0.8] text-[#2a6080] opacity-50 select-none">4</span>
        </div>

        {/* Principles List */}
        <div className="w-full md:w-1/2 pt-20">
          {[
            { title: 'Synergy with clients', desc: 'Collaborative planning from day one.' },
            { title: 'Integrated Solutions', desc: 'Design, build, and tech under one roof.' },
            { title: 'Connected Excellence', desc: 'Every touchpoint reinforces the brand message.' },
            { title: 'Dynamic Customization', desc: 'Tailored solutions for every scale.' },
            { title: 'Pioneering Innovation', desc: 'Leveraging latest tech for engagement.' },
            { title: 'Excellence', desc: 'Uncompromising quality control.' }
          ].map((item, i) => (
            <div key={i} className="mb-20 border-b border-white/10 pb-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
                <span className="font-sans font-light text-[11px] tracking-[0.3em] uppercase text-white/70">PRINCIPLE 0{i + 1}</span>
              </div>
              <h3 className="font-sans font-light text-3xl text-white mb-4">{item.title}</h3>
              <p className="font-sans font-light text-white/60 text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
