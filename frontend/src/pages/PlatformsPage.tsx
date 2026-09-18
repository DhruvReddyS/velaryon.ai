import { Link } from "react-router-dom";
import { Btn, Eyebrow, Frame, PageHero, Reveal } from "@/components/Primitives";
import { PlatformMedia } from "@/components/home/PlatformSelector";
import CTA from "@/components/home/CTA";
import { PLATFORMS } from "@/lib/platforms";

export default function PlatformsPage() {
  return (
    <div data-testid="platforms-page" className="bg-ink">
      <PageHero
        index="02"
        title="Platforms"
        testId="platforms-hero"
        heading={
          <>
            A family of autonomous
            <br />
            surface platform concepts.
          </>
        }
        lead="Three working designations, one shared autonomy and systems architecture. Each concept explores a different question about form, configuration and awareness at sea."
        meta={[
          { k: "Stage", v: "Concept", signal: true },
          { k: "Family", v: "3 platforms" },
        ]}
      />

      <section className="wrap">
        {PLATFORMS.map((p, i) => (
          <article
            key={p.id}
            data-testid={`platform-row-${p.id}`}
            className="grid gap-10 border-b border-line-soft py-20 lg:grid-cols-12 lg:gap-8 md:py-28"
          >
            <Reveal className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2 lg:col-start-6" : ""}`}>
              <Link to={`/platforms/${p.id}`} data-testid={`platform-row-media-${p.id}`} className="group block">
                <Frame className="aspect-[16/10] overflow-hidden bg-carbon">
                  <div className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
                    <PlatformMedia p={p} priority={i === 0} />
                  </div>
                </Frame>
              </Link>
            </Reveal>
            <Reveal delay={0.1} className={`flex flex-col justify-center lg:col-span-4 ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
              <Eyebrow index={p.code} title={p.role} />
              <h2 className="display-2 mt-8 text-chalk">{p.name}</h2>
              <p className="mt-3 text-lg text-chalk/80">{p.tagline}</p>
              <p className="mt-6 text-sm leading-relaxed text-fog">{p.summary}</p>
              <ul className="mt-8 space-y-2">
                {p.descriptors.map((d) => (
                  <li key={d.k} className="label-xs flex items-center gap-3 text-fog">
                    <span aria-hidden className="h-px w-4 bg-line" />
                    {d.v}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Btn to={`/platforms/${p.id}`} variant="ghost" testId={`platform-row-link-${p.id}`}>
                  View {p.name}
                </Btn>
              </div>
            </Reveal>
          </article>
        ))}
      </section>

      <section className="wrap py-20 md:py-28">
        <Reveal>
          <p className="label-xs text-fog">A note on specifications</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-chalk/80">
            Velaryon publishes platform concepts, not performance figures. Specifications will be shared
            as prototypes are built and validated — not before.
          </p>
        </Reveal>
      </section>

      <CTA />
    </div>
  );
}
