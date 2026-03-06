import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const text = textRef.current;

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

    </section>
  );
}
