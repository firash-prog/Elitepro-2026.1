import { useEffect, useState } from 'react';

export default function ScrollArrow() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 text-sm z-50 cursor-none mix-blend-difference transition-opacity duration-300">
      {atTop ? '∨' : '∧'}
    </div>
  );
}
