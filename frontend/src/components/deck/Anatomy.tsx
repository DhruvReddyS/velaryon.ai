import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ANATOMY, RENDER_NOTE } from "@/lib/content";
import { velaryonMedia as media, srcSet } from "@/lib/velaryonMedia";
import { EASE, Tag } from "@/components/kit";

/** Slide 06 — a scanning beam passes over the vessel and annotates its systems. */
export default function Anatomy({ no = "01", id = "anatomy" }: { no?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(-1);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = ANATOMY.length;
  useMotionValueEvent(p, "change", (v) => setActive(v < 0.1 ? -1 : Math.min(n - 1, Math.floor(((v - 0.1) / 0.85) * n))));
  const scanX = useTransform(p, [0.05, 0.95], ["-5%", "105%"]);
  const imgScale = useTransform(p, [0, 1], [1.08, 1]);
  const dim = useTransform(p, [0, 0.15], [0.6, 0.08]);
  const current = active >= 0 ? ANATOMY[active] : null;

  return (
    <section id={id} ref={ref} className="d-anatomy">
      <div className="d-anatomy__sticky">
        <div className="d-anatomy__head">
          <Tag no={no}>Anatomy</Tag>
          <h2 className="d-display">One hull.<br /><em>One mind.</em></h2>
        </div>

        <div className="d-anatomy__stage">
          <motion.img src={media.engineering.profile} srcSet={srcSet(media.engineering.profile)} sizes="(min-width: 900px) 70vw, 100vw" alt="Velaryon platform design visualisation, side profile" style={reduce ? undefined : { scale: imgScale }} />
          <motion.div className="d-anatomy__dim" style={{ opacity: reduce ? 0.08 : dim }} aria-hidden />
          <div className="d-anatomy__grid" aria-hidden />
          {!reduce && <motion.div className="d-anatomy__scan" style={{ left: scanX }} aria-hidden />}
          {ANATOMY.map((a, i) => (
            <div key={a.id} className={`d-pin d-pin--${a.side} d-pin--${a.dir} ${i <= active ? "is-on" : ""} ${i === active ? "is-current" : ""}`} style={{ left: `${a.x}%`, top: `${a.y}%` }}>
              <i />
              <span className="d-pin__line" />
              <span className="d-pin__label"><b>{String(i + 1).padStart(2, "0")}</b>{a.label}</span>
            </div>
          ))}
          <span className="d-anatomy__corner d-anatomy__corner--tl" />
          <span className="d-anatomy__corner d-anatomy__corner--br" />
        </div>

        <div className="d-anatomy__readout">
          <div className="d-anatomy__count">
            {ANATOMY.map((a, i) => <span key={a.id} className={i <= active ? "is-on" : ""} />)}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
              <span>{current ? `System ${String(active + 1).padStart(2, "0")}` : "Scanning"}</span>
              <h3>{current ? current.label : "Platform, software and autonomy, designed together."}</h3>
              {!current && <p>{RENDER_NOTE}</p>}
              {current && <p>{current.copy}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
