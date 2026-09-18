import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";

const PATHS = ["INVESTMENT", "STRATEGIC PARTNERSHIPS", "TECHNOLOGY COLLABORATION"];

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // the vessel travels away toward the horizon
  const scale = useTransform(scrollYProgress, [0, 1], [1.22, 0.6]);
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-14%"]);
  const dim = useTransform(scrollYProgress, [0, 1], [0.15, 0.55]);
  const labelOp = useTransform(scrollYProgress, [0.12, 0.25], [0, 1]);
  const headOp = useTransform(scrollYProgress, [0.25, 0.42], [0, 1]);
  const headY = useTransform(scrollYProgress, [0.25, 0.45], [50, 0]);
  const optOp = useTransform(scrollYProgress, [0.48, 0.62], [0, 1]);

  return (
    <section ref={ref} data-testid="final-cta" className="relative h-[240vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.img
          src="/assets/vessel-sunset.webp"
          alt="Velaryon vessel concept travelling away toward the horizon at sunset"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale, y, objectPosition: "center 42%" }}
        />
        <motion.div aria-hidden className="absolute inset-0 bg-abyss" style={{ opacity: dim }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-24 md:px-10 md:pb-20">
          <motion.div style={{ opacity: labelOp }}>
            <ChapterLabel index="08" title="Horizon" />
          </motion.div>
          <motion.h2
            style={{ opacity: headOp, y: headY }}
            className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-8xl"
          >
            THE NEXT ERA
            <br />
            BEGINS AT SEA.
          </motion.h2>
          <motion.div style={{ opacity: optOp }}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {PATHS.map((p) => (
                <span key={p} className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <ArrowLink to="/contact" testId="final-cta-link" className="text-sm" data-cursor="OPEN">
                Start a Conversation
              </ArrowLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
