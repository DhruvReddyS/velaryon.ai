import { NextChapter, PageHero } from "@/components/page";
import { Cta, Reveal, Tag } from "@/components/kit";
import { velaryonMedia as media } from "@/lib/velaryonMedia";

export default function NewsroomPage() {
  return (
    <div data-testid="newsroom-page">
      <PageHero
        index="07"
        title="Newsroom"
        testId="newsroom-hero"
        img={media.ocean.distantWake}
        lines={["Signals from", <em key="e">Velaryon.</em>]}
        lead="Company announcements, engineering notes and milestones will be published here as they happen. Nothing will be dressed up as more than it is."
      />
      <section className="p-section p-section--ink">
        <Tag no="07.1">Latest</Tag>
        <Reveal>
          <div className="p-empty p-gap" data-testid="newsroom-empty">
            <span><i />No announcements yet</span>
            <span>First signals will appear here</span>
          </div>
        </Reveal>
        <div className="p-gap">
          <Cta to="/contact" variant="ghost" testId="newsroom-contact-link">Start a conversation</Cta>
        </div>
      </section>
      <NextChapter to="/" label="The deck" img={media.hero.cover} />
    </div>
  );
}
