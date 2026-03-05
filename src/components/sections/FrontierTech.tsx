import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FrontierTech() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      
      if (cards) {
        gsap.fromTo(cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
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
    <section ref={containerRef} className="relative w-full py-24 md:py-40 bg-[#f0f8fa] z-10">
      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16 flex items-center gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
          <span className="font-sans font-light text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#0a1e3a]">VERTICAL STRATEGY III</span>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: 'LED Screen Rental', desc: 'Pixel pitch, brightness, and refresh rates optimized for Riyadh sunlight.' },
            { title: 'Sound Systems', desc: 'Brand keywords like JBL and Shure for professional audio hire.' },
            { title: 'Hybrid Events', desc: 'Live streaming services and webinar studio rentals for remote participation.' }
          ].map((item, i) => (
            <div key={i} className="group relative h-[320px] md:h-[400px] bg-white rounded-none p-6 md:p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <span className="font-sans font-light text-5xl md:text-6xl text-[#0a1e3a]/10 transition-colors group-hover:text-[#0a1e3a]/20">0{i + 1}</span>
              <div>
                <h3 className="font-sans font-light text-xl md:text-2xl text-[#0a1e3a] mb-3 md:mb-4">{item.title}</h3>
                <p className="font-sans font-light text-xs md:text-sm text-[#0a1e3a]/60 mb-4">{item.desc}</p>
                <div className="w-8 h-8 rounded-full border border-[#0a1e3a]/20 flex items-center justify-center text-[#0a1e3a] group-hover:bg-[#0a1e3a] group-hover:text-white transition-colors cursor-pointer">
                  +
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
