import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FrontierTech() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const row = rowRef.current;
      if (!row) return;

      const getScrollAmount = () => {
        return -(row.scrollWidth - window.innerWidth + 80); // 80px buffer
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${row.scrollWidth}`,
          invalidateOnRefresh: true,
        }
      });

      tl.to(row, {
        x: getScrollAmount,
        ease: 'none',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#f0f8fa] overflow-hidden flex flex-col justify-center z-10">

      {/* Header Area */}
      <div className="absolute top-12 md:top-24 left-6 md:left-10 z-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[6px] h-[6px] rounded-full bg-[#37b99c]" />
          <span className="font-sans font-light text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#0a1e3a]">VERTICAL STRATEGY III</span>
        </div>
        <h2 className="font-sans font-light text-[clamp(28px,4vw,48px)] leading-[1.1] text-[#0a1e3a] tracking-tight mb-2">
          Event Types & Capabilities
        </h2>
        <p className="max-w-md text-[#0a1e3a]/60 text-sm font-light">
          From high-stakes government summits to immersive brand activations, we deliver technical excellence across every vertical. Scroll to explore.
        </p>
      </div>

      {/* Horizontally Scrolling Row */}
      <div ref={rowRef} className="relative z-10 flex items-stretch gap-6 md:gap-8 px-6 md:px-10 mt-32 md:mt-16 w-max h-[400px]">
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
          <div key={i} className="group relative w-[300px] md:w-[350px] h-full bg-white border border-[#0a1e3a]/5 rounded-2xl p-8 flex flex-col justify-between overflow-hidden hover:shadow-[0_20px_40px_rgba(10,30,58,0.06)] hover:border-[#37b99c]/30 transition-all duration-500">
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

    </section>
  );
}
