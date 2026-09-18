import VesselCinema from "@/components/home/VesselCinema";
import { PLATFORMS } from "@/lib/platforms";

export default function HavocSection() {
  return <VesselCinema platform={PLATFORMS[1]} testId="havoc-section" />;
}
