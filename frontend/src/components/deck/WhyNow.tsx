import { motion, useReducedMotion } from "motion/react";
import { MARKET, WHY_NOW, chapterNo } from "@/lib/content";
import { velaryonMedia as media, srcSet } from "@/lib/velaryonMedia";
import { ClipImg, EASE, Lines, Reveal, Tag } from "@/components/kit";

/** Slide — why now: three converging shifts, sourced figures, and (when approved) market data. */
export default function WhyNow() {
  const reduce = useReducedMotion();
  return (
    <section id="whynow" className="d-why" data-theme="light">
      <div className="d-why__head">
        <Tag no={chapterNo("whynow")}>Why now</Tag>
        <Lines className="d-display d-display--dark" lines={["Three shifts,", <em key="e">one window.</em>]} />
      </div>

      <div className="d-why__cols">
        {WHY_NOW.map((s, i) => (
          <article key={s.n}>
            <motion.i className="d-why__rule" initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 1.4, delay: i * 0.12, ease: EASE }} />
            <Reveal delay={0.1 + i * 0.1}>
              <span className="d-why__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </Reveal>
          </article>
        ))}
      </div>

      {MARKET.length > 0 && (
        <div className="d-why__facts">
          {MARKET.map((m) => (
            <Reveal key={m.label} className="d-why__fact">
              <b>{m.value}</b>
              <p>{m.label}</p>
              <small>Source: {m.source}</small>
            </Reveal>
          ))}
        </div>
      )}

      <ClipImg src={media.deck.aerialRun} srcSet={srcSet(media.deck.aerialRun)} alt="Velaryon platform study underway, leaving a long wake" className="d-why__img" position="55% 50%" />
      <div className="d-why__caption">
        <span>Fig. 01</span>
        <span>Design visualisation — a platform study underway.</span>
      </div>
    </section>
  );
}
