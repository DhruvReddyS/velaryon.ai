import { Eyebrow, Frame, PageHero, Reveal, Rule } from "@/components/Primitives";
import CTA from "@/components/home/CTA";

const PROBLEMS = [
  { n: "01", t: "Vast", c: "Australia alone is responsible for one of the largest maritime jurisdictions in the world. Crewed vessels cannot be everywhere at once." },
  { n: "02", t: "Costly", c: "Every hour a crewed vessel spends at sea is an hour of people, fuel, food and risk. Persistent presence has always been expensive." },
  { n: "03", t: "Repetitive", c: "Much of the work at sea is patrol, survey and inspection — long, repetitive tasks that are exactly what autonomy is good at." },
];

const BELIEFS = [
  "Autonomy should extend people, not replace their judgement.",
  "A platform should be shaped around its mission, not the other way around.",
  "Software is the product. The vessel is how it goes to sea.",
  "Say what you have built. Not what you hope to build.",
];

export default function MissionPage() {
  return (
    <div data-testid="mission-page" className="bg-ink">
      <PageHero
        index="01"
        title="Mission"
        testId="mission-hero"
        heading={
          <>
            Presence at sea shouldn't be limited by the people you can put on it.
          </>
        }
        lead="Velaryon's mission is to make maritime presence persistent, precise and scalable through autonomy."
      />

      <section className="wrap py-24 md:py-32">
        <Reveal>
          <Eyebrow index="01.1" title="The problem" />
        </Reveal>
        <div className="mt-12 grid divide-y divide-line-soft md:grid-cols-3 md:divide-x md:divide-y-0">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.n} delay={0.08 * i}>
              <div data-testid={`problem-${p.t.toLowerCase()}`} className={`py-8 ${i > 0 ? "md:pl-10" : ""} ${i < PROBLEMS.length - 1 ? "md:pr-10" : ""}`}>
                <p className="label-xs text-fog">{p.n}</p>
                <h2 className="mt-8 text-3xl font-medium tracking-tight text-chalk">{p.t}</h2>
                <p className="mt-4 text-sm leading-relaxed text-fog">{p.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <Frame className="mx-6 aspect-[21/9] overflow-hidden bg-carbon md:mx-10 xl:mx-16">
          <img
            src="/assets/vessel-sunset.webp"
            alt="Velaryon autonomous surface vessel concept underway"
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 60%" }}
          />
        </Frame>
      </section>

      <section className="wrap py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow index="01.2" title="What we believe" />
          </Reveal>
          <div className="lg:col-span-8">
            <Rule />
            {BELIEFS.map((b, i) => (
              <Reveal key={b} delay={0.06 * i}>
                <div data-testid={`belief-${i}`} className="grid grid-cols-[48px_1fr] gap-4 border-b border-line py-8">
                  <span className="label-xs pt-2 text-fog">{String(i + 1).padStart(2, "0")}</span>
                  <p className="display-3 text-chalk">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA light />
    </div>
  );
}
