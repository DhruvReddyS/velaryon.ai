import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import { Reveal } from "@/components/Reveal";

const STAGES = ["CONCEPT", "ENGINEERING", "PROTOTYPE", "SEA TRIALS", "MISSION VALIDATION", "SCALE"];

export default function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.45"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section data-testid="roadmap-section" className="bg-bone py-28 text-slate-900 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <ChapterLabel index="06" title="Forward" light />
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal delay={0.1} className="md:col-span-7">
            <h2 className="font-display text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              From concept
              <br />
              to open water.
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="md:col-span-5">
            <p className="max-w-sm text-base leading-relaxed text-slate-600">
              A disciplined path from design to demonstrated capability. Stages shown are
              indicative of intent — not claims of completion.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-20 md:mt-28">
          <div className="relative hidden md:block">
            <div aria-hidden className="absolute left-0 right-0 top-[5px] h-px bg-line" />
            <motion.div
              aria-hidden
              style={{ scaleX: lineScale }}
              className="absolute left-0 right-0 top-[5px] h-px origin-left bg-slate-900"
            />
            <ol className="relative grid grid-cols-6">
              {STAGES.map((s, i) => (
                <li key={s} data-testid={`roadmap-stage-${s.toLowerCase().replace(/\s+/g, "-")}`}>
                  <span
                    className={`block h-[11px] w-[11px] rounded-full border ${
                      i === 0 ? "border-slate-900 bg-slate-900" : "border-slate-400 bg-bone"
                    }`}
                  />
                  <span className="mt-5 block pr-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-slate-600">
                    {s}
                  </span>
                  {i === 0 && (
                    <span className="mt-2 inline-block border border-slate-900 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-900">
                      Current phase
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <ol className="space-y-6 md:hidden">
            {STAGES.map((s, i) => (
              <li
                key={s}
                data-testid={`roadmap-stage-mobile-${s.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-baseline gap-4 border-b border-line pb-4"
              >
                <span className="font-mono text-[10px] tracking-[0.3em] text-slate-400">0{i + 1}</span>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-700">{s}</span>
                {i === 0 && (
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.2em] text-slate-900">
                    Current
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
