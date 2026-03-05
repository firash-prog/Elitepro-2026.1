import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGridHover = () => {
    if (gridRef.current) {
      gsap.to(gridRef.current.children, {
        scale: 1.5,
        backgroundColor: '#4fc3d0', // Cyan color
        stagger: {
          amount: 0.2,
          grid: [3, 3],
          from: 'center'
        },
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleGridLeave = () => {
    if (gridRef.current) {
      gsap.to(gridRef.current.children, {
        scale: 1,
        backgroundColor: 'white',
        stagger: {
          amount: 0.2,
          grid: [3, 3],
          from: 'center'
        },
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-10 py-6 pointer-events-none text-white mix-blend-difference">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden pointer-events-auto">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -m-2 text-white/70 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light opacity-75 animate-pulse whitespace-nowrap">
          ELITEPRO EVENTS
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-end gap-1">
          <div className="hidden md:block w-[110px] h-[1px] bg-white/35 mb-1" />
          <div className="flex items-center gap-4">
            <a href="/portfolio" className="hidden md:block text-[11px] tracking-[0.3em] uppercase font-light opacity-60 pointer-events-auto cursor-pointer hover:opacity-100 transition-opacity">PORTFOLIO</a>
            <a href="/admin" className="hidden md:block text-[11px] tracking-[0.3em] uppercase font-light opacity-60 pointer-events-auto cursor-pointer hover:opacity-100 transition-opacity">ADMIN</a>
            <span className="hidden md:block text-[11px] tracking-[0.3em] uppercase font-light opacity-90 pointer-events-auto cursor-pointer hover:opacity-100 transition-opacity">STRATEGY</span>
            {/* 3x3 Dot Grid */}
            <div 
              ref={gridRef}
              className="grid grid-cols-3 gap-[5px] pointer-events-auto cursor-pointer p-2 -m-2"
              onMouseEnter={handleGridHover}
              onMouseLeave={handleGridLeave}
            >
              {Array(9).fill(0).map((_, i) => (
                <div key={i} className="w-[3px] h-[3px] rounded-full bg-white opacity-65" />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] bg-[#071525] transition-transform duration-500 ease-expo ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <a href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-light tracking-[0.2em] uppercase text-white/90 hover:text-[#4fc3d0] transition-colors">Home</a>
          <a href="/aleph" onClick={() => setIsMenuOpen(false)} className="text-2xl font-light tracking-[0.2em] uppercase text-white/90 hover:text-[#4fc3d0] transition-colors">Aleph</a>
          <a href="/portfolio" onClick={() => setIsMenuOpen(false)} className="text-2xl font-light tracking-[0.2em] uppercase text-white/90 hover:text-[#4fc3d0] transition-colors">Portfolio</a>
          <a href="/admin" onClick={() => setIsMenuOpen(false)} className="text-2xl font-light tracking-[0.2em] uppercase text-white/90 hover:text-[#4fc3d0] transition-colors">Admin</a>
          <div className="w-12 h-px bg-white/10 mt-4" />
          <div className="text-[10px] tracking-[0.4em] uppercase text-white/30">Strategic Excellence</div>
        </div>
      </div>
    </>
  );
}
