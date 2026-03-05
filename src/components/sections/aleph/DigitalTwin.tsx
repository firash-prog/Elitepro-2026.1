import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

function RotatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <TorusKnot ref={meshRef} args={[1, 0.3, 128, 16]}>
      <meshStandardMaterial 
        color="#4fc3d0" 
        wireframe 
        emissive="#4fc3d0"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </TorusKnot>
  );
}

export default function DigitalTwin() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = document.querySelectorAll('.dt-text');
      texts.forEach((text) => {
        gsap.from(text, {
          opacity: 0,
          y: 20,
          filter: 'blur(10px)',
          duration: 1,
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 0.5
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] bg-[var(--dark-bg)] flex flex-col md:flex-row items-start overflow-hidden py-20">
      {/* Left Text Content */}
      <div className="w-full md:w-1/2 px-12 md:px-24 z-10 flex flex-col gap-40 pt-40">
        <div className="dt-text">
            <h3 className="font-sans font-light text-2xl text-white mb-4">Digital Twin</h3>
            <p className="font-sans font-light text-[16px] leading-relaxed text-white/78 max-w-md">
            By synthesizing these complexes, structures, and predispositions that make you who you are, we create a digital twin of you.
            </p>
        </div>
        <div className="dt-text">
            <p className="font-sans font-light text-[16px] leading-relaxed text-white/78 max-w-md">
            We place your digital twin in superposition, enabling precise analysis of each complex structure as a unique entity, generating insights from scenario-based comparisons.
            </p>
        </div>
        <div className="dt-text">
            <p className="font-sans font-light text-[16px] leading-relaxed text-white/78 max-w-md">
            We model your superimposed self onto novel quantum circuits designed to simulate end to end treatment.
            </p>
        </div>
      </div>

      {/* Right 3D Visual */}
      <div className="hidden md:block w-1/2 h-full absolute right-0 top-0">
         <div className="sticky top-0 h-screen w-full">
            <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <RotatingTorus />
            <Environment preset="city" />
            </Canvas>
         </div>
      </div>
    </section>
  );
}
