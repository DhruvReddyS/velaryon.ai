import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ROADMAP, ROADMAP_CURRENT, chapterNo, roadmapStatus } from "@/lib/content";
import { Lines, Reveal, Tag } from "@/components/kit";

/** Slide 10 — light roadmap slide; the route draws itself and the vessel marker travels. */
export default function Roadmap() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const draw = useTransform(p, [0, 1], [0, 1]);
  const marker = useTransform(p, [0, 1], ["0%", "100%"]);
  const now = ROADMAP_CURRENT;

  return (
    <section id="roadmap" ref={ref} className="d-roadmap" data-theme="light" data-testid="development">
      <div className="d-roadmap__head">
        <Tag no={chapterNo("roadmap")}>Roadmap</Tag>
        <Lines className="d-display d-display--dark" lines={["Nothing worth building", <em key="e">arrives finished.</em>]} />
        <p>Build. Test. Learn. Change. Then return to the water with a better system.</p>
      </div>
      <div className="d-roadmap__route">
        <div className="d-roadmap__line">
          <motion.i style={reduce ? undefined : { scaleX: draw }} className="d-roadmap__line-x" />
          <motion.i style={reduce ? undefined : { scaleY: draw }} className="d-roadmap__line-y" />
          {!reduce && <motion.b className="d-roadmap__marker d-roadmap__marker--x" style={{ left: marker }} />}
          {!reduce && <motion.b className="d-roadmap__marker d-roadmap__marker--y" style={{ top: marker }} />}
        </div>
        <ol>
          {ROADMAP.map((r, i) => (
            <li key={r.n} className={i < now ? "is-done" : i === now ? "is-now" : ""}>
              <Reveal delay={i * 0.06}>
                <span className="d-roadmap__node" />
                <div className="d-roadmap__meta"><span>{r.n}</span><b>{roadmapStatus(i)}</b></div>
                <h3>{r.t}</h3>
                <p>{r.c}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
