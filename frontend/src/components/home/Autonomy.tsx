import { Btn, Eyebrow, Reveal, Rule } from "@/components/Primitives";

export const LOOP = [
  { n: "01", t: "Perceive", c: "Sensors build a picture of the surrounding environment — surface, sky, weather and traffic." },
  { n: "02", t: "Understand", c: "Software fuses that picture into a consistent model of what is where, and what it is doing." },
  { n: "03", t: "Decide", c: "Mission logic and navigation rules select a course of action inside the limits it has been given." },
  { n: "04", t: "Act", c: "The platform executes — steering, power and systems — and observes the result." },
];

export default function Autonomy() {
  return (
    <section data-testid="autonomy" className="bg-bone py-24 text-carbon md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow index="03" title="Autonomy" light />
            <h2 data-testid="autonomy-heading" className="display-2 mt-10">
              A continuous loop, not a remote control.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
            <p className="text-base leading-relaxed text-bone-fog">
              Velaryon's autonomy stack is being built as a single loop that runs continuously on the
              platform. People set the mission and the limits. The platform handles the rest — and
              stays connected so operators can see what it sees.
            </p>
            <div className="mt-8">
              <Btn to="/how-it-works" variant="link" light testId="autonomy-link">
                How it works
              </Btn>
            </div>
          </Reveal>
        </div>

        <Rule light className="mt-20" />
        <ol className="grid divide-y divide-bone-line md:grid-cols-4 md:divide-x md:divide-y-0">
          {LOOP.map((s, i) => (
            <Reveal key={s.n} delay={0.08 * i}>
              <li data-testid={`loop-step-${s.t.toLowerCase()}`} className={`flex h-full flex-col py-10 ${i > 0 ? "md:pl-8" : ""} ${i < LOOP.length - 1 ? "md:pr-8" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className="label-xs text-bone-fog">{s.n}</span>
                  <span aria-hidden className={`h-1.5 w-1.5 ${i === 0 ? "bg-signal" : "bg-bone-line"}`} />
                </div>
                <h3 className="mt-10 text-2xl font-medium tracking-tight">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-bone-fog">{s.c}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Rule light />
        <Reveal>
          <div data-testid="loop-connect" className="grid gap-6 py-10 md:grid-cols-4">
            <span className="label-xs text-bone-fog">Throughout</span>
            <div className="md:col-span-3">
              <h3 className="text-2xl font-medium tracking-tight">Connect</h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone-fog">
                Every step is designed to be observable from shore. Operators supervise, redirect and
                intervene — a human stays responsible for the mission at all times.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
