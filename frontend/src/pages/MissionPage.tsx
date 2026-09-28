import { NextChapter, PageHero } from "@/components/page";
import { Lines, ParallaxImg, Reveal, ScrubWords, Tag } from "@/components/kit";
import Missions from "@/components/deck/Missions";
import { velaryonMedia as media, srcSet } from "@/lib/velaryonMedia";

const PROBLEMS = [
  { n: "01", t: "Vast", c: "The ocean covers immense distances. Crewed vessels cannot be everywhere at once." },
  { n: "02", t: "Costly", c: "Every hour at sea is an hour of people, fuel, food and risk. Persistent presence has always been expensive." },
  { n: "03", t: "Repetitive", c: "Much of the work at sea is patrol, survey and inspection — long, repetitive tasks autonomy is suited to." },
];

const BELIEFS = [
  ["Autonomy should extend people,", "not replace their judgement."],
  ["A platform should be shaped", "around its mission."],
  ["Software is the product.", "The vessel is how it goes to sea."],
  ["Say what you have built.", "Not what you hope to build."],
];

export default function MissionPage() {
  return (
    <div data-testid="mission-page">
      <PageHero
        index="01"
        title="Mission"
        testId="mission-hero"
        img={media.hero.sunset}
        position="50% 60%"
        lines={["Presence,", <em key="e">without limits.</em>]}
        lead="Velaryon's mission is to make maritime presence persistent, precise and scalable through autonomy."
        meta={[{ k: "Domain", v: "Maritime" }, { k: "Focus", v: "Autonomy" }]}
      />

      <section className="p-section p-section--ink">
        <Tag no="01.1">Statement</Tag>
        <div className="p-gap">
          <ScrubWords className="p-statement" accent={["people"]} text="Presence at sea shouldn't be limited by the number of people you can put on it." />
        </div>
      </section>

      <section className="p-section">
        <div className="p-head">
          <Tag no="01.2">The problem</Tag>
          <Lines className="d-display" lines={["Three reasons", <em key="e">the sea resists.</em>]} />
        </div>
        <div className="p-grid3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className="p-cell">
              <span className="p-cell__n">{p.n}</span>
              <h3 data-testid={`problem-${p.t.toLowerCase()}`}>{p.t}</h3>
              <p>{p.c}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Missions no="01.3" />

      <ParallaxImg src={media.deck.aerialCoast} srcSet={srcSet(media.deck.aerialCoast)} alt="Velaryon platform study underway along a coastline" className="p-band" amount={14} />

      <section className="p-section p-section--light">
        <div className="p-head">
          <Tag no="01.4">What we believe</Tag>
          <Lines className="d-display d-display--dark" lines={["Principles", <em key="e">before product.</em>]} />
        </div>
        <div className="p-list">
          {BELIEFS.map(([a, b], i) => (
            <Reveal key={a} delay={i * 0.05}>
              <div className="p-list__row" data-testid={`belief-${i}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{a}</h3>
                <p>{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <NextChapter to="/platforms" label="The fleet" img={media.deck.aerialRun} />
    </div>
  );
}
