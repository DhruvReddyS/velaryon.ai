import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLoaded } from "@/lib/loader";
import { EASE, Lines } from "@/components/kit";

type HeroProps = {
  index: string;
  title: string;
  lines: ReactNode[];
  lead?: string;
  img: string;
  position?: string;
  meta?: { k: string; v: string }[];
  testId?: string;
};

/** Full-bleed chapter opener used by every sub-page. */
export function PageHero({ index, title, lines, lead, img, position = "50% 50%", meta, testId }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const ready = useLoaded();
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(p, [0, 1], ["0%", "25%"]);
  const scale = useTransform(p, [0, 1], [1, 1.15]);
  const fade = useTransform(p, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="p-hero" data-testid={testId}>
      <motion.div className="p-hero__media" style={reduce ? undefined : { y, scale }}>
        <motion.img src={img} alt="" style={{ objectPosition: position }} initial={reduce ? false : { scale: 1.25, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, ease: EASE }} fetchPriority="high" />
      </motion.div>
      <div className="p-hero__shade" />
      <motion.div className="p-hero__top" style={reduce ? undefined : { opacity: fade }}>
        <span>Velaryon / {title}</span>
        <span>Chapter {index}</span>
      </motion.div>
      <motion.div className="p-hero__body" style={reduce ? undefined : { opacity: fade }}>
        <Lines as="h1" lines={lines} play={ready} delay={0.35} />
        <motion.div className="p-hero__foot" initial={reduce ? false : { opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.7, ease: EASE }}>
          {lead && <p>{lead}</p>}
          {meta && (
            <div className="p-hero__meta">
              {meta.map((m) => <div key={m.k}>{m.k}<b>{m.v}</b></div>)}
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Oversized link to the next chapter — every page ends like a deck slide handing off. */
export function NextChapter({ to, label, img }: { to: string; label: string; img: string }) {
  return (
    <Link to={to} className="p-next" data-cursor="Next" data-testid="next-chapter">
      <div className="p-next__img" aria-hidden><img src={img} alt="" loading="lazy" /></div>
      <p className="p-next__k">Next chapter</p>
      <p className="p-next__t"><span>{label}</span><b>→</b></p>
    </Link>
  );
}
