import { Eyebrow, Reveal } from "@/components/Primitives";

export const MISSIONS = [
  { n: "01", t: "Maritime domain awareness", c: "Building and sharing a persistent picture of activity across wide areas of ocean." },
  { n: "02", t: "Patrol and presence", c: "Sustained presence along coastlines, approaches and remote waters without a crew at sea." },
  { n: "03", t: "Survey and monitoring", c: "Repeatable environmental, hydrographic and infrastructure survey over long durations." },
  { n: "04", t: "Logistics support", c: "Moving equipment and supplies between shore and sea in support of other operations." },
  { n: "05", t: "Infrastructure inspection", c: "Routine inspection of offshore and coastal assets in conditions that are costly to crew." },
];

export default function Missions() {
  return (
    <section data-testid="missions" className="relative isolate overflow-hidden bg-ink">
      <img
        src="/assets/vessel-dusk.webp"
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        style={{ objectPosition: "70% 40%" }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />

      <div className="wrap relative py-24 md:py-36">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow index="05" title="Missions" />
            <h2 data-testid="missions-heading" className="display-2 mt-10 text-chalk">
              Designed for the work people shouldn't have to be at sea to do.
            </h2>
            <p className="label-xs mt-8 text-fog">Conceptual mission areas — subject to development</p>
          </Reveal>
        </div>

        <ol className="mt-16 max-w-3xl border-t border-chalk/15">
          {MISSIONS.map((m, i) => (
            <Reveal key={m.n} delay={0.06 * i}>
              <li data-testid={`mission-${m.n}`} className="group grid gap-3 border-b border-chalk/15 py-6 md:grid-cols-[64px_1fr_1fr] md:gap-8">
                <span className="label-xs pt-1 text-fog">{m.n}</span>
                <h3 className="text-xl font-medium tracking-tight text-chalk transition-colors duration-300 group-hover:text-signal md:text-2xl">
                  {m.t}
                </h3>
                <p className="text-sm leading-relaxed text-fog">{m.c}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
