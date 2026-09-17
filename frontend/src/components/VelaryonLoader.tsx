import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const LOCKUP_W = 614;
const LOCKUP_H = 150;
const NAV_MARK_H = 28;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_INOUT = [0.65, 0, 0.15, 1] as const;

export default function VelaryonLoader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);

  const geo = useMemo(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const fit = Math.min(1, (vw - 48) / LOCKUP_W);
    const endScale = (NAV_MARK_H / LOCKUP_H) * 1;
    const endX = vw >= 768 ? 40 : 20;
    const endY = 32 - NAV_MARK_H / 2;
    return {
      startX: (vw - LOCKUP_W * fit) / 2,
      startY: (vh - LOCKUP_H * fit) / 2,
      fit,
      endX,
      endY,
      endScale,
    };
  }, []);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  if (reduce) {
    return <ReducedLoader onDone={finish} />;
  }

  return (
    <div data-testid="velaryon-loader" className="fixed inset-0 z-[100]" role="status" aria-label="Velaryon loading">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black"
        initial={{ opacity: 1 }}
        animate={exiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_INOUT }}
      />

      <motion.div
        className="absolute left-0 top-0"
        style={{ transformOrigin: "0 0", width: LOCKUP_W, height: LOCKUP_H }}
        initial={{ x: geo.startX, y: geo.startY, scale: geo.fit }}
        animate={
          exiting
            ? { x: geo.endX, y: geo.endY, scale: geo.endScale }
            : { x: geo.startX, y: geo.startY, scale: geo.fit }
        }
        transition={exiting ? { duration: 0.9, ease: EASE_INOUT } : { duration: 0.01 }}
        onAnimationComplete={() => exiting && finish()}
      >
        <div className="flex items-center gap-7">
          <div className="relative">
            <div className="loader-bob">
              <motion.img
                src="/assets/logo-mark.png"
                alt="Velaryon mark"
                className="h-[150px] w-auto"
                initial={{ opacity: 0, scale: 0.32, filter: "blur(14px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.2, duration: 1.15, ease: EASE_OUT }}
              />
            </div>
            <svg
              aria-hidden
              viewBox="0 0 260 26"
              className="absolute -bottom-5 left-1/2 h-6 w-[260px] -translate-x-1/2"
              fill="none"
            >
              <motion.path
                d="M6 14 Q 45 4 84 14 T 162 14 T 254 14"
                stroke="#3b526b"
                strokeWidth="1.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.9, 0] }}
                transition={{ delay: 0.95, duration: 1.2, ease: "easeOut" }}
              />
              <motion.path
                d="M30 21 Q 70 13 110 21 T 230 21"
                stroke="#2a3b52"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
                transition={{ delay: 1.15, duration: 1.2, ease: "easeOut" }}
              />
            </svg>
          </div>

          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.85, ease: EASE_OUT }}
            >
              <img src="/assets/logo-wordmark.png" alt="VELARYON" className="h-8 w-auto brightness-[2.2]" />
            </motion.div>
            <motion.p
              className="font-mono text-[9px] uppercase tracking-[0.42em] text-mist"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              onAnimationComplete={() => setExiting(true)}
            >
              Autonomous Maritime Systems
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ReducedLoader({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      data-testid="velaryon-loader"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      onAnimationComplete={onDone}
    >
      <img src="/assets/logo-mark.png" alt="Velaryon" className="h-24 w-auto" />
    </motion.div>
  );
}
