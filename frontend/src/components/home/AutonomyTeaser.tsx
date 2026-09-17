import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";

const WORDS = ["PERCEIVE.", "UNDERSTAND.", "DECIDE.", "ACT."];

export default function AutonomyTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.22]);
  const w0 = useTransform(scrollYProgress, [0.06, 0.16, 0.22, 0.3], [0, 1, 1, 0.12]);
  const w1 = useTransform(scrollYProgress, [0.26, 0.36, 0.42, 0.5], [0, 1, 1, 0.12]);
  const w2 = useTransform(scrollYProgress, [0.46, 0.56, 0.62, 0.7], [0, 1, 1, 0.12]);
  const w3 = useTransform(scrollYProgress, [0.66, 0.78, 1, 1], [0, 1, 1, 1]);
  const words = [w0, w1, w2, w3];
  const linkOpacity = useTransform(scrollYProgress, [0.85, 0.97], [0, 1]);

  return (
    <section ref={ref} data-testid="autonomy-teaser" className="relative h-[380vh] bg-abyss">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5 md:px-10">
        <motion.img
          src="/assets/vessel-dusk.webp"
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: bgOpacity }}
        />
        <div className="relative mx-auto w-full max-w-7xl">
          <ChapterLabel index="03" title="Autonomy" />
          <div className="mt-12 space-y-2">
            {WORDS.map((w, i) => (
              <motion.p
                key={w}
                style={{ opacity: words[i] }}
                className="font-display text-5xl font-medium tracking-tight text-white sm:text-7xl lg:text-8xl"
              >
                {w}
              </motion.p>
            ))}
          </div>
          <motion.div style={{ opacity: linkOpacity }} className="mt-16">
            <ArrowLink to="/how-it-works" testId="autonomy-teaser-link">
              Experience How It Works
            </ArrowLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
