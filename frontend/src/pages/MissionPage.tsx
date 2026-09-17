import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";

const POINTS = [
  {
    n: "01",
    title: "PERSISTENCE",
    copy: "Oceans cover most of the planet, yet crewed presence is expensive, limited and often risky. Autonomy is being developed to make presence continuous rather than occasional.",
  },
  {
    n: "02",
    title: "SCALE",
    copy: "One crewed vessel can only be in one place. Distributed autonomous platforms are intended to change the mathematics of coverage entirely.",
  },
  {
    n: "03",
    title: "SAFETY",
    copy: "Removing crews from routine, remote or hazardous operations is designed to keep people out of harm's way while keeping watch where it matters.",
  },
];

export default function MissionPage() {
  return (
    <div data-testid="mission-page" className="bg-abyss">
      <section className="relative flex min-h-[80svh] items-end overflow-hidden">
        <img
          src="/assets/vessel-sunset.webp"
          alt="Velaryon vessel concept small against a vast ocean horizon"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-abyss/60" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 md:px-10">
          <Reveal>
            <ChapterLabel index="01" title="Mission" />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-7xl">
              The ocean is vast.
              <br />
              Presence shouldn't be
              <br />
              limited by people.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
              Maritime autonomy matters because the operating environment outgrows the crewed
              model. Velaryon exists to develop the platforms and the intelligence that close that
              gap — deliberately, and from first principles.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-px bg-white/[0.07] md:grid-cols-3">
            {POINTS.map((p, i) => (
              <Reveal key={p.n} delay={0.1 * i} className="bg-abyss">
                <div data-testid={`mission-point-${p.title.toLowerCase()}`} className="p-8 md:p-10">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-mist/60">{p.n}</p>
                  <h2 className="mt-6 font-mono text-xs uppercase tracking-[0.32em] text-white">{p.title}</h2>
                  <p className="mt-5 text-sm leading-relaxed text-mist">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20">
            <ArrowLink to="/platform" testId="mission-to-platform-link">
              See What We're Building
            </ArrowLink>
          </div>
        </div>
      </section>
    </div>
  );
}
