import Hero from '../components/sections/Hero';
import Vision from '../components/sections/Vision';
import ClientLogos from '../components/sections/ClientLogos';
import ReconnectingNature from '../components/sections/ReconnectingNature';
import FlowDiagram from '../components/sections/FlowDiagram';
import BeyondLinear from '../components/sections/BeyondLinear';
import Innovating from '../components/sections/Innovating';
import FrontierTech from '../components/sections/FrontierTech';
import Services from '../components/sections/Services';
import Portfolio from '../components/sections/Portfolio';
import GuidingPrinciples from '../components/sections/GuidingPrinciples';
import Testimonials from '../components/sections/Testimonials';
import MeetAleph from '../components/sections/MeetAleph';
import NewsSection from '../components/sections/NewsSection';
import FooterCTA from '../components/sections/FooterCTA';

export default function Home() {
  return (
    <div className="relative w-full">
      <Hero />
      <Vision />
      <ClientLogos />
      <ReconnectingNature />
      <FlowDiagram />
      <BeyondLinear />
      <Innovating />
      <FrontierTech />
      <Services />
      <Portfolio />
      <GuidingPrinciples />
      <Testimonials />
      <NewsSection />
      <MeetAleph />
      <FooterCTA />
    </div>
  );
}
