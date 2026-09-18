import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function HumanMachine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const t1 = useTransform(p, [0.05, 0.16, 0.4, 0.5], [0, 1, 1, 0]);
  const t2 = useTransform(p, [0.5, 0.62, 0.96, 1], [0, 1, 1, 1]);
  const linkDraw = useTransform(p, [0.55, 0.8], [0, 1]);

  return (
    <section ref={ref} data-testid="human-machine" className="relative h-[200vh] bg-navy">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-5">
        <motion.h2
          style={{ opacity: t1 }}
          className="absolute max-w-5xl text-center font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          AUTONOMY DOESN'T
          <br />
          REMOVE THE HUMAN.
        </motion.h2>
        <motion.div style={{ opacity: t2 }} className="absolute text-center">
          <h2 className="max-w-5xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            IT EXTENDS
            <br />
            THEIR REACH.
          </h2>
          <svg viewBox="0 0 200 40" fill="none" className="mx-auto mt-12 w-56" aria-hidden>
            <circle cx="16" cy="28" r="4" fill="#94a3b8" />
            <rect x="180" y="10" width="10" height="10" stroke="#94a3b8" strokeWidth="1.2" />
            <motion.path
              d="M22 26 C 80 6, 130 6, 178 14"
              stroke="#6e8cab"
              strokeWidth="1"
              strokeDasharray="3 3"
              style={{ pathLength: linkDraw }}
            />
          </svg>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.35em] text-mist/70">
            VESSEL / SUPERVISION / TASKING
          </p>
        </motion.div>
      </div>
    </section>
  );
}
