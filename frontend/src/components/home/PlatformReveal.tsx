import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";
import AnnotatedVessel from "@/components/AnnotatedVessel";

export default function PlatformReveal() {
  return (
    <section data-testid="platform-reveal" className="bg-bone py-28 text-slate-900 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <ChapterLabel index="02" title="Platform" light />
        </Reveal>
        <div className="mt-10 grid gap-12 md:grid-cols-12 md:items-end">
          <Reveal delay={0.1} className="md:col-span-7">
            <h2 className="font-display text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              Designed around
              <br />
              autonomy.
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="md:col-span-5">
            <p className="max-w-sm text-base leading-relaxed text-slate-600">
              A vessel conceived without a crew from the first line — every system on board exists
              to serve the autonomy stack, not the other way around.
            </p>
            <div className="mt-8">
              <ArrowLink to="/platform" testId="platform-reveal-link" light>
                Explore Platform
              </ArrowLink>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-16 md:mt-24">
          <AnnotatedVessel />
        </Reveal>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
          Concept render — annotation denotes system intent, not final hardware
        </p>
      </div>
    </section>
  );
}
