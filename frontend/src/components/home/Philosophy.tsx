import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const PHRASES = ["Autonomous\nby design.", "Software\nat the core.", "Adaptable\nby architecture."];

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const p0 = useTransform(scrollYProgress, [0, 0.02, 0.24, 0.32], [1, 1, 1, 0]);
  const p1 = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.58], [0, 1, 1, 0]);
  const p2 = useTransform(scrollYProgress, [0.56, 0.66, 0.74, 0.8], [0, 1, 1, 0]);
  const fin = useTransform(scrollYProgress, [0.8, 0.92], [0, 1]);
  const phrases = [p0, p1, p2];

  return (
    <section ref={ref} data-testid="philosophy-section" className="relative h-[340vh] bg-abyss">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-5">
        {PHRASES.map((p, i) => (
          <motion.h2
            key={p}
            style={{ opacity: phrases[i] }}
            className="absolute max-w-5xl whitespace-pre-line text-center font-display text-5xl font-medium leading-[1.0] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            {p}
          </motion.h2>
        ))}
        <motion.div style={{ opacity: fin }} className="absolute text-center">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-mist sm:text-sm">
            AUTONOMOUS
          </p>
          <p className="my-3 font-display text-3xl text-steel-light sm:text-4xl" aria-hidden>
            ×
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-mist sm:text-sm">
            SOFTWARE-DEFINED
          </p>
          <p className="my-3 font-display text-3xl text-steel-light sm:text-4xl" aria-hidden>
            ×
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-mist sm:text-sm">
            ADAPTABLE
          </p>
        </motion.div>
      </div>
    </section>
  );
}
