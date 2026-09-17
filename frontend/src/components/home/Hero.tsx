import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useLoaded, scrollToId } from "@/lib/loader";
import { EASE } from "@/components/Reveal";

function MaskedLine({ children, show, delay }: { children: string; show: boolean; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={show ? { y: "0%" } : {}}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const loaded = useLoaded();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.55], ["0%", "-28%"]);
  const dim = useTransform(scrollYProgress, [0.35, 1], [0, 0.5]);

  return (
    <section ref={ref} data-testid="hero" className="relative h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
        <img
          src="/assets/vessel-dusk.webp"
          alt="Velaryon autonomous vessel underway on open ocean at dusk"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-abyss/30" />
      <motion.div aria-hidden className="absolute inset-0 bg-abyss" style={{ opacity: dim }} />

      <motion.div
        className="absolute inset-0 flex flex-col justify-end px-5 pb-24 md:px-10 md:pb-20"
        style={{ opacity: textOpacity, y: textY }}
      >
        <motion.p
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-mist"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          Autonomous Maritime Systems
        </motion.p>
        <h1 className="font-display text-6xl font-medium leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
          <MaskedLine show={loaded} delay={0.35}>
            Intelligence
          </MaskedLine>
          <MaskedLine show={loaded} delay={0.47}>
            at Sea.
          </MaskedLine>
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10"
        >
          <button
            onClick={() => scrollToId("mission")}
            data-testid="hero-explore-button"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-slate-200 transition-colors hover:text-white"
          >
            Explore Velaryon
            <ArrowDown className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-1" aria-hidden />
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 right-5 hidden text-right font-mono text-[9px] uppercase tracking-[0.3em] text-mist/70 md:right-10 md:block"
      >
        <p>Platform / 001</p>
        <p className="mt-1">Status / Concept</p>
      </motion.div>
    </section>
  );
}
