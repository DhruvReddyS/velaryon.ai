import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { PLATFORMS } from "@/lib/platforms";

const P = PLATFORMS[2];
const MICRO = ["OBSERVE.", "INTERPRET.", "CONNECT."];

function Micro({ i, p }: { i: number; p: MotionValue<number> }) {
  const a = 0.2 + i * 0.14;
  const op = useTransform(p, [a, a + 0.06, a + 0.12, a + 0.18], [0, 1, 1, 0.25]);
  return (
    <motion.span style={{ opacity: op }} className="block font-mono text-[10px] uppercase tracking-[0.4em] text-slate-200">
      {MICRO[i]}
    </motion.span>
  );
}

export default function HunterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const ovOp = useTransform(p, [0.12, 0.24, 0.72, 0.86], [0, 1, 1, 0]);
  const fieldDraw = useTransform(p, [0.12, 0.32], [0, 1]);
  const coneOp = useTransform(p, [0.2, 0.34], [0, 1]);
  const trackOp = useTransform(p, [0.32, 0.44], [0, 1]);

  const codeOp = useTransform(p, [0.03, 0.1], [0, 1]);
  const nameOp = useTransform(p, [0.06, 0.16], [0, 1]);
  const copyOp = useTransform(p, [0.8, 0.92], [0, 1]);

  return (
    <section ref={ref} data-testid="hunter-section" data-cursor="VIEW" className="relative h-[300vh] bg-abyss">
      <div className="sticky top-0 h-screen overflow-hidden">
        <img src={P.img} alt={P.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-abyss/25" />

        <motion.div aria-hidden style={{ opacity: ovOp }} className="absolute inset-0">
          <svg viewBox="0 0 100 62" preserveAspectRatio="none" className="h-full w-full" fill="none">
            {[18, 34, 50].map((y) => (
              <motion.path
                key={y}
                d={`M0 ${y} H 100`}
                stroke="#6e8cab"
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="1 3"
                opacity="0.5"
                style={{ pathLength: fieldDraw }}
              />
            ))}
            <motion.path
              d="M29 4 L13 44 L45 44 Z"
              fill="rgba(110,140,171,0.07)"
              stroke="rgba(110,140,171,0.4)"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
              style={{ opacity: coneOp }}
            />
            <motion.g style={{ opacity: trackOp }}>
              <rect x="61" y="26" width="7" height="5" stroke="#cbd5e1" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
              <rect x="76" y="40" width="6" height="4" stroke="#cbd5e1" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
            </motion.g>
          </svg>
          <motion.span style={{ opacity: trackOp }} className="absolute left-[62%] top-[38%] font-mono text-[8px] tracking-[0.3em] text-slate-300">
            TRK-01
          </motion.span>
          <motion.span style={{ opacity: trackOp }} className="absolute left-[77%] top-[62%] font-mono text-[8px] tracking-[0.3em] text-slate-300">
            TRK-02
          </motion.span>
          <div className="absolute bottom-24 right-5 space-y-2 text-right md:right-12">
            {[0, 1, 2].map((i) => (
              <Micro key={i} i={i} p={p} />
            ))}
          </div>
        </motion.div>

        <div className="absolute bottom-14 left-5 right-5 md:bottom-20 md:left-10">
          <motion.p style={{ opacity: codeOp }} className="font-mono text-[11px] tracking-[0.4em] text-mist">
            {P.code}
          </motion.p>
          <motion.h2
            style={{ opacity: nameOp }}
            className="mt-3 font-display text-6xl font-medium tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            {P.name}
          </motion.h2>
          <motion.p style={{ opacity: nameOp }} className="mt-2 font-display text-2xl tracking-tight text-steel-light sm:text-4xl">
            {P.tagline[0]} {P.tagline[1]}
          </motion.p>
          <motion.p style={{ opacity: copyOp }} className="mt-6 max-w-md text-sm leading-relaxed text-mist">
            {P.copy}
          </motion.p>
          <motion.div style={{ opacity: copyOp }} className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {P.descriptors.map((d) => (
              <span key={d} className="font-mono text-[9px] uppercase tracking-[0.28em] text-mist/70">
                {d}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
