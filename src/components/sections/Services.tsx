import { motion } from 'motion/react';
import { 
  Settings, 
  Monitor, 
  Globe, 
  Zap, 
  Users, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

const services = [
  {
    title: "Corporate Strategy & Events",
    description: "High-impact corporate gatherings designed to align leadership and drive strategic vision through immersive experiences.",
    icon: Users,
    tag: "Strategic",
    image: "https://picsum.photos/seed/corporate/800/600"
  },
  {
    title: "Digital Dominance & AEO",
    description: "Integrating Answer Engine Optimization (AEO) into live events to ensure your brand's message is captured and indexed by AI.",
    icon: Monitor,
    tag: "Tech-Forward",
    image: "https://picsum.photos/seed/digital/800/600"
  },
  {
    title: "Brand Activations",
    description: "Transformative physical and digital activations that bridge the gap between brand identity and audience connection.",
    icon: Zap,
    tag: "Creative",
    image: "https://picsum.photos/seed/activation/800/600"
  },
  {
    title: "Global Summit Management",
    description: "End-to-end management for international summits, focusing on seamless logistics and high-level networking environments.",
    icon: Globe,
    tag: "Global",
    image: "https://picsum.photos/seed/summit-global/800/600"
  },
  {
    title: "Technical Production",
    description: "State-of-the-art audiovisual solutions, lighting design, and stage management for flawless execution.",
    icon: Settings,
    tag: "Production",
    image: "https://picsum.photos/seed/production/800/600"
  },
  {
    title: "Analytics & ROI Mapping",
    description: "Data-driven insights and post-event analysis to measure impact and optimize future event strategies.",
    icon: TrendingUp,
    tag: "Data-Driven",
    image: "https://picsum.photos/seed/data/800/600"
  }
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-10 bg-[#071525] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#4fc3d0]/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#4fc3d0]" />
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-[#4fc3d0]">Core Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-8xl font-medium tracking-tighter text-white leading-[0.85] mb-8">
            Elite <br /> Ecosystem
          </h2>
          <p className="text-white/40 max-w-xl text-base md:text-lg leading-relaxed">
            We provide a comprehensive suite of services that transform traditional event management into a strategic engine for digital dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-3xl md:rounded-[2rem] overflow-hidden">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#071525] p-8 md:p-10 hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="flex flex-col h-full">
                <div className="relative h-48 mb-8 overflow-hidden rounded-2xl">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071525] to-transparent opacity-60" />
                </div>
                <div className="flex items-start justify-between mb-8 md:mb-12">
                  <div className="p-3 md:p-4 bg-white/5 rounded-2xl group-hover:bg-[#4fc3d0]/10 group-hover:text-[#4fc3d0] transition-all duration-500">
                    <service.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-white/30 border border-white/10 px-3 py-1 rounded-full">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-medium text-white mb-4 group-hover:text-[#4fc3d0] transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-[#4fc3d0] opacity-100 md:opacity-0 group-hover:opacity-100 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold">Explore Service</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
