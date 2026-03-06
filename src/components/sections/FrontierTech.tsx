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
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div className="mb-12 md:mb-16 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[6px] h-[6px] rounded-full bg-[#37b99c]" />
              <span className="font-sans font-light text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#0a1e3a]">VERTICAL STRATEGY III</span>
            </div>
            <h2 className="font-sans font-light text-[clamp(28px,4vw,48px)] leading-[1.1] text-[#0a1e3a] tracking-tight">
              Event Types & Capabilities
            </h2>
          </div>
          <p className="hidden md:block max-w-sm text-[#0a1e3a]/60 text-sm font-light">
            From high-stakes government summits to immersive brand activations, we deliver technical excellence across every vertical.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { tag: 'Corporate', title: 'Conferences & Summits', desc: 'End-to-end management for high-profile industry gatherings, featuring advanced registration tracking and robust AV solutions.' },
            { tag: 'Government', title: 'Protocol Events', desc: 'Flawless execution of state-level ceremonies requiring strict security integrations and dignitary management.' },
            { tag: 'Entertainment', title: 'Concerts & Festivals', desc: 'Massive stage fabrication, line-array sound systems, and crowd control logistics for thousands of attendees.' },
            { tag: 'Marketing', title: 'Brand Activations', desc: 'Immersive pop-up environments designed to maximize audience engagement and social media ROI.' },
            { tag: 'Technology', title: 'Hybrid & Virtual', desc: 'Live streaming setups, webinar studios, and interactive digital platforms for global reach.' },
            { tag: 'Exhibition', title: 'Trade Show Booths', desc: 'Custom fabrication of impactful exhibition stands designed to attract foot traffic and capture leads.' },
            { tag: 'Corporate', title: 'Gala Dinners', desc: 'Elegant staging, lighting design, and thematic environments for prestigious awards ceremonies.' },
            { tag: 'Specialty', title: 'Product Launches', desc: 'High-impact reveals utilizing projection mapping, kinetic lighting, and cutting-edge visual effects.' }
          ].map((item, i) => (
            <div key={i} className="group relative bg-white border border-[#0a1e3a]/5 rounded-2xl p-8 flex flex-col justify-between overflow-hidden hover:shadow-[0_20px_40px_rgba(10,30,58,0.06)] hover:border-[#37b99c]/30 transition-all duration-500 hover:-translate-y-1">
              {/* Background Accent */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#37b99c]/5 rounded-full blur-[40px] group-hover:bg-[#fce01a]/10 transition-colors duration-500 pointer-events-none" />

              <div className="relative z-10 flex-col flex h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] tracking-widest uppercase font-medium text-[#37b99c] px-3 py-1 bg-[#37b99c]/10 rounded-full">{item.tag}</span>
                  <span className="font-mono text-sm text-[#0a1e3a]/20 group-hover:text-[#37b99c]/40 transition-colors font-medium">0{i + 1}</span>
                </div>

                <h3 className="font-sans font-medium text-xl md:text-2xl text-[#0a1e3a] mb-4 group-hover:text-[#37b99c] transition-colors">{item.title}</h3>

                <p className="font-sans font-light text-sm text-[#0a1e3a]/60 flex-grow leading-relaxed">{item.desc}</p>

                <div className="mt-8 flex items-center gap-3 text-[#0a1e3a]/40 group-hover:text-[#37b99c] transition-colors cursor-pointer text-sm font-medium w-max">
                  <span className="relative overflow-hidden">
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Explore</span>
                    <span className="inline-block absolute left-0 top-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[#37b99c]">Explore</span>
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
