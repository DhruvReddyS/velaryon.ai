import Hero from "@/components/home/Hero";
import MissionScale from "@/components/home/MissionScale";
import Marquee from "@/components/Marquee";
import { PlatformFamilyIntro, PlatformFamilyFinale } from "@/components/home/PlatformFamily";
import ViperSection from "@/components/home/ViperSection";
import HavocSection from "@/components/home/HavocSection";
import HunterSection from "@/components/home/HunterSection";
import AutonomyLoop from "@/components/home/AutonomyLoop";
import HumanMachine from "@/components/home/HumanMachine";
import TechnologyLab from "@/components/home/TechnologyLab";
import MissionsSection from "@/components/home/MissionsSection";
import Philosophy from "@/components/home/Philosophy";
import Development from "@/components/home/Development";
import CompanyTeaser from "@/components/home/CompanyTeaser";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div data-testid="home-page">
      <Hero />
      <MissionScale />
      <Marquee />
      <PlatformFamilyIntro />
      <ViperSection />
      <HavocSection />
      <HunterSection />
      <PlatformFamilyFinale />
      <AutonomyLoop />
      <HumanMachine />
      <TechnologyLab />
      <MissionsSection />
      <Philosophy />
      <Development />
      <CompanyTeaser />
      <FinalCTA />
    </div>
  );
}
