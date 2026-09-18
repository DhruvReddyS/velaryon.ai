import { Btn, PageHero, Reveal } from "@/components/Primitives";

export default function NewsroomPage() {
  return (
    <div data-testid="newsroom-page" className="min-h-screen bg-ink">
      <PageHero
        index="09"
        title="Newsroom"
        testId="newsroom-hero"
        heading={
          <>
            Signals from
            <br />
            Velaryon.
          </>
        }
        lead="Company announcements, engineering notes and milestones will be published here as they happen. Nothing will be dressed up as more than it is."
      />
      <section className="wrap py-20 md:py-28">
        <Reveal>
          <div data-testid="newsroom-empty" className="flex flex-col gap-4 border-y border-line py-10 md:flex-row md:items-center md:justify-between">
            <p className="label flex items-center gap-3 text-fog">
              <span aria-hidden className="h-1.5 w-1.5 bg-line" />
              No announcements yet
            </p>
            <p className="label-xs text-fog/60">First announcements will appear here</p>
          </div>
        </Reveal>
        <div className="mt-12">
          <Btn to="/contact" variant="link" testId="newsroom-contact-link">
            Start a conversation
          </Btn>
        </div>
      </section>
    </div>
  );
}
