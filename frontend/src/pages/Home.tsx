import DeckHud from "@/components/deck/DeckHud";
import Cover from "@/components/deck/Cover";
import Ocean from "@/components/deck/Ocean";
import Thesis from "@/components/deck/Thesis";
import Fleet from "@/components/deck/Fleet";
import Loop from "@/components/deck/Loop";
import Coverage from "@/components/deck/Coverage";
import WhyNow from "@/components/deck/WhyNow";
import Roadmap from "@/components/deck/Roadmap";
import Ask from "@/components/deck/Ask";
import Horizon from "@/components/deck/Horizon";

/**
 * The home page is the company deck — ten slides, one continuous scroll:
 * hook → problem → insight → product → system → proof → why now → roadmap → ask → close.
 * Press P for presenter mode (/deck).
 */
export default function Home() {
  return (
    <div className="v-deck" data-testid="home">
      <DeckHud />
      <Cover />
      <Ocean />
      <Thesis />
      <Fleet />
      <Loop />
      <Coverage />
      <WhyNow />
      <Roadmap />
      <Ask />
      <Horizon />
    </div>
  );
}
