import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";

export default function NewsroomPage() {
  return (
    <div data-testid="newsroom-page" className="min-h-screen bg-abyss">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-40 md:px-10">
        <Reveal>
          <ChapterLabel index="08" title="Newsroom" />
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-7xl">
            SIGNALS FROM
            <br />
            VELARYON.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist">
            Company announcements, engineering notes and milestones will be published here as they
            happen. Nothing will be dressed up as more than it is.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-32 md:px-10">
        <div className="border-t border-white/10">
          <div
            data-testid="newsroom-empty"
            className="flex flex-col gap-3 border-b border-dashed border-white/10 py-12 md:flex-row md:items-center md:justify-between"
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-mist/70">NO TRANSMISSIONS YET</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist/40">
              FIRST ANNOUNCEMENTS WILL APPEAR HERE
            </p>
          </div>
        </div>
        <div className="mt-14">
          <ArrowLink to="/contact" testId="newsroom-contact-link">
            Start a Conversation
          </ArrowLink>
        </div>
      </section>
    </div>
  );
}
