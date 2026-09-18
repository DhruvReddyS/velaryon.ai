import { Btn, Eyebrow, PageHero, Reveal, Rule } from "@/components/Primitives";
import CTA from "@/components/home/CTA";

const BLOCKS = [
  { t: "Who we are", c: "An Australian early-stage maritime technology company developing autonomous surface platform concepts and the software that operates them." },
  { t: "Mission", c: "To make presence at sea persistent, precise and scalable through autonomy." },
  { t: "Vision", c: "An ocean where autonomous platforms handle the routine, the remote and the hazardous — and people direct the mission." },
  { t: "Why now", c: "Autonomy, sensing and compute have matured in other domains. We believe the maritime domain is next — and we intend to be part of proving it." },
];

const TEAM = [
  { name: "Aria Novak", role: "Founder & CEO", bio: "Leads Velaryon's vision and strategy. Background in naval architecture and maritime robotics.", img: "/assets/team-1.jpg" },
  { name: "Maya Chen", role: "Co-founder & CTO", bio: "Owns the autonomy and software architecture. Background in robotics perception and autonomous systems.", img: "/assets/team-2.jpg" },
  { name: "Tomas Eriksson", role: "Head of Engineering", bio: "Leads platform engineering and integration. Background in marine systems and hardware.", img: "/assets/team-3.jpg" },
];

export default function CompanyPage() {
  return (
    <div data-testid="company-page" className="bg-ink">
      <PageHero
        index="07"
        title="Company"
        testId="company-hero"
        heading={
          <>
            Building for an
            <br />
            autonomous ocean.
          </>
        }
        lead="Velaryon is an early-stage company. We would rather show you what we're working on than tell you what we've achieved."
        meta={[
          { k: "Founded", v: "Australia" },
          { k: "Stage", v: "Concept", signal: true },
        ]}
      />

      <section className="wrap py-24 md:py-32">
        <div className="grid gap-px bg-line md:grid-cols-2">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.t} delay={0.06 * i} className="bg-ink">
              <div data-testid={`company-block-${b.t.toLowerCase().replace(/\s+/g, "-")}`} className="h-full p-8 md:p-12">
                <p className="label-xs text-fog">{b.t}</p>
                <p className="mt-8 max-w-md text-xl leading-snug text-chalk">{b.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line-soft bg-bone py-24 text-carbon md:py-32">
        <div className="wrap">
          <Reveal>
            <Eyebrow index="07.1" title="Team" light />
          </Reveal>
          <Rule light className="mt-12" />
          <div className="grid divide-y divide-bone-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={0.08 * i}>
                <article data-testid={`team-member-${m.name.toLowerCase().replace(/\s+/g, "-")}`} className={`py-10 ${i > 0 ? "md:pl-10" : ""} ${i < TEAM.length - 1 ? "md:pr-10" : ""}`}>
                  <div className="aspect-[4/5] overflow-hidden bg-bone-line">
                    <img
                      src={m.img}
                      alt={`${m.name}, ${m.role} at Velaryon — placeholder portrait`}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>
                  <p className="label-xs mt-8 text-bone-fog">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-4 text-2xl font-medium tracking-tight">{m.name}</h2>
                  <p className="label-xs mt-2 text-bone-fog">{m.role}</p>
                  <p className="mt-5 text-sm leading-relaxed text-bone-fog">{m.bio}</p>
                  <div className="mt-6">
                    <Btn href="https://www.linkedin.com/" external variant="link" light testId={`team-linkedin-${m.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      LinkedIn
                    </Btn>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="label-xs mt-12 text-bone-fog">Team profiles shown are placeholders pending final company content</p>
        </div>
      </section>

      <CTA />
    </div>
  );
}
