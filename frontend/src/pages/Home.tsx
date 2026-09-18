import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import PlatformSelector from "@/components/home/PlatformSelector";
import Autonomy from "@/components/home/Autonomy";
import Technology from "@/components/home/Technology";
import Missions from "@/components/home/Missions";
import Development from "@/components/home/Development";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <div data-testid="home-page">
      <Hero />
      <Statement />
      <PlatformSelector />
      <Autonomy />
      <Technology />
      <Missions />
      <Development />
      <CTA />
    </div>
  );
}
