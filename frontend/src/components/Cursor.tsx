import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.("[data-cursor]");
      setLabel(t ? t.getAttribute("data-cursor") : null);
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        data-testid="custom-cursor-dot"
        className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100 mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        data-testid="custom-cursor-ring"
        className={`pointer-events-none fixed left-0 top-0 z-[95] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/70 mix-blend-difference transition-[width,height] duration-300 ${
          label ? "h-16 w-16" : "h-8 w-8"
        }`}
        style={{ x: rx, y: ry }}
      >
        {label && (
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-slate-100">{label}</span>
        )}
      </motion.div>
    </>
  );
}
