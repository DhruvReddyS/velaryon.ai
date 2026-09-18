import { Eyebrow, Frame, PageHero, Reveal, Rule } from "@/components/Primitives";
import { LOOP } from "@/components/home/Autonomy";
import CTA from "@/components/home/CTA";

const ROLES = [
  { who: "Operator", does: ["Defines the mission and its limits", "Supervises from shore", "Redirects or takes over at any time"] },
  { who: "Platform", does: ["Perceives and models its environment", "Selects actions inside its limits", "Executes, observes and reports"] },
];

const LEVELS = [
  { n: "01", t: "Supervised", c: "The platform executes a defined plan while an operator monitors continuously." },
  { n: "02", t: "Directed", c: "Operators assign objectives; the platform plans and executes, reporting as it goes." },
  { n: "03", t: "Delegated", c: "Longer missions with periodic check-ins, within limits set before departure." },
];

export default function HowItWorksPage() {
  return (
    <div data-testid="how-it-works-page" className="bg-ink">
      <PageHero
        index="03"
        title="Autonomy"
        testId="autonomy-hero"
        heading={
          <>
            People direct.
            <br />
            Platforms execute.
          </>
        }
        lead="How Velaryon's autonomy is being designed to work — from the loop that runs on the platform to the roles people keep."
      />

      <section className="wrap py-24 md:py-32">
        <Reveal>
          <Eyebrow index="03.1" title="The loop" />
        </Reveal>
        <div className="mt-12 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
          {LOOP.map((s, i) => (
            <Reveal key={s.n} delay={0.06 * i} className="bg-ink">
              <div data-testid={`hiw-step-${s.t.toLowerCase()}`} className="flex h-full flex-col p-8 md:p-10">
                <div className="flex items-center justify-between">
                  <span className="label-xs text-fog">{s.n}</span>
                  <span aria-hidden className={`h-1.5 w-1.5 ${i === 0 ? "bg-signal" : "bg-line"}`} />
                </div>
                <h2 className="mt-16 text-3xl font-medium tracking-tight text-chalk">{s.t}</h2>
                <p className="mt-4 text-sm leading-relaxed text-fog">{s.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line-soft bg-bone py-24 text-carbon md:py-32">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow index="03.2" title="Human + machine" light />
              <h2 className="display-3 mt-8">A human stays responsible for the mission at all times.</h2>
            </Reveal>
            <div className="grid gap-px bg-bone-line sm:grid-cols-2 lg:col-span-8">
              {ROLES.map((r) => (
                <Reveal key={r.who} className="bg-bone">
                  <div data-testid={`role-${r.who.toLowerCase()}`} className="h-full p-8 md:p-10">
                    <p className="label-xs text-bone-fog">{r.who}</p>
                    <ul className="mt-8 space-y-4">
                      {r.does.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-base">
                          <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-carbon" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow index="03.3" title="Levels of autonomy" />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-fog">
              Autonomy is a dial, not a switch. Velaryon platforms are being designed to operate across
              these modes depending on mission, environment and trust.
            </p>
          </Reveal>
          <div className="lg:col-span-8">
            <Rule />
            {LEVELS.map((l, i) => (
              <Reveal key={l.n} delay={0.06 * i}>
                <div data-testid={`level-${l.t.toLowerCase()}`} className="grid gap-4 border-b border-line py-7 md:grid-cols-[64px_200px_1fr] md:gap-8">
                  <span className="label-xs pt-1 text-fog">{l.n}</span>
                  <h3 className="text-2xl font-medium tracking-tight text-chalk">{l.t}</h3>
                  <p className="text-sm leading-relaxed text-fog">{l.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal>
          <Frame className="mt-24 aspect-[21/9] overflow-hidden bg-carbon">
            <img
              src="/assets/havoc.webp"
              alt="Velaryon HAVOC concept underway"
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 55%" }}
            />
          </Frame>
        </Reveal>
      </section>

      <CTA />
    </div>
  );
}
