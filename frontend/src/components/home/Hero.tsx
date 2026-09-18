import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useLoaded, scrollToId } from "@/lib/loader";
import { EASE } from "@/components/Reveal";

const HERO_VIDEO: string | null = null; // drop a 6–10s cinematic loop path here later; poster remains until it can play

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
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.55], ["0%", "-28%"]);
  const dim = useTransform(scrollYProgress, [0.35, 1], [0, 0.5]);

  // living ocean: extremely subtle independent drift between image and typography
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const imgPX = useTransform(sx, (v) => v * -12);
  const imgPY = useTransform(sy, (v) => v * -7);
  const txtPX = useTransform(sx, (v) => v * 10);
  const txtPY = useTransform(sy, (v) => v * 6);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [reduce, mx, my]);

  return (
    <section ref={ref} data-testid="hero" className="relative h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
        <motion.div
          className="h-full w-full"
          animate={reduce ? {} : { scale: [1, 1.045] }}
          transition={{ duration: 26, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          style={{ x: imgPX, y: imgPY }}
        >
          <img
            src="/assets/vessel-dusk.webp"
            alt="Velaryon autonomous vessel underway on open ocean at dusk"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          {HERO_VIDEO && (
            <motion.video
              src={HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              onCanPlayThrough={() => setVideoReady(true)}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: videoReady ? 1 : 0 }}
              transition={{ duration: 1.4 }}
              aria-hidden
            />
          )}
        </motion.div>
      </motion.div>

      {/* drifting mist */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-[38%] h-56 opacity-60"
          style={{
            background:
              "radial-gradient(60% 100% at 30% 50%, rgba(148,163,184,0.10), transparent 70%), radial-gradient(50% 90% at 75% 40%, rgba(148,163,184,0.07), transparent 70%)",
          }}
          animate={{ x: ["-2%", "2%"] }}
          transition={{ duration: 34, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      )}

      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-abyss/30" />
      <motion.div aria-hidden className="absolute inset-0 bg-abyss" style={{ opacity: dim }} />

      <motion.div
        className="absolute inset-0 flex flex-col justify-end px-5 pb-24 md:px-10 md:pb-20"
        style={{ opacity: textOpacity, y: textY, x: txtPX }}
      >
        <motion.p
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-mist"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          Autonomous Maritime Systems
        </motion.p>
        <h1 className="font-display text-[clamp(2.7rem,11.5vw,6rem)] font-medium leading-[0.95] tracking-tight text-white lg:text-8xl">
          <MaskedLine show={loaded} delay={0.35}>
            INTELLIGENCE
          </MaskedLine>
          <MaskedLine show={loaded} delay={0.47}>
            AT SEA.
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
        <p>VELARYON / AUSTRALIA</p>
        <p className="mt-1">STATUS / DEVELOPMENT</p>
      </motion.div>
    </section>
  );
}
