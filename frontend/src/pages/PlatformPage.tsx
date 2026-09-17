import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";
import AnnotatedVessel from "@/components/AnnotatedVessel";

const LAYERS = ["PHYSICAL PLATFORM", "SENSING", "COMPUTE", "AUTONOMY", "CONNECTIVITY"];

function LayersViz() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const merge = useTransform(scrollYProgress, [0.78, 0.95], [0, 1]);
  const imgDim = useTransform(scrollYProgress, [0.1, 0.3, 0.78, 0.95], [0.55, 0.4, 0.4, 1]);

  return (
    <div ref={ref} data-testid="platform-layers" className="relative h-[400vh] bg-abyss">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <p className="absolute left-5 top-24 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/60 md:left-10">
          Conceptual layer model — not internal hardware
        </p>

        <div className="relative w-full max-w-3xl">
          <motion.img
            src="/assets/vessel-dusk.webp"
            alt="Velaryon vessel concept with conceptual autonomy layers"
            loading="lazy"
            className="w-full object-cover"
            style={{ opacity: imgDim }}
          />
          <div className="absolute inset-0 flex flex-col-reverse justify-end gap-2 pb-4">
            {LAYERS.map((l, i) => {
              const start = 0.06 + i * 0.14;
              return (
                <LayerRow key={l} label={l} index={i} progress={scrollYProgress} start={start} merge={merge} />
              );
            })}
          </div>
        </div>

        <motion.p style={{ opacity: useTransform(scrollYProgress, [0.85, 0.98], [0, 1]) }} className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
          Layers recombine into one platform
        </motion.p>
      </div>
    </div>
  );
}

function LayerRow({
  label,
  index,
  progress,
  start,
  merge,
}: {
  label: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  merge: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const y = useTransform(progress, [start, start + 0.1], [24, 0]);
  const mergeOut = useTransform(merge, [0, 1], [1, 0]);
  const combined = useTransform([opacity, mergeOut], (v) => (v as number[])[0] * (v as number[])[1]);

  return (
    <motion.div
      style={{ opacity: combined, y }}
      className="flex items-center justify-between border border-white/15 bg-navy/70 px-5 py-3 backdrop-blur-sm"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-200">{label}</span>
      <span className="font-mono text-[9px] tracking-[0.3em] text-mist/60">L{index + 1}</span>
    </motion.div>
  );
}

const PHILOSOPHY = [
  { t: "AUTONOMY-FIRST", c: "The hull, propulsion and power concept is shaped around the autonomy stack — no crew spaces, no compromise." },
  { t: "SOFTWARE-DEFINED", c: "Capability is intended to ship as software. The platform is designed to improve between deployments, not between hulls." },
  { t: "MODULAR", c: "Mission systems are envisioned as adaptable modules, so one platform concept can serve different missions." },
];

const SPECS = ["LENGTH", "SPEED", "RANGE", "ENDURANCE", "PAYLOAD"];

export default function PlatformPage() {
  return (
    <div data-testid="platform-page" className="bg-abyss">
      <section className="relative flex min-h-[85svh] items-end overflow-hidden">
        <img
          src="/assets/vessel-dusk.webp"
          alt="Velaryon autonomous vessel concept underway at dusk"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-abyss/50" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 md:px-10">
          <Reveal>
            <ChapterLabel index="02" title="Platform" />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-7xl">
              Designed around
              <br />
              autonomy.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone py-24 text-slate-900 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <AnnotatedVessel testId="platform-page-vessel" />
          </Reveal>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
            Concept render — annotation denotes system intent, not final hardware
          </p>

          <div className="mt-24 grid gap-px bg-line md:grid-cols-3">
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={p.t} delay={0.1 * i} className="bg-bone">
                <div className="p-8 md:p-10">
                  <h2 className="font-mono text-xs uppercase tracking-[0.32em] text-slate-900">{p.t}</h2>
                  <p className="mt-5 text-sm leading-relaxed text-slate-600">{p.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LayersViz />

      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <ChapterLabel index="02.5" title="Specifications" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
              Numbers when they're real.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist">
              Velaryon is early-stage. Performance figures will be published here as the platform
              matures and data exists to stand behind them.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-14 grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-5">
              {SPECS.map((s) => (
                <div key={s} data-testid={`spec-${s.toLowerCase()}`} className="bg-abyss p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist/60">{s}</p>
                  <p className="mt-6 font-display text-2xl text-slate-500">—</p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-mist/40">
                    To be published
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="mt-20">
            <ArrowLink to="/how-it-works" testId="platform-to-autonomy-link">
              See How It Works
            </ArrowLink>
          </div>
        </div>
      </section>
    </div>
  );
}
