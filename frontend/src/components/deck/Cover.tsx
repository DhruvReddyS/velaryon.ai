import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLoaded } from "@/lib/loader";
import { velaryonMedia as media, srcSet } from "@/lib/velaryonMedia";
import { BRAND } from "@/lib/content";
import { EASE, Lines, Marquee, useUtcClock } from "@/components/kit";

/** Slide 01 — full-bleed cover that contracts into a framed plate as you scroll. */
export default function Cover() {
  const ref = useRef<HTMLElement>(null);
  const ready = useLoaded();
  const reduce = useReducedMotion();
  const clock = useUtcClock();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const inset = useTransform(p, [0, 0.75], [0, 1]);
  const clip = useTransform(inset, (v) => `inset(${v * 9}% ${v * 7}% ${v * 9}% ${v * 7}% round ${v * 28}px)`);
  const imgScale = useTransform(p, [0, 1], [1.05, 1.28]);
  const leftX = useTransform(p, [0, 0.8], ["0vw", "-38vw"]);
  const rightX = useTransform(p, [0, 0.8], ["0vw", "38vw"]);
  const titleFade = useTransform(p, [0.35, 0.8], [1, 0]);
  const chromeFade = useTransform(p, [0, 0.25], [1, 0]);
  const afterFade = useTransform(p, [0.55, 0.9], [0, 1]);
  const afterY = useTransform(p, [0.55, 1], [40, 0]);

  return (
    <section id="cover" ref={ref} className="d-cover" data-testid="hero" data-stops="0">
      <div className="d-cover__sticky">
        <motion.div className="d-cover__after" style={reduce ? { opacity: 0 } : { opacity: afterFade, y: afterY }}>
          <span>Velaryon — company deck</span>
          <span>Vol. 01 / {new Date().getFullYear()}</span>
        </motion.div>

        <motion.div className="d-cover__frame" style={reduce ? undefined : { clipPath: clip }}>
          <motion.div className="d-cover__img" initial={reduce ? false : { scale: 1.3, filter: "brightness(0.2)" }} animate={ready ? { scale: 1, filter: "brightness(1)" } : {}} transition={{ duration: 2.6, ease: EASE }}>
            <motion.img src={media.hero.cover} srcSet={srcSet(media.hero.cover)} sizes="100vw" alt="Velaryon autonomous surface platform at sea" fetchPriority="high" style={reduce ? undefined : { scale: imgScale }} />
          </motion.div>
          <div className="d-cover__shade" />
          <div className="d-cover__scan" />
          {ready && !reduce && <div className="d-cover__sweep" aria-hidden />}

          <motion.div className="d-cover__chrome" style={reduce ? undefined : { opacity: chromeFade }}>
            <motion.div className="d-cover__top" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.9 }}>
              <span><i className="d-dot" />{BRAND.category}</span>
              <span>{BRAND.pillars.join(" / ")}</span>
              <span>UTC {clock}</span>
            </motion.div>
          </motion.div>

          <motion.h1 className="d-cover__title" style={reduce ? undefined : { opacity: titleFade }}>
            <motion.span style={reduce ? undefined : { x: leftX }}>
              <Lines as="div" lines={["Intelligence"]} play={ready} delay={0.2} />
            </motion.span>
            <motion.span className="d-cover__title-2" style={reduce ? undefined : { x: rightX }}>
              <Lines as="div" lines={[<em key="a">at sea.</em>]} play={ready} delay={0.35} />
            </motion.span>
          </motion.h1>

          <motion.div className="d-cover__foot" style={reduce ? undefined : { opacity: chromeFade }}>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.8, ease: EASE }}>
              Autonomous surface platforms and the software that commands them — engineered as one system, for an ocean that never stands still.
            </motion.p>
            <motion.div className="d-cover__scroll" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 1.1 }}>
              <span>Scroll to begin</span>
              <i />
            </motion.div>
          </motion.div>
        </motion.div>

        {!reduce && (
          <>
            <motion.div className="d-bar d-bar--top" initial={{ scaleY: 1 }} animate={ready ? { scaleY: 0 } : {}} transition={{ duration: 1.8, delay: 0.5, ease: EASE }} aria-hidden />
            <motion.div className="d-bar d-bar--bottom" initial={{ scaleY: 1 }} animate={ready ? { scaleY: 0 } : {}} transition={{ duration: 1.8, delay: 0.5, ease: EASE }} aria-hidden />
          </>
        )}
        <motion.div className="d-cover__marquee" style={reduce ? undefined : { opacity: chromeFade }}>
          <Marquee items={["Autonomous maritime systems", "Intelligence at sea", "Platform", "Software", "Autonomy", "Human-directed", "Built for open water"]} speed={48} />
        </motion.div>
      </div>
    </section>
  );
}
