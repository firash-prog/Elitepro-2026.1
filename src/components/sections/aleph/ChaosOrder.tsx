import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ChaosOrder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let progress = 0;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize Particles
    const numParticles = 300;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        chaosX: Math.random() * canvas.width,
        chaosY: Math.random() * canvas.height,
        orderX: (canvas.width / 2) + (Math.cos(i) * (i * 0.5)), // Spiral/Geometric
        orderY: (canvas.height / 2) + (Math.sin(i) * (i * 0.5)),
        size: Math.random() * 2 + 1,
        color: `rgba(79,195,208,${Math.random() * 0.5 + 0.2})`
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Interpolate position
        const currentX = p.chaosX + (p.orderX - p.chaosX) * progress;
        const currentY = p.chaosY + (p.orderY - p.chaosY) * progress;
        
        // Add noise based on progress (more noise in chaos, less in order)
        const noise = (1 - progress) * 2;
        const x = currentX + (Math.random() - 0.5) * noise;
        const y = currentY + (Math.random() - 0.5) * noise;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=2000', // Pin for 2000px
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        progress = self.progress;
        
        // Text Swap
        if (textRef.current) {
            const chaosText = textRef.current.querySelector('.chaos-text');
            const orderText = textRef.current.querySelector('.order-text');
            
            if (self.progress > 0.5) {
                gsap.to(chaosText, { opacity: 0, duration: 0.5, overwrite: true });
                gsap.to(orderText, { opacity: 1, duration: 0.5, overwrite: true });
            } else {
                gsap.to(chaosText, { opacity: 1, duration: 0.5, overwrite: true });
                gsap.to(orderText, { opacity: 0, duration: 0.5, overwrite: true });
            }
        }
      }
    });

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      st.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="chaos-order-section relative w-full h-screen bg-[var(--dark-bg)] flex overflow-hidden">
      {/* Left Text */}
      <div ref={textRef} className="w-1/2 h-full flex flex-col justify-center items-center relative z-10">
        <div className="relative w-full h-[200px] flex items-center justify-center">
            <h2 className="chaos-text font-sans font-light text-[clamp(80px,14vw,200px)] leading-none text-white tracking-tighter absolute">
            Chaos
            </h2>
            <h2 className="order-text font-sans font-light text-[clamp(80px,14vw,200px)] leading-none text-white tracking-tighter absolute opacity-0">
            Order
            </h2>
        </div>
        
        <div className="mt-20 px-12 text-center">
            <p className="font-sans font-light text-[16px] leading-relaxed text-white/78 max-w-md mx-auto">
            We apply non-linear dynamics to capture the complex chaos within you.
            </p>
        </div>
      </div>

      {/* Right Canvas */}
      <div className="w-1/2 h-full flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </section>
  );
}
