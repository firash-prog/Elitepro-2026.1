import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // smoothTouch: false, // PDF says false
    });

    // lenis.on('scroll', ScrollTrigger.update); // This is deprecated in v1+ usually, but let's try.
    // Actually, let's check if the installed version supports this.
    // The PDF says: lenis.on('scroll', ScrollTrigger.update)

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      // gsap.ticker.remove... 
    };
  }, []);
}
