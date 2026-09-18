import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PLATFORMS } from "@/lib/platforms";

const PHRASES = ["AUTONOMOUS\nBY DESIGN.", "SOFTWARE\nAT THE CORE.", "ADAPTABLE\nBY ARCHITECTURE."];

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const p0 = useTransform(scrollYProgress, [0, 0.02, 0.24, 0.32], [1, 1, 1, 0]);
  const p1 = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.58], [0, 1, 1, 0]);
  const p2 = useTransform(scrollYProgress, [0.56, 0.66, 0.74, 0.8], [0, 1, 1, 0]);
  const fin = useTransform(scrollYProgress, [0.8, 0.92], [0, 1]);
  const phrases = [p0, p1, p2];

  // vessel silhouette passes behind the typography
  const shipX = useTransform(scrollYProgress, [0, 0.3], ["-75%", "115%"]);
  // then resolves into an outline
  const outlineOp = useTransform(scrollYProgress, [0.32, 0.4, 0.56, 0.64], [0, 0.18, 0.18, 0]);
  // three platform silhouettes separate
  const trioOp = useTransform(scrollYProgress, [0.58, 0.68, 0.76, 0.82], [0, 0.22, 0.22, 0]);
  const trioSpread = useTransform(scrollYProgress, [0.58, 0.72], [0, 1]);
  const trioX0 = useTransform(trioSpread, (v) => -v * 60);
  const trioX2 = useTransform(trioSpread, (v) => v * 60);
  const trioX = [trioX0, 0, trioX2] as const;

  return (
    <section ref={ref} data-testid="philosophy-section" className="relative h-[340vh] bg-abyss">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-5">
        <motion.img
          src={PLATFORMS[0].img}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute bottom-[6%] w-[58vw] max-w-3xl"
          style={{ x: shipX, filter: "brightness(0)", opacity: 0.22 }}
        />
        <motion.img
          src={PLATFORMS[0].img}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute bottom-[10%] w-[46vw] max-w-2xl"
          style={{ opacity: outlineOp, filter: "brightness(0) invert(1)" }}
        />
        <motion.div aria-hidden style={{ opacity: trioOp }} className="absolute bottom-[8%] flex items-end">
          {PLATFORMS.map((pl, i) => (
            <motion.img
              key={pl.id}
              src={pl.img}
              alt=""
              loading="lazy"
              className="w-[26vw] max-w-sm"
              style={{
                filter: "brightness(0)",
                x: trioX[i],
              }}
            />
          ))}
        </motion.div>

        {PHRASES.map((ph, i) => (
          <motion.h2
            key={ph}
            style={{ opacity: phrases[i] }}
            className="absolute max-w-5xl whitespace-pre-line text-center font-display text-5xl font-medium leading-[1.0] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            {ph}
          </motion.h2>
        ))}
        <motion.div style={{ opacity: fin }} className="absolute text-center">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-mist sm:text-sm">AUTONOMOUS</p>
          <p className="my-3 font-display text-3xl text-steel-light sm:text-4xl" aria-hidden>×</p>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-mist sm:text-sm">SOFTWARE-DEFINED</p>
          <p className="my-3 font-display text-3xl text-steel-light sm:text-4xl" aria-hidden>×</p>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-mist sm:text-sm">MISSION-ADAPTABLE</p>
        </motion.div>
      </div>
    </section>
  );
}
