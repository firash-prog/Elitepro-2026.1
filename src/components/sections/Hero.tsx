import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Initial Reveal
      tl.from(imgRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 1.8,
        ease: 'power2.out'
      })
        .from('.hero-line', {
          y: 100,
          opacity: 0,
          rotateX: -20,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out'
        }, '-=1.2')
        .from('.hero-cta', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.8')
        .from(['.hero-bottom-left', '.hero-bottom-right'], {
          y: 20,
          opacity: 0,
          duration: 1,
          stagger: 0.2
        }, '-=0.8');

      // Scroll Parallax
      gsap.to(imgRef.current, {
        y: '30%',
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text Parallax (slower)
      gsap.to(titleRef.current, {
        y: '-50%',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden perspective-1000">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={imgRef}
          src="https://cdn.coverr.co/videos/coverr-people-at-a-concert-5460/1080p.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-[120%] object-cover object-[52%_30%] z-0 origin-center"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#050c1e]/96 via-[#06122a]/82 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050c1e]/50 to-transparent via-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#050c1e]/90 via-[#050c1e]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full">
        {/* Heading */}
        <div ref={titleRef} className="absolute left-[6%] top-1/2 -translate-y-[55%] max-w-[88vw] md:max-w-[65vw]">
          <h1 className="font-sans font-light text-[clamp(40px,10vw,82px)] leading-[1.05] text-white m-0 perspective-1000">
            <span className="hero-line block transform-style-3d">Empower your</span>
            <span className="hero-line block transform-style-3d">event vision</span>
          </h1>

          {/* CTA Button */}
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-cta flex items-center gap-2 mt-9 px-8 md:px-10 py-[13px] bg-[#37b99c] rounded-full border-none font-sans font-normal text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white shadow-[0_8px_30px_rgba(55,185,156,0.5)] transition-all hover:bg-[#37b99c]/90 cursor-none hover:scale-105 active:scale-95 pointer-events-auto"
          >
            <span className="w-[6px] h-[6px] rounded-full bg-[#fce01a]" />
            Start your journey
          </button>
        </div>

        {/* Bottom Left */}
        <div className="hero-bottom-left absolute left-6 md:left-10 bottom-8 md:bottom-11 font-sans font-light text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-white/55">
          ElitePro Events & Advertising KSA
        </div>

        {/* Bottom Right */}
        <div className="hero-bottom-right absolute right-6 md:right-10 bottom-8 md:bottom-11 max-w-[200px] md:max-w-[280px] text-right">
          <div className="mb-[10px] text-white/40 text-sm animate-bounce">∧</div>
          <p className="font-sans font-light text-[11px] md:text-[13px] leading-[1.75] text-white/78 m-0">
            ElitePro Events & Advertising is an innovation lab working at the intersection of technology and experience design.
          </p>
        </div>
      </div>
    </section>
  );
}
