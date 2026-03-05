import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function DigitColumn({ target, delay }: { target: number, delay: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const strip = stripRef.current;
    if (!container || !strip) return;

    // Use ScrollTrigger to trigger the animation when in view
    ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        onEnter: () => {
            const digitHeight = container.clientHeight;
            // We want to land on the target digit.
            // The strip has 4 sets of 0-9.
            // Let's spin 2 full sets and land on the target in the 3rd set.
            const spins = 2;
            const targetIndex = (spins * 10) + target;
            const finalY = -(targetIndex * digitHeight);

            gsap.to(strip, {
                y: finalY,
                duration: 2.5,
                delay: delay,
                ease: 'power3.out'
            });
        }
    });

  }, [target, delay]);

  // Create a strip of numbers: 4 sets of 0-9
  const numbers = Array(40).fill(0).map((_, i) => i % 10);

  return (
    <div ref={containerRef} className="h-[clamp(60px,9vw,110px)] overflow-hidden font-sans font-light text-[clamp(60px,9vw,110px)] leading-none text-white w-[1ch] relative">
      <div ref={stripRef} className="absolute top-0 left-0 w-full flex flex-col">
        {numbers.map((d, i) => (
            <span key={i} className="block h-[clamp(60px,9vw,110px)] leading-[clamp(60px,9vw,110px)] text-center">{d}</span>
        ))}
      </div>
    </div>
  );
}

export default function QuantumSpeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[var(--dark-bg)] flex items-center overflow-hidden px-12 md:px-24">
      {/* Left Content */}
      <div className="w-full md:w-1/2 z-10">
        <h2 className="font-sans font-light text-[clamp(42px,5.5vw,72px)] leading-none text-white mb-8">
          Precision care at<br />quantum speed
        </h2>
        <p className="font-sans font-light text-[15px] leading-relaxed text-white/78 max-w-md">
          The current mental healthcare system makes you wait an average of 141 days for accurate treatment. Aleph accelerates this, revolutionizing mental care with unmatched speed.
        </p>
      </div>

      {/* Right Counter */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center">
        <div className="flex gap-4 items-end">
            {/* 1 4 1 */}
            <DigitColumn target={1} delay={0} />
            <DigitColumn target={4} delay={0.2} />
            <DigitColumn target={1} delay={0.4} />
            
            <div className="h-[clamp(60px,9vw,110px)] flex items-end pb-2 font-sans font-light text-[30px] text-white/50 ml-4">
                days
            </div>
        </div>
        <div className="mt-8 text-white/60 font-sans font-light text-sm tracking-widest uppercase">
            Aleph simulates 4000 treatments per second
        </div>
      </div>
    </section>
  );
}
