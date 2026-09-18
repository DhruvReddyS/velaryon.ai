import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from "motion/react";
import { PLATFORMS } from "@/lib/platforms";

const P = PLATFORMS[1];
const BANDS = ["MAST", "SUPERSTRUCTURE", "MISSION AREA", "HULL", "SYSTEMS"];

function Strip({ i, p }: { i: number; p: MotionValue<number> }) {
  const top = i * 20;
  const bottom = 100 - (i + 1) * 20;
  const a = 0.05 + i * 0.09;
  const opacity = useTransform(p, [a, a + 0.08], [0, 1]);
  const x = useTransform(p, [a, a + 0.09], [i % 2 ? 52 : -52, 0]);
  const labelOp = useTransform(p, [a + 0.02, a + 0.1, 0.68, 0.84], [0, 1, 1, 0]);
  const border = useMotionTemplate`rgba(255,255,255,${labelOp})`;

  return (
    <motion.div
      aria-hidden={i !== 2}
      className="absolute inset-0"
      style={{
        clipPath: `inset(${top}% 0 ${bottom}% 0)`,
        opacity,
        x,
      }}
    >
      <motion.span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-white" style={{ opacity: useTransform(labelOp, (v) => v * 0.25) }} />
      <motion.span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white" style={{ opacity: useTransform(labelOp, (v) => v * 0.25) }} />
      <img src={P.img} alt="" loading="lazy" className="h-full w-full object-cover" />
      <motion.span
        className="absolute right-6 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.3em] md:right-12"
        style={{ opacity: labelOp, color: border }}
      >
        {BANDS[i]}
      </motion.span>
    </motion.div>
  );
}

export default function HavocSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const codeOp = useTransform(p, [0.5, 0.58], [0, 1]);
  const nameOp = useTransform(p, [0.55, 0.65], [0, 1]);
  const nameY = useTransform(p, [0.55, 0.68], [50, 0]);
  const tagOp = useTransform(p, [0.66, 0.76], [0, 1]);
  const copyOp = useTransform(p, [0.74, 0.85], [0, 1]);

  return (
    <section ref={ref} data-testid="havoc-section" data-cursor="VIEW" className="relative h-[280vh] bg-abyss">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[#04060a]" />
        {[0, 1, 2, 3, 4].map((i) => (
          <Strip key={i} i={i} p={p} />
        ))}
        <img src={P.img} alt={P.alt} className="sr-only" />

        <div className="absolute bottom-14 left-5 right-5 md:bottom-20 md:left-10">
          <motion.p style={{ opacity: codeOp }} className="font-mono text-[11px] tracking-[0.4em] text-mist">
            {P.code}
          </motion.p>
          <div className="mt-3 overflow-hidden">
            <motion.h2
              style={{ opacity: nameOp, y: nameY }}
              className="font-display text-6xl font-medium tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              {P.name}
            </motion.h2>
          </div>
          <motion.p style={{ opacity: tagOp }} className="mt-2 font-display text-2xl tracking-tight text-steel-light sm:text-4xl">
            {P.tagline[0]}
            <br />
            {P.tagline[1]}
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
