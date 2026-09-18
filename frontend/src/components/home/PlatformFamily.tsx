import { motion } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";
import { PLATFORMS } from "@/lib/platforms";

export function PlatformFamilyIntro() {
  return (
    <section
      id="platforms"
      data-testid="platform-family-intro"
      className="relative overflow-hidden bg-navy py-32 md:py-48"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-abyss to-transparent"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <ChapterLabel index="02" title="Platform Family" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-10 font-display text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-8xl">
            THREE FORMS.
            <br />
            ONE AUTONOMOUS
            <br />
            VISION.
          </h2>
        </Reveal>
        <div className="mt-14 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <Reveal delay={0.2}>
            <p className="max-w-md text-base leading-relaxed text-mist">
              Three distinct vessel concepts built around a shared autonomy core. The vessels
              themselves are the interface — scroll through them.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex gap-10">
              {PLATFORMS.map((p) => (
                <div key={p.id} data-testid={`family-intro-${p.id}`}>
                  <p className="font-mono text-[10px] tracking-[0.35em] text-mist/60">{p.code}</p>
                  <p className="mt-2 font-display text-xl tracking-tight text-slate-200">{p.name}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/50">
          Working designations — concept platforms in development
        </p>
      </div>
    </section>
  );
}

export function PlatformFamilyFinale() {
  return (
    <section data-testid="platform-family-finale" className="relative bg-abyss pb-28 pt-10 md:pb-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-px bg-white/[0.08] md:grid-cols-3">
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.id}
              data-testid={`finale-${p.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[42vh] overflow-hidden bg-abyss md:h-[52vh]"
              data-cursor="VIEW"
            >
              <img
                src={p.img}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="font-mono text-[10px] tracking-[0.35em] text-mist">{p.code}</p>
                <p className="mt-1 font-display text-2xl tracking-tight text-white">{p.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center md:mt-28">
          <Reveal>
            <h3 className="font-display text-4xl font-medium leading-[1.0] tracking-tight text-white sm:text-6xl">
              THREE FORMS.
              <br />
              ONE AUTONOMOUS VISION.
            </h3>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.35em] text-mist/70">
              VELARYON / AUTONOMOUS MARITIME SYSTEMS
            </p>
            <div className="mt-10">
              <ArrowLink to="/platform" testId="family-finale-link">
                Explore the Platform Family
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
