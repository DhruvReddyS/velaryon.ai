import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MISSIONS } from "@/lib/content";
import { srcSet } from "@/lib/velaryonMedia";
import { EASE, Lines, Tag } from "@/components/kit";

/** Slide 09 — expanding mission panels. */
export default function Missions({ no = "01" }: { no?: string }) {
  const [active, setActive] = useState(0);
  return (
    <section id="mission-contexts" className="d-missions" data-testid="missions">
      <div className="d-missions__head">
        <Tag no={no}>Mission contexts</Tag>
        <Lines className="d-display" lines={["Where the system", <em key="e">earns its purpose.</em>]} />
        <p>Development directions — not claims of deployed capability.</p>
      </div>
      <div className="d-missions__panels">
        {MISSIONS.map((m, i) => (
          <button
            key={m.n}
            className={`d-mpanel ${i === active ? "is-active" : ""}`}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            data-cursor={i === active ? undefined : "Open"}
            data-testid={`mission-${m.n}`}
          >
            <img src={m.img} srcSet={srcSet(m.img)} sizes="(min-width: 900px) 60vw, 100vw" decoding="async" alt="" loading="lazy" style={{ objectPosition: m.position }} />
            <span className="d-mpanel__shade" />
            <span className="d-mpanel__n">{m.n}</span>
            <span className="d-mpanel__vt">{m.t}</span>
            <AnimatePresence>
              {i === active && (
                <motion.span className="d-mpanel__body" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }} transition={{ duration: 0.7, delay: 0.25, ease: EASE }}>
                  <b>{m.t}</b>
                  <span>{m.c}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </section>
  );
}
