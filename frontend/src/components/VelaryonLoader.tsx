import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "motion/react";
import { velaryonMedia as media } from "@/lib/velaryonMedia";
import { EASE, EASE_IO } from "@/components/kit";

/**
 * Opening title card: counter runs to 100 while the mark surfaces from the
 * horizon, then the frame splits along the horizon line to reveal the cover.
 */
export default function VelaryonLoader({ onReveal, onGone }: { onReveal: () => void; onGone: () => void }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (reduce) {
      onReveal();
      const t = window.setTimeout(onGone, 200);
      return () => window.clearTimeout(t);
    }
    const c = animate(0, 100, { duration: 1.9, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setCount(Math.round(v)) });
    const t1 = window.setTimeout(() => { setExit(true); onReveal(); }, 2150);
    const t2 = window.setTimeout(onGone, 3250);
    return () => { c.stop(); window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [onReveal, onGone, reduce]);

  const half = (side: "top" | "bottom") => (
    <motion.div
      className={`v-loader__half v-loader__half--${side}`}
      animate={exit ? { y: side === "top" ? "-100%" : "100%" } : { y: 0 }}
      transition={{ duration: 1, ease: EASE_IO }}
    />
  );

  return (
    <div className="v-loader" role="status" aria-label="Loading Velaryon">
      {half("top")}
      {half("bottom")}
      <motion.div className="v-loader__stage" animate={exit ? { opacity: 0, scale: 0.96 } : { opacity: 1 }} transition={{ duration: 0.5, ease: EASE }}>
        <div className="v-loader__meta">
          <span>Velaryon</span>
          <span>Autonomous maritime systems</span>
        </div>
        <div className="v-loader__mark">
          <motion.img src={media.brand.mark} alt="" initial={reduce ? false : { y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 1.3, delay: 0.15, ease: EASE }} />
        </div>
        <div className="v-loader__horizon"><motion.i style={{ scaleX: count / 100 }} /></div>
        <div className="v-loader__foot">
          <motion.img src={media.brand.wordmark} alt="Velaryon" initial={reduce ? false : { opacity: 0, letterSpacing: "0.4em", filter: "blur(6px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1.2, delay: 0.5, ease: EASE }} />
          <span className="v-loader__count">{String(count).padStart(3, "0")}</span>
        </div>
      </motion.div>
    </div>
  );
}
