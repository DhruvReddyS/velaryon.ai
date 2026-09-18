import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/Primitives";

export default function VelaryonLoader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setExiting(true), reduce ? 300 : 1350);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <motion.div
      data-testid="velaryon-loader"
      role="status"
      aria-label="Velaryon loading"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      onAnimationComplete={() => exiting && onDone()}
    >
      <motion.img
        src="/assets/logo-mark-light.png"
        alt="Velaryon"
        className="h-14 w-auto md:h-16"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      <motion.img
        src="/assets/logo-wordmark-light.png"
        alt=""
        aria-hidden
        className="mt-6 h-3 w-auto"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.6 }}
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-line-soft">
        <motion.div
          className="h-full origin-left bg-signal"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduce ? 0.2 : 1.25, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <p className="label-xs absolute bottom-6 left-6 text-fog md:left-10">Autonomous maritime systems</p>
      <p className="label-xs absolute right-6 bottom-6 text-fog md:right-10">Australia</p>
    </motion.div>
  );
}
