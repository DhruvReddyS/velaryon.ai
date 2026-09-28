import { NextChapter, PageHero } from "@/components/page";
import { Lines, Reveal, Tag } from "@/components/kit";
import MissionConsole from "@/components/MissionConsole";
import Command from "@/components/deck/Command";
import { LOOP } from "@/lib/content";
import { velaryonMedia as media } from "@/lib/velaryonMedia";

const ROLES = [
  { who: "Operator", does: ["Defines the mission and its limits", "Supervises from shore", "Redirects or takes over at any time"] },
  { who: "Platform", does: ["Perceives and models its environment", "Selects actions inside its limits", "Executes, observes and reports"] },
];

export default function HowItWorksPage() {
  return (
    <div data-testid="how-it-works-page">
      <PageHero
        index="03"
        title="Autonomy"
        testId="autonomy-hero"
        img={media.ocean.distantVessel}
        lines={["People direct.", <em key="e">Platforms execute.</em>]}
        lead="How Velaryon's autonomy is being designed to work, from the loop that runs on the platform to the controls people keep."
      />

      <section className="p-section p-section--ink">
        <div className="p-head">
          <Tag no="03.1">Operator console · concept</Tag>
          <Lines className="d-display" lines={["Take the", <em key="e">console.</em>]} />
          <p>Switch the autonomy level, hold the platform, or redirect its route. A simulated concept of how people stay in command.</p>
        </div>
        <MissionConsole />
      </section>

      <section className="p-section">
        <div className="p-head">
          <Tag no="03.2">On the platform</Tag>
          <Lines className="d-display" lines={["Five steps.", <em key="e">Always running.</em>]} />
        </div>
        <div className="p-list">
          {LOOP.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="p-list__row" data-testid={`hiw-step-${s.t.toLowerCase()}`}>
                <span>{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Command no="03.3" />

      <section className="p-section p-section--light">
        <div className="p-head">
          <Tag no="03.4">Human + machine</Tag>
          <Lines className="d-display d-display--dark" lines={["A human stays", <em key="e">responsible.</em>]} />
          <p>At all times, for every mission.</p>
        </div>
        <div className="p-grid3 p-grid3--2">
          {ROLES.map((r) => (
            <Reveal key={r.who} className="p-cell">
              <span className="p-cell__n" data-testid={`role-${r.who.toLowerCase()}`}>{r.who}</span>
              <ul className="p-roles">{r.does.map((d) => <li key={d}>{d}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </section>

      <NextChapter to="/technology" label="Technology" img={media.engineering.profile} />
    </div>
  );
}
