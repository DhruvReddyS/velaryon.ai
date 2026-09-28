import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "motion/react";
import { velaryonMedia as media } from "@/lib/velaryonMedia";
import { EASE, EASE_IO } from "@/components/kit";

type Flight = { x: number; y: number; s: number; left: number; top: number };

/**
 * Opening title sequence.
 * 1. The mark surfaces from below the horizon; the wordmark wipes in beside it.
 * 2. A counter runs the horizon line to 100.
 * 3. The lockup — an exact, scaled-up copy of the navbar brand — flies home into
 *    the navbar while the frame splits open along the horizon. It lands on the
 *    real nav logo's pixel position, so the hand-off is seamless.
 */
export default function VelaryonLoader({ onReveal, onGone }: { onReveal: () => void; onGone: () => void }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);
  const [flight, setFlight] = useState<Flight | null>(null);
  const lockup = useRef<HTMLDivElement>(null);

  // Park the lockup exactly over the navbar brand, then offset it to screen centre, scaled up.
  useLayoutEffect(() => {
    const measure = () => {
      const target = document.querySelector(".v-nav__brand") as HTMLElement | null;
      if (!target) return;
      const r = target.getBoundingClientRect();
      const s = window.innerWidth < 700 ? 2.1 : 3.4;
      setFlight({ left: r.left, top: r.top, s, x: window.innerWidth / 2 - (r.left + r.width / 2), y: window.innerHeight / 2 - 70 - (r.top + r.height / 2) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reduce) {
      onReveal();
      const t = window.setTimeout(onGone, 200);
      return () => window.clearTimeout(t);
    }
    const c = animate(0, 100, { duration: 2, delay: 0.2, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setCount(Math.round(v)) });
    const t1 = window.setTimeout(() => { setExit(true); onReveal(); }, 2450);
    const t2 = window.setTimeout(onGone, 3650);
    return () => { c.stop(); window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [onReveal, onGone, reduce]);

  const half = (side: "top" | "bottom") => (
    <motion.div className={`v-loader__half v-loader__half--${side}`} animate={exit ? { y: side === "top" ? "-100%" : "100%" } : { y: 0 }} transition={{ duration: 1.1, delay: 0.15, ease: EASE_IO }} />
  );

  return (
    <div className="v-loader" role="status" aria-label="Loading Velaryon">
      {half("top")}
      {half("bottom")}

      <motion.div className="v-loader__stage" animate={exit ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.4 }}>
        <div className="v-loader__meta"><span>Velaryon</span><span>Autonomous maritime systems</span></div>
        <div className="v-loader__horizon"><motion.i style={{ scaleX: count / 100 }} /></div>
        <div className="v-loader__foot">
          <span className="v-loader__tag">Initialising · Intelligence at sea</span>
          <span className="v-loader__count">{String(count).padStart(3, "0")}</span>
        </div>
      </motion.div>

      {flight && (
        <motion.div
          ref={lockup}
          className="v-loader__lockup"
          style={{ left: flight.left, top: flight.top }}
          initial={{ x: flight.x, y: flight.y, scale: flight.s }}
          animate={exit ? { x: 0, y: 0, scale: 1 } : { x: flight.x, y: flight.y, scale: flight.s }}
          transition={{ duration: 1.05, ease: EASE_IO }}
        >
          <span className="v-loader__markmask">
            <motion.img src={media.brand.mark} alt="" initial={{ y: "120%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay: 0.25, ease: EASE }} />
          </span>
          <motion.img className="v-loader__word" src={media.brand.wordmark} alt="Velaryon" initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.4 }} animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }} transition={{ duration: 1.2, delay: 0.75, ease: EASE }} />
        </motion.div>
      )}
    </div>
  );
}
