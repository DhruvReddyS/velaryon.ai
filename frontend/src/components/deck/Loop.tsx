import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { LOOP, chapterNo } from "@/lib/content";
import { EASE, Tag } from "@/components/kit";

const R = 250;
const C = 300;
const pt = (i: number, r = R) => {
  const a = (-90 + (i * 360) / LOOP.length) * (Math.PI / 180);
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
};

/** Slide 07 — the autonomy loop as a radar ring that completes as you scroll. */
export default function Loop({ no = chapterNo("loop"), id = "loop" }: { no?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = LOOP.length;
  useMotionValueEvent(p, "change", (v) => setActive(Math.min(n - 1, Math.floor(v * n * 0.999))));
  const offset = useTransform(p, [0, 0.98], [1, 0]);
  const spin = useTransform(p, [0, 1], [0, 120]);
  const step = LOOP[active];

  return (
    <section id={id} ref={ref} className="d-loop" data-stops="0.1,0.3,0.5,0.7,0.9">
      <div className="d-loop__sticky">
        <div className="d-loop__head">
          <Tag no={no}>The autonomy loop</Tag>
          <h2 className="d-display">A continuous<br /><em>conversation</em><br />with the sea.</h2>
        </div>

        <div className="d-loop__dial">
          <div className="d-loop__sweep" aria-hidden />
          <svg viewBox="0 0 600 600" aria-hidden>
            <motion.g style={reduce ? undefined : { rotate: spin, originX: "300px", originY: "300px" }}>
              {Array.from({ length: 120 }).map((_, i) => {
                const a = pt(i * (n / 120), R + 26);
                const b = pt(i * (n / 120), R + (i % 10 === 0 ? 40 : 32));
                return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={i % 10 === 0 ? "tick tick--major" : "tick"} />;
              })}
            </motion.g>
            <circle cx={C} cy={C} r={R} className="ring" />
            <circle cx={C} cy={C} r={R * 0.62} className="ring ring--inner" />
            <circle cx={C} cy={C} r={R * 0.3} className="ring ring--inner" />
            <motion.circle cx={C} cy={C} r={R} className="ring ring--progress" pathLength={1} strokeDasharray="1 1" style={{ strokeDashoffset: reduce ? 0 : offset }} transform={`rotate(-90 ${C} ${C})`} />
            {LOOP.map((s, i) => {
              const q = pt(i);
              const lbl = pt(i, R + 72);
              return (
                <g key={s.n} className={`node ${i <= active ? "is-on" : ""} ${i === active ? "is-current" : ""}`}>
                  <circle cx={q.x} cy={q.y} r={i === active ? 11 : 6} />
                  {i === active && <circle cx={q.x} cy={q.y} r={22} className="halo" />}
                  <text x={lbl.x} y={lbl.y} textAnchor="middle" dominantBaseline="middle">{s.n} {s.t.toUpperCase()}</text>
                </g>
              );
            })}
          </svg>
          <div className="d-loop__centre">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }} transition={{ duration: 0.5, ease: EASE }}>
                <span>{step.n}</span>
                <b>{step.t}</b>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="d-loop__detail">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5, ease: EASE }}>
              <h3><em>{step.h}</em></h3>
              <p>{step.c}</p>
            </motion.div>
          </AnimatePresence>
          <ol>{LOOP.map((s, i) => <li key={s.n} className={i === active ? "is-active" : i < active ? "is-done" : ""}>{s.t}</li>)}</ol>
        </div>
      </div>
    </section>
  );
}
