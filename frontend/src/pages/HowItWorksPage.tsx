import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";

const N = 8; // scenes

function sceneOpacity(p: MotionValue<number>, i: number, last = false) {
  const s = i / N;
  const e = (i + 1) / N;
  if (i === 0) return useTransform(p, [s, e - 0.02, e], [1, 1, 0]);
  if (last) return useTransform(p, [s, s + 0.02, 1], [0, 1, 1]);
  return useTransform(p, [s, s + 0.02, e - 0.02, e], [0, 1, 1, 0]);
}

function Caption({ children, opacity }: { children: string; opacity: MotionValue<number> }) {
  return (
    <motion.h2
      style={{ opacity }}
      className="pointer-events-none absolute bottom-20 left-5 right-5 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl md:left-10 md:text-6xl"
    >
      {children}
    </motion.h2>
  );
}

export default function HowItWorksPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const o0 = sceneOpacity(scrollYProgress, 0);
  const o1 = sceneOpacity(scrollYProgress, 1);
  const o2 = sceneOpacity(scrollYProgress, 2);
  const o3 = sceneOpacity(scrollYProgress, 3);
  const o4 = sceneOpacity(scrollYProgress, 4);
  const o5 = sceneOpacity(scrollYProgress, 5);
  const o6 = sceneOpacity(scrollYProgress, 6);
  const o7 = sceneOpacity(scrollYProgress, 7, true);

  const routeDraw = useTransform(scrollYProgress, [0.01, 0.1], [0, 1]);
  const vesselIn = useTransform(scrollYProgress, [0.13, 0.2], [0, 1]);
  const sensorScale = useTransform(scrollYProgress, [0.26, 0.34], [0.2, 1]);
  const tracksIn = useTransform(scrollYProgress, [0.4, 0.46], [0, 1]);
  const altRoute = useTransform(scrollYProgress, [0.52, 0.58], [0, 1]);
  const chosen = useTransform(scrollYProgress, [0.58, 0.62], [0, 1]);
  const actX = useTransform(scrollYProgress, [0.65, 0.73], ["0%", "14%"]);
  const actY = useTransform(scrollYProgress, [0.65, 0.73], ["0%", "-8%"]);
  const linkDraw = useTransform(scrollYProgress, [0.79, 0.85], [0, 1]);

  return (
    <div data-testid="how-it-works-page" className="bg-abyss">
      <section className="flex min-h-[55svh] items-end">
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-40 md:px-10">
          <Reveal>
            <ChapterLabel index="03" title="Autonomy" />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-7xl">
              One continuous
              <br />
              mission.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist">
              A conceptual walk through the Velaryon autonomy loop — from tasking to connected
              operations. Scroll to run the mission.
            </p>
          </Reveal>
        </div>
      </section>

      <div ref={ref} data-testid="autonomy-experience" className="relative h-[850vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-abyss">
          <p className="absolute left-5 top-24 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/60 md:left-10">
            Conceptual demonstration — scroll to progress
          </p>

          {/* SCENE 1 — MISSION */}
          <motion.div style={{ opacity: o0 }} className="absolute inset-0">
            <svg viewBox="0 0 800 500" className="h-full w-full" fill="none" aria-label="Mission map concept">
              <path d="M0 120 Q 200 80 400 130 T 800 100" stroke="#1e293b" strokeWidth="1" />
              <path d="M0 420 Q 260 460 520 410 T 800 440" stroke="#1e293b" strokeWidth="1" />
              <circle cx="120" cy="260" r="5" fill="#94a3b8" />
              <text x="120" y="245" textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="monospace" letterSpacing="3">ORIGIN</text>
              <motion.path
                d="M120 260 C 260 200, 420 300, 560 240 S 680 200, 690 210"
                stroke="#6e8cab"
                strokeWidth="1.6"
                strokeDasharray="5 6"
                style={{ pathLength: routeDraw }}
              />
              <rect x="600" y="150" width="150" height="120" stroke="#3b526b" strokeWidth="1" strokeDasharray="4 5" />
              <text x="675" y="140" textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="monospace" letterSpacing="3">MISSION AREA</text>
              <motion.path
                d="M690 210 C 600 320, 340 340, 130 275"
                stroke="#3b526b"
                strokeWidth="1.2"
                strokeDasharray="2 6"
                style={{ pathLength: routeDraw }}
              />
            </svg>
            <Caption opacity={o0}>DEFINE THE MISSION.</Caption>
          </motion.div>

          {/* SCENE 2 — DEPLOY */}
          <motion.div style={{ opacity: o1 }} className="absolute inset-0">
            <img src="/assets/vessel-dusk.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-50" />
            <motion.img
              src="/assets/vessel-hero.webp"
              alt="Velaryon vessel deploying autonomously, concept render"
              className="absolute left-1/2 top-1/2 w-[70vw] max-w-3xl -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: vesselIn }}
            />
            <Caption opacity={o1}>DEPLOY AUTONOMOUSLY.</Caption>
          </motion.div>

          {/* SCENE 3 — PERCEIVE */}
          <motion.div style={{ opacity: o2 }} className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 800 500" className="h-full w-full" fill="none" aria-label="Perception concept">
              <motion.g style={{ scale: sensorScale, transformOrigin: "400px 260px" }}>
                {[150, 105, 60].map((r) => (
                  <circle key={r} cx="400" cy="260" r={r} stroke="#3b526b" strokeWidth="1" strokeDasharray="3 6" opacity={0.7 - r / 300} />
                ))}
              </motion.g>
              <circle cx="400" cy="260" r="6" fill="#f1f5f9" />
              <text x="400" y="290" textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="monospace" letterSpacing="3">VELARYON</text>
              <circle cx="560" cy="180" r="4" fill="#94a3b8" />
              <text x="560" y="165" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="monospace" letterSpacing="2">VESSEL</text>
              <circle cx="280" cy="340" r="3.5" fill="#94a3b8" />
              <text x="280" y="325" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="monospace" letterSpacing="2">BUOY</text>
              <path d="M620 380 Q 680 350 760 385" stroke="#3b526b" strokeWidth="1.2" />
              <text x="690" y="410" textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="monospace" letterSpacing="2">COASTLINE</text>
            </svg>
            <Caption opacity={o2}>PERCEIVE THE ENVIRONMENT.</Caption>
          </motion.div>

          {/* SCENE 4 — UNDERSTAND */}
          <motion.div style={{ opacity: o3 }} className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 800 500" className="h-full w-full" fill="none" aria-label="Understanding concept">
              <circle cx="400" cy="260" r="6" fill="#f1f5f9" />
              <motion.g style={{ opacity: tracksIn }}>
                <rect x="548" y="168" width="26" height="26" stroke="#6e8cab" strokeWidth="1.2" />
                <text x="561" y="155" textAnchor="middle" fontSize="10" fill="#6e8cab" fontFamily="monospace" letterSpacing="2">TRK-01</text>
                <rect x="268" y="328" width="24" height="24" stroke="#6e8cab" strokeWidth="1.2" />
                <text x="280" y="315" textAnchor="middle" fontSize="10" fill="#6e8cab" fontFamily="monospace" letterSpacing="2">TRK-02</text>
              </motion.g>
              <text x="400" y="450" textAnchor="middle" fontSize="12" fill="#94a3b8" fontFamily="monospace" letterSpacing="6">
                SENSE → FUSE → IDENTIFY → TRACK
              </text>
            </svg>
            <Caption opacity={o3}>TURN DATA INTO SITUATIONAL AWARENESS.</Caption>
          </motion.div>

          {/* SCENE 5 — DECIDE */}
          <motion.div style={{ opacity: o4 }} className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 800 500" className="h-full w-full" fill="none" aria-label="Decision concept">
              <path d="M100 380 L 700 140" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="6 6" opacity="0.5" />
              <text x="150" y="350" fontSize="10" fill="#94a3b8" fontFamily="monospace" letterSpacing="2">PLANNED</text>
              <circle cx="430" cy="245" r="5" fill="#f1f5f9" />
              <text x="430" y="225" textAnchor="middle" fontSize="10" fill="#f1f5f9" fontFamily="monospace" letterSpacing="2">CROSSING VESSEL</text>
              <motion.path d="M100 380 C 300 320, 480 300, 700 140" stroke="#3b526b" strokeWidth="1.4" style={{ pathLength: altRoute, opacity: altRoute }} />
              <motion.path d="M100 380 C 320 420, 520 260, 700 140" stroke="#3b526b" strokeWidth="1.4" style={{ pathLength: altRoute, opacity: altRoute }} />
              <motion.path d="M100 380 C 260 260, 500 240, 700 140" stroke="#f1f5f9" strokeWidth="1.8" style={{ pathLength: chosen }} />
              <motion.text x="330" y="245" fontSize="10" fill="#f1f5f9" fontFamily="monospace" letterSpacing="2" style={{ opacity: chosen }}>
                SELECTED
              </motion.text>
            </svg>
            <Caption opacity={o4}>PLAN. DECIDE. ADAPT.</Caption>
          </motion.div>

          {/* SCENE 6 — ACT */}
          <motion.div style={{ opacity: o5 }} className="absolute inset-0">
            <img src="/assets/vessel-sunset.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-45" />
            <motion.img
              src="/assets/vessel-hero.webp"
              alt="Velaryon vessel executing a precise course change, concept render"
              className="absolute left-[18%] top-1/2 w-[46vw] max-w-xl -translate-y-1/2"
              style={{ x: actX, y: actY }}
            />
            <Caption opacity={o5}>ACT WITH PRECISION.</Caption>
          </motion.div>

          {/* SCENE 7 — CONNECT */}
          <motion.div style={{ opacity: o6 }} className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 800 500" className="h-full w-full" fill="none" aria-label="Connected operations concept">
              <circle cx="240" cy="300" r="6" fill="#f1f5f9" />
              <text x="240" y="330" textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="monospace" letterSpacing="3">VELARYON</text>
              <rect x="560" y="150" width="16" height="16" stroke="#f1f5f9" strokeWidth="1.4" />
              <text x="568" y="135" textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="monospace" letterSpacing="3">OPERATIONS</text>
              <motion.path
                d="M248 292 C 380 220, 460 200, 556 162"
                stroke="#6e8cab"
                strokeWidth="1.4"
                strokeDasharray="4 5"
                style={{ pathLength: linkDraw }}
              />
              {[150, 340, 470].map((cx, i) => (
                <motion.circle
                  key={cx}
                  cx={cx}
                  cy={390 - i * 30}
                  r="3.5"
                  stroke="#3b526b"
                  strokeWidth="1.2"
                  style={{ opacity: linkDraw }}
                />
              ))}
            </svg>
            <Caption opacity={o6}>CONNECTED OPERATIONS.</Caption>
          </motion.div>

          {/* ENDING */}
          <motion.div style={{ opacity: o7 }} className="absolute inset-0">
            <img src="/assets/vessel-dusk.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-mono text-xs uppercase tracking-[0.5em] text-white">Mission Complete</p>
              <p className="mt-6 max-w-sm px-6 text-center text-sm leading-relaxed text-mist">
                This sequence illustrates the autonomy concept Velaryon is developing — it is not a
                claim of validated operational capability.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Built to be supervised, not just unmanned.
            </h2>
          </Reveal>
          <div className="mt-10">
            <ArrowLink to="/contact" testId="hiw-contact-link">
              Start a Conversation
            </ArrowLink>
          </div>
        </div>
      </section>
    </div>
  );
}
