import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";

const WORDS = [
  { w: "PERCEIVE", s: "THE ENVIRONMENT." },
  { w: "UNDERSTAND", s: "WHAT MATTERS." },
  { w: "DECIDE", s: "THE NEXT MOVE." },
  { w: "ACT", s: "WITH PRECISION." },
  { w: "CONNECT", s: "BY DESIGN." },
];

const useWin = (p: MotionValue<number>, a: number, b: number, c: number, d: number) =>
  useTransform(p, [a, b, c, d], [0, 1, 1, 0]);

function Word({ i, p }: { i: number; p: MotionValue<number> }) {
  const a = 0.03 + i * 0.19;
  const opMid = useWin(p, a, a + 0.06, a + 0.15, a + 0.2);
  const opLast = useTransform(p, [a, a + 0.07, 1, 1], [0, 1, 1, 1]);
  const op = i === WORDS.length - 1 ? opLast : opMid;
  const y = useTransform(p, [a, a + 0.06], [36, 0]);
  return (
    <motion.div style={{ opacity: op, y }} className="absolute bottom-16 left-5 md:bottom-20 md:left-10">
      <p className="font-display text-5xl font-medium tracking-tight text-white sm:text-7xl lg:text-8xl">
        {WORDS[i].w}.
      </p>      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.35em] text-mist">{WORDS[i].s}</p>
    </motion.div>
  );
}

export default function AutonomyLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const vesselScale = useTransform(p, [0.62, 0.8], [1, 0.86]);
  const vesselX = useTransform(p, [0.62, 0.76], ["0%", "5%"]);
  const vesselY = useTransform(p, [0.62, 0.76], ["0%", "-4%"]);

  const perceiveOp = useWin(p, 0.04, 0.11, 0.17, 0.24);
  const understandOp = useWin(p, 0.23, 0.3, 0.36, 0.44);
  const decideOp = useWin(p, 0.42, 0.49, 0.58, 0.66);
  const altDraw = useTransform(p, [0.44, 0.56], [0, 1]);
  const altFade = useTransform(p, [0.58, 0.64], [0.9, 0.18]);
  const chosenDraw = useTransform(p, [0.56, 0.64], [0, 1]);
  const actLineOp = useWin(p, 0.63, 0.7, 0.76, 0.82);
  const connectOp = useTransform(p, [0.78, 0.86, 1, 1], [0, 1, 1, 1]);
  const linkDraw = useTransform(p, [0.82, 0.94], [0, 1]);
  const linkOp = useTransform(p, [0.8, 0.86], [0, 1]);

  return (
    <section id="autonomy" ref={ref} data-testid="autonomy-loop" data-cursor="VIEW" className="relative h-[520vh] bg-abyss">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute left-5 top-24 z-10 md:left-10">
          <ChapterLabel index="03" title="Autonomy" />
        </div>
        <p className="absolute right-5 top-24 z-10 text-right font-mono text-[9px] uppercase tracking-[0.3em] text-mist/50 md:right-10">
          Concept loop — one continuous mission
        </p>

        <motion.div
          className="absolute left-1/2 top-1/2 w-[min(86vw,920px)] -translate-x-1/2 -translate-y-1/2"
          style={{ scale: vesselScale, x: vesselX, y: vesselY }}
        >
          <img
            src="/assets/vessel-dusk.webp"
            alt="Velaryon vessel concept underway — autonomy loop visualization"
            loading="lazy"
            className="w-full object-cover"
          />
        </motion.div>

        <svg aria-hidden viewBox="0 0 100 62" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
          <motion.g style={{ opacity: perceiveOp }}>
            {[9, 16, 23].map((r) => (
              <circle key={r} cx="50" cy="32" r={r} stroke="#3b526b" strokeWidth="0.8" vectorEffect="non-scaling-stroke" strokeDasharray="1.5 2.5" opacity={0.9 - r / 40} />
            ))}
          </motion.g>

          <motion.g style={{ opacity: decideOp }}>
            <path d="M14 48 L 86 16" stroke="#94a3b8" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="56" cy="29" r="1.6" fill="#f1f5f9" />
            <motion.path d="M14 48 C 38 34, 60 34, 86 16" stroke="#6e8cab" strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ pathLength: altDraw, opacity: altFade }} />
            <motion.path d="M14 48 C 42 54, 64 28, 86 16" stroke="#6e8cab" strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ pathLength: altDraw, opacity: altFade }} />
            <motion.path d="M14 48 C 30 28, 62 26, 86 16" stroke="#f1f5f9" strokeWidth="1.4" vectorEffect="non-scaling-stroke" style={{ pathLength: chosenDraw }} />
          </motion.g>

          <motion.g style={{ opacity: actLineOp }}>
            <path d="M14 48 C 30 28, 62 26, 86 16" stroke="#f1f5f9" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </motion.g>

          <motion.g style={{ opacity: linkOp }}>
            <rect x="83" y="7" width="5" height="5" stroke="#f1f5f9" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
            <motion.path
              d="M52 26 C 64 18, 74 13, 83 10"
              stroke="#6e8cab"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="2 2"
              style={{ pathLength: linkDraw }}
            />
          </motion.g>
        </svg>

        <motion.div style={{ opacity: understandOp }} className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-1/2">
          <div className="absolute inset-0 border-r border-white/10 bg-abyss/70 backdrop-blur-[2px]" />
          <svg viewBox="0 0 100 62" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
            <rect x="16" y="18" width="8" height="6" stroke="#6e8cab" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
            <rect x="34" y="38" width="7" height="5" stroke="#6e8cab" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          </svg>
          <p className="absolute left-5 top-1/3 font-mono text-[9px] tracking-[0.3em] text-slate-300 md:left-10">TRK-01</p>
          <p className="absolute bottom-16 left-5 font-mono text-[10px] tracking-[0.4em] text-mist md:left-10">
            SENSE → FUSE → INTERPRET
          </p>
        </motion.div>

        <motion.p style={{ opacity: connectOp }} className="absolute right-6 top-16 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-300 md:right-10">
          REMOTE OPERATIONS / CONCEPT
        </motion.p>

        {[0, 1, 2, 3, 4].map((i) => (
          <Word key={i} i={i} p={p} />
        ))}
      </div>

      <div className="relative z-10 -mt-[6vh] flex justify-center pb-24">
        <div className="bg-abyss/60 px-6 py-4 backdrop-blur-sm">
          <ArrowLink to="/how-it-works" testId="autonomy-loop-link">
            Experience How It Works
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
