import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import { Reveal } from "@/components/Reveal";

const STAGES = ["CONCEPT", "ENGINEERING", "PROTOTYPE", "SEA TRIALS", "MISSION VALIDATION", "SCALE"];
const FRACTIONS = [0, 0.18, 0.38, 0.58, 0.78, 1];
const ROUTE = "M40 350 C 240 320, 330 210, 520 230 S 720 130, 900 170 S 1100 80, 1160 95";

export default function Development() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const [marker, setMarker] = useState({ x: 40, y: 350, a: 0 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const L = el.getTotalLength();
    setLen(L);
    setPts(FRACTIONS.map((f) => el.getPointAtLength(L * f)));
    const s = el.getPointAtLength(0);
    const n = el.getPointAtLength(2);
    setMarker({ x: s.x, y: s.y, a: (Math.atan2(n.y - s.y, n.x - s.x) * 180) / Math.PI });
  }, []);

  useMotionValueEvent(draw, "change", (v) => {
    const el = pathRef.current;
    if (!el || !len) return;
    const c = el.getPointAtLength(v * len);
    const n = el.getPointAtLength(Math.min(len, v * len + 2));
    setMarker({ x: c.x, y: c.y, a: (Math.atan2(n.y - c.y, n.x - c.x) * 180) / Math.PI });
  });

  return (
    <section id="development" data-testid="development-section" className="bg-navy py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <ChapterLabel index="06" title="Development" />
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal delay={0.1} className="md:col-span-7">
            <h2 className="font-display text-4xl font-medium leading-[1.0] tracking-tight text-white sm:text-6xl">
              FROM CONCEPT
              <br />
              TO OPEN WATER.
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="md:col-span-5">
            <p className="max-w-sm text-base leading-relaxed text-mist">
              The development path, plotted like a route. Stages are indicative of intent — only
              the current phase is marked.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16 md:mt-24">
          <div
            ref={ref}
            className="relative border border-white/[0.07] bg-abyss/60 p-4 md:p-8"
            data-testid="development-route"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
            <svg viewBox="0 0 1200 460" className="relative w-full" fill="none" role="img" aria-label="Conceptual development route from concept to scale">
              <path ref={pathRef} d={ROUTE} stroke="#22304a" strokeWidth="1.4" strokeDasharray="4 7" />
              <motion.path d={ROUTE} stroke="#cbd5e1" strokeWidth="1.6" style={{ pathLength: draw }} />
              {pts.map((pt, i) => (
                <g key={STAGES[i]}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#090d16" stroke="#94a3b8" strokeWidth="1.2" />
                  <text
                    x={pt.x}
                    y={pt.y + (i % 2 === 0 ? -22 : 34)}
                    textAnchor="middle"
                    fontSize="13"
                    fill="#94a3b8"
                    fontFamily="monospace"
                    letterSpacing="3"
                  >
                    {STAGES[i]}
                  </text>
                  {i === 0 && (
                    <text
                      x={pt.x + 2}
                      y={pt.y + 56}
                      textAnchor="start"
                      fontSize="10"
                      fill="#e2e8f0"
                      fontFamily="monospace"
                      letterSpacing="3"
                      data-testid="development-current-phase"
                    >
                      CURRENT PHASE
                    </text>
                  )}
                </g>
              ))}
              <g transform={`translate(${marker.x} ${marker.y}) rotate(${marker.a})`} data-testid="development-marker">
                <path d="M9 0 L-6 5 L-3 0 L-6 -5 Z" fill="#f1f5f9" />
                <path d="M-8 0 Q -16 2 -22 0" stroke="#3b526b" strokeWidth="1" />
              </g>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
