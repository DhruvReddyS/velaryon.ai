import VesselCinema from "@/components/home/VesselCinema";
import { PLATFORMS } from "@/lib/platforms";

export default function ViperSection() {
  return <VesselCinema platform={PLATFORMS[0]} testId="viper-section" />;
}
