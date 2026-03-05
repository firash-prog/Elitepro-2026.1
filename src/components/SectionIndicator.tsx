import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionIndicator() {
  const [currentLabel, setCurrentLabel] = useState('RECONNECTING WITH NATURE');

  useEffect(() => {
    // Logic to update label based on scroll position
    // For now, hardcode or use ScrollTrigger to update state based on section visibility
    // I'll implement a simple scroll listener or ScrollTrigger logic later when sections are defined.
  }, []);

  return (
    <div className="hidden md:flex fixed bottom-11 left-10 items-center gap-2 z-50 pointer-events-none mix-blend-difference">
      <div className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
      <span className="font-sans font-light text-[10px] tracking-[0.35em] uppercase text-white/70">
        {currentLabel}
      </span>
    </div>
  );
}
