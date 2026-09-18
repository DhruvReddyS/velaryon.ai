import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";

const CHAPTERS = ["01", "02", "03", "04", "05", "06", "07"];

export default function RouteProgress() {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (pathname !== "/") return null;

  return (
    <aside
      aria-hidden
      data-testid="route-progress"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 opacity-40 transition-opacity duration-500 hover:opacity-90 lg:block"
    >
      <div className="relative flex h-[42vh] flex-col items-center justify-between py-1">
        <span className="absolute bottom-1 top-1 w-px bg-white/15" />
        {CHAPTERS.map((c) => (
          <span key={c} className="relative z-10 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-mist/60" />
            <span className="font-mono text-[8px] tracking-[0.25em] text-mist/60">{c}</span>
          </span>
        ))}
        <motion.span
          className="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ top }}
        >
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden>
            <path d="M3 8 Q1 10 3 12 M11 8 Q13 10 11 12" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
            <path d="M7 2 L10 8 L7 7 L4 8 Z" fill="#e2e8f0" />
          </svg>
        </motion.span>
      </div>
    </aside>
  );
}
