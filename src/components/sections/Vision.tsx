import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const text = textRef.current;
      const planet = planetRef.current;
      
      if (text) {
        // Split text logic
        const words = text.innerText.split(' ');
        text.innerHTML = '';
        words.forEach(word => {
          const span = document.createElement('span');
          span.innerText = word + ' ';
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.filter = 'blur(10px)';
          span.style.transform = 'translateY(8px)';
          text.appendChild(span);
        });

        const spans = text.querySelectorAll('span');

        gsap.to(spans, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 0.8,
          },
        });
      }

      if (planet) {
        gsap.fromTo(planet, 
          { y: '80%', scale: 0.8, opacity: 0 }, // Start smaller and invisible
          {
            y: '-40%', // Move up more to cover screen
            scale: 1.5, // Expand more to flatten the curve
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom', // Start earlier
              end: 'bottom top',
              scrub: 0, // Instant response
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-40 bg-white flex flex-col items-center justify-center text-center z-10 min-h-[100vh] md:min-h-[120vh] overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <img 
          src="https://picsum.photos/seed/abstract-vision/1920/1080" 
          alt="Vision Background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-20 mb-8 md:mb-12 flex items-center gap-3">
        <div className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
        <span className="font-sans font-light text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#0a1e3a]">VISION</span>
      </div>
      
      <h2 ref={textRef} className="relative z-20 max-w-[900px] px-6 font-sans font-light text-[clamp(20px,4vw,44px)] leading-[1.4] text-[#0a1e3a] mb-12 md:mb-20">
        We empower businesses and individuals with the expertise, infrastructure, and creativity to deliver events that create lasting impact and unprecedented results.
      </h2>

      {/* Process Comparison Diagram */}
      <div className="relative z-20 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl text-left">
        {/* Traditional */}
        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
          <h3 className="font-sans font-medium text-lg text-[#0a1e3a] mb-6 tracking-wide uppercase text-sm opacity-60">Traditional Event Planning</h3>
          <ul className="space-y-4">
            {['Initial Consultation', 'Venue Search', 'Vendor Coordination', 'Event Execution', 'Post-Event Review'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[#0a1e3a]/60 font-sans font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ElitePro */}
        <div className="p-8 rounded-2xl bg-[#0a1e3a] text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#4fc3d0] rounded-full blur-[60px] opacity-20" />
          <h3 className="font-sans font-medium text-lg text-white mb-6 tracking-wide uppercase text-sm text-[#4fc3d0]">ElitePro Approach</h3>
          <ul className="space-y-4">
            {['Strategic Planning', 'In-House Fabrication', 'Technical Integration', 'Seamless Execution', 'Performance Analytics'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/90 font-sans font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4fc3d0]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Rising Planet Transition Element */}
      <div 
        ref={planetRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-[#050c1e] z-10 pointer-events-none"
        style={{ transform: 'translateY(80%) scale(1.2)' }}
      />
    </section>
  );
}
