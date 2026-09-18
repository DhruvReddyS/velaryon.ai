import { Btn, Eyebrow, Reveal, Rule } from "@/components/Primitives";

export const STAGES = [
  { n: "01", t: "Concept", c: "Platform family defined. Architecture, form and mission thinking under development.", current: true },
  { n: "02", t: "Prototype", c: "First sub-scale and full-scale prototype systems built and tested in controlled conditions." },
  { n: "03", t: "Sea trials", c: "Autonomy and platform behaviour validated on the water across increasing complexity." },
  { n: "04", t: "Operations", c: "Platforms operating with partners on real missions, supported from shore." },
];

const PRINCIPLES = [
  { t: "Software-defined", c: "Behaviour lives in software that can be updated, verified and improved across every platform at once." },
  { t: "Mission-adaptable", c: "One architecture, many configurations. The platform is shaped around the mission, not the other way around." },
  { t: "Human-directed", c: "Autonomy handles execution. People set the mission, the limits and the rules — and can always intervene." },
];

export default function Development() {
  return (
    <section data-testid="development" className="border-t border-line-soft bg-graphite py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow index="06" title="Approach" />
            <h2 data-testid="development-heading" className="display-2 mt-10 text-chalk">
              Early stage. Honest about it.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
            <p className="text-base leading-relaxed text-fog">
              Velaryon is at concept stage. The platforms shown on this site are design concepts, not
              products. This is the path we're building along — and where we are on it.
            </p>
          </Reveal>
        </div>

        <ol data-testid="stages" className="mt-20 grid gap-px bg-line md:grid-cols-4">
          {STAGES.map((s, i) => (
            <Reveal key={s.n} delay={0.08 * i} className="bg-graphite">
              <li data-testid={`stage-${s.t.toLowerCase().replace(/\s+/g, "-")}`} className={`flex h-full flex-col p-8 ${s.current ? "bg-carbon" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className="label-xs text-fog">{s.n}</span>
                  {s.current ? (
                    <span className="label-xs flex items-center gap-2 text-signal">
                      <span aria-hidden className="signal-dot h-1.5 w-1.5 bg-signal" />
                      Current
                    </span>
                  ) : (
                    <span className="label-xs text-fog/50">Planned</span>
                  )}
                </div>
                <h3 className="mt-12 text-2xl font-medium tracking-tight text-chalk">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-fog">{s.c}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Rule className="mt-24" />
        <div className="grid gap-10 py-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label-xs text-fog">Principles</p>
            <h3 className="display-3 mt-6 text-chalk">What every Velaryon platform shares.</h3>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.t} delay={0.06 * i}>
                <div data-testid={`principle-${p.t.toLowerCase()}`}>
                  <span aria-hidden className="block h-px w-8 bg-signal" />
                  <h4 className="mt-6 text-lg font-medium tracking-tight text-chalk">{p.t}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{p.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal>
          <Btn to="/company" variant="link" testId="development-company-link">
            About the company
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}
