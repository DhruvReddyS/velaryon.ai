import { NextChapter, PageHero } from "@/components/page";
import { Cta, Lines, Marquee, Reveal, Tag } from "@/components/kit";
import { Crew } from "@/components/deck/Ask";
import { BRAND, DISCIPLINES } from "@/lib/content";
import { velaryonMedia as media } from "@/lib/velaryonMedia";

const PRINCIPLES = [
  ["Mission", "Make presence at sea more persistent, precise and scalable through autonomy."],
  ["Vision", "An ocean where autonomous platforms execute and people direct the mission."],
  ["Approach", "Develop platform, software and autonomy together, from system definition to open water."],
];

export default function CompanyPage() {
  return (
    <div data-testid="company-page">
      <PageHero
        index="05"
        title="Company"
        testId="company-hero"
        img={media.deck.rearCoast}
        position="50% 55%"
        lines={["Building for an", <em key="e">autonomous ocean.</em>]}
        lead="Velaryon is a maritime technology company developing autonomous surface platform studies and the software that operates them."
        meta={[{ k: "Domain", v: "Maritime" }, { k: "Status", v: BRAND.status }]}
      />

      <section className="p-section p-section--light">
        <div className="p-head">
          <Tag no="05.1">The work</Tag>
          <Lines className="d-display d-display--dark" lines={["Platform.", "Software.", <em key="e">Autonomy.</em>]} />
        </div>
        <div className="p-list">
          {PRINCIPLES.map(([t, c], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="p-list__row">
                <span>0{i + 1}</span>
                <h3>{t}</h3>
                <p>{c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="p-strip">
        <Marquee items={["Engineered in the open", "Human-directed", "Software-defined", "Mission-adaptable", "Built for open water"]} speed={36} />
      </div>

      <section className="p-section">
        <div className="p-head">
          <Tag no="05.2">Team</Tag>
          <Lines className="d-display" lines={["The people", <em key="e">building it.</em>]} />
        </div>
        <Crew />
      </section>

      <section className="p-section p-section--ink">
        <div className="p-head">
          <Tag no="05.3">Disciplines</Tag>
          <Lines className="d-display" lines={["The crew", <em key="e">we're assembling.</em>]} />
          <p>We're building across four disciplines. If your work lives here, we'd like to hear from you.</p>
        </div>
        <div className="p-disc">
          {DISCIPLINES.map((d, i) => (
            <Reveal key={d.t} delay={i * 0.06} className="p-disc__item">
              <span>0{i + 1}</span>
              <h3>{d.t}</h3>
              <p>{d.c}</p>
            </Reveal>
          ))}
        </div>
        <div className="p-gap"><Cta href={`mailto:${BRAND.email}?subject=Engineering%20at%20Velaryon`} testId="company-careers">Introduce yourself</Cta></div>
      </section>

      <NextChapter to="/contact" label="Contact" img={media.final.tinyHorizon} />
    </div>
  );
}
