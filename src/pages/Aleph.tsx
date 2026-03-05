import AlephHero from '../components/sections/aleph/AlephHero';
import MindMapped from '../components/sections/aleph/MindMapped';
import ChaosClarity from '../components/sections/aleph/ChaosClarity';
import ClearPaths from '../components/sections/aleph/ClearPaths';
import ChaosOrder from '../components/sections/aleph/ChaosOrder';
import DigitalTwin from '../components/sections/aleph/DigitalTwin';
import QuantumSpeed from '../components/sections/aleph/QuantumSpeed';
import OptimalTreatment from '../components/sections/aleph/OptimalTreatment';
import OneInBillion from '../components/sections/aleph/OneInBillion';
import ResearchAccess from '../components/sections/aleph/ResearchAccess';
import FooterCTA from '../components/sections/FooterCTA';

export default function Aleph() {
  return (
    <div className="relative w-full">
      <AlephHero />
      <MindMapped />
      <ChaosClarity />
      <ClearPaths />
      <ChaosOrder />
      <DigitalTwin />
      <QuantumSpeed />
      <OptimalTreatment />
      <OneInBillion />
      <ResearchAccess />
      <FooterCTA />
    </div>
  );
}
