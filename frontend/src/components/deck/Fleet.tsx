import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { FLEET, RENDER_NOTE, chapterNo, type Vessel } from "@/lib/content";
import { srcSet } from "@/lib/velaryonMedia";
import { Cta, Tag } from "@/components/kit";

function Card({ v, i, p, count }: { v: Vessel; i: number; p: MotionValue<number>; count: number }) {
  const reduce = useReducedMotion();
  const centre = (i + 1) / (count + 1);
  const range = [Math.max(0, centre - 0.35), Math.min(1, centre + 0.35)];
  const imgX = useTransform(p, range, ["-12%", "12%"]);
  const numX = useTransform(p, range, ["30%", "-30%"]);
  return (
    <article className="d-fleet__card">
      <Link to={`/platforms/${v.id}`} className="d-fleet__media" data-cursor="View" data-testid={`fleet-card-${v.id}`}>
        <motion.img src={v.video?.poster ?? v.img} srcSet={srcSet(v.video?.poster ?? v.img)} sizes="90vw" decoding="async" alt={`${v.name}, ${v.role}`} loading="lazy" style={{ x: reduce ? 0 : imgX, objectPosition: v.position }} />
        {v.video && !reduce && (
          <motion.video autoPlay muted loop playsInline preload="metadata" poster={v.video.poster} style={{ x: imgX, objectPosition: v.position }} aria-hidden>
            <source media="(max-width: 767px)" src={v.video.mobile} />
            <source src={v.video.desktop} />
          </motion.video>
        )}
        <div className="d-fleet__shade" />
        <motion.span className="d-fleet__num" style={reduce ? undefined : { x: numX }}>{String(i + 1).padStart(2, "0")}</motion.span>
        <div className="d-fleet__meta">
          <span>{v.index}</span>
          <span>{v.role}</span>
        </div>
        <span className="d-fleet__render">{RENDER_NOTE}</span>
      </Link>
      <div className="d-fleet__body">
        <h3>{v.name}</h3>
        <p className="d-fleet__tag"><em>{v.tagline}</em></p>
        <p>{v.summary}</p>
        <ul>{v.traits.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </article>
  );
}

/** Slide 05 — vertical scroll drives a horizontal reel of platform studies. */
export default function Fleet() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(p, { stiffness: 140, damping: 32, mass: 0.35 });
  const x = useTransform(smooth, (v) => -v * distance);
  const bar = useTransform(p, [0, 1], [0, 1]);

  useLayoutEffect(() => {
    const measure = () => { if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth)); };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  return (
    <section id="fleet" ref={section} className="d-fleet" data-stops="0,0.3,0.57,0.84,1" style={{ height: `calc(100svh + ${distance}px)` }} data-testid="platforms">
      <div className="d-fleet__sticky">
        <div className="d-fleet__top">
          <Tag no={chapterNo("fleet")}>The fleet</Tag>
          <div className="d-fleet__bar"><motion.i style={{ scaleX: bar }} /></div>
          <span className="d-fleet__hint">Scroll to travel →</span>
        </div>
        <motion.div ref={track} className="d-fleet__track" style={{ x }}>
          <div className="d-fleet__intro">
            <h2 className="d-display">Three studies.<br /><em>One autonomous core.</em></h2>
            <p>A family of surface platform directions sharing one autonomy and systems architecture. Each explores a different question: mission, form and awareness.</p>
          </div>
          {FLEET.map((v, i) => <Card key={v.id} v={v} i={i} p={p} count={FLEET.length} />)}
          <div className="d-fleet__outro">
            <p className="d-fleet__outro-k">Designations & specifications</p>
            <h3>Released once they're <em>validated</em> at sea.</h3>
            <Cta to="/platforms" testId="fleet-all">Explore the fleet</Cta>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
