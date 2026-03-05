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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">

          {/* Connecting connector for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#37b99c] rounded-full flex items-center justify-center z-30 shadow-[0_0_30px_rgba(55,185,156,0.3)]">
            <span className="text-white text-xl font-light tracking-tighter">VS</span>
          </div>

          {/* Traditional */}
          <div className="p-10 md:p-14 rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group hover:bg-white/[0.07] transition-all duration-500">
            <h3 className="font-sans font-medium text-2xl md:text-3xl text-white mb-8 md:mb-12 flex items-center gap-4">
              <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-sm text-white/50 group-hover:bg-white/10 transition-colors">Old</span>
              Traditional Approach
            </h3>

            <ul className="space-y-6">
              {[
                { title: 'Fragmented Vendors', desc: 'Multiple points of contact causing communication breakdown.' },
                { title: 'Standard Execution', desc: 'Templated designs with limited customized branding.' },
                { title: 'Basic Logistics', desc: 'Focused solely on getting the job done without strategic alignment.' },
                { title: 'No Data Tracking', desc: 'Post-event success measured purely by "feeling".' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 group/item">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-white/20 group-hover/item:bg-white/50 transition-colors flex-shrink-0" />
                  <div>
                    <h4 className="text-white/80 font-medium mb-1">{item.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ElitePro */}
          <div className="p-10 md:p-14 rounded-[2rem] bg-[#37b99c]/10 border border-[#37b99c]/30 relative overflow-hidden group hover:bg-[#37b99c]/15 transition-all duration-500 shadow-[0_0_40px_rgba(55,185,156,0.05)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fce01a] rounded-full blur-[100px] opacity-10 pointer-events-none" />

            <h3 className="font-sans font-medium text-2xl md:text-3xl text-white mb-8 md:mb-12 flex items-center gap-4 relative z-10">
              <span className="w-12 h-12 rounded-full bg-[#37b99c] flex items-center justify-center text-sm text-white shadow-[0_0_20px_rgba(55,185,156,0.4)]">New</span>
              The Elite Ecosystem
            </h3>

            <ul className="space-y-6 relative z-10">
              {[
                { title: 'Unified Capability', desc: 'Design, fabrication, and technology seamlessly integrated.' },
                { title: 'Immersive Realities', desc: 'Brand-focused environments carrying deep strategic intent.' },
                { title: 'End-to-End Solutions', desc: 'From initial ideation to on-site robust technical execution.' },
                { title: 'ROI & Analytics', desc: 'Data-driven metrics to optimize brand reach and performance.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 group/item">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-[#fce01a] flex-shrink-0 shadow-[0_0_10px_rgba(252,224,26,0.5)]" />
                  <div>
                    <h4 className="text-[#37b99c] font-medium mb-1 drop-shadow-sm">{item.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
