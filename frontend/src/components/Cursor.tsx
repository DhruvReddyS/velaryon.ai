import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Dot + lagging ring. Grows over interactive elements; shows data-cursor labels. */
export default function Cursor() {
  const [enabled] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });
  const [state, setState] = useState<{ hover: boolean; label: string; down: boolean }>({ hover: false, label: "", down: false });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest?.("a, button, [data-cursor], input, textarea, select, label") as HTMLElement | null;
      const label = t?.dataset.cursor ?? "";
      const hover = !!t;
      setState((s) => (s.hover === hover && s.label === label ? s : { ...s, hover, label }));
    };
    const down = () => setState((s) => ({ ...s, down: true }));
    const up = () => setState((s) => ({ ...s, down: false }));
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const big = state.label ? 84 : state.hover ? 54 : 34;
  return (
    <>
      <motion.div className="v-cursor-dot" style={{ x, y }} />
      <motion.div
        className={`v-cursor-ring ${state.label ? "has-label" : ""}`}
        style={{ x: rx, y: ry }}
        animate={{ width: big, height: big, scale: state.down ? 0.85 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {state.label && <span>{state.label}</span>}
      </motion.div>
    </>
  );
}
