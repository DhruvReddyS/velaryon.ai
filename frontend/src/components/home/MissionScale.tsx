import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";

const CAPTIONS = [
  "The ocean is vast.",
  "Presence shouldn't be limited by people.",
  "Scale changes the problem.",
];

export default function MissionScale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const imgScale = useTransform(scrollYProgress, [0, 0.85], [1.05, 0.42]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9], [0.9, 1, 0.35]);
  const gridOpacity = useTransform(scrollYProgress, [0.5, 0.85], [0, 0.35]);

  const c0 = useTransform(scrollYProgress, [0.05, 0.18, 0.3, 0.4], [0, 1, 1, 0]);
  const c1 = useTransform(scrollYProgress, [0.38, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  const c2 = useTransform(scrollYProgress, [0.68, 0.8, 0.95, 1], [0, 1, 1, 1]);
  const caps = [c0, c1, c2];

  return (
    <section id="mission" ref={ref} data-testid="mission-scale" className="relative h-[320vh] bg-abyss">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.6) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
        <motion.div aria-hidden className="absolute inset-0 bg-navy" style={{ opacity: gridOpacity }} />

        <motion.img
          src="/assets/vessel-sunset.webp"
          alt="Velaryon vessel concept seen small against a vast open ocean at sunset"
          loading="lazy"
          className="absolute h-[70vh] w-[92vw] max-w-6xl object-cover"
          style={{ scale: imgScale, opacity: imgOpacity }}
        />

        <div className="absolute left-5 top-24 md:left-10">
          <ChapterLabel index="01" title="Mission" />
        </div>

        <p aria-hidden className="absolute right-5 top-24 text-right font-mono text-[9px] uppercase tracking-[0.3em] text-mist/50 md:right-10">
          62.4° N — 005.1° E
          <br />
          Range / Open Ocean
        </p>

        <div className="relative px-6 text-center">
          {CAPTIONS.map((c, i) => (
            <motion.h2
              key={c}
              style={{ opacity: caps[i] }}
              className={`font-display font-medium leading-[1.02] tracking-tight text-white ${
                i === 0 ? "" : "absolute inset-0 flex items-center justify-center"
              } text-4xl sm:text-6xl lg:text-7xl`}
            >
              {c}
            </motion.h2>
          ))}
        </div>

        <motion.div
          style={{ opacity: c2 }}
          className="absolute bottom-16 left-1/2 w-full -translate-x-1/2 px-6 text-center"
        >
          <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-mist">
            Velaryon is developing autonomous platforms intended to sustain presence where crewed
            vessels cannot — or should not — operate continuously.
          </p>
          <ArrowLink to="/mission" testId="mission-scale-link">
                Why Maritime Autonomy
          </ArrowLink>
        </motion.div>
      </div>
    </section>
  );
}
