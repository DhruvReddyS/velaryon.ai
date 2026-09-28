import { useState } from "react";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";

const PX = 4; // pixels per degree
const W = 320; // visible tape width
const LABELS: Record<number, string> = { 0: "N", 90: "E", 180: "S", 270: "W" };
/** The voyage: the deck's scroll progress steers a slow course change. */
const course = (p: number) => (214 + p * 148) % 360;

/** Bridge-style heading tape for the deck HUD. Purely presentational. */
export default function Compass({ progress }: { progress: MotionValue<number> }) {
  const [hdg, setHdg] = useState(214);
  useMotionValueEvent(progress, "change", (v) => {
    const h = Math.round(course(v));
    setHdg((prev) => (prev === h ? prev : h));
  });
  const x = useTransform(progress, (v) => {
    let h = course(v);
    if (h < 180) h += 360; // tape spans 0–720°, keep the window inside it
    return W / 2 - h * PX;
  });
  const ticks = [];
  for (let d = 0; d <= 720; d += 5) {
    const n = d % 360;
    const major = n % 30 === 0;
    ticks.push(
      <span key={d} className={`v-compass__t ${major ? "is-major" : ""}`} style={{ left: d * PX }}>
        {major && <b>{LABELS[n] ?? String(n).padStart(3, "0")}</b>}
      </span>,
    );
  }
  return (
    <div className="v-compass" aria-hidden>
      <div className="v-compass__window" style={{ width: W }}>
        <motion.div className="v-compass__tape" style={{ x }}>{ticks}</motion.div>
        <i className="v-compass__caret" />
      </div>
      <span className="v-compass__read">HDG {String(hdg).padStart(3, "0")}°</span>
    </div>
  );
}
