import { NextChapter, PageHero } from "@/components/page";
import { Lines, Reveal, Tag } from "@/components/kit";
import Anatomy from "@/components/deck/Anatomy";
import { TECH } from "@/lib/content";
import { velaryonMedia as media } from "@/lib/velaryonMedia";

const LAYERS = [
  { k: "L4", t: "Mission", c: "Objectives, constraints and rules of behaviour set by operators." },
  { k: "L3", t: "Autonomy", c: "Perception, world model, decision logic and behaviour arbitration." },
  { k: "L2", t: "Systems", c: "Common power, data and mechanical architecture across the family." },
  { k: "L1", t: "Platform", c: "Hull, propulsion and superstructure shaped around the systems they carry." },
];

export default function TechnologyPage() {
  return (
    <div data-testid="technology-page">
      <PageHero
        index="04"
        title="Technology"
        testId="technology-hero"
        img={media.hero.dusk}
        position="50% 55%"
        lines={["One stack.", <em key="e">Every platform.</em>]}
        lead="A common autonomy and systems architecture. The vessels differ in form and configuration; what runs them does not."
        meta={[{ k: "Approach", v: "Software-defined" }, { k: "Layers", v: "04" }]}
      />

      <Anatomy no="04.1" id="tech-anatomy" />

      <section className="p-section p-section--light">
        <div className="p-head">
          <Tag no="04.2">Architecture</Tag>
          <Lines className="d-display d-display--dark" lines={["Four layers.", <em key="e">Each free to evolve.</em>]} />
        </div>
        <div className="p-list">
          {LAYERS.map((l, i) => (
            <Reveal key={l.k} delay={i * 0.05}>
              <div className="p-list__row" data-testid={`layer-${l.k.toLowerCase()}`}>
                <span>{l.k}</span>
                <h3>{l.t}</h3>
                <p>{l.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="p-section">
        <div className="p-head">
          <Tag no="04.3">Capabilities in development</Tag>
          <Lines className="d-display" lines={["Software first.", <em key="e">Steel around it.</em>]} />
        </div>
        <div className="p-list">
          {TECH.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.05}>
              <div className="p-list__row" data-testid={`tech-row-${t.n}`}>
                <span>{t.n}</span>
                <h3>{t.t}</h3>
                <p>{t.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <NextChapter to="/company" label="Company" img={media.deck.rearCoast} />
    </div>
  );
}
