import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";

export default function CompanyTeaser() {
  return (
    <section
      id="company"
      data-testid="company-teaser"
      className="border-t border-line bg-paper py-28 text-slate-900 md:py-40"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <Reveal>
            <ChapterLabel index="07" title="Company" light />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-10 font-display text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              BUILDING FOR
              <br />
              AN AUTONOMOUS
              <br />
              OCEAN.
            </h2>
          </Reveal>
        </div>
        <div className="flex flex-col justify-end md:col-span-6 md:col-start-7">
          <Reveal delay={0.15}>
            <p className="text-base leading-relaxed text-slate-600">
              Velaryon is an Australian early-stage maritime technology company developing
              autonomous surface platforms and the software that operates them.
            </p>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              We believe presence at sea should be persistent, precise and scalable — and that
              autonomy is how it gets there.
            </p>
            <div className="mt-10 flex flex-wrap gap-10">
              <ArrowLink to="/company" testId="company-teaser-link" light>
                About Velaryon
              </ArrowLink>
              <ArrowLink to="/company" testId="company-team-link" light>
                The People Building It
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
