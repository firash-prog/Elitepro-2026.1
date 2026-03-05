import { motion } from 'motion/react';

const clients = [
  { name: 'Saudi Aramco', logo: 'https://picsum.photos/seed/aramco-logo/200/100' },
  { name: 'SABIC', logo: 'https://picsum.photos/seed/sabic-logo/200/100' },
  { name: 'NEOM', logo: 'https://picsum.photos/seed/neom-logo/200/100' },
  { name: 'Ministry of Health', logo: 'https://picsum.photos/seed/moh-logo/200/100' },
  { name: 'STC', logo: 'https://picsum.photos/seed/stc-logo/200/100' },
  { name: 'Red Sea Global', logo: 'https://picsum.photos/seed/redsea-logo/200/100' },
  { name: 'Public Investment Fund', logo: 'https://picsum.photos/seed/pif-logo/200/100' },
  { name: 'Maaden', logo: 'https://picsum.photos/seed/maaden-logo/200/100' },
];

export default function ClientLogos() {
  return (
    <section className="relative py-20 bg-white overflow-hidden z-10 border-y border-black/5">
      <div className="container mx-auto px-6 md:px-10 mb-12 text-center">
        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-black/40">
          Trusted by Industry Leaders
        </span>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Marquee Track 1 */}
        <motion.div 
          className="flex whitespace-nowrap gap-12 md:gap-24 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <div className="h-8 md:h-12 w-auto flex items-center gap-4">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  referrerPolicy="no-referrer"
                  className="h-full w-auto object-contain"
                />
                <span className="text-sm md:text-lg font-sans font-medium text-black/80 uppercase tracking-tighter">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
