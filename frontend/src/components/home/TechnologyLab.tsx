import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";
import { PLATFORMS } from "@/lib/platforms";

const SYSTEMS = [
  { id: "autonomy", label: "AUTONOMY", region: { left: "40%", top: "34%", width: "20%", height: "24%" } },
  { id: "perception", label: "PERCEPTION", region: { left: "56%", top: "6%", width: "14%", height: "32%" } },
  { id: "compute", label: "COMPUTE", region: { left: "30%", top: "42%", width: "14%", height: "16%" } },
  { id: "connectivity", label: "CONNECTIVITY", region: { left: "69%", top: "4%", width: "10%", height: "30%" } },
  { id: "platform", label: "PLATFORM ENGINEERING", region: { left: "6%", top: "56%", width: "86%", height: "30%" } },
];

const REL_LINES = [
  { id: "autonomy", d: "M50 40 L14 10" },
  { id: "perception", d: "M62 18 L88 6" },
  { id: "compute", d: "M36 48 L12 54" },
  { id: "connectivity", d: "M74 14 L92 38" },
  { id: "platform", d: "M50 64 L30 58" },
];

export default function TechnologyLab() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState<string | null>(null);

  const photoOp = useTransform(p, [0, 0.16, 0.26, 0.82, 0.92, 1], [1, 1, 0, 0, 1, 1]);
  const edgeOp = useTransform(p, [0.2, 0.28, 0.42, 0.5], [0, 1, 1, 0]);
  const lineOp = useTransform(p, [0.44, 0.52, 0.64, 0.72], [0, 0.92, 0.92, 0]);
  const gridOp = useTransform(p, [0.44, 0.52, 0.78, 0.88], [0, 0.5, 0.5, 0]);
  const relOp = useTransform(p, [0.66, 0.76, 0.86, 0.95], [0, 1, 1, 0]);
  const relDraw = useTransform(p, [0.68, 0.82], [0, 1]);
  const stageNote = useTransform(p, [0, 0.1, 0.9, 1], [0.6, 0.6, 0.6, 0.6]);

  return (
    <div id="technology" className="bg-paper text-slate-900">
      <div className="mx-auto max-w-7xl px-5 pt-28 md:px-10 md:pt-40">
        <Reveal>
          <ChapterLabel index="04" title="Technology" light />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-10 font-display text-4xl font-medium leading-[1.0] tracking-tight sm:text-6xl lg:text-7xl">
            INTELLIGENCE
            <br />
            BENEATH THE SURFACE.
          </h2>
        </Reveal>
      </div>

      <section ref={ref} data-testid="technology-lab" data-cursor="VIEW" className="relative h-[320vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            aria-hidden
            style={{ opacity: gridOp }}
            className="absolute inset-0"
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />
          </motion.div>

          <div className="relative mx-auto w-[min(90vw,1050px)]">
            <motion.img
              src={PLATFORMS[0].img}
              alt="Velaryon Viper concept — photographic to technical transformation"
              loading="lazy"
              className="w-full"
              style={{ opacity: photoOp }}
            />
            <motion.img
              src={PLATFORMS[0].img}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: edgeOp, filter: "grayscale(1) contrast(1.9) brightness(1.08)" }}
            />
            <motion.img
              src={PLATFORMS[0].img}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: lineOp, filter: "brightness(0)" }}
            />

            <motion.svg
              aria-hidden
              viewBox="0 0 100 68"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              fill="none"
              style={{ opacity: relOp }}
            >
              {REL_LINES.map((l) => (
                <motion.path
                  key={l.id}
                  d={l.d}
                  stroke={active === l.id ? "#0f172a" : "#64748b"}
                  strokeWidth={active === l.id ? 1.6 : 1}
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: relDraw }}
                />
              ))}
            </motion.svg>

            {SYSTEMS.map((s) => (
              <motion.div
                key={s.id}
                aria-hidden
                className="pointer-events-none absolute border border-slate-800/70"
                style={{
                  ...s.region,
                  opacity: active === s.id ? 1 : 0,
                  transition: "opacity 0.35s ease",
                }}
              >
                <span className="absolute -top-5 left-0 whitespace-nowrap bg-paper px-1 font-mono text-[8px] uppercase tracking-[0.3em] text-slate-800">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-5 lg:flex">
            {SYSTEMS.map((s) => (
              <button
                key={s.id}
                data-testid={`tech-system-${s.id}`}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.id)}
                onBlur={() => setActive(null)}
                className={`font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 ${
                  active === s.id ? "text-slate-900" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="absolute bottom-6 left-5 right-5 flex flex-wrap gap-x-5 gap-y-2 lg:hidden">
            {SYSTEMS.map((s) => (
              <button
                key={s.id}
                data-testid={`tech-system-mobile-${s.id}`}
                onClick={() => setActive(active === s.id ? null : s.id)}
                className={`font-mono text-[9px] uppercase tracking-[0.25em] ${
                  active === s.id ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <motion.p
            style={{ opacity: stageNote }}
            className="absolute bottom-6 right-6 hidden font-mono text-[9px] uppercase tracking-[0.3em] text-slate-400 lg:block"
          >
            Photographic → technical — conceptual, no engineering data implied
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-28 md:px-10">
        <ArrowLink to="/technology" testId="technology-lab-link" light>
          Explore Technology
        </ArrowLink>
      </div>
    </div>
  );
}
