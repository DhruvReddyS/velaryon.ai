import { motion } from "motion/react";
import { EASE } from "@/components/Reveal";

const ANNOTATIONS = [
  { label: "SENSING", x: "57%", y: "12%", line: 44 },
  { label: "COMMUNICATION", x: "66%", y: "20%", line: 36 },
  { label: "NAVIGATION", x: "58%", y: "40%", line: 30 },
  { label: "COMPUTE", x: "44%", y: "52%", line: 30 },
  { label: "MISSION SYSTEMS", x: "26%", y: "58%", line: 44 },
];

export default function AnnotatedVessel({ testId = "annotated-vessel" }: { testId?: string }) {
  return (
    <div data-testid={testId} className="relative">
      <img
        src="/assets/vessel-hero.webp"
        alt="Velaryon autonomous vessel concept render, side profile at sea"
        className="w-full"
        loading="lazy"
      />
      <div aria-hidden className="absolute inset-0 hidden md:block">
        {ANNOTATIONS.map((a, i) => (
          <div key={a.label} className="absolute" style={{ left: a.x, top: a.y }}>
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.15 * i, duration: 0.7, ease: EASE }}
              className="origin-top border-l border-slate-400/70"
              style={{ height: a.line }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.15 * i + 0.3, duration: 0.6 }}
              className="mt-1 block whitespace-nowrap bg-bone/80 px-1 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-700 backdrop-blur-sm"
            >
              {a.label}
            </motion.span>
            <span className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-slate-700" />
          </div>
        ))}
      </div>
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 md:hidden">
        {ANNOTATIONS.map((a) => (
          <li key={a.label} className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
            {a.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
