import { useNavigate } from 'react-router-dom';

export default function FooterCTA() {
  const navigate = useNavigate();

  return (
    <footer className="relative w-full bg-[var(--footer-bg)] z-10 text-white">
      {/* Top CTA Band */}
      <div className="flex flex-col md:flex-row w-full border-b border-white/10">
        {/* Left Half */}
        <div className="w-full md:w-1/2 p-20 border-r border-white/10">
          <h2 className="font-sans font-light text-[clamp(40px,5vw,60px)] leading-[1.1] mb-10">
            Empower your<br />event vision
          </h2>
          <div className="flex flex-col gap-4 items-start">
             <button className="flex items-center gap-2 px-8 py-3 bg-[#3d35b5] rounded-full font-sans text-[11px] tracking-[0.3em] uppercase hover:bg-[#3d35b5]/90 transition-colors cursor-none shadow-[0_8px_30px_rgba(61,53,181,0.5)]">
                <span className="w-[6px] h-[6px] rounded-full bg-[#4fc3d0]" />
                PARTNER WITH US
             </button>
             <button 
                onClick={() => navigate('/aleph')}
                className="flex items-center gap-2 px-8 py-3 border border-white/20 rounded-full font-sans text-[11px] tracking-[0.3em] uppercase hover:bg-white/5 transition-colors cursor-none pointer-events-auto"
             >
                <span className="w-[6px] h-[6px] rounded-full bg-white" />
                START JOURNEY
             </button>
          </div>
        </div>

        {/* Right Half */}
        <div className="w-full md:w-1/2 p-20 flex flex-col justify-between">
           <div className="grid grid-cols-2 gap-10">
              <div>
                 <h4 
                    onClick={() => navigate('/')}
                    className="font-sans font-light text-2xl mb-4 cursor-pointer hover:text-white/80 transition-colors pointer-events-auto"
                 >
                    Vision
                 </h4>
                 <h4 
                    onClick={() => navigate('/aleph')}
                    className="font-sans font-light text-2xl mb-4 text-white/45 cursor-pointer hover:text-white/80 transition-colors pointer-events-auto"
                 >
                    Services
                 </h4>
                 <h4 
                    className="font-sans font-light text-2xl mb-4 text-white/45 cursor-pointer hover:text-white/80 transition-colors pointer-events-auto"
                 >
                    Portfolio
                 </h4>
                 <h4 
                    className="font-sans font-light text-2xl text-white/45 cursor-pointer hover:text-white/80 transition-colors pointer-events-auto"
                 >
                    Contact
                 </h4>
              </div>
              <div className="flex flex-col gap-4 text-[11px] tracking-[0.3em] uppercase text-white/70 pointer-events-auto">
                 <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                 <a href="#" className="hover:text-white transition-colors">Instagram</a>
                 <a href="#" className="hover:text-white transition-colors">Email</a>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-10 py-6 flex justify-between items-center text-[11px] text-white/45 tracking-wide uppercase border-t border-white/5">
         <div>© 2026 - ElitePro Events & Advertising KSA. All rights reserved.</div>
         <div>CRAFTED FOR VISION 2030</div>
      </div>
    </footer>
  );
}
