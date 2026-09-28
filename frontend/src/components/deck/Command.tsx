import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Lines, Tag } from "@/components/kit";

const ROW_A = Array(4).fill("Human-directed");
const ROW_B = Array(4).fill("Machine-executed");

/** Slide 08 — kinetic type: two statements sliding past each other. */
export default function Command({ no = "01" }: { no?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(p, [0, 1], ["5%", "-45%"]);
  const b = useTransform(p, [0, 1], ["-45%", "5%"]);
  const skew = useTransform(p, [0, 0.5, 1], [-6, 0, 6]);

  return (
    <section id="command" ref={ref} className="d-command" data-theme="light">
      <Tag no={no} className="d-command__tag">Command</Tag>
      <motion.div className="d-command__row" style={reduce ? undefined : { x: a, skewX: skew }} aria-hidden>
        {ROW_A.map((t, i) => <span key={i}>{t}<i>✦</i></span>)}
      </motion.div>
      <motion.div className="d-command__row d-command__row--b" style={reduce ? undefined : { x: b, skewX: skew }} aria-hidden>
        {ROW_B.map((t, i) => <span key={i}><em>{t}</em><i>✦</i></span>)}
      </motion.div>
      <div className="d-command__copy">
        <Lines as="p" lines={["People define the mission.", "The platform executes within its limits."]} />
        <div className="d-command__link"><span>Operator</span><i><b /></i><span>Platform</span></div>
      </div>
    </section>
  );
}
