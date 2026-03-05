import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const questions = [
  "Have you ever felt a deep sense of connection to a place?",
  "How do you balance your personal ambitions with maintaining relationships?",
  "What helps you come to terms with the realization that some aspects of yourself may never change?",
  "In what ways do you cope with regrets about the past?",
  "Can you recall a moment of peace during chaos? What contributed to that sense of calm?",
  "How do you balance your inner desires with the pressures you face from the outside world?"
];

export default function MindMapped() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      if (!cards) return;

      const cardWidth = cards.scrollWidth - (window.innerWidth * 0.45);

      gsap.to(cards, {
        x: -cardWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: `+=${cardWidth + 400}`
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="mind-mapped-section relative w-full h-screen bg-[var(--dark-bg)] flex overflow-hidden">
      {/* Left Static Content */}
      <div className="w-[45%] h-full flex flex-col justify-center px-12 md:px-24 z-10 bg-[var(--dark-bg)]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
          <span className="font-sans font-light text-[11px] tracking-[0.3em] uppercase text-white/60">YOUR MIND, MAPPED</span>
        </div>
        <h2 className="font-sans font-light text-[clamp(48px,6vw,78px)] leading-[1.1] text-white mb-8">
          Your Mind,<br />Mapped
        </h2>
        <p className="font-sans font-light text-[15px] leading-relaxed text-white/78 max-w-md">
          We tirelessly work with our team of psychologists and neuroscientists to model a multi-modal intake mechanisms to understand the true you across varying degrees of abstraction, through exposure to art, music, games, and introspective questions.
        </p>
      </div>

      {/* Right Scrolling Cards */}
      <div className="w-[55%] h-full flex items-center overflow-hidden">
        <div ref={cardsRef} className="question-cards flex gap-6 pl-12 pr-24">
          {questions.map((q, i) => (
            <div key={i} className="flex-shrink-0 w-[280px] p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0] mb-6" />
              <p className="font-sans font-light text-[14px] leading-[1.7] text-white/85 tracking-wide">
                {q}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
