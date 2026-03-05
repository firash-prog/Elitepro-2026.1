import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initial position off-screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12, // Lerp factor
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: '1px solid white',
        background: 'transparent',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9999,
        top: 0,
        left: 0,
        mixBlendMode: 'difference',
      }}
    />
  );
}
