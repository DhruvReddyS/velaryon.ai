import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";

const PILLARS = [
  {
    n: "T/01",
    title: "AUTONOMY",
    body: "The autonomy stack is being designed to own the full mission loop: understand the task, plan the route, adapt to what the ocean presents, and execute — with humans supervising, not steering.",
    detail: "Mission planning / Behaviour / Supervision",
  },
  {
    n: "T/02",
    title: "PERCEPTION",
    body: "A sensing concept intended to maintain a continuous, all-around picture of the surface: other vessels, navigation markers, obstacles and coastline, day and night.",
    detail: "Detection / Classification / Coverage",
  },
  {
    n: "T/03",
    title: "INTELLIGENCE",
    body: "Raw contacts become tracks; tracks become understanding. The intelligence layer is designed to fuse sensing into situational awareness the autonomy stack can act on.",
    detail: "Fusion / Identification / Tracking",
  },
  {
    n: "T/04",
    title: "CONNECTIVITY",
    body: "Autonomy does not mean isolation. The platform is envisioned to stay connected to remote operations — supervised, taskable and accountable.",
    detail: "Comms link / Remote operations / Tasking",
  },
];

export default function TechnologyPage() {
  return (
    <div data-testid="technology-page" className="bg-abyss">
      <section className="flex min-h-[70svh] items-end">
        <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-40 md:px-10">
          <Reveal>
            <ChapterLabel index="04" title="Technology" />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-7xl">
              Intelligence beneath
              <br />
              the surface.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist">
              Four interlocking layers of engineering intent. Each is under development; none is
              claimed as fielded capability.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n}>
              <article
                data-testid={`tech-${p.title.toLowerCase()}`}
                className={`grid gap-8 border-t border-white/[0.08] py-16 md:grid-cols-12 md:py-20 ${
                  i % 2 === 1 ? "" : ""
                }`}
              >
                <div className="md:col-span-3">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-mist/60">{p.n}</p>
                  <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                    {p.title}
                  </h2>
                </div>
                <div className="md:col-span-6">
                  <p className="text-base leading-relaxed text-slate-300">{p.body}</p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <p className="font-mono text-[10px] uppercase leading-loose tracking-[0.25em] text-mist/60">
                    {p.detail}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="mt-8">
            <ArrowLink to="/how-it-works" testId="technology-to-hiw-link">
              Experience the Autonomy Loop
            </ArrowLink>
          </div>
        </div>
      </section>
    </div>
  );
}
