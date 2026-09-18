import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";
import ViperSection from "@/components/home/ViperSection";
import HavocSection from "@/components/home/HavocSection";
import HunterSection from "@/components/home/HunterSection";
import { PLATFORMS } from "@/lib/platforms";

const LAYERS = ["PHYSICAL PLATFORM", "SENSING", "COMPUTE", "AUTONOMY", "CONNECTIVITY"];

function LayerRow({
  label,
  index,
  progress,
  start,
  merge,
}: {
  label: string;
  index: number;
  progress: MotionValue<number>;
  start: number;
  merge: MotionValue<number>;
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

function LayersViz() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const merge = useTransform(scrollYProgress, [0.78, 0.95], [0, 1]);
  const imgDim = useTransform(scrollYProgress, [0.1, 0.3, 0.78, 0.95], [0.55, 0.4, 0.4, 1]);
  const noteOp = useTransform(scrollYProgress, [0.85, 0.98], [0, 1]);

  return (
    <div ref={ref} data-testid="platform-layers" className="relative h-[400vh] bg-abyss">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <p className="absolute left-5 top-24 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/60 md:left-10">
          Conceptual layer model — not internal hardware
        </p>
        <div className="relative w-full max-w-3xl">
          <motion.img
            src="/assets/hunter.webp"
            alt="Velaryon Hunter concept with conceptual autonomy layers"
            loading="lazy"
            className="w-full object-cover"
            style={{ opacity: imgDim }}
          />
          <div className="absolute inset-0 flex flex-col-reverse justify-end gap-2 pb-4">
            {LAYERS.map((l, i) => (
              <LayerRow key={l} label={l} index={i} progress={scrollYProgress} start={0.06 + i * 0.14} merge={merge} />
            ))}
          </div>
        </div>
        <motion.p style={{ opacity: noteOp }} className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
          Layers recombine into one platform
        </motion.p>
      </div>
    </div>
  );
}

const SPECS = ["LENGTH", "SPEED", "RANGE", "ENDURANCE", "PAYLOAD"];

export default function PlatformPage() {
  return (
    <div data-testid="platform-page" className="bg-abyss">
      <section className="relative flex min-h-[85svh] items-end overflow-hidden">
        <img
          src="/assets/hunter.webp"
          alt="Velaryon Hunter autonomous vessel concept underway"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-abyss/50" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 md:px-10">
          <Reveal>
            <ChapterLabel index="02" title="Platform Family" />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-7xl">
              THREE FORMS.
              <br />
              ONE AUTONOMOUS VISION.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex gap-10">
              {PLATFORMS.map((p) => (
                <div key={p.id} data-testid={`platform-page-${p.id}`}>
                  <p className="font-mono text-[10px] tracking-[0.35em] text-mist/60">{p.code}</p>
                  <p className="mt-1 font-display text-lg tracking-tight text-slate-200">{p.name}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ViperSection />
      <HavocSection />
      <HunterSection />

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
              family matures and data exists to stand behind them.
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
