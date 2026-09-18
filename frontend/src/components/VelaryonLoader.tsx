import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const LOCKUP_W = 614;
const LOCKUP_H = 150;
const NAV_MARK_H = 28;
const EASE_APPROACH = [0.22, 0.7, 0.2, 1] as const;
const EASE_INOUT = [0.65, 0, 0.15, 1] as const;

export default function VelaryonLoader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);

  const geo = useMemo(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const fit = Math.min(1, (vw - 48) / LOCKUP_W);
    const endScale = NAV_MARK_H / LOCKUP_H;
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
        transition={{ duration: 0.95, ease: EASE_INOUT }}
      />
      {/* faint horizon + atmospheric haze */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-x-0 top-1/2 h-px bg-slate-700/30" />
        <motion.div
          className="absolute inset-x-0 top-1/2 h-40 -translate-y-1/2"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(148,163,184,0.05), transparent)" }}
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 0.6, duration: 1.6 }}
        />
      </motion.div>

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
          <div className="relative" style={{ perspective: 900 }}>
            <div className="loader-bob flex flex-col items-center">
              <motion.img
                src="/assets/logo-bow-light.png"
                alt="Velaryon mark"
                className="w-[264px]"
                initial={{ opacity: 0, scale: 0.1, y: 26, rotateX: 14, filter: "blur(9px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.35, duration: 1.6, ease: EASE_APPROACH }}
              />
              <motion.img
                src="/assets/logo-waves-light.png"
                alt=""
                aria-hidden
                className="-mt-[33px] w-[264px]"
                initial={{ opacity: 0, scaleX: 0.4, y: 8 }}
                animate={{ opacity: 1, scaleX: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.95, ease: EASE_APPROACH }}
              />
            </div>

            {/* bow wake: originates at centre, propagates outward, then settles into the mark */}
            <svg
              aria-hidden
              viewBox="0 0 260 30"
              className="absolute -bottom-6 left-1/2 h-7 w-[264px] -translate-x-1/2"
              fill="none"
            >
              <defs>
                <filter id="wake-wobble" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="2" result="n">
                    <animate
                      attributeName="baseFrequency"
                      values="0.012 0.09;0.016 0.11;0.012 0.09"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
                </filter>
              </defs>
              <g filter="url(#wake-wobble)">
                {/* inner wake */}
                <motion.path
                  d="M130 9 Q 104 2 78 9"
                  stroke="#aebdd0"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.95, 0] }}
                  transition={{ delay: 1.05, duration: 1.15, ease: "easeOut" }}
                />
                <motion.path
                  d="M130 9 Q 156 2 182 9"
                  stroke="#aebdd0"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.95, 0] }}
                  transition={{ delay: 1.05, duration: 1.15, ease: "easeOut" }}
                />
                {/* outer wake — delayed, lower energy */}
                <motion.path
                  d="M130 18 Q 82 8 34 18"
                  stroke="#5c6f8a"
                  strokeWidth="1.1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
                  transition={{ delay: 1.3, duration: 1.35, ease: "easeOut" }}
                />
                <motion.path
                  d="M130 18 Q 178 8 226 18"
                  stroke="#5c6f8a"
                  strokeWidth="1.1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
                  transition={{ delay: 1.3, duration: 1.35, ease: "easeOut" }}
                />
                {/* secondary ripple */}
                <motion.path
                  d="M130 25 Q 96 19 62 25"
                  stroke="#3b526b"
                  strokeWidth="0.8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                  transition={{ delay: 1.55, duration: 1.2, ease: "easeOut" }}
                />
                <motion.path
                  d="M130 25 Q 164 19 198 25"
                  stroke="#3b526b"
                  strokeWidth="0.8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                  transition={{ delay: 1.55, duration: 1.2, ease: "easeOut" }}
                />
              </g>
            </svg>
          </div>

          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{ delay: 1.75, duration: 0.85, ease: EASE_APPROACH }}
            >
              <img src="/assets/logo-wordmark-light.png" alt="VELARYON" className="h-8 w-auto" />
            </motion.div>
            <motion.p
              className="font-mono text-[9px] uppercase tracking-[0.42em] text-mist"
              initial={{ opacity: 0, letterSpacing: "0.7em" }}
              animate={{ opacity: 1, letterSpacing: "0.42em" }}
              transition={{ delay: 2.25, duration: 0.7 }}
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
      <img src="/assets/logo-mark-light.png" alt="Velaryon" className="h-24 w-auto" />
    </motion.div>
  );
}
