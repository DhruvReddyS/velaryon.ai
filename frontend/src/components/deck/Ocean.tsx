import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { OCEAN_BEATS, OCEAN_FACTS, chapterNo } from "@/lib/content";
import { Count, EASE, Tag } from "@/components/kit";
import { srcSet } from "@/lib/velaryonMedia";

function Plate({ img, i, n, p, reduce }: { img: string; i: number; n: number; p: MotionValue<number>; reduce: boolean | null }) {
  const a = i / n;
  const b = (i + 1) / n;
  const opacity = useTransform(
    p,
    i === 0 ? [0, b - 0.04, b + 0.02] : i === n - 1 ? [a - 0.05, a + 0.03, 1] : [a - 0.05, a + 0.03, b - 0.04, b + 0.02],
    i === 0 ? [1, 1, 0] : i === n - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const scale = useTransform(p, [Math.max(0, a - 0.1), Math.min(1, b + 0.1)], [1.18, 1]);
  return <motion.img src={img} srcSet={srcSet(img)} sizes="100vw" decoding="async" alt="" className="d-ocean__plate" style={reduce ? { opacity: i === 0 ? 1 : 0 } : { opacity, scale }} loading={i === 0 ? "eager" : "lazy"} />;
}

function Seg({ i, n, p }: { i: number; n: number; p: MotionValue<number> }) {
  const scaleX = useTransform(p, [i / n, (i + 1) / n], [0, 1]);
  return <span><motion.i style={{ scaleX }} /></span>;
}

/** Slide 02 — the problem: pinned sequence of ocean plates, each with its own line. */
export default function Ocean() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [beat, setBeat] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = OCEAN_BEATS.length;
  useMotionValueEvent(p, "change", (v) => setBeat(Math.min(n - 1, Math.floor(v * n))));
  const b = OCEAN_BEATS[beat];

  return (
    <section id="ocean" ref={ref} className="d-ocean" data-stops="0.12,0.37,0.62,0.88">
      <div className="d-ocean__sticky">
        {OCEAN_BEATS.map((o, i) => <Plate key={o.img} img={o.img} i={i} n={n} p={p} reduce={reduce} />)}
        <div className="d-ocean__shade" />
        <div className="d-ocean__grid" aria-hidden />

        <div className="d-ocean__head">
          <Tag no={chapterNo("ocean")}>The problem</Tag>
          <span className="d-ocean__beat">{String(beat + 1).padStart(2, "0")} — {String(n).padStart(2, "0")}</span>
        </div>

        <div className="d-ocean__copy">
          <AnimatePresence mode="wait">
            <motion.h2 key={beat} className="d-display">
              {b.line.map((l, i) => (
                <span className="k-line" key={l}>
                  <motion.span className="k-line__in" initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "-110%" }} transition={{ duration: 0.8, delay: i * 0.07, ease: EASE }}>
                    {i === 1 ? <em>{l}</em> : l}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p key={beat} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>{b.note}</motion.p>
          </AnimatePresence>
        </div>

        <div className="d-ocean__facts">
          {OCEAN_FACTS.map((f) => (
            <div key={f.label}>
              <Count to={f.value} suffix={f.suffix} className="d-ocean__num" />
              <p>{f.label}<small> · {f.source}</small></p>
            </div>
          ))}
        </div>

        <div className="d-ocean__segs">{OCEAN_BEATS.map((_, i) => <Seg key={i} i={i} n={n} p={p} />)}</div>
      </div>
    </section>
  );
}
