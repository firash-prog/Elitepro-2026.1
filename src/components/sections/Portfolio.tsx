import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Trophy, Users, Zap, X, Quote, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects: any[] = []; // Fetched from API

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const nextImage = () => {
    if (selectedProject?.gallery) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedProject?.gallery) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
    }
  };

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  if (loading) return null;
  if (projects.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-10 bg-[#071525]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#4fc3d0]" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-[#4fc3d0]">Proven Impact</span>
            </div>
            <h2 className="text-4xl md:text-8xl font-medium tracking-tighter text-white leading-[0.85]">
              Strategic <br /> Portfolio
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-base md:text-lg leading-relaxed">
            A curated selection of high-stakes events where digital dominance meets physical excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: index % 2 * 0.1, 
                duration: 0.8, 
                ease: [0.215, 0.61, 0.355, 1] 
              }}
              className="group relative cursor-pointer"
              onClick={() => handleProjectSelect(project)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:rounded-[2.5rem] mb-6 md:mb-8 bg-white/5 border border-white/10">
                <img 
                  src={project.image} 
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071525] via-transparent to-transparent opacity-60" />
                
                {/* Hover Overlay Info */}
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 flex justify-between items-end transform translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex gap-2">
                    {project.achievements.slice(0, 1).map((ach, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] md:text-[10px] font-mono text-white uppercase tracking-wider">
                        {ach}
                      </span>
                    ))}
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#4fc3d0] flex items-center justify-center text-[#071525] group-hover:scale-110 transition-transform duration-500">
                    <ExternalLink className="w-[18px] h-[18px] md:w-5 md:h-5" />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="px-2 md:px-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-[#4fc3d0]">{project.type}</span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-white/40">{project.client}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-white group-hover:text-[#4fc3d0] transition-colors duration-300">
                  {project.title}
                </h3>
                
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  <div className="flex flex-col gap-1">
                    <Trophy size={14} className="text-[#4fc3d0] mb-1" />
                    <span className="text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-tighter">Impact</span>
                    <span className="text-[11px] md:text-xs text-white/80 font-medium">High</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Users size={14} className="text-[#4fc3d0] mb-1" />
                    <span className="text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-tighter">Reach</span>
                    <span className="text-[11px] md:text-xs text-white/80 font-medium">Global</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Zap size={14} className="text-[#4fc3d0] mb-1" />
                    <span className="text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-tighter">Tech</span>
                    <span className="text-[11px] md:text-xs text-white/80 font-medium">Frontier</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 flex justify-center">
          <Link 
            to="/portfolio"
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white/5 border border-white/10 rounded-full overflow-hidden transition-all hover:bg-[#4fc3d0] hover:text-[#071525]"
          >
            <span className="relative z-10 text-sm font-bold uppercase tracking-widest">View All Projects</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-[#4fc3d0] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-[#071525]/90 backdrop-blur-xl"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-6xl bg-[#0a1e3a] border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 md:top-10 md:right-10 z-30 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all backdrop-blur-md border border-white/10"
                >
                  <X size={24} />
                </button>

                <div className="flex flex-col lg:flex-row min-h-[600px]">
                  {/* Left: Image Carousel */}
                  <div className="lg:w-5/12 h-[400px] lg:h-auto relative overflow-hidden group/carousel">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentImageIndex}
                        src={selectedProject.gallery ? selectedProject.gallery[currentImageIndex] : selectedProject.image} 
                        alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1.05 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e3a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a1e3a]/50" />

                    {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                      <>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all"
                          >
                            <ChevronLeft size={20} />
                          </button>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                        
                        {/* Dots */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {selectedProject.gallery.map((_, i) => (
                            <button
                              key={i}
                              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-[#4fc3d0] w-4' : 'bg-white/20 hover:bg-white/40'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right: Content */}
                  <div className="lg:w-7/12 p-10 md:p-16 lg:p-20 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="px-3 py-1 bg-[#4fc3d0]/10 text-[#4fc3d0] text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] rounded-full border border-[#4fc3d0]/20">
                        {selectedProject.type}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-white/30">{selectedProject.client}</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-10 tracking-tighter leading-[0.9]">
                      {selectedProject.title}
                    </h2>

                    <div className="space-y-12">
                      <div className="max-w-xl">
                        <h4 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 mb-6">Strategic Overview</h4>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
                          {selectedProject.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-white/5">
                        {selectedProject.achievements.map((ach, i) => (
                          <div key={i} className="flex flex-col gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                              <Trophy size={16} className="text-[#4fc3d0]" />
                            </div>
                            <span className="text-sm text-white/90 font-medium leading-tight">{ach}</span>
                          </div>
                        ))}
                      </div>

                      {selectedProject.testimonial && (
                        <div className="relative py-4">
                          <Quote className="absolute -top-6 -left-8 w-20 h-20 text-[#4fc3d0]/5" />
                          <p className="text-white/80 italic text-xl md:text-2xl mb-6 relative z-10 leading-snug font-light">
                            "{selectedProject.testimonial.text}"
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-px bg-[#4fc3d0]/30" />
                            <p className="text-[#4fc3d0] font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
                              {selectedProject.testimonial.author}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="pt-6">
                        <a 
                          href={selectedProject.caseStudyUrl}
                          className="inline-flex items-center gap-4 bg-white text-[#071525] px-10 py-5 rounded-full font-bold transition-all hover:bg-[#4fc3d0] group shadow-xl shadow-black/20"
                        >
                          <span className="text-sm uppercase tracking-widest">Explore Full Case Study</span>
                          <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
