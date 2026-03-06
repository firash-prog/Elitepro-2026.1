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

      <div className="relative z-20 container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-sans font-light text-[clamp(32px,5vw,56px)] leading-[1.1] text-white tracking-tight">
            Moving upmarket to<br />
            <span className="text-[#37b99c]">Strategic Event Management</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[#37b99c]/30 to-transparent -translate-x-1/2 hidden md:block" />

          {/* Comparison Rows */}
          <div className="space-y-16">
            {[
              {
                oldTitle: 'Fragmented Vendors',
                oldDesc: 'Multiple points of contact causing communication breakdown and stress.',
                newTitle: 'Unified Capability',
                newDesc: 'Design, fabrication, and technology seamlessly integrated under one roof.'
              },
              {
                oldTitle: 'Standard Execution',
                oldDesc: 'Templated designs with limited customized branding or true impact.',
                newTitle: 'Immersive Realities',
                newDesc: 'Brand-focused environments carrying deep strategic intent.'
              },
              {
                oldTitle: 'Basic Logistics',
                oldDesc: 'Focused solely on getting the job done without strategic alignment.',
                newTitle: 'End-to-End Solutions',
                newDesc: 'From initial ideation to robust on-site technical execution.'
              },
              {
                oldTitle: 'No Data Tracking',
                oldDesc: 'Post-event success measured purely by "feeling" and guesswork.',
                newTitle: 'ROI & Analytics',
                newDesc: 'Data-driven metrics to optimize brand reach and overall performance.'
              }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16 group">

                {/* Traditional Side */}
                <div className="flex-1 md:text-right flex flex-col items-start md:items-end w-full pl-12 md:pl-0">
                  <h4 className="text-white/60 font-medium text-lg mb-2 relative">
                    <span className="md:hidden absolute -left-10 top-1 text-white/20 text-sm">Old</span>
                    {item.oldTitle}
                  </h4>
                  <p className="text-white/40 text-sm leading-relaxed max-w-[280px]">
                    {item.oldDesc}
                  </p>
                </div>

                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 md:top-auto w-10 h-10 rounded-full border border-[#37b99c]/30 bg-[var(--dark-bg)] flex items-center justify-center group-hover:bg-[#37b99c]/10 group-hover:border-[#37b99c]/50 transition-all duration-500 z-10 shadow-[0_0_20px_rgba(55,185,156,0.1)]">
                  <div className="w-2 h-2 rounded-full bg-[#fce01a] group-hover:scale-150 transition-transform duration-500" />
                </div>

                {/* Elite Side */}
                <div className="flex-1 flex flex-col items-start w-full pl-12 md:pl-0">
                  <h4 className="text-[#37b99c] font-medium text-xl mb-2 relative drop-shadow-sm">
                    {item.newTitle}
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed max-w-[280px]">
                    {item.newDesc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
