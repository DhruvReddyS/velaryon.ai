import { Eyebrow, Frame, PageHero, Reveal, Rule } from "@/components/Primitives";
import { TECH } from "@/components/home/Technology";
import CTA from "@/components/home/CTA";

const LAYERS = [
  { k: "L4", t: "Mission", c: "Objectives, constraints and rules of behaviour set by operators." },
  { k: "L3", t: "Autonomy", c: "Perception, world model, decision logic and behaviour arbitration." },
  { k: "L2", t: "Systems", c: "Common power, data and mechanical architecture across the family." },
  { k: "L1", t: "Platform", c: "Hull, propulsion and superstructure shaped around the systems they carry." },
];

export default function TechnologyPage() {
  return (
    <div data-testid="technology-page" className="bg-ink">
      <PageHero
        index="04"
        title="Technology"
        testId="technology-hero"
        heading={
          <>
            One stack.
            <br />
            Every platform.
          </>
        }
        lead="Velaryon is building a common autonomy and systems architecture. The vessels in the family differ in form and configuration; what runs them does not."
        meta={[
          { k: "Status", v: "In development", signal: true },
          { k: "Approach", v: "Software-defined" },
        ]}
      />

      <section className="wrap py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow index="04.1" title="Architecture" />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-fog">
              Four layers, from what a mission needs down to the steel that carries it. Each layer is
              designed to change independently of the others.
            </p>
          </Reveal>
          <div className="lg:col-span-8">
            <Rule />
            {LAYERS.map((l, i) => (
              <Reveal key={l.k} delay={0.06 * i}>
                <div data-testid={`layer-${l.k.toLowerCase()}`} className="grid gap-4 border-b border-line py-7 md:grid-cols-[80px_200px_1fr] md:gap-8">
                  <span className="label text-signal">{l.k}</span>
                  <h2 className="text-2xl font-medium tracking-tight text-chalk">{l.t}</h2>
                  <p className="text-sm leading-relaxed text-fog">{l.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line-soft bg-graphite py-24 md:py-32">
        <div className="wrap">
          <Reveal>
            <Eyebrow index="04.2" title="Capabilities in development" />
          </Reveal>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-3">
            {TECH.map((t, i) => (
              <Reveal key={t.n} delay={0.05 * i} className="bg-graphite">
                <div data-testid={`tech-card-${t.n}`} className="h-full p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="label-xs text-fog">{t.n}</span>
                    <span aria-hidden className="h-1.5 w-1.5 bg-line" />
                  </div>
                  <h3 className="mt-12 text-2xl font-medium tracking-tight text-chalk">{t.t}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-fog">{t.c}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="bg-graphite">
              <Frame className="relative h-full min-h-[280px] overflow-hidden bg-carbon">
                <img
                  src="/assets/viper.webp"
                  alt="Velaryon VIPER concept — integrated superstructure detail"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "60% 45%" }}
                />
              </Frame>
            </Reveal>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
