import VesselCinema from "@/components/home/VesselCinema";
import { PLATFORMS } from "@/lib/platforms";

export default function HunterSection() {
  return <VesselCinema platform={PLATFORMS[2]} testId="hunter-section" />;
}
