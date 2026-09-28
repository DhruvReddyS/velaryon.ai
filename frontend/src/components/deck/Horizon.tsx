import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { chapterNo } from "@/lib/content";
import { velaryonMedia as media } from "@/lib/velaryonMedia";
import { Cta, Tag } from "@/components/kit";

/** Slide 12 — the closing shot: a window opens onto the horizon and becomes the frame. */
export default function Horizon() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const open = useTransform(p, [0, 0.55], [1, 0]);
  const clip = useTransform(open, (v) => `inset(${v * 30}% ${v * 34}% ${v * 30}% ${v * 34}% round ${v * 200}px)`);
  const scale = useTransform(p, [0, 0.6, 1], [1.5, 1.05, 1]);
  const lineA = useTransform(p, [0.2, 0.6], ["-60%", "0%"]);
  const lineB = useTransform(p, [0.2, 0.6], ["60%", "0%"]);
  const copy = useTransform(p, [0.55, 0.8], [0, 1]);
  const copyY = useTransform(p, [0.55, 0.85], [40, 0]);
  const bars = useTransform(p, [0.86, 1], [0, 1]);
  const fin = useTransform(p, [0.94, 1], [0, 1]);

  return (
    <section id="horizon" ref={ref} className="d-horizon" data-stops="0.85">
      <div className="d-horizon__sticky">
        <motion.div className="d-horizon__frame" style={reduce ? undefined : { clipPath: clip }}>
          <motion.img src={media.deck.departureSun} srcSet={`${media.deck.departureSunMobile} 960w, ${media.deck.departureSun} 1672w`} sizes="100vw" alt="Velaryon platform departing toward a sunset horizon" loading="lazy" style={reduce ? undefined : { scale }} />
          <div className="d-horizon__shade" />
        </motion.div>
        <h2 className="d-horizon__title" aria-label="The horizon is not the end.">
          <motion.span style={reduce ? undefined : { x: lineA }}>The horizon</motion.span>
          <motion.span style={reduce ? undefined : { x: lineB }}><em>is not the end.</em></motion.span>
        </h2>
        {!reduce && (
          <>
            <motion.div className="d-bar d-bar--top" style={{ scaleY: bars }} aria-hidden />
            <motion.div className="d-bar d-bar--bottom" style={{ scaleY: bars }} aria-hidden>
              <motion.span style={{ opacity: fin }}>Velaryon · Intelligence at sea</motion.span>
            </motion.div>
          </>
        )}
        <motion.div className="d-horizon__cta" style={reduce ? undefined : { opacity: copy, y: copyY }}>
          <Tag no={chapterNo("horizon")}>The next passage</Tag>
          <p>We're engaging early with investors, partners and engineers who want to shape autonomous maritime systems from the ground up.</p>
          <div className="d-horizon__btns">
            <Cta to="/contact" testId="cta-contact">Start a conversation</Cta>
            <Cta to="/company" variant="ghost" testId="cta-company">The company</Cta>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
