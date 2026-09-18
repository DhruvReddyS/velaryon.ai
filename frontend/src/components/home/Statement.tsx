import { Eyebrow, Reveal, Rule, Btn } from "@/components/Primitives";

const PILLARS = [
  { n: "01", t: "Persistent", c: "Platforms that can stay on task for longer than a crewed vessel can reasonably be asked to." },
  { n: "02", t: "Precise", c: "Software-defined behaviour that does the same thing the same way, every time, and reports what it saw." },
  { n: "03", t: "Scalable", c: "Presence that grows with the number of platforms you can build, not the number of people you can put to sea." },
];

export default function Statement() {
  return (
    <section data-testid="statement" className="bg-ink py-24 md:py-36">
      <div className="wrap">
        <Reveal>
          <Eyebrow index="01" title="Mission" />
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <Reveal delay={0.08} className="lg:col-span-9">
            <h2 data-testid="statement-heading" className="display-2 text-chalk">
              The ocean is vast. Presence at sea shouldn't be limited by the people you can put on it.
            </h2>
          </Reveal>
          <Reveal delay={0.16} className="flex flex-col justify-end lg:col-span-3">
            <p className="text-base leading-relaxed text-fog">
              Velaryon exists to make maritime presence persistent, precise and scalable through
              autonomy — starting with autonomous surface platforms designed in Australia.
            </p>
            <div className="mt-8">
              <Btn to="/mission" variant="link" testId="statement-mission-link">
                Read the mission
              </Btn>
            </div>
          </Reveal>
        </div>

        <Rule className="mt-20 md:mt-28" />
        <div className="grid divide-y divide-line-soft md:grid-cols-3 md:divide-x md:divide-y-0">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={0.08 * i}>
              <div data-testid={`pillar-${p.t.toLowerCase()}`} className={`py-10 ${i > 0 ? "md:pl-10" : ""} ${i < PILLARS.length - 1 ? "md:pr-10" : ""}`}>
                <p className="label-xs text-fog">{p.n}</p>
                <h3 className="mt-6 text-2xl font-medium tracking-tight text-chalk">{p.t}</h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">{p.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
