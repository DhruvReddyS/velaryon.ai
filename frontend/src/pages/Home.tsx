import Hero from "@/components/home/Hero";
import MissionScale from "@/components/home/MissionScale";
import Marquee from "@/components/Marquee";
import PlatformReveal from "@/components/home/PlatformReveal";
import AutonomyTeaser from "@/components/home/AutonomyTeaser";
import TechnologyPillars from "@/components/home/TechnologyPillars";
import MissionsSection from "@/components/home/MissionsSection";
import Philosophy from "@/components/home/Philosophy";
import Roadmap from "@/components/home/Roadmap";
import CompanyTeaser from "@/components/home/CompanyTeaser";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div data-testid="home-page">
      <Hero />
      <MissionScale />
      <Marquee />
      <PlatformReveal />
      <AutonomyTeaser />
      <TechnologyPillars />
      <MissionsSection />
      <Philosophy />
      <Roadmap />
      <CompanyTeaser />
      <FinalCTA />
    </div>
  );
}
