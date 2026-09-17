import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";

const PATHS = ["INVESTMENT", "STRATEGIC PARTNERSHIPS", "TECHNOLOGY COLLABORATION"];

export default function FinalCTA() {
  return (
    <section data-testid="final-cta" className="relative overflow-hidden">
      <img
        src="/assets/vessel-sunset.webp"
        alt="Velaryon vessel concept travelling toward the horizon at sunset"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-abyss/20" />

      <div className="relative mx-auto flex min-h-[90svh] max-w-7xl flex-col justify-end px-5 py-28 md:px-10">
        <Reveal>
          <ChapterLabel index="08" title="Horizon" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
            The next era
            <br />
            begins at sea.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {PATHS.map((p) => (
              <span key={p} className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                {p}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <ArrowLink to="/contact" testId="final-cta-link" className="text-sm">
              Start a Conversation
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
