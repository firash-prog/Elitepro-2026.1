import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Innovating() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating Triangle Animation
      gsap.to(triangleRef.current, {
        y: -20,
        rotation: 2,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Parallax Triangle on Scroll
      gsap.to(triangleRef.current, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Text Reveal Animation
      const textElements = textRef.current?.children;
      if (textElements) {
        gsap.fromTo(textElements, 
          { y: 50, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
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
    <section ref={containerRef} className="relative w-full py-24 md:py-40 bg-[#c8eaf0] overflow-hidden z-10">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-multiply">
        <img 
          src="https://picsum.photos/seed/industrial-facility/1920/1080" 
          alt="Facility Background" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6 md:px-10 relative">
        {/* Floating Triangle - CSS Triangle */}
        <div 
          ref={triangleRef}
          className="absolute -left-20 md:left-0 top-0 w-0 h-0 border-l-[100px] md:border-l-[140px] border-r-[100px] md:border-r-[140px] border-t-[180px] md:border-t-[240px] border-l-transparent border-r-transparent border-t-[#1a5878] opacity-80 mix-blend-multiply pointer-events-none"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(26,88,120,0.3))' }}
        />
        
        <div ref={textRef} className="flex flex-col items-center text-center relative z-10 w-full">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-[6px] h-[6px] rounded-full bg-[#0a2040]" />
            <span className="font-sans font-light text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#0a2040]">ADVANCED CAPABILITIES</span>
          </div>
          
          <h2 className="font-sans font-light text-[clamp(32px,7vw,100px)] leading-[0.9] text-[#0a2040] mb-10 max-w-5xl">
            Innovating the future of<br />event experiences
          </h2>
          
          <p className="font-sans font-light text-[15px] md:text-[16px] leading-[1.6] text-[#0a2040]/70 max-w-2xl mb-12 md:mb-16">
            ElitePro pioneers excellence through a unique combination of strategic insight, creative design, and robust industrial capability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl text-left">
            {[
              { title: 'Our Facility, Your Vision', desc: '5000+ sqm manufacturing hub in Eastern Province.' },
              { title: 'Excellence in Every Detail', desc: 'From raw material to refined finish.' },
              { title: 'Proven Client Success', desc: 'Trusted by Aramco, SABIC, and ministries.' }
            ].map((item, i) => (
              <div key={i} className="p-6 md:p-8 border border-[#0a2040]/10 rounded-2xl bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#0a2040] text-white flex items-center justify-center font-mono text-sm mb-6">0{i + 1}</div>
                <h3 className="font-sans font-normal text-lg md:text-xl text-[#0a2040] mb-3">{item.title}</h3>
                <p className="font-sans font-light text-[#0a2040]/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
